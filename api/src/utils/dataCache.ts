interface IData {
  conversion_rate: number;
  base_code: string;
  target_code: string;
}
interface IDataCache {
  key: string;
  data: IData;
  fetchDate: Date;
  millisecondsToLive: number;
}

class DataCache {
  dcache: IDataCache[] = [] as IDataCache[];
  constructor() {}

  isCacheExpired(index: number) {
    return (
      this.dcache[index].fetchDate.getTime() + this.dcache[index].millisecondsToLive <
      new Date().getTime()
    );
  }
  resetCache(index: number) {
    this.dcache[index].fetchDate = new Date();
  }
  set(key: string, data: IData, minutesToLive: number = 10): 'CREATED' | 'UPDATED' {
    const index = this.dcache.findIndex((cache) => cache.key === key);
    if (index === -1) {
      this.dcache.push({
        key,
        data,
        fetchDate: new Date(),
        millisecondsToLive: minutesToLive * 60 * 1000,
      });
      return 'CREATED';
    } else {
      this.dcache[index].data = data;
      this.dcache[index].fetchDate = new Date();
      this.dcache[index].millisecondsToLive = minutesToLive * 60 * 1000;
      return 'UPDATED';
    }
  }
  get(key: string): IData | undefined {
    const index = this.dcache.findIndex((cache) => cache.key === key);
    if (index === -1) {
      return undefined;
    }
    if (this.isCacheExpired(index)) {
      this.resetCache(index);
      return undefined;
    }
    return this.dcache[index].data;
  }
  has(key: string): boolean {
    const index = this.dcache.findIndex((cache) => cache.key === key);
    if (index === -1) {
      return false;
    }
    return !this.isCacheExpired(index);
  }
}

export const dataCache = new DataCache();
