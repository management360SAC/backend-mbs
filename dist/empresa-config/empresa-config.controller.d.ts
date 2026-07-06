import { EmpresaConfigService } from "./empresa-config.service";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
import { SendEmailDto } from "./dto/send-email.dto";
export declare class EmpresaConfigController {
    private readonly service;
    constructor(service: EmpresaConfigService);
    get(): Promise<import("./EmpresaConfig").EmpresaConfig>;
    update(dto: UpdateEmpresaConfigDto): Promise<import("./EmpresaConfig").EmpresaConfig>;
    regenerateWebFormKey(): Promise<{
        web_form_api_key: string;
    }>;
    sendEmail(dto: SendEmailDto): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
