import { WebFormService } from "./web-form.service";
import { SubmitFormDto } from "./dto/submit-form.dto";
export declare class WebFormController {
    private readonly service;
    constructor(service: WebFormService);
    submitLead(apiKey: string, dto: SubmitFormDto): Promise<{
        ok: boolean;
        message: string;
    }>;
}
