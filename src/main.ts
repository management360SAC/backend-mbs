import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api", {
    exclude: ["facebook/webhook", "web-form/lead"],
  });
  app.enableCors({
    origin: ["https://crm.mbs.pe", "https://crmbackend.mbs.pe", "https://mbs.pe", "https://www.mbs.pe", "http://localhost:5174", "http://localhost:5175", "http://localhost:5173"],
    credentials: true,
  });
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }),
);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
