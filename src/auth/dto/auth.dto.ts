import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
  IsString,
} from 'class-validator';
import { UniqueEmail } from 'src/common/validation/unique.validator';

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  @ApiProperty()
  firstName: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @UniqueEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
  })
  @ApiProperty({ minLength: 6 })
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
