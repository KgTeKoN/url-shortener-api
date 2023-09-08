import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getServerStart(): string {
    return this.appService.getServerStart(this.configService.get<number>('SERVER_PORT'));
  }
}
