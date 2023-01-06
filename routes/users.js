import { Router } from 'express';
import {
  createUser, updateUser, findUserById, getAllUsers, deleteUser,
} from '../controllers/users.controller.js';

const router = Router();

// READ
router.get('/', getAllUsers);

// READ USER BY ID
router.get('/:id', findUserById);

// CREATE
router.post('/', createUser);

// UPDATE
router.put('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

export default router;
