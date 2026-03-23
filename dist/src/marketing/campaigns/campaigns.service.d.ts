import { Repository } from "typeorm";
import { Campaign } from "./Campaign";
import { CampaignFunnel } from "./CampaignFunnel";
import { CampaignSend } from "./CampaignSend";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { UpdateCampaignDto } from "./dto/update-campaign.dto";
import { SendCampaignDto } from "./dto/send-campaign.dto";
import { EmailService } from "../../cotizaciones/email.service";
export declare class CampaignsService {
    private readonly repo;
    private readonly funnelRepo;
    private readonly sendRepo;
    private readonly emailService;
    constructor(repo: Repository<Campaign>, funnelRepo: Repository<CampaignFunnel>, sendRepo: Repository<CampaignSend>, emailService: EmailService);
    create(dto: CreateCampaignDto): Promise<Campaign>;
    findAll(filters?: {
        type?: string;
        status?: string;
        q?: string;
    }): Promise<Campaign[]>;
    findOne(id: number): Promise<Campaign>;
    update(id: number, dto: UpdateCampaignDto): Promise<Campaign>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    getFunnelStages(campaignId: number): Promise<import("../funnel-stages/FunnelStage").FunnelStage[]>;
    setFunnelStages(campaignId: number, stageIds: number[]): Promise<import("../funnel-stages/FunnelStage").FunnelStage[]>;
    getStats(campaignId: number): Promise<{
        campaign_id: number;
        deals: {
            total: any;
            won: number;
            lost: number;
            open: number;
            revenue: number;
        };
        sends: {
            sent: number;
            failed: number;
        };
        funnel_stages: {
            id: number;
            name: string;
            position: number;
        }[];
    }>;
    sendCampaign(id: number, dto: SendCampaignDto): Promise<{
        sent: number;
        failed: number;
        total: number;
        errors: string[];
    }>;
    getSends(campaignId: number): Promise<CampaignSend[]>;
    private buildCampaignHtml;
}
