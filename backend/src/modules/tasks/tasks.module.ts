import {forwardRef, Module} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { tasksProviders } from './tasks.providers';
import { TasksController } from './task.controller';
import { UsersModule } from '../users/users.module';
import {TASK_REPOSITORY} from "../../core/constants";

@Module({
    imports: [forwardRef(() => UsersModule)],
    controllers: [TasksController],
    providers: [TasksService, ...tasksProviders],
    exports: [TasksService, ...tasksProviders, TASK_REPOSITORY],
})
export class TasksModule {}
