export default class LRUCache {
  maxSize;
  cache;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  get(key: string) {
    const value = this.cache.get(key);
    if (value) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  set(key: string, value: string) {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.maxSize) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
  getLeastRecent() {
    return Array.from(this.cache)[0];
  }

  getMostRecent() {
    return Array.from(this.cache)[this.cache.size - 1];
  }
}