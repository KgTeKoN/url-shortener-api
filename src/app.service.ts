import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStart(port): string {

    return `Server has been started at ${port} port`;
  }
}
