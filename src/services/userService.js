import userModel from '../dao/models/User.js';

export const userService = {
    //crear varios ususarios en la base de datos
  createMultipleUsers: async (usersArray) => {
    try {
        const createdUsers = await userModel.insertMany(usersArray);
        return createdUsers;
    } catch (error) {
        throw new Error(`Error al crear usuarios: ${error.message}`);
    }
  }
};