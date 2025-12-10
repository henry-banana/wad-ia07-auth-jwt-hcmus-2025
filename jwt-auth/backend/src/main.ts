import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser - REQUIRED for refresh token extraction
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  // Configure CORS for cross-origin authentication (no proxy)
  app.enableCors({
    origin: configService.get("FRONTEND_URL") || "http://localhost:5173",
    credentials: true, // REQUIRED for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // API prefix
  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3000;
  
  // Listen on 0.0.0.0 for cloud deployment (Render, Railway, etc.)
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Application is running on port ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
}
bootstrap();