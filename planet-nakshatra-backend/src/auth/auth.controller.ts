import { Controller, Post, Body, UseGuards, Request, Patch, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.id;
    return this.authService.changePassword(
      userId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
