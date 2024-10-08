import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {ValidationPipe} from "@nestjs/common";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
