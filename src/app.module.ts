import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import configuration from './common/configs/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    ProjectModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
