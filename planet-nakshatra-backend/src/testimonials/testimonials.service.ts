import { Injectable } from '@nestjs/common';

// DEMO-ONLY: Mock testimonial data
export interface TestimonialDto {
  id: string;
  quote: string;
  author: string;
  company: string;
}

@Injectable()
export class TestimonialsService {
  // DEMO-ONLY: In-memory mock testimonials
  private testimonials: TestimonialDto[] = [
    {
      id: 'demo-testimonial-1',
      quote: 'The strategic counsel provided has been instrumental in navigating complex business transitions. An invaluable advisor.',
      author: 'Chairman',
      company: 'Fortune 500 Conglomerate',
    },
    {
      id: 'demo-testimonial-2',
      quote: 'For matters of consequence—from investments to alliances—the guidance has proven remarkably prescient.',
      author: 'Managing Director',
      company: 'Private Equity Firm',
    },
    {
      id: 'demo-testimonial-3',
      quote: 'Our family has relied on this wisdom for succession planning. The discretion and insight are unparalleled.',
      author: 'Patriarch',
      company: 'Industrial Dynasty',
    },
  ];

  getAllTestimonials(): TestimonialDto[] {
    return this.testimonials;
  }
}
