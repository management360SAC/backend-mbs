import { AsyncLocalStorage } from "async_hooks";

export interface TenantInfo {
  id: number;
  slug: string;
  dbName: string;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPass: string;
}

const storage = new AsyncLocalStorage<TenantInfo>();

export const TenantContext = {
  run<T>(tenant: TenantInfo, fn: () => T): T {
    return storage.run(tenant, fn);
  },
  get(): TenantInfo | undefined {
    return storage.getStore();
  },
  getOrFail(): TenantInfo {
    const tenant = storage.getStore();
    if (!tenant) throw new Error("No tenant context set for current request");
    return tenant;
  },
};
