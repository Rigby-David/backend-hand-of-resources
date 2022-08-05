const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /movies should return movies with id, title, director, released, genre', async () => {
    const res = await request(app).get('/movies');
    expect(res.body.length).toBe(4);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      director: expect.any(String),
      genre: expect.any(String),
      released: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
