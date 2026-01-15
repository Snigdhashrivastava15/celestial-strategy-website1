import { Controller, Get } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  // DEMO-ONLY: Get all testimonials (mock data)
  @Get()
  getAllTestimonials() {
    return this.testimonialsService.getAllTestimonials();
  }
}
