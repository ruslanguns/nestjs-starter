import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LoginDto } from './modules/auth/dtos/login.dto';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('auth/profile')
    async profile(@Request() req) {
        return { output: req.user };
    }
}
