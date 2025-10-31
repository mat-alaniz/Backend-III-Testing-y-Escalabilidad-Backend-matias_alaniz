import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js'; 

const request = supertest(app); 

describe('User Router', () => {
  describe('GET /api/users', () => {
    it('debería retornar todos los usuarios con status success', async () => {
      const response = await request.get('/api/users');
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.payload).to.be.an('array');
    });
  });
});

