import { Controller, Get, Request, Post, UseGuards, Put, Delete, Patch } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return req.user;
    }

    @Post('user')
    register() { }

    @Put('user/:id')
    update() { }

    @Delete('user/:id')
    delete() { }

    @Patch('user/:id/:bool')
    toggleUserStatus() { }

}
