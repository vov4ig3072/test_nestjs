import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ResponseInterceptor } from '../common/interceptors/responce.interceptor';
import { TaskStatusEnum } from '../common/enum/task.enum';
import { ParseDatePipe } from '../common/pipes/date.pipe';

@ApiTags('task')
@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiQuery({ required: false, name: 'status', enum: TaskStatusEnum })
  @ApiQuery({ required: false, name: 'projectId' })
  @ApiQuery({
    required: false,
    name: 'start',
    description: 'mm/dd/yy',
    example: '09.03.23',
  })
  @ApiQuery({
    required: false,
    name: 'end',
    description: 'mm/dd/yy',
    example: '09.03.23',
  })
  @UseInterceptors(new ResponseInterceptor('Tasks filtered'))
  @Get('/filter')
  getFiltered(
    @Query('status') status?: TaskStatusEnum,
    @Query('projectId') projectId?: string,
    @Query('start', ParseDatePipe) start?: Date,
    @Query('end', ParseDatePipe) end?: Date,
  ) {
    return this.taskService.getFiltered({ projectId, status, start, end });
  }

  @UseInterceptors(new ResponseInterceptor('Get one task'))
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.taskService.getOne(id);
  }

  @UseInterceptors(new ResponseInterceptor('Get all project tasks'))
  @Get()
  getAll(@Query('projectId') projectId: string) {
    return this.taskService.getAll(projectId);
  }

  @UseInterceptors(new ResponseInterceptor('Task created'))
  @Post()
  create(@Body() create: CreateTaskDto) {
    return this.taskService.create(create);
  }

  @UseInterceptors(new ResponseInterceptor('Task update'))
  @Patch('/:id')
  update(@Param('id') id: string, @Body() update: UpdateTaskDto) {
    return this.taskService.update(id, update);
  }

  @UseInterceptors(new ResponseInterceptor('Task delete'))
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
