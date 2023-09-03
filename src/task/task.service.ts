import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DBs } from '../common/enum/constants-db.enum';
import { Model } from 'mongoose';
import { Task } from '../common/interfaces/models/task.interface';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ProjectService } from '../project/project.service';
import { Project } from '../common/interfaces/models/project.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject(DBs.TASK_PROVIDER) private readonly task: Model<Task>,
    @Inject(DBs.PROJECT_PROVIDER) private readonly project: Model<Project>,
    private readonly projectService: ProjectService,
  ) {}

  getOne(taskId: string) {
    return this.task.findById(taskId);
  }

  getAll(projectId: string) {
    return this.task.find({ projectId });
  }

  async create(create: CreateTaskDto) {
    const task = await this.task.create(create);

    await this.projectService.addTask(create.projectId, task.id);

    return task;
  }

  update(taskId: string, update: UpdateTaskDto) {
    return this.task.findByIdAndUpdate(taskId, { $set: update });
  }

  async delete(taskId: string) {
    const session = await this.task.startSession();
    session.startTransaction();

    try {
      const { projectId, name: taskName } = await this.task.findByIdAndDelete(
        taskId,
        {
          session,
        },
      );

      const { name } = await this.project.findByIdAndUpdate(
        projectId,
        {
          $pull: { taskIds: taskId },
        },
        { session },
      );

      return `Deleted "${taskName}" from project ${name}`;
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    } finally {
      await session.endSession();
    }
  }

  async getFiltered({ status, projectId, start, end }: FilterTaskDto) {
    // такий костиль по причині, якщо один з параметрів фільтрації undefined
    // то модель шукає з полем undefined, хоча має ігнорувати. Часу на вирішення проблеми не мав
    const query: Record<string, any> = {};

    status && (query.status = status);
    projectId && (query.projectId = projectId);

    if (start || end) {
      const createAt: Record<string, any> = {};

      start && (createAt.$gte = start);
      end && (createAt.$lte = end);

      query.createdAt = createAt;
    }

    return this.task.find<Task>({ ...query });
  }
}
