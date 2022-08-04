const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /discs should return a disc with id, name, type, speed, glide', async () => {
    const res = await request(app).get('/discs');
    expect(res.body.length).toBe(6);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      speed: expect.any(Number),
      glide: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
