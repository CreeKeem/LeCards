import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@Req() req: Request) {
  //   const user = req.
  //   this.authService.logout();
  // }

  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokens() {
  //   this.authService.refreshTokens();
  // }
}
