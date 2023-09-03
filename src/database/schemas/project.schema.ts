import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ModelDB } from 'src/common/enum/constants-db.enum';
import { Project } from 'src/common/interfaces/models/project.interface';

export const ProjectSchema = new mongoose.Schema<Project>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taskIds: [{ type: Schema.Types.ObjectId, ref: ModelDB.Task }],
    owner: { type: Schema.Types.ObjectId, ref: ModelDB.User },
  },
  { timestamps: true },
);
