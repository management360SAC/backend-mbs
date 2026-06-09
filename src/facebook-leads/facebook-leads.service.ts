import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lead } from "../marketing/leads/Lead";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";

interface FbFieldData {
  name: string;
  values: string[];
}

interface FbLeadgenResponse {
  field_data: FbFieldData[];
  id: string;
  created_time?: string;
}

@Injectable()
export class FacebookLeadsService {
  private readonly logger = new Logger(FacebookLeadsService.name);

  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepo: Repository<Lead>,

    @InjectRepository(LeadSource)
    private readonly sourcesRepo: Repository<LeadSource>,

    @InjectRepository(LeadStage)
    private readonly stagesRepo: Repository<LeadStage>,

    @InjectRepository(EmpresaConfig)
    private readonly configRepo: Repository<EmpresaConfig>,
  ) {}

  async getConfig(): Promise<EmpresaConfig | null> {
    return this.configRepo.findOne({ where: { id: 1 } });
  }

  async processLeadgenId(leadgenId: string): Promise<void> {
    const config = await this.getConfig();
    const accessToken = config?.fb_page_access_token;

    if (!accessToken) {
      this.logger.warn(`Lead ${leadgenId} recibido pero no hay Page Access Token configurado`);
      return;
    }

    const url = `https://graph.facebook.com/v20.0/${leadgenId}?fields=field_data,created_time&access_token=${accessToken}`;
    let fbData: FbLeadgenResponse;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text();
        this.logger.error(`Error consultando Facebook Graph API: ${res.status} ${body}`);
        return;
      }
      fbData = await res.json() as FbLeadgenResponse;
    } catch (err) {
      this.logger.error(`Fallo al llamar Facebook Graph API: ${err}`);
      return;
    }

    const fields = fbData.field_data ?? [];
    const get = (names: string[]) => {
      for (const n of names) {
        const f = fields.find((f) => f.name === n);
        if (f?.values?.[0]) return f.values[0];
      }
      return undefined;
    };

    const fullName = get(["full_name", "first_name"]) ?? "Sin nombre";
    const email    = get(["email"]);
    const phone    = get(["phone_number", "phone"]);

    const source = await this.getOrCreateFacebookSource();
    const stage  = await this.getFirstStage();

    if (!stage) {
      this.logger.error("No hay stages configurados — no se puede crear el lead");
      return;
    }

    const lead = this.leadsRepo.create({
      fullName,
      email: email ?? null,
      phone: phone ?? null,
      notes: `Lead importado automáticamente desde Facebook Lead Ads (ID: ${leadgenId})`,
      sourceId: source.id,
      currentStage: stage,
    } as any);

    await this.leadsRepo.save(lead);
    this.logger.log(`Lead creado: ${fullName} (leadgen_id: ${leadgenId})`);
  }

  private async getOrCreateFacebookSource(): Promise<LeadSource> {
    let source = await this.sourcesRepo.findOne({ where: { name: "Facebook Ads" } });
    if (!source) {
      source = this.sourcesRepo.create({ name: "Facebook Ads", channel: "facebook" });
      await this.sourcesRepo.save(source);
    }
    return source;
  }

  private async getFirstStage(): Promise<LeadStage | null> {
    return this.stagesRepo.findOne({
      where: { isActive: true, isFinal: false },
      order: { order: "ASC" },
    });
  }
}
