import { PermissionsService } from "./permissions.service";
export declare class PermissionsController {
    private readonly permsService;
    constructor(permsService: PermissionsService);
    findAll(q?: string): Promise<import("./permission.entity").Permission[]>;
}
