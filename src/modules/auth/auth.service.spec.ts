import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '..';
import { CONFIG_SERVER_JWT } from '../../config/config.constants';

xdescribe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                UsersModule,
                PassportModule,
                JwtModule.registerAsync({
                    useFactory: async (config: ConfigService) => (config.get(CONFIG_SERVER_JWT)),
                    inject: [ConfigService]
                })
            ],
            providers: [AuthService, LocalStrategy, JwtStrategy],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
