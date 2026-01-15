import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  IsUrl,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  keywords?: Prisma.JsonValue;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsOptional()
  features?: Prisma.JsonValue;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsOptional()
  iconUrl?: string;

  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

export class UpdateServiceDto extends CreateServiceDto {
  @IsString()
  @IsOptional()
  id?: string;
}

export class ServiceFilterDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsString()
  @IsOptional()
  search?: string;
}
