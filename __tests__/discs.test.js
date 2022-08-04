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
  it('#GET /discs:id should return a specific disc', async () => {
    const res = await request(app).get('/discs/1');
    expect(res.body).toEqual({
      id: '1',
      name: 'Wraith',
      type: 'Driver',
      speed: 11,
      glide: 5,
    });
  });
  it('#POST /discs should add a new donut object', async () => {
    const newDisc = {
      name: 'Panther',
      type: 'Mid',
      speed: 5,
      glide: 4,
    };
    const res = await request(app).post('/discs').send(newDisc);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newDisc
    });
  });
  afterAll(() => {
    pool.end();
  });
});
