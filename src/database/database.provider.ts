import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { indexProviders } from './providers/index.provider';
import { ConnectionDB } from 'src/common/enum/constants-db.enum';

export const databaseProviders = [
  {
    provide: ConnectionDB.DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get<string>('DATABASE_URL')),
  },
  ...indexProviders,
];
