import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Campaign } from "./Campaign";
import { CampaignFunnel } from "./CampaignFunnel";
import { CampaignSend } from "./CampaignSend";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { UpdateCampaignDto } from "./dto/update-campaign.dto";
import { SendCampaignDto } from "./dto/send-campaign.dto";
import { EmailService } from "../../cotizaciones/email.service";

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly repo: Repository<Campaign>,
    @InjectRepository(CampaignFunnel)
    private readonly funnelRepo: Repository<CampaignFunnel>,
    @InjectRepository(CampaignSend)
    private readonly sendRepo: Repository<CampaignSend>,
    private readonly emailService: EmailService,
  ) {}

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  create(dto: CreateCampaignDto): Promise<Campaign> {
    const data: Partial<Campaign> = { ...dto, type: (dto.type ?? "EMAIL") as Campaign["type"] };
    const entity = this.repo.create(data);
    if (data.type === "EMAIL") entity.channel = "email";
    return this.repo.save(entity);
  }

  findAll(filters?: { type?: string; status?: string; q?: string }) {
    const qb = this.repo.createQueryBuilder("c").orderBy("c.id", "DESC");
    if (filters?.type)   qb.andWhere("c.type = :type",     { type: filters.type });
    if (filters?.status) qb.andWhere("c.status = :status", { status: filters.status });
    if (filters?.q) {
      qb.andWhere("(c.name LIKE :q OR c.subject LIKE :q)", { q: `%${filters.q}%` });
    }
    return qb.getMany();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException("Campaña no encontrada");
    return entity;
  }

  async update(id: number, dto: UpdateCampaignDto): Promise<Campaign> {
    const entity = await this.findOne(id);
    if (dto.type) entity.type = dto.type as Campaign["type"];
    if (dto.name        !== undefined) entity.name        = dto.name!;
    if (dto.url         !== undefined) entity.url         = dto.url ?? null;
    if (dto.status      !== undefined) entity.status      = dto.status!;
    if (dto.subject     !== undefined) entity.subject     = dto.subject ?? null;
    if (dto.body_html   !== undefined) entity.body_html   = dto.body_html ?? null;
    if (dto.sender_name !== undefined) entity.sender_name = dto.sender_name ?? null;
    if (dto.recursos    !== undefined) entity.recursos    = dto.recursos ?? null;
    if (dto.start_date  !== undefined) entity.start_date  = dto.start_date ?? null;
    if (dto.end_date    !== undefined) entity.end_date    = dto.end_date ?? null;
    if (dto.budget      !== undefined) entity.budget      = dto.budget ?? null;
    if (entity.type === "EMAIL")       entity.channel     = "email";
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return { ok: true };
  }

  // ─── Funnel stages (many-to-many) ─────────────────────────────────────────

  async getFunnelStages(campaignId: number) {
    await this.findOne(campaignId); // valida existencia
    const rows = await this.funnelRepo.find({
      where: { campaign_id: campaignId },
      relations: ["funnel_stage"],
      order: { created_at: "ASC" },
    });
    return rows.map((r) => r.funnel_stage);
  }

  async setFunnelStages(campaignId: number, stageIds: number[]) {
    await this.findOne(campaignId);
    // Reemplazar todas las asociaciones
    await this.funnelRepo.delete({ campaign_id: campaignId });
    if (stageIds.length === 0) return [];
    const rows = stageIds.map((sid) =>
      this.funnelRepo.create({ campaign_id: campaignId, funnel_stage_id: sid }),
    );
    await this.funnelRepo.save(rows);
    return this.getFunnelStages(campaignId);
  }

  // ─── Stats / Reportes ─────────────────────────────────────────────────────

  async getStats(campaignId: number) {
    await this.findOne(campaignId);

    const [dealsRows, sendRows, funnelRows] = await Promise.all([
      // Cierres de ventas por estado
      this.repo.query(
        `SELECT status, COUNT(*) AS total, COALESCE(SUM(amount), 0) AS amount
         FROM mk_deals
         WHERE campaign_id = ?
         GROUP BY status`,
        [campaignId],
      ),
      // Envíos de email
      this.repo.query(
        `SELECT status, COUNT(*) AS total
         FROM mk_campaign_sends
         WHERE campaign_id = ?
         GROUP BY status`,
        [campaignId],
      ),
      // Etapas del embudo asociadas
      this.funnelRepo.find({
        where: { campaign_id: campaignId },
        relations: ["funnel_stage"],
      }),
    ]);

    const deals = {
      total: dealsRows.reduce((s: number, r: any) => s + Number(r.total), 0),
      won: Number(dealsRows.find((r: any) => r.status === "won")?.total ?? 0),
      lost: Number(dealsRows.find((r: any) => r.status === "lost")?.total ?? 0),
      open: Number(dealsRows.find((r: any) => r.status === "open")?.total ?? 0),
      revenue: Number(
        dealsRows.find((r: any) => r.status === "won")?.amount ?? 0,
      ),
    };

    const sends = {
      sent:   Number(sendRows.find((r: any) => r.status === "sent")?.total   ?? 0),
      failed: Number(sendRows.find((r: any) => r.status === "failed")?.total ?? 0),
    };

    const funnel_stages = funnelRows.map((r) => ({
      id:       r.funnel_stage?.id,
      name:     r.funnel_stage?.name,
      position: r.funnel_stage?.position,
    }));

    return { campaign_id: campaignId, deals, sends, funnel_stages };
  }

  // ─── Email sending ────────────────────────────────────────────────────────

  async sendCampaign(
    id: number,
    dto: SendCampaignDto,
  ): Promise<{ sent: number; failed: number; total: number; errors: string[] }> {
    const campaign = await this.findOne(id);

    if (campaign.type !== "EMAIL") {
      throw new BadRequestException("Solo se pueden enviar campañas de tipo EMAIL");
    }
    if (!campaign.subject?.trim()) {
      throw new BadRequestException("La campaña debe tener un asunto");
    }
    if (!campaign.body_html?.trim()) {
      throw new BadRequestException("La campaña debe tener un contenido (body)");
    }

    const empresaRows = await this.repo.query(
      "SELECT * FROM empresa_config WHERE id = 1 LIMIT 1",
    );
    const empresa = empresaRows?.[0] ?? null;

    const smtpConfig = empresa?.smtp_host
      ? {
          host: empresa.smtp_host,
          port: empresa.smtp_port ?? 587,
          user: empresa.smtp_user ?? "",
          pass: empresa.smtp_pass ?? "",
          from: empresa.smtp_from ?? empresa.email ?? "",
        }
      : null;

    let sql =
      "SELECT id, full_name, email FROM mk_contacts WHERE email IS NOT NULL AND email != ''";
    const params: any[] = [];

    if (dto.contact_ids?.length) {
      sql += ` AND id IN (${dto.contact_ids.map(() => "?").join(",")})`;
      params.push(...dto.contact_ids);
    } else {
      sql += " AND type = 'lead'";
      if (dto.filter_status) {
        sql += " AND status = ?";
        params.push(dto.filter_status);
      }
    }

    const contacts: any[] = await this.repo.query(sql, params);

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];
    const senderName = campaign.sender_name ?? empresa?.nombre ?? "CRM";

    for (const contact of contacts) {
      const html = this.buildCampaignHtml({
        empresaNombre: empresa?.nombre ?? "MBS",
        senderName,
        contactName: contact.full_name || contact.email,
        bodyHtml: campaign.body_html!,
      });

      const result = await this.emailService.sendEmail(smtpConfig, {
        to: contact.email,
        subject: campaign.subject!,
        html,
      });

      const send = this.sendRepo.create({
        campaign_id: id,
        contact_id: contact.id ?? null,
        contact_email: contact.email,
        contact_name: contact.full_name ?? "",
        status: result.ok ? "sent" : "failed",
        error_msg: result.error ?? null,
      });
      await this.sendRepo.save(send);

      if (result.ok) {
        sent++;
      } else {
        failed++;
        if (result.error) errors.push(`${contact.email}: ${result.error}`);
      }
    }

    if (campaign.status === "draft" && sent > 0) {
      campaign.status = "active";
      await this.repo.save(campaign);
    }

    return { sent, failed, total: contacts.length, errors };
  }

  getSends(campaignId: number): Promise<CampaignSend[]> {
    return this.sendRepo.find({
      where: { campaign_id: campaignId },
      order: { sent_at: "DESC" },
    });
  }

  // ─── HTML builder ─────────────────────────────────────────────────────────

  private buildCampaignHtml(opts: {
    empresaNombre: string;
    senderName: string;
    contactName: string;
    bodyHtml: string;
  }): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { background: #2563eb; padding: 28px 40px; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 32px 40px; color: #374151; line-height: 1.7; }
    .body p { margin: 0 0 14px; }
    .footer { padding: 20px 40px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>${opts.empresaNombre}</h1></div>
    <div class="body">
      <p>Hola <strong>${opts.contactName}</strong>,</p>
      ${opts.bodyHtml}
    </div>
    <div class="footer">Enviado por ${opts.senderName} · ${opts.empresaNombre}</div>
  </div>
</body>
</html>`;
  }
}
