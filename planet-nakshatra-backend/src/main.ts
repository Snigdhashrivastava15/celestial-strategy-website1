import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log'] 
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:8080';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  // Security: Helmet for HTTP headers
  app.use(helmet({
    contentSecurityPolicy: nodeEnv === 'production',
    crossOriginEmbedderPolicy: false, // Allow embedding if needed
  }));

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: nodeEnv === 'production', // Hide validation errors in production
    }),
  );

  // Enable CORS for frontend access
  const allowedOrigins = nodeEnv === 'production' 
    ? [frontendUrl]
    : ['http://localhost:8080', 'http://localhost:5173', frontendUrl];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count'],
  });

  // Trust proxy (important for Railway/AWS behind load balancer)
  // Note: NestJS Express adapter doesn't support app.set directly
  // Trust proxy is handled automatically when behind a reverse proxy

  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for Docker/cloud
  logger.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
  logger.log(`📊 Health check: http://0.0.0.0:${port}/api/health`);
  logger.log(`🌍 Environment: ${nodeEnv}`);
  logger.log(`🔗 Frontend URL: ${frontendUrl}`);
}
bootstrap();
