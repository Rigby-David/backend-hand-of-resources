const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /discs should return discs with id, name, type, speed, glide', async () => {
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
  it('#PUT /discs/:id should update a discs info', async () => {
    const res = await request(app).put('/discs/1').send({
      name: 'Flight',
    });
    expect(res.body.name).toBe('Flight');
  });
  it('#DELETE /discs/:id should delete a disc', async () => {
    const resp = await request(app).get('/discs');
    expect(resp.body.length).toBe(6);
    const res = await request(app).delete('/discs/1');
    expect(res.status).toBe(200);
    const response = await request(app).get('/discs');
    expect(response.body.length).toBe(5);
  });
  afterAll(() => {
    pool.end();
  });
});
