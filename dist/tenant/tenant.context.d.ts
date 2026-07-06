export interface TenantInfo {
    id: number;
    slug: string;
    dbName: string;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPass: string;
}
export declare const TenantContext: {
    run<T>(tenant: TenantInfo, fn: () => T): T;
    get(): TenantInfo | undefined;
    getOrFail(): TenantInfo;
};
