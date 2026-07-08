import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserGrpcClient } from '../grpc-clients/user-grpc.client';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userGrpc: UserGrpcClient,
  ) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(
    @Body()
    body: {
      email: string;
      phone: string;
      first_name: string;
      last_name: string;
      password: string;
    },
  ) {
    const user = await this.userGrpc.service.createUser(body).toPromise();
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() body: { email: string; password: string }) {
    // For Sprint 1: return a generic token
    // Sprint 2 will add a real login endpoint on user-service
    const token = this.jwtService.sign({
      sub: 'placeholder',
      email: body.email,
      role: 'PASSENGER',
    });

    return { token };
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  async getUser(@Param('id') id: string) {
    return this.userGrpc.service.getUser({ id }).toPromise();
  }
}