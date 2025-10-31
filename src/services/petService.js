import PetModel from '../dao/models/Pet.js';

export const petsService = {
  getAll: async () => {
    try {
      return await PetModel.find().lean();
    } catch (err) {
      throw new Error(`Error getting pets: ${err.message}`);
    }
  },

  getById: async (id) => {
    try {
      return await PetModel.findById(id).lean();
    } catch (err) {
      throw new Error(`Error getting pet by id: ${err.message}`);
    }
  },

  create: async (petData) => {
    try {
      const pet = await PetModel.create(petData);
      return pet;
    } catch (err) {
      throw new Error(`Error creating pet: ${err.message}`);
    }
  },

  update: async (id, updateData) => {
    try {
      return await PetModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    } catch (err) {
      throw new Error(`Error updating pet: ${err.message}`);
    }
  },

  delete: async (id) => {
    try {
      return await PetModel.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(`Error deleting pet: ${err.message}`);
    }
  }
};