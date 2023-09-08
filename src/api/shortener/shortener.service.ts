import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { ShortenerHelper } from './helper/shortener.helper';
import { ShortenerRepository } from './shortener.repository';
import { ResponseCreate } from './shortener.types';
import { RedisRepository } from '../../redis/redis.repository';

@Injectable()
export class ShortenerService {
  constructor(
    private readonly shortenerHelper: ShortenerHelper,
    private readonly shortenerRepository: ShortenerRepository,
    private readonly redisRepository: RedisRepository,
  ) {}

  async create(originalUrl: string): Promise<ResponseCreate> {
    const shortenedUrlDB = await this.shortenerRepository.findUnique({ originalUrl });
    if (shortenedUrlDB) {
      return {
        success: true,
        shortenedUrl: shortenedUrlDB.shortenedUrl,
      };
    }
    const baseUrl = this.shortenerHelper.removeVowelsFromBasicUrl(originalUrl);
    let shortenedUrl = this.shortenerHelper.generatorShorterUrl(baseUrl);
    let retries = 10;
    while (retries > 0) {
      try {
        await this.shortenerRepository.create({ originalUrl, shortenedUrl });
        retries = -1;
      } catch (error) {
        shortenedUrl = this.shortenerHelper.generatorShorterUrl(baseUrl);
        retries--;
      }
    }
    if (retries !== -1) {
      throw new ServiceUnavailableException("Generating a short link failed. Please try again later.")
    }
    await this.redisRepository.set(shortenedUrl, originalUrl);
    return {
      success: true,
      shortenedUrl,
    };
  }

  async findOne(shortenedUrl: string) {
    const originalUrlRedis = await this.redisRepository.get(shortenedUrl);
    if (originalUrlRedis) {
      return {
        success: true,
        originalUrl: originalUrlRedis,
      };
    }
    const result = await this.shortenerRepository.findUnique({ shortenedUrl });
    if(!result) {
      throw new NotFoundException("Original link not found")
    }
    await this.redisRepository.set(shortenedUrl, result.originalUrl);
    return {
      success: true,
      originalUrl: result.originalUrl,
    };
  }
}
