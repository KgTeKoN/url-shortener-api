import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { ShortenerHelper } from './helper/shortener.helper';
import { ShortenerRepository } from './shortener.repository';
import { RedisModule } from '../../redis/redis.module';

@Module({
  controllers: [ShortenerController],
  imports: [RedisModule],
  providers: [ShortenerService, ShortenerHelper, ShortenerRepository],
})
export class ShortenerModule {}
