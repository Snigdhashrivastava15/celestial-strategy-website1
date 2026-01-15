import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateContactInquiryDto, ContactInquiryResponseDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private prisma: PrismaService) {}

  async createInquiry(createDto: CreateContactInquiryDto, ipAddress?: string, userAgent?: string): Promise<ContactInquiryResponseDto> {
    const inquiry = await this.prisma.contactInquiry.create({
      data: {
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
        message: createDto.message,
        ipAddress,
        userAgent,
        source: 'WEBSITE',
      },
    });

    // Log for monitoring (production-safe)
    this.logger.log(`Contact inquiry created: ${inquiry.reference} - ${inquiry.email}`);

    return {
      id: inquiry.id,
      reference: inquiry.reference,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
      status: inquiry.status,
      priority: inquiry.priority,
      createdAt: inquiry.createdAt,
    };
  }

  async getAllInquiries(): Promise<ContactInquiryResponseDto[]> {
    const inquiries = await this.prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return inquiries.map(inquiry => ({
      id: inquiry.id,
      reference: inquiry.reference,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
      status: inquiry.status,
      priority: inquiry.priority,
      createdAt: inquiry.createdAt,
    }));
  }
}
