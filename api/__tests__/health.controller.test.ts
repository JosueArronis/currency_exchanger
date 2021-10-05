import request, { SuperAgentTest } from 'supertest';
import {Server} from 'http'
import app from '../src/app';

let server: Server;
let agent: SuperAgentTest;

describe('HealthController', () => {
  beforeEach((done) => {
    server = app.listen(3000, () => {
      agent = request.agent(server);
      done();
    });
  });
  describe('Health is UP', () => {
    test('should return 200', async () => {
      await request(app).get('/api/v1/health').expect(200);
    });
  });
  afterEach(() => {
    return server && server.close();
  });
});
