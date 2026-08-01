import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const allowed = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Same-origin / server-to-server / mobile webviews sometimes send no Origin
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      // Railway preview URLs (store + admin) while custom domain is pending
      if (/^https:\/\/[\w-]+\.up\.railway\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`API listening on http://0.0.0.0:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
