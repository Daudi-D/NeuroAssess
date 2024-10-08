const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'candidate'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Add more tests for other auth routes
});