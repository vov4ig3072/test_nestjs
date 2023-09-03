import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { User as IUser } from '../common/interfaces/models/user.interface';
import { ResponseInterceptor } from '../common/interceptors/responce.interceptor';

@ApiTags('project')
@Controller('project')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(new ResponseInterceptor('Project created'))
  @Post()
  create(@User() user: IUser, @Body() create: CreateProjectDto) {
    return this.projectService.create(user._id, create);
  }

  @UseInterceptors(new ResponseInterceptor('Project update'))
  @Patch('/:id')
  addTask(@Param('id') projectId: string, @Query('taskId') taskId: string) {
    return this.projectService.addTask(projectId, taskId);
  }
}
