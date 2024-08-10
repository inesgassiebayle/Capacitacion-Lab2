import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import {USER_REPOSITORY} from '../../core/constants';
import * as bcrypt from 'bcrypt';
import {UserModDto} from "./dto/user.mod.dto";

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { username } });
    }

    async updateUser(username: string, updateUserDto: UserModDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (user) {
            user.name = updateUserDto.name;
            user.surname = updateUserDto.surname;

            if (updateUserDto.password) {
                user.password = await this.hashPassword(updateUserDto.password);
            }

            await user.save();
            return user;
        }

        throw new Error('User not found');
    }

    async deleteUser(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new Error('User not found');
        }


        await user.destroy();
        return user;
    }


    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}