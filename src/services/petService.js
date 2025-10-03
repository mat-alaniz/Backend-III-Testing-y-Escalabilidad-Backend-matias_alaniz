import petModel from '../dao/models/Pet.js';

export const petService = {
    //crear multliples mascotas en la base de datos
  createMultiplePets: async (petsArray) => {
    try {
        const createdPets = await petModel.insertMany(petsArray);
        return createdPets;
    } catch (error) {
        throw new Error(`Error al crear mascotas: ${error.message}`);
    }
  }
};