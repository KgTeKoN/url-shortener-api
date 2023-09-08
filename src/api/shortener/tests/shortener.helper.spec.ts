import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerHelper } from '../helper/shortener.helper';

describe('ShortenerHelper', () => {
  let shortenerHelper: ShortenerHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenerHelper],
    }).compile();

    shortenerHelper = module.get<ShortenerHelper>(ShortenerHelper);
  });

  describe('removeVowelsFromBasicUrl', () => {
    it('should remove vowels from the URL', () => {
      const result = shortenerHelper.removeVowelsFromBasicUrl('https://example.com');
      expect(result).toBe('https://xmpl.cm');
    });
  });

  describe('generateRandomString', () => {
    it('should generate a random string of length 3', () => {
      const result = shortenerHelper.generateRandomString();
      expect(result).toHaveLength(3);
      expect(typeof result).toBe('string');
    });
  });

  describe('shuffleString', () => {
    it('should shuffle a string', () => {
      const inputString = 'abcdef';
      const shuffledString = shortenerHelper.shuffleString(inputString);
      expect(shuffledString).toHaveLength(inputString.length);
      expect([...shuffledString].sort().join('')).toEqual([...inputString].sort().join(''));
    });
  });

  describe('removeUrlPathAndParameters', () => {
    it('should remove path and parameters from a URL', () => {
      const url = 'https://example.com/some/path?param1=value1&param2=value2';
      const result = shortenerHelper.removeUrlPathAndParameters(url);
      expect(result).toBe('https://example.com');
    });
  });

  describe('generatorShorterUrl', () => {
    it('should generate a shorter URL', () => {
      const result = shortenerHelper.generatorShorterUrl('https://example.com');
      expect(result).toMatch(/^https:\/\/example\.com\/[a-zA-Z0-9]{6}$/);
    });
  });
});
