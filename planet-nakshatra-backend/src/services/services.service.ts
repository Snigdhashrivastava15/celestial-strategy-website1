import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateServiceDto, UpdateServiceDto, ServiceFilterDto } from './dto/service.dto';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { title, slug, ...data } = createServiceDto;

    // Generate slug if not provided
    const finalSlug = slug || this.generateSlug(title);

    // Check if slug already exists
    const existingService = await this.prisma.service.findUnique({
      where: { slug: finalSlug },
    });

    if (existingService) {
      throw new ConflictException('Service with this slug already exists');
    }

    return this.prisma.service.create({
      data: {
        title,
        slug: finalSlug,
        description: createServiceDto.description,
        category: createServiceDto.category,
        status: createServiceDto.status || "ACTIVE",
        shortDescription: createServiceDto.shortDescription,
        keywords: createServiceDto.keywords as any,
        metaTitle: createServiceDto.metaTitle,
        metaDescription: createServiceDto.metaDescription,
        features: createServiceDto.features as any,
        duration: createServiceDto.duration,
        price: createServiceDto.price,
        currency: createServiceDto.currency,
        imageUrl: createServiceDto.imageUrl,
        iconUrl: createServiceDto.iconUrl,
        displayOrder: createServiceDto.displayOrder,
        featured: createServiceDto.featured,
      },
    });
  }

  async findAll(filters?: ServiceFilterDto): Promise<Service[]> {
    const where: any = {
      status: "ACTIVE", // Only return active services by default
    };

    if (filters) {
      if (filters.category) {
        where.category = filters.category;
      }
      if (filters.status) {
        where.status = filters.status;
      }
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { shortDescription: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    return this.prisma.service.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async findBySlug(slug: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const { slug, ...data } = updateServiceDto;

    // Check if service exists
    await this.findOne(id);

    // Check slug uniqueness if being updated
    if (slug) {
      const existingService = await this.prisma.service.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (existingService) {
        throw new ConflictException('Service with this slug already exists');
      }
    }

    return this.prisma.service.update({
      where: { id },
      data: {
        title: updateServiceDto.title,
        description: updateServiceDto.description,
        category: updateServiceDto.category,
        status: updateServiceDto.status,
        shortDescription: updateServiceDto.shortDescription,
        keywords: updateServiceDto.keywords as any,
        metaTitle: updateServiceDto.metaTitle,
        metaDescription: updateServiceDto.metaDescription,
        features: updateServiceDto.features as any,
        duration: updateServiceDto.duration,
        price: updateServiceDto.price,
        currency: updateServiceDto.currency,
        imageUrl: updateServiceDto.imageUrl,
        iconUrl: updateServiceDto.iconUrl,
        displayOrder: updateServiceDto.displayOrder,
        featured: updateServiceDto.featured,
        ...(slug && { slug }),
      },
    });
  }

  async remove(id: string): Promise<void> {
    // Check if service exists
    await this.findOne(id);

    // Soft delete by setting status to inactive
    await this.prisma.service.update({
      where: { id },
      data: { status: "INACTIVE" },
    });
  }

  async getCategories(): Promise<string[]> {
    return [
      "EXECUTIVE",
      "PERSONAL", 
      "LEGACY",
      "WEALTH",
      "CORPORATE",
      "RELATIONSHIPS",
      "VASTU",
      "REMEDIES",
      "CRISIS",
      "RETAINER"
    ];
  }

  async getFeaturedServices(): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: {
        status: "ACTIVE",
        featured: true,
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  // DEMO-ONLY: Return mock services for demo purposes
  getDemoServices(): any[] {
    return [
      {
        id: 'demo-service-1',
        title: 'The Celestial Strategy™',
        category: 'Executive',
        description: 'Long-term strategic guidance for CXOs, industrialists, and public figures.',
        shortDescription: 'Long-term strategic guidance for CXOs, industrialists, and public figures.',
      },
      {
        id: 'demo-service-2',
        title: 'The Destiny Architecture™',
        category: 'Personal',
        description: 'Structuring personal and professional life with planetary cycles.',
        shortDescription: 'Structuring personal and professional life with planetary cycles.',
      },
      {
        id: 'demo-service-3',
        title: 'The Maharaja Protocol™',
        category: 'Legacy',
        description: 'Generational legacy and succession planning for distinguished families.',
        shortDescription: 'Generational legacy and succession planning for distinguished families.',
      },
      {
        id: 'demo-service-4',
        title: 'Cosmic Capital Advisory™',
        category: 'Wealth',
        description: 'Precision timing for wealth accumulation and business decisions.',
        shortDescription: 'Precision timing for wealth accumulation and business decisions.',
      },
      {
        id: 'demo-service-5',
        title: 'The Boardroom Muhurta™',
        category: 'Corporate',
        description: 'Timing validation for critical corporate decisions and launches.',
        shortDescription: 'Timing validation for critical corporate decisions and launches.',
      },
      {
        id: 'demo-service-6',
        title: 'The Legacy Continuum™',
        category: 'Legacy',
        description: 'Securing next-generation stability and sustained growth.',
        shortDescription: 'Securing next-generation stability and sustained growth.',
      },
      {
        id: 'demo-service-7',
        title: 'Union Intelligence™',
        category: 'Relationships',
        description: 'Compatibility advisory for elite marriages and business partnerships.',
        shortDescription: 'Compatibility advisory for elite marriages and business partnerships.',
      },
      {
        id: 'demo-service-8',
        title: 'The Spatial Sovereignty™',
        category: 'Vastu',
        description: 'Vastu guidance for power, control, and positive influence.',
        shortDescription: 'Vastu guidance for power, control, and positive influence.',
      },
      {
        id: 'demo-service-9',
        title: 'The Energetic Optimization™',
        category: 'Remedies',
        description: 'Precision remedies designed for high performers.',
        shortDescription: 'Precision remedies designed for high performers.',
      },
      {
        id: 'demo-service-10',
        title: 'The Black Swan Protocol™',
        category: 'Crisis',
        description: 'Crisis timing and emergency advisory for unforeseen challenges.',
        shortDescription: 'Crisis timing and emergency advisory for unforeseen challenges.',
      },
      {
        id: 'demo-service-11',
        title: 'The Inner Circle Retainer™',
        category: 'Retainer',
        description: 'Ongoing subscription-based strategic astrological consultation.',
        shortDescription: 'Ongoing subscription-based strategic astrological consultation.',
      },
    ];
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Admin methods for managing all services
  async findAllAdmin(filters?: ServiceFilterDto): Promise<Service[]> {
    const where: any = {};

    if (filters) {
      if (filters.category) {
        where.category = filters.category;
      }
      if (filters.status) {
        where.status = filters.status;
      }
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    return this.prisma.service.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }
}
