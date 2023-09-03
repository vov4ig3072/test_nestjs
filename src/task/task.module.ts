import {Module} from '@nestjs/common';
import {TaskController} from './task.controller';
import {TaskService} from './task.service';
import {DatabaseModule} from "../database/database.module";
import {ProjectService} from "../project/project.service";

@Module({
	imports: [DatabaseModule],
	controllers: [TaskController],
	providers: [TaskService, ProjectService]
})
export class TaskModule {
}
