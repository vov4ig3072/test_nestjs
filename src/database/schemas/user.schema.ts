import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ModelDB } from 'src/common/enum/constants-db.enum';
import { User } from 'src/common/interfaces/models/user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    projectIds: [{ type: Schema.Types.ObjectId, ref: ModelDB.Project }],
  },
  { timestamps: true },
);
