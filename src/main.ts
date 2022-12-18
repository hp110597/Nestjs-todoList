import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // kích hoạt cho phép FE truy cập API 
  app.use(express.static("."));
  await app.listen(8080);
}
bootstrap();

//setup .env
//yarn add @nestjs/config 