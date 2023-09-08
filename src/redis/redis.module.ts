import { Module } from '@nestjs/common';
import { RedisRepository } from "./redis.repository";

@Module({
  providers: [RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {}
