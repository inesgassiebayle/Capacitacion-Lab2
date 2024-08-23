import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import {TasksModule} from "../tasks/tasks.module";

@Module({
    imports: [TasksModule],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders],
    exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
