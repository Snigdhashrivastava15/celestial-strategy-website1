import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    dotenv.config();
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: any) {
    // Shutdown hook for graceful app termination
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}