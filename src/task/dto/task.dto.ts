import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatusEnum } from '../../common/enum/task.enum';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectId: string;
}

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatusEnum, required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskStatusEnum)
  status?: string;
}

export class FilterTaskDto {
  @ApiProperty({ enum: TaskStatusEnum, required: false })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  start?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  end?: Date;
}
