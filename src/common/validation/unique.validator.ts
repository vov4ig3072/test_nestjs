import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/models/user.interface';
import { DBs } from '../enum/constants-db.enum';

@ValidatorConstraint({ name: 'uniqueEmailValidator' })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(@Inject(DBs.USER_PROVIDER) private readonly user: Model<User>) {}

  async validate(email: string) {
    const existingUser = await this.user.findOne({ email });
    return !existingUser;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email "${args.value}" is already taken`;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmailValidator,
    });
  };
}
