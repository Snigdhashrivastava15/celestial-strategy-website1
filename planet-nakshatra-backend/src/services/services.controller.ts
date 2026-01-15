import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto, ServiceFilterDto } from './dto/service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public endpoints
  @Get()
  findAll(@Query() filters: ServiceFilterDto) {
    return this.servicesService.findAll(filters);
  }

  // DEMO-ONLY: Get mock services for demo purposes
  @Get('demo')
  getDemoServices() {
    return this.servicesService.getDemoServices();
  }

  @Get('categories')
  getCategories() {
    return this.servicesService.getCategories();
  }

  @Get('featured')
  getFeaturedServices() {
    return this.servicesService.getFeaturedServices();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAllAdmin(@Query() filters: ServiceFilterDto) {
    return this.servicesService.findAllAdmin(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
