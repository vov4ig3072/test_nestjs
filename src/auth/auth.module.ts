import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UniqueEmailValidator } from 'src/common/validation/unique.validator';
import { JwtStrategy } from './strategy/jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/common/interfaces/config.interface';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const securityConfig = config.get<SecurityConfig>('security');
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            algorithm: securityConfig.algorithm,
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UniqueEmailValidator,
    JwtStrategy,
    PasswordService,
    TokenService,
  ],
})
export class AuthModule {}
