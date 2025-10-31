import { expect } from 'chai';

const base = 'http://localhost:8080';

describe('Users Router', () => {
  describe('GET /api/users', () => {
    it('debería retornar todos los usuarios con status success', async () => {
      const res = await fetch(`${base}/api/users`);
      const body = await res.json();
      expect(res.status).to.equal(200);
      expect(body.status).to.equal('success');
      expect(body.payload).to.be.an('array');
    });
  });

  describe('GET /api/users/:uid', () => {
    it('debería retornar un usuario específico por ID con status success (si existe)', async function () {
      const allRes = await fetch(`${base}/api/users`);
      const allBody = await allRes.json();
      if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
        this.skip();
      }
      const userId = allBody.payload[0]._id;
      const res = await fetch(`${base}/api/users/${userId}`);
      const body = await res.json();
      expect(res.status).to.equal(200);
      expect(body.status).to.equal('success');
      expect(body.payload).to.be.an('object');
    });

    it('debería retornar 404 para un usuario no existente', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await fetch(`${base}/api/users/${nonExistentId}`);
      const body = await res.json();
      expect(res.status).to.equal(404);
      expect(body.status).to.equal('error');
    });
  });

  describe('PUT /api/users/:uid', () => {
    it('debería actualizar un usuario específico por ID y retornar status success (si existe)', async function () {
      const allRes = await fetch(`${base}/api/users`);
      const allBody = await allRes.json();
      if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
        this.skip();
      }
      const userId = allBody.payload[0]._id;
      const updatedData = {
        first_name: 'NombreActualizado',
        last_name: 'ApellidoActualizado',
        email: 'actualizado@test.com'
      };
      const res = await fetch(`${base}/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const body = await res.json();
      expect(res.status).to.equal(200);
      expect(body.status).to.equal('success');
    });
  });

  describe('DELETE /api/users/:uid', () => {
    it('deberia eliminar un usuario existente', async function() {
      const allRes = await fetch(`${base}/api/users`);
      const allBody = await allRes.json();
      if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
        this.skip();
      }
      const userId = allBody.payload[0]._id;
      const res = await fetch(`${base}/api/users/${userId}`, { method: 'DELETE' });
      const body = await res.json();
      expect(res.status).to.equal(200);
      expect(body.status).to.equal('success');
    });

    it('deberia retornar 404 al intentar eliminar un usuario no existente', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await fetch(`${base}/api/users/${nonExistentId}`, { method: 'DELETE' });
      const body = await res.json();
      expect(res.status).to.equal(404);
      expect(body.status).to.equal('error');
    });
  });
});