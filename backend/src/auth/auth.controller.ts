import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId, GetCurrentUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signup(dto, dto.rememberMe || false);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signin(dto, dto.rememberMe || false);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@GetCurrentUserId() userId: number) {
    return this.authService.getUser(userId);
  }
}
