export class RedisRepositoryMock {
  private readonly data: Map<string, string> = new Map<string, string>();

  async set(key: string, value: string): Promise<void> {
    this.data.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    if (this.data.has(key)) {
      return this.data.get(key) || null;
    }
    return null;
  }
}
