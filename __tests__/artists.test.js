const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /artists should return artists with id, band, guitar, drums, bass', async () => {
    const res = await request(app).get('/artists');
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      band: expect.any(String),
      guitar: expect.any(String),
      drums: expect.any(String),
      bass: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
