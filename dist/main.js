"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
function validateEnv() {
    const required = ["JWT_SECRET", "DATABASE_URL"];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) {
        throw new Error(`Variables de entorno requeridas no definidas: ${missing.join(", ")}`);
    }
    if ((process.env.JWT_SECRET ?? "").length < 32) {
        throw new Error("JWT_SECRET debe tener al menos 32 caracteres");
    }
}
async function bootstrap() {
    const logger = new common_1.Logger("Bootstrap");
    validateEnv();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: ["error", "warn", "log"] });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                frameSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
        frameguard: { action: "deny" },
        noSniff: true,
        xssFilter: true,
    }));
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
    const defaultOrigins = [
        "https://crm.mbs.pe",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ];
    app.enableCors({
        origin: [...new Set([...defaultOrigins, ...allowedOrigins])],
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Tenant-Slug"],
        credentials: true,
        maxAge: 86400,
    });
    app.setGlobalPrefix("api", {
        exclude: ["facebook/webhook", "web-form/lead"],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: process.env.NODE_ENV === "production",
    }));
    const port = process.env.PORT ?? 8080;
    await app.listen(port);
    logger.log(`Application running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map