import { Connection } from 'mongoose';
import { ConnectionDB, DBs, ModelDB } from 'src/common/enum/constants-db.enum';
import { UserSchema } from '../schemas/user.schema';
import { ProjectSchema } from '../schemas/project.schema';
import { TaskSchema } from '../schemas/task.schema';

export const indexProviders = [
  {
    provide: DBs.USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(ModelDB.User, UserSchema),
    inject: [ConnectionDB.DATABASE_CONNECTION],
  },
  {
    provide: DBs.PROJECT_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(ModelDB.Project, ProjectSchema),
    inject: [ConnectionDB.DATABASE_CONNECTION],
  },
  {
    provide: DBs.TASK_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(ModelDB.Task, TaskSchema),
    inject: [ConnectionDB.DATABASE_CONNECTION],
  },
];
