import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactInquiryDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('inquiry')
  async createInquiry(
    @Body() createDto: CreateContactInquiryDto,
    @Req() request: any,
  ) {
    const ipAddress = request.ip || request.connection?.remoteAddress;
    const userAgent = request.get('User-Agent');

    return this.contactService.createInquiry(createDto, ipAddress, userAgent);
  }

  @Get('inquiries')
  async getAllInquiries() {
    return this.contactService.getAllInquiries();
  }
}
