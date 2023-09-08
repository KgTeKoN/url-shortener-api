import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'verbose'],
  });
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Origin,X-Requested-With,content-type,Authorization,Access-Token,Refresh-Token',
  });

  const swaggerJsonPath = path.join(__dirname, '../swagger.json');
  const swaggerJson = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
  SwaggerModule.setup('swagger', app, swaggerJson);

  await app.listen(app.get<ConfigService>(ConfigService).get('SERVER_PORT'));
}

bootstrap();
