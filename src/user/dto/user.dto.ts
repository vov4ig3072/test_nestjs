import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  projectId?: string;
}
