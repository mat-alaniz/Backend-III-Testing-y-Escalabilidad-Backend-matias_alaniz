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

describe('POST /api/adoptions/:uid/:pid', () => {
    it('deberia cear una adpocion existosamente cuando usuario y mascota existen realmente', async function () {
        // Primero, obtener un usuario y una mascota existentes
        const usersResponse = await request.get('/api/users');
        const petsResponse = await request.get('/api/pets');
        if (!usersResponse.body.payload.length || !petsResponse.body.payload.length) {
            this.skip(); // Saltar el test si no hay usuarios o mascotas
        }
        
        const availablePet = petsResponse.body.payload.find(pet => pet.adopted === false);
        if (!availablePet) {
            this.skip(); // Saltar el test si no hay mascotas disponibles para adopción
        }
        const userId = usersResponse.body.payload[0]._id;
        const petId = availablePet._id;

        const response = await request.post(`/api/adoptions/${userId}/${petId}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.include('adopted');
    });
    it('deberia retornar error 404 si el usuario no existe', async () => {
        const nonExistentUserId = '507f1f77bcf86cd799439011';
        const petsResponse = await request.get('/api/pets');
        if (!petsResponse.body.payload.length) {
            return; // No hay mascotas para probar
        }
        const petId = petsResponse.body.payload[0]._id;
        const response = await request.post(`/api/adoptions/${nonExistentUserId}/${petId}`);

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to.include('user')
    });
    it('deberia retornar error 404 si la mascota no existe', async () => {
        const usersResponse = await request.get('/api/users');
        const nonExistentPetId = '507f1f77bcf86cd799439011';
        if (!usersResponse.body.payload.length) {
            return; // No hay usuarios para probar
        }
        const userId = usersResponse.body.payload[0]._id;
        const response = await request.post(`/api/adoptions/${userId}/${nonExistentPetId}`);

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to.include('not found');
    });
});