import { Inject, Injectable } from '@nestjs/common';
import { DBs } from '../common/enum/constants-db.enum';
import { User } from '../common/interfaces/models/user.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(DBs.USER_PROVIDER) private readonly user: Model<User>) {}

  update(userId: string, { projectId }: UpdateUserDto) {
    return this.user.findByIdAndUpdate(userId, {
      $addToSet: { projectIds: projectId },
    });
  }
}
