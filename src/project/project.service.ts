import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DBs } from 'src/common/enum/constants-db.enum';
import { Project } from 'src/common/interfaces/models/project.interface';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(DBs.PROJECT_PROVIDER) private readonly project: Model<Project>,
  ) {}

  create(userId: string, create: CreateProjectDto) {
    return this.project.create({ ...create, owner: userId });
  }

  addTask(projectId: string, taskId: string) {
    return this.project.findByIdAndUpdate(projectId, {
      $push: { taskIds: taskId },
    });
  }
}
