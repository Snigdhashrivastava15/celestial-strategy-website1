import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
// PrismaService is now provided globally from AppModule

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
