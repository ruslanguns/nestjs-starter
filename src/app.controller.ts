import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadGatewayResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LoginDto } from './modules/auth/dtos';
import { User } from './modules/users/entities';
import { DataOutput } from './common/interfaces';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login user authentication
   * @param dto User Form
   * @example /auth/login
   */
  @ApiOperation({ summary: 'Login user authentication', description: 'In this way you will get the Token for Bearer authentication' })
  @ApiCreatedResponse({ status: 201, description: 'Login success, you will receive the "accessToken" there' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid credentials' })
  @ApiForbiddenResponse({ status: 403, description: 'Account is disabled, contact with administrator' })
  @ApiNotFoundResponse({ status: 404, description: 'Your account does not exist' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Login user authentication' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return await this.authService.login(req.user);
  }

  /**
   * Create User - User Registration
   * @param dto User Form
   */
  @ApiOperation({
    summary: 'Get my profile',
    description: 'You will get prompt with your user data, keep in mind that you need to provide the Bearer Token for Authentication',
  })
  @ApiOkResponse({ status: 200, description: 'Success response', type: User })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Login user authentication' })
  @ApiBadRequestResponse({ status: 400, description: 'You will prompt with the validation issues' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  async profile(@Request() req) {
    console.log(req.user);

    return { output: req.user };
  }
}
