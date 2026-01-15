import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  clientName: string;

  @IsEmail()
  clientEmail: string;

  @IsString()
  @IsOptional()
  clientPhone?: string;

  @IsString()
  serviceType: string;

  @IsString()
  scheduledDate: string; // Date in YYYY-MM-DD format (e.g., "2024-01-15")

  @IsString()
  timeSlot: string; // e.g., "10:00 AM – 11:00 AM"
}

export class BookingResponseDto {
  id: string;
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceType: string;
  scheduledDate: string;
  timeSlot: string;
  status: string;
  createdAt: string;
}

export class AstrologerDto {
  id: string;
  name: string;
  expertise: string[];
  experience: string;
  consultationFee: number;
  currency: string;
  bio: string;
  rating: number;
  totalConsultations: number;
}