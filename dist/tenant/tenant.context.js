"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContext = void 0;
const async_hooks_1 = require("async_hooks");
const storage = new async_hooks_1.AsyncLocalStorage();
exports.TenantContext = {
    run(tenant, fn) {
        return storage.run(tenant, fn);
    },
    get() {
        return storage.getStore();
    },
    getOrFail() {
        const tenant = storage.getStore();
        if (!tenant)
            throw new Error("No tenant context set for current request");
        return tenant;
    },
};
//# sourceMappingURL=tenant.context.js.map