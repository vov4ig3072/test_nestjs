import {
  Body,
  Controller,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { User as IUser } from '../common/interfaces/models/user.interface';
import { UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/responce.interceptor';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ResponseInterceptor('User update'))
  @Patch()
  update(@User() user: IUser, @Body() update: UpdateUserDto) {
    return this.userService.update(user._id, update);
  }
}
