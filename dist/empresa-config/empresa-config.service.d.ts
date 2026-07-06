import { TenantDataSourceService } from "../tenant/tenant-datasource.service";
import { EmpresaConfig } from "./EmpresaConfig";
import { UpdateEmpresaConfigDto } from "./dto/update-empresa-config.dto";
import { SendEmailDto } from "./dto/send-email.dto";
export declare class EmpresaConfigService {
    private readonly tds;
    constructor(tds: TenantDataSourceService);
    get(): Promise<EmpresaConfig>;
    update(dto: UpdateEmpresaConfigDto): Promise<EmpresaConfig>;
    regenerateWebFormKey(): Promise<{
        web_form_api_key: string;
    }>;
    sendEmail(dto: SendEmailDto): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
