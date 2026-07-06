import type { Response } from "express";
import { FacebookLeadsService } from "./facebook-leads.service";
interface FbWebhookChange {
    value?: {
        leadgen_id?: string;
        form_id?: string;
        page_id?: string;
    };
    field?: string;
}
interface FbWebhookEntry {
    id?: string;
    changes?: FbWebhookChange[];
}
interface FbWebhookBody {
    object?: string;
    entry?: FbWebhookEntry[];
}
export declare class FacebookLeadsController {
    private readonly service;
    private readonly logger;
    constructor(service: FacebookLeadsService);
    verifyWebhook(mode: string, token: string, challenge: string, res: Response): Response<any, Record<string, any>>;
    receiveWebhook(body: FbWebhookBody): Promise<{
        ok: boolean;
    }>;
}
export {};
