import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { tasksProviders } from './tasks.providers';
import { TasksController } from './task.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [TasksController],
    providers: [TasksService, ...tasksProviders],
    exports: [TasksService, ...tasksProviders],
})
export class TasksModule {}
