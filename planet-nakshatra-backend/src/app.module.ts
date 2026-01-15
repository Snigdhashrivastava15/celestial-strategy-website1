import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { CmsModule } from './cms/cms.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { BookingModule } from './booking/booking.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import configuration from './config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.production', '.env'],
    }),
    // Rate limiting - protect against abuse
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.API_RATE_LIMIT_TTL || '60', 10) * 1000, // Convert to milliseconds
        limit: parseInt(process.env.API_RATE_LIMIT_MAX || '100', 10),
      },
    ]),
    AuthModule,
    ServicesModule,
    CmsModule,
    BookingsModule,
    UsersModule,
    ContactModule,
    BookingModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // Apply rate limiting globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
