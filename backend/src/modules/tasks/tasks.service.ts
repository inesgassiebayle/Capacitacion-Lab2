import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TASK_REPOSITORY, USER_REPOSITORY} from "../../core/constants";
import {Task} from "./task.entity";
import {User} from "../users/user.entity";
import {TaskDto} from "./dto/task.dto";

@Injectable()
export class TasksService {

    constructor(
        @Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task,
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User
    ) { }

    async create(taskDto: TaskDto): Promise<Task> {
        const user = await this.userRepository.findOne<User>({ where: { username: taskDto.username } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.taskRepository.create<Task>({
            ...taskDto,
            userId: user.id
        });
    }

    async findByUserId(userId: number): Promise<Task[]> {
        return await this.taskRepository.findAll<Task>({
            where: { userId },
        });
    }

    async findByUsername(username: string): Promise<Task[]> {
        const user = await this.userRepository.findOne<User>({ where: { username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.taskRepository.findAll<Task>({
            where: { userId: user.id },
        });
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepository.findByPk(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await task.destroy();
    }

    async modifyTask(id: number, content: string): Promise<void> {
        const task = await this.taskRepository.findByPk(id);
        if (!task) {
            throw new NotFoundException('Task not found' + id);
        }
        task.content = content;
        await task.save();
    }
}
