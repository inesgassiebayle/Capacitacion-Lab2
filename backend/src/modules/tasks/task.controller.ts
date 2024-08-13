import {Controller, Body, Post, UseGuards, Request, Get, Param, Delete, Put} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post('create')
    async create(@Body() task: TaskDto) {
        return await this.tasksService.create(task);
    }

    @Get(':username')
    async getByUserId(@Param('username') username: string) {
        return await this.tasksService.findByUsername(username);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
        await this.tasksService.deleteTask(id);
        return { message: 'Task deleted successfully' };
    }

    @Put(':id')
    async modifyTask(@Param('id') id: number, @Body('content') content: string) {
        await this.tasksService.modifyTask(id, content);
        return { message: 'Task modified successfully' };
    }
}
