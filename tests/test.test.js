const request = require('supertest');
const app = require('../server');
const Test = require('../models/Test');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let token;
let testId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const user = await User.create({
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  });
  token = jwt.sign({ user: { id: user._id, role: 'admin' } }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test API', () => {
  it('should create a new test', async () => {
    const res = await request(app)
      .post('/api/tests')
      .set('x-auth-token', token)
      .send({
        title: 'Sample Test',
        description: 'This is a sample test',
        questions: [
          {
            text: 'Sample question',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0
          }
        ]
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    testId = res.body._id;
  });

  it('should get all tests', async () => {
    const res = await request(app)
      .get('/api/tests')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.tests)).toBeTruthy();
  });

  it('should get a specific test', async () => {
    const res = await request(app)
      .get(`/api/tests/${testId}`)
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(testId);
  });

  it('should update a test', async () => {
    const res = await request(app)
      .put(`/api/tests/${testId}`)
      .set('x-auth-token', token)
      .send({
        title: 'Updated Test Title'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Test Title');
  });

  it('should delete a test', async () => {
    const res = await request(app)
      .delete(`/api/tests/${testId}`)
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual('Test removed');
  });
});