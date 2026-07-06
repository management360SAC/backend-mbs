export declare class CreateRoleDto {
    code: string;
    name: string;
    description?: string;
    isSystem?: boolean;
    permission_ids?: number[];
    permission_keys?: string[];
}
