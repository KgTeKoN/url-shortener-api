import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerHelper } from '../helper/shortener.helper';
import { ShortenerService } from '../shortener.service';
import { ShortenerRepository } from "../shortener.repository";
import { PrismaModule } from "../../../prisma/prisma.module";
import { RedisRepository } from '../../../redis/redis.repository'; // Імпортуйте оригінальний клас
import { RedisRepositoryMock } from '../../../redis/redis.repository.mock';
import { RedisModule } from "@liaoliaots/nestjs-redis";

describe('ShortenerHelper', () => {
  let shortenerService: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule, PrismaModule],
      providers: [ShortenerService, ShortenerHelper, ShortenerRepository,         {
        provide: RedisRepository,
        useClass: RedisRepositoryMock,
      }],
    }).compile();

    shortenerService = module.get<ShortenerService>(ShortenerService);
  });

  describe('check shorter service', () => {
    it('should receive original url from shortened', async () => {
      const url = 'https://example.com/esk?uuid=t56yg'
      const shortened = await shortenerService.create(url);
      const original = await shortenerService.findOne(shortened.shortenedUrl)
      expect(original.originalUrl).toBe(url);
    });
  });
});
