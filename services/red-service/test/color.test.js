process.env.COLOR = 'red';
const request = require('supertest');
const app = require('../index');

jest.mock('../db', () => ({ query: jest.fn(() => Promise.resolve()) }));

describe('red-service', () => {
  it('returns health OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('returns color and inserts a hit', async () => {
    const res = await request(app).get('/color');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ color: 'red' });
  });
});
