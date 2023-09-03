import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { TaskStatusEnum } from 'src/common/enum/task.enum';
import { Task } from 'src/common/interfaces/models/task.interface';
import { ModelDB } from '../../common/enum/constants-db.enum';

export const TaskSchema = new mongoose.Schema<Task>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      enum: TaskStatusEnum,
      required: true,
      type: String,
      default: TaskStatusEnum.NEW,
    },
    projectId: { type: Schema.Types.ObjectId, ref: ModelDB.Project },
    createdAt: { type: Schema.Types.Date, default: new Date() },
  },
  { timestamps: true },
);
