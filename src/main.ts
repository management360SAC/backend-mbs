import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

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
  const logger = new Logger("Bootstrap");

  validateEnv();

  const app = await NestFactory.create(AppModule, { logger: ["error", "warn", "log"] });

  // ── Security headers ─────────────────────────────────────────────────────
  app.use(
    helmet({
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
    }),
  );

  // ── CORS ────────────────────────────────────────────────────────────────
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

  const corsOrigins = [...new Set([...defaultOrigins, ...allowedOrigins])];
  app.enableCors({
    origin: (origin, callback) => {
      // Permite web-form/lead desde cualquier origen (endpoint público protegido por API key)
      // y el resto solo desde orígenes conocidos
      if (!origin || corsOrigins.includes(origin)) return callback(null, true);
      callback(null, true); // formularios externos pueden venir de cualquier dominio
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Tenant-Slug", "X-Api-Key"],
    credentials: true,
    maxAge: 86400,
  });

  // ── Global prefix ───────────────────────────────────────────────────────
  app.setGlobalPrefix("api", {
    exclude: ["facebook/webhook", "web-form/lead"],
  });

  // ── Global validation ───────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === "production",
    }),
  );

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
