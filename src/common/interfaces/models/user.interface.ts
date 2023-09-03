import { Document } from 'mongoose';
import { Project } from './project.interface';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projectIds: Array<Project>;
}
