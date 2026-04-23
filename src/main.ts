import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: ["http://91.99.16.147:8181/", "https://crm.mbs.pe", "https://crm.mbs.pe:80", "https://crm.mbs.pe:8181"],
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
