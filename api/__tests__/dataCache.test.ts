import {dataCache} from '../src/utils/dataCache'
jest.useRealTimers();
describe('dataCache', () => {
  test('should save cache ', async () => {
      const data = {
        conversion_rate: 1.5,
        base_code: 'USD',
        target_code: 'EUR',
      };
      const resultc: 'CREATED' | 'UPDATED' = dataCache.set('USD_EUR', data, 0.01);
      expect(resultc).toEqual('CREATED');
      const resultu: 'CREATED' | 'UPDATED' = dataCache.set('USD_EUR', data);
      expect(resultu).toEqual('UPDATED');
      const resulth: any = dataCache.has('USD_EUR');
       expect(resulth).toBeTruthy();
      const resultg: any = dataCache.get('USD_EUR');
      expect(resultg).toEqual(data);
  });
});
