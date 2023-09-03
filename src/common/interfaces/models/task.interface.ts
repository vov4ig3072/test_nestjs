import { Document } from 'mongoose';
import { TaskStatusEnum } from 'src/common/enum/task.enum';
import { Project } from './project.interface';

export interface Task extends Document {
  name: string;
  description: string;
  status: TaskStatusEnum;
  projectId: Project;
  createdAt: Date;
}
