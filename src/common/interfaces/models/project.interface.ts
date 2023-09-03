import { Document } from 'mongoose';
import { Task } from './task.interface';
import { User } from './user.interface';

export interface Project extends Document {
  name: string;
  description: string;
  taskIds: Array<Task>;
  owner: User;
}
