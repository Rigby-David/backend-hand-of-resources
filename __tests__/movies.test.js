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
  it('#GET /movies/:id should return a specific movie', async () => {
    const res = await request(app).get('/movies/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'Bullet Train',
      director: 'David Leitch',
      released: 2022,
      genre: 'Action',
    });
  });
  it('#POST /movies should add a new movies object', async () => {
    const newMovie = {
      title: 'From Near',
      director: 'Jason Steinberg',
      released: 2022,
      genre: 'Drama',
    };
    const res = await request(app).post('/movies').send(newMovie);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newMovie
    });
  });
  it('#PUT /movies/:id should update a movies info', async () => {
    const res = await request(app).put('/movies/1').send({
      title: 'Bullet Plane, Train, and Automobiles',
    });
    expect(res.body.title).toBe('Bullet Plane, Train, and Automobiles');
  });
  afterAll(() => {
    pool.end();
  });
});
