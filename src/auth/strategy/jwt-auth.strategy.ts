import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/common/interfaces/models/user.interface';
import { DBs } from 'src/common/enum/constants-db.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @Inject(DBs.USER_PROVIDER) private readonly user: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { sub: userId } = payload;

    const user = await this.user.findById(userId);

    if (!user) return new NotFoundException();

    return user;
  }
}
