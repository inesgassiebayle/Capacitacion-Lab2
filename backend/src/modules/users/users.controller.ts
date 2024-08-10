import {Controller, Body, Post, UseGuards, Request, Get, Param, Put, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import {UserModDto} from "./dto/user.mod.dto";

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':username')
    async get(@Param('username') username: string) {
        return await this.usersService.findOneByUsername(username);
    }

    @Put(':username')
    async update(
        @Param('username') username: string,
        @Body() updateUserDto: UserModDto
    ) {
        return await this.usersService.updateUser(username, updateUserDto);
    }

    @Delete(':username')
    async delete(
        @Param('username') username: string,
    ) {
        return await this.usersService.deleteUser(username);
    }

}
