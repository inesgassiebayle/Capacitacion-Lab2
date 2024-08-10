import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class TaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Content should not be empty' })
    readonly content: string;

    @IsString()
    @IsNotEmpty({ message: 'Username should not be empty' })
    readonly username: string;
}
