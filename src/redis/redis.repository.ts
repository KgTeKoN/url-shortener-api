import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}
