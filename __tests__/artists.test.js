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
  it('#GET /artists/:id should return a specific artist', async () => {
    const res = await request(app).get('/artists/1');
    expect(res.body).toEqual({
      id: '1',
      band: 'Rush',
      guitar: 'Alex Lifeson',
      drums: 'Neil Peart',
      bass: 'Geddy Lee',
    });
  });
  it('#POST /artists should add a new artists object', async () => {
    const newArtist = {
      band: 'Yodel',
      guitar: 'John Smort',
      drums: 'Angela Jello',
      bass: 'Snack Pack',
    };
    const res = await request(app).post('/artists').send(newArtist);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newArtist
    });
  });
  afterAll(() => {
    pool.end();
  });
});
