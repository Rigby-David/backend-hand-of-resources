const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /pros should return all pro objects with name, pob, dob', async () => {
    const res = await request(app).get('/pros');
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      pob: expect.any(String),
      dob: expect.any(Number),
    });
  });
  it('#GET /pros/:id should return a specific pro', async () => {
    const res = await request(app).get('/pros/1');
    console.log(res.body);
    expect(res.body).toEqual({
      id: '1',
      name: 'Paul McBeth',
      pob: 'California',
      dob: 1990
    });
  });
  afterAll(() => {
    pool.end();
  });
});


// const pool = require('../lib/utils/pool');
// const setup = require('../data/setup');
// // const { request } = require('express');
// const request = require('supertest');
// const app = require('../lib/app');

// describe('backend-express-template routes', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });
//   afterAll(() => {
//     pool.end();
//   });
// });
