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
  it('#POST /pros should add a new pro', async () => {
    const newPro = {
      name: 'Midnight',
      pob: 'Uptown',
      dob: 2000,
    };
    const res = await request(app).post('/pros').send(newPro);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newPro
    });
  });
  it('#PUT /pros/:id should update a pros info', async () => {
    const res = await request(app).put('/pros/1').send({
      name: 'Mark',
    });
    expect(res.body.name).toEqual('Mark');
  });
  it('#DELETE /pros/:id should delete a pro from the table', async () => {
    const res = await request(app).get('/pros');
    expect(res.body.length).toBe(5);
    const resp = await request(app).delete('/pros/1');
    expect(resp.status).toBe(200);
    const response = await request(app).get('/pros');
    expect(response.body.length).toBe(4);
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
