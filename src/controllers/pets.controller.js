import PetDTO from "../dto/Pet.dto.js";
import { petsService } from '../services/petService.js';
import __dirname from "../utils/index.js";

export const getAllPets = async (req, res, next) => {
  try {
    const pets = await petsService.getAll();
    return res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const pet = await petsService.getById(pid);
    if (!pet) return res.status(404).json({ status: 'error', error: 'Pet not found' });
    return res.status(200).json({ status: 'success', payload: pet });
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  try {
    const petData = req.body;
    const created = await petsService.create(petData);
    return res.status(201).json({ status: 'success', payload: created, message: 'Pet created' });
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updateData = req.body;
    const updated = await petsService.update(pid, updateData);
    if (!updated) return res.status(404).json({ status: 'error', error: 'Pet not found' });
    return res.status(200).json({ status: 'success', payload: updated, message: 'Pet updated' });
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleted = await petsService.delete(pid);
    if (!deleted) return res.status(404).json({ status: 'error', error: 'Pet not found' });
    return res.status(200).json({ status: 'success', message: 'Pet deleted' });
  } catch (error) {
    next(error);
  }
};

const createPetWithImage = async (req, res, next) => {
  try {
    const file = req.file;
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
      return res.status(400).send({ status: "error", error: "Incomplete values" });
    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`
    });
    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result });
  } catch (error) {
    next(error);
  }
}

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
  getPetById
}