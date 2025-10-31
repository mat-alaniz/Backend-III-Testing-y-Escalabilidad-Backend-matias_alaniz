import { expect } from "chai";

const base = "http://localhost:8080/api/pets"; 

describe('Pets Router', () => {
    describe('GET /api/pets', () => {
        it('deberia retornar todas las mascotas con status success', async () => {
            const res = await fetch(base);
            const body = await res.json();

            expect(res.status).to.equal(200);
            expect(body.status).to.equal('success');
            expect(body.payload).to.be.an('array');
        });
    });

    describe ('POST /api/pets', () => {
        it('deberia crear una nueva mascota exitosamente', async () => {
            const newPet = {
                name: "Otto",
                specie: "Dog",
                birthDate: "2020-05-15", // corregido
            };
            const res = await fetch(base, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPet)
            });
            const body = await res.json();
            expect(res.status).to.equal(200); // o 201 según tu controlador
            expect(body.status).to.equal('success');
        });
    });

    describe('GET /api/pets/:pid', function(){
        it('deberia retornar una mascota especifica por ID con status success', async function () {
            const allRes = await fetch(base);
            const allBody = await allRes.json();
            if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
                this.skip();
            }
            const petId = allBody.payload[0]._id;
            const res = await fetch(`${base}/${petId}`);
            const body = await res.json();

            expect(res.status).to.equal(200);
            expect(body.status).to.equal('success');
            expect(body.payload).to.be.an('object');
            expect(body.payload._id).to.equal(petId);
        });

        it('deberia retornar 404 si la mascota no existe', async function () {
            const nonExistentId = "64b64c4f4f4f4f4f4f4f4f4f";
            const res = await fetch(`${base}/${nonExistentId}`);
            const body = await res.json();

            expect(res.status).to.equal(404);
            expect(body.status).to.equal('error');
        });
    });

    describe('PUT /api/pets/:pid', function(){
        it('deberia actualizar una mascota existente', async function(){
            const allRes = await fetch(base);
            const allBody = await allRes.json();
            if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
                this.skip();
            }
            const petId = allBody.payload[0]._id;
            const updatedData = { 
                name: "UpdatedName",
                specie: "Cat"
            };
            const res = await fetch(`${base}/${petId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const body = await res.json();

            expect(res.status).to.equal(200);
            expect(body.status).to.equal('success');
        });
    });

    describe('DELETE /api/pets/:pid', function(){
        it('deberia eliminar una mascota existente', async function(){
            const allRes = await fetch(base);
            const allBody = await allRes.json();
            if (!Array.isArray(allBody.payload) || allBody.payload.length === 0) {
                this.skip();
            }
            const petId = allBody.payload[0]._id;
            const res = await fetch(`${base}/${petId}`, {
                method: 'DELETE'
            });
            const body = await res.json();
            expect(res.status).to.equal(200);
        });

        it('deberia retornar 404 al intentar eliminar una mascota inexistente', async function(){
            const nonExistentId = "64b64c4f4f4f4f4f4f4f4f4f";
            const res = await fetch(`${base}/${nonExistentId}`, {
                method: 'DELETE'
            });
            const body = await res.json();
            expect(res.status).to.equal(404);
            expect(body.status).to.equal('error');
        });
    });
});