import {IMapFrame, IStore} from '@jscpd/core';
import Redis from "ioredis";

export default class RedisStore implements IStore<IMapFrame> {
  private name: string  = '';
  private redis

  constructor() {
    this.redis = new Redis();
  }

  close(): Promise<void> {
    this.redis.disconnect();
    return Promise.resolve();
  }

  get(key: string): Promise<IMapFrame> {
    return this.redis.get(this.name + ':' + key).then(value => {
      if (!value) {
        throw new Error('not found')
      }
      return JSON.parse(value)
    });
  }

  namespace(name: string): void {
    this.name = name;
  }

  async set(key: string, value: IMapFrame): Promise<IMapFrame> {
    await this.redis.set(this.name + ':' + key, JSON.stringify(value));
    return value
  }
}
