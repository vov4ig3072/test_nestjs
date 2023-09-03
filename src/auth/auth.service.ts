import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DBs } from 'src/common/enum/constants-db.enum';
import { User } from 'src/common/interfaces/models/user.interface';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DBs.USER_PROVIDER) private readonly user: Model<User>,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(signUp: SignUpDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      signUp.password,
    );
    const user = await this.user.create({
      ...signUp,
      password: hashedPassword,
    });

    return {
      accessToken: await this.tokenService.generateAccessToken(
        user._id,
        user.email,
      ),
    };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.user.findOne({ email });
    if (!user) throw new ForbiddenException('Email or password not valid');

    const isValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!isValid) throw new ForbiddenException('Email or password not valid');

    return {
      accessToken: await this.tokenService.generateAccessToken(
        user._id,
        user.email,
      ),
    };
  }
}
