import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // DEMO-ONLY: Get astrologer profile
  @Get('astrologer')
  getAstrologer() {
    return this.bookingService.getAstrologer();
  }

  // DEMO-ONLY: Get available time slots for a date
  @Get('slots')
  getAvailableSlots(@Query('date') date: string) {
    return this.bookingService.getAvailableSlots(date);
  }

  // DEMO-ONLY: Create a booking
  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  // DEMO-ONLY: Get all bookings (for demo purposes)
  @Get()
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }
}