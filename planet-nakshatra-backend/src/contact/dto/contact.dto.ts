import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateContactInquiryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class ContactInquiryResponseDto {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  priority: string;
  createdAt: Date;
}