import request, { SuperAgentTest } from 'supertest';
import { Server } from 'http';
import * as ExchangeServices from '../src/services/Exchange';
import app from '../src/app';

let server: Server;
let agent: SuperAgentTest;

describe('QuoteController', () => {
  beforeEach((done) => {
    server = app.listen(3001, () => {
      agent = request.agent(server);
      done();
    });
  });
  describe('qoute is UP', () => {
    test('should return 200', async () => {
      const spy = jest.spyOn(ExchangeServices, 'getExchangeRate').mockResolvedValueOnce({
        conversion_rate: 1.5,
        conversion_result: 1.5,
        base_code: 'USD',
        target_code: 'EUR',
      });
      const result = await request(app).get(
        '/api/v1/quote?baseCurrency=USD&quoteCurrency=EUR&baseAmount=1'
      );
      expect(result.status).toEqual(200);
      expect(result.text).toEqual(
        '{"exchangeRate":1.5,"quoteAmount":150,"base_code":"USD","target_code":"EUR"}'
      );
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
  describe('qoute validate baseCurrency param', () => {
    test('should return 200', async () => {
      const spy = jest.spyOn(ExchangeServices, 'getExchangeRate').mockResolvedValueOnce({
        conversion_rate: 1.5,
        conversion_result: 1.5,
        base_code: 'USD',
        target_code: 'EUR',
      });
      const result = await request(app).get(
        '/api/v1/quote?quoteCurrency=EUR&baseAmount=1'
      );
      expect(result.status).toEqual(404);
      expect(result.text).toEqual(
        '{"status":"Error","status_code":404,"message":"Invalid request","errors":[{"msg":"Missing field \'baseCurrency\'","param":"baseCurrency","location":"query"}]}'
      );
      expect(spy).toHaveBeenCalledTimes(0);
      spy.mockRestore();
    });
  });
  describe('qoute validate quoteCurrency param', () => {
    test('should return 200', async () => {
      const spy = jest.spyOn(ExchangeServices, 'getExchangeRate').mockResolvedValueOnce({
        conversion_rate: 1.5,
        conversion_result: 1.5,
        base_code: 'USD',
        target_code: 'EUR',
      });
      const result = await request(app).get('/api/v1/quote?baseCurrency=USD&baseAmount=1');
      expect(result.status).toEqual(404);
      expect(result.text).toEqual(
        '{"status":"Error","status_code":404,"message":"Invalid request","errors":[{"msg":"Missing field \'quoteCurrency\'","param":"quoteCurrency","location":"query"}]}'
      );
      expect(spy).toHaveBeenCalledTimes(0);
      spy.mockRestore();
    });
  });
  afterEach(() => {
    return server && server.close();
  });
});
