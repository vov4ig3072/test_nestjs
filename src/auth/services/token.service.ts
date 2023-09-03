import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/common/interfaces/config.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(userId: number, email: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<SecurityConfig>('security').expiresIn,
      },
    );
  }
}
