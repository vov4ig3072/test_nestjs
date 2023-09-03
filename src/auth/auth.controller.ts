import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { ResponseInterceptor } from 'src/common/interceptors/responce.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      default: {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: 'Admin1!',
      },
    },
  })
  @UseInterceptors(new ResponseInterceptor('User created'))
  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @ApiBody({
    schema: {
      default: {
        email: 'admin@gmail.com',
        password: 'Admin1!',
      },
    },
  })
  @UseInterceptors(new ResponseInterceptor('User login successfully'))
  @Post('/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
