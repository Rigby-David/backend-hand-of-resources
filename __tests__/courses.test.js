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
  it('#GET /courses/:id should return first row of courses table', async () => {
    const res = await request(app).get('/courses/1');
    expect(res.body).toEqual({
      id: '1',
      name: 'Maple Hill',
      location: 'Massachusetts',
      rating: 1,
    });
  });
  it('#POST /courses should add a new course object', async () => {
    const newCourse = {
      name: 'Grass Hill',
      location: 'Swampy',
      rating: 8,
    };
    const res = await request(app).post('/courses').send(newCourse);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCourse
    });
  });
  it('#PUT /courses/:id should update a course/s info', async () => {
    const res = await request(app).put('/courses/1').send({
      name: 'Rebillet',
    });
    expect(res.body.name).toBe('Rebillet');
  });
  afterAll(() => {
    pool.end();
  });
  it('#DELETE /courses/:id should delete a course', async () => {
    const resp = await request(app).get('/courses');
    expect(resp.body.length).toBe(5);
    const res = await request(app).delete('/courses/1');
    expect(res.status).toBe(200);
    const response = await request(app).get('/courses');
    expect(response.body.length).toBe(4);
  });
});
