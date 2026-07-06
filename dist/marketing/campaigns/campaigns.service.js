"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_datasource_service_1 = require("../../tenant/tenant-datasource.service");
const Campaign_1 = require("./Campaign");
const CampaignFunnel_1 = require("./CampaignFunnel");
const CampaignSend_1 = require("./CampaignSend");
const email_service_1 = require("../../cotizaciones/email.service");
let CampaignsService = class CampaignsService {
    tds;
    emailService;
    constructor(tds, emailService) {
        this.tds = tds;
        this.emailService = emailService;
    }
    async create(dto) {
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const data = { ...dto, type: (dto.type ?? "EMAIL") };
        const entity = repo.create(data);
        if (data.type === "EMAIL")
            entity.channel = "email";
        return repo.save(entity);
    }
    async findAll(filters) {
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const qb = repo.createQueryBuilder("c").orderBy("c.id", "DESC");
        if (filters?.type)
            qb.andWhere("c.type = :type", { type: filters.type });
        if (filters?.status)
            qb.andWhere("c.status = :status", { status: filters.status });
        if (filters?.q) {
            qb.andWhere("(c.name LIKE :q OR c.subject LIKE :q)", { q: `%${filters.q}%` });
        }
        return qb.getMany();
    }
    async findOne(id) {
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const entity = await repo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException("Campaña no encontrada");
        return entity;
    }
    async update(id, dto) {
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const entity = await this.findOne(id);
        if (dto.type)
            entity.type = dto.type;
        if (dto.name !== undefined)
            entity.name = dto.name;
        if (dto.url !== undefined)
            entity.url = dto.url ?? null;
        if (dto.status !== undefined)
            entity.status = dto.status;
        if (dto.subject !== undefined)
            entity.subject = dto.subject ?? null;
        if (dto.body_html !== undefined)
            entity.body_html = dto.body_html ?? null;
        if (dto.sender_name !== undefined)
            entity.sender_name = dto.sender_name ?? null;
        if (dto.recursos !== undefined)
            entity.recursos = dto.recursos ?? null;
        if (dto.start_date !== undefined)
            entity.start_date = dto.start_date ?? null;
        if (dto.end_date !== undefined)
            entity.end_date = dto.end_date ?? null;
        if (dto.budget !== undefined)
            entity.budget = dto.budget ?? null;
        if (entity.type === "EMAIL")
            entity.channel = "email";
        return repo.save(entity);
    }
    async remove(id) {
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const entity = await this.findOne(id);
        await repo.remove(entity);
        return { ok: true };
    }
    async getFunnelStages(campaignId) {
        await this.findOne(campaignId);
        const funnelRepo = await this.tds.getRepository(CampaignFunnel_1.CampaignFunnel);
        const rows = await funnelRepo.find({
            where: { campaign_id: campaignId },
            relations: ["funnel_stage"],
            order: { created_at: "ASC" },
        });
        return rows.map((r) => r.funnel_stage);
    }
    async setFunnelStages(campaignId, stageIds) {
        await this.findOne(campaignId);
        const funnelRepo = await this.tds.getRepository(CampaignFunnel_1.CampaignFunnel);
        await funnelRepo.delete({ campaign_id: campaignId });
        if (stageIds.length === 0)
            return [];
        const rows = stageIds.map((sid) => funnelRepo.create({ campaign_id: campaignId, funnel_stage_id: sid }));
        await funnelRepo.save(rows);
        return this.getFunnelStages(campaignId);
    }
    async getStats(campaignId) {
        await this.findOne(campaignId);
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const funnelRepo = await this.tds.getRepository(CampaignFunnel_1.CampaignFunnel);
        const [dealsRows, sendRows, funnelRows] = await Promise.all([
            repo.query(`SELECT status, COUNT(*) AS total, COALESCE(SUM(amount), 0) AS amount
         FROM mk_deals
         WHERE campaign_id = ?
         GROUP BY status`, [campaignId]),
            repo.query(`SELECT status, COUNT(*) AS total
         FROM mk_campaign_sends
         WHERE campaign_id = ?
         GROUP BY status`, [campaignId]),
            funnelRepo.find({
                where: { campaign_id: campaignId },
                relations: ["funnel_stage"],
            }),
        ]);
        const deals = {
            total: dealsRows.reduce((s, r) => s + Number(r.total), 0),
            won: Number(dealsRows.find((r) => r.status === "won")?.total ?? 0),
            lost: Number(dealsRows.find((r) => r.status === "lost")?.total ?? 0),
            open: Number(dealsRows.find((r) => r.status === "open")?.total ?? 0),
            revenue: Number(dealsRows.find((r) => r.status === "won")?.amount ?? 0),
        };
        const sends = {
            sent: Number(sendRows.find((r) => r.status === "sent")?.total ?? 0),
            failed: Number(sendRows.find((r) => r.status === "failed")?.total ?? 0),
        };
        const funnel_stages = funnelRows.map((r) => ({
            id: r.funnel_stage?.id,
            name: r.funnel_stage?.name,
            position: r.funnel_stage?.position,
        }));
        return { campaign_id: campaignId, deals, sends, funnel_stages };
    }
    async sendCampaign(id, dto) {
        const campaign = await this.findOne(id);
        if (campaign.type !== "EMAIL") {
            throw new common_1.BadRequestException("Solo se pueden enviar campañas de tipo EMAIL");
        }
        if (!campaign.subject?.trim()) {
            throw new common_1.BadRequestException("La campaña debe tener un asunto");
        }
        if (!campaign.body_html?.trim()) {
            throw new common_1.BadRequestException("La campaña debe tener un contenido (body)");
        }
        const repo = await this.tds.getRepository(Campaign_1.Campaign);
        const sendRepo = await this.tds.getRepository(CampaignSend_1.CampaignSend);
        const empresaRows = await repo.query("SELECT * FROM empresa_config WHERE id = 1 LIMIT 1");
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
        let sql = "SELECT id, full_name, email FROM mk_contacts WHERE email IS NOT NULL AND email != ''";
        const params = [];
        if (dto.contact_ids?.length) {
            sql += ` AND id IN (${dto.contact_ids.map(() => "?").join(",")})`;
            params.push(...dto.contact_ids);
        }
        else {
            sql += " AND type = 'lead'";
            if (dto.filter_status) {
                sql += " AND status = ?";
                params.push(dto.filter_status);
            }
        }
        const contacts = await repo.query(sql, params);
        let sent = 0;
        let failed = 0;
        const errors = [];
        const senderName = campaign.sender_name ?? empresa?.nombre ?? "CRM";
        for (const contact of contacts) {
            const html = this.buildCampaignHtml({
                empresaNombre: empresa?.nombre ?? "MBS",
                senderName,
                contactName: contact.full_name || contact.email,
                bodyHtml: campaign.body_html,
            });
            const result = await this.emailService.sendEmail(smtpConfig, {
                to: contact.email,
                subject: campaign.subject,
                html,
            });
            const send = sendRepo.create({
                campaign_id: id,
                contact_id: contact.id ?? null,
                contact_email: contact.email,
                contact_name: contact.full_name ?? "",
                status: result.ok ? "sent" : "failed",
                error_msg: result.error ?? null,
            });
            await sendRepo.save(send);
            if (result.ok) {
                sent++;
            }
            else {
                failed++;
                if (result.error)
                    errors.push(`${contact.email}: ${result.error}`);
            }
        }
        if (campaign.status === "draft" && sent > 0) {
            campaign.status = "active";
            await repo.save(campaign);
        }
        return { sent, failed, total: contacts.length, errors };
    }
    async getSends(campaignId) {
        const sendRepo = await this.tds.getRepository(CampaignSend_1.CampaignSend);
        return sendRepo.find({
            where: { campaign_id: campaignId },
            order: { sent_at: "DESC" },
        });
    }
    buildCampaignHtml(opts) {
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
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_datasource_service_1.TenantDataSourceService,
        email_service_1.EmailService])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map