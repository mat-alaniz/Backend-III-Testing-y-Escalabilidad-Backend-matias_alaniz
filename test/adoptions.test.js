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

  describe('GET /api/adoptions/:aid', function () {
    it('debería retornar una adopción específica por ID con status success (si existe)', async function () {
      const getAllAdoptions = await request.get('/api/adoptions');
      if (!Array.isArray(getAllAdoptions.body.payload) || getAllAdoptions.body.payload.length === 0) {
        this.skip(); // no hay adopciones para probar; saltar el test
      }
      const adoptionId = getAllAdoptions.body.payload[0]._id;
      const response = await request.get(`/api/adoptions/${adoptionId}`);

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.payload).to.be.an('object');
    });

    it('debería retornar 404 para una adopción no existente', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const response = await request.get(`/api/adoptions/${nonExistentId}`);

      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      // validar la propiedad que realmente retorna el controlador
      expect(response.body.error === 'Adoption not found' || response.body.message === 'Adoption not found').to.be.true;
    });
  });
});