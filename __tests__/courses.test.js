const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /courses should return all courses with id, name, location, and rating', async () => {
    const res = await request(app).get('/courses');
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      rating: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
