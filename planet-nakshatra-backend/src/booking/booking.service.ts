import { Injectable } from '@nestjs/common';
import { CreateBookingDto, BookingResponseDto, AstrologerDto } from './dto/booking.dto';

// DEMO-ONLY: In-memory storage for demo purposes
// In production, this would use a database
@Injectable()
export class BookingService {
  private bookings: BookingResponseDto[] = [];

  // DEMO-ONLY: Mock astrologer data
  private astrologer: AstrologerDto = {
    id: 'demo-astrologer-1',
    name: 'Astrologer Sameer',
    expertise: ['Vedic Astrology', 'Career Guidance', 'Marriage Compatibility'],
    experience: '15+ years',
    consultationFee: 1999,
    currency: 'INR',
    bio: 'Renowned Vedic astrologer specializing in executive guidance and life-altering decisions. Trusted advisor to business leaders and distinguished families.',
    rating: 4.9,
    totalConsultations: 2500,
  };

  // DEMO-ONLY: Available time slots
  private availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  getAstrologer(): AstrologerDto {
    return this.astrologer;
  }

  getAvailableSlots(date: string): string[] {
    // DEMO-ONLY: Return all slots as available
    // In production, check actual availability
    return this.availableSlots;
  }

  createBooking(bookingData: CreateBookingDto): BookingResponseDto {
    const booking: BookingResponseDto = {
      id: `demo-booking-${Date.now()}`,
      bookingReference: `PN${Date.now().toString().slice(-6)}`,
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      clientPhone: bookingData.clientPhone,
      serviceType: bookingData.serviceType,
      scheduledDate: bookingData.scheduledDate,
      timeSlot: bookingData.timeSlot,
      status: 'CONFIRMED', // DEMO-ONLY: Auto-confirm for demo
      createdAt: new Date().toISOString(),
    };

    this.bookings.push(booking);
    return booking;
  }

  getAllBookings(): BookingResponseDto[] {
    return this.bookings;
  }
}