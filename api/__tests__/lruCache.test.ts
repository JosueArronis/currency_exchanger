import LRUCache from '../src/utils/lruCache';
jest.useRealTimers();
describe('LRUCache', () => {
  test('should save cache ', async () => {
    const data = {
      conversion_rate: 1.5,
      base_code: 'USD',
      target_code: 'EUR',
    };
    const data2 = {
      exchangeRate: 0.732,
      base_code: 'USD',
      target_code: 'GBP',
    };
    const cache = new LRUCache(2);
    cache.set('USD_EUR',  JSON.stringify(data));
    expect(cache.get('USD_EUR')).toEqual(JSON.stringify(data));
    cache.set('USD_GBP', JSON.stringify(data2));
    expect(cache.get('USD_GBP')).toEqual(JSON.stringify(data2));
    expect(cache.getMostRecent()).toEqual([
      'USD_GBP',
      '{"exchangeRate":0.732,"base_code":"USD","target_code":"GBP"}',
    ]);
    expect(cache.getLeastRecent()).toEqual([
      'USD_EUR',
      '{"conversion_rate":1.5,"base_code":"USD","target_code":"EUR"}',
    ]);
  });
});
