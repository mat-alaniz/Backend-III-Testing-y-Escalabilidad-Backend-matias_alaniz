import { Router } from 'express';
import * as petsController from '../controllers/pets.controller.js';

const router = Router();

const ensureHandler = (name) => {
  const fn = petsController[name];
  if (typeof fn !== 'function') {
    console.error(`pets.router: controller.${name} no está definido. Revisa src/controllers/pets.controller.js`);
    return (req, res) => res.status(501).json({ status: 'error', error: `Handler ${name} not implemented` });
  }
  return fn;
};

router.get('/', ensureHandler('getAllPets'));
router.get('/:pid', ensureHandler('getPetById'));
router.post('/', ensureHandler('createPet'));
router.put('/:pid', ensureHandler('updatePet'));
router.delete('/:pid', ensureHandler('deletePet'));

export default router;