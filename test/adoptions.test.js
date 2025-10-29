

import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080');

describe('Adoptions Router', () => {
  describe('GET /api/adoptions', () => {
    it('debería retornar todas las adopciones con status success', async () => {
        const response = await request.get('/api/adoptions');
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('array');
    });
  });
});