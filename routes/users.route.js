import { Router } from 'express';
import {
  createUser, updateUser, findUserById, getAllUsers, deleteUser, deleteAll,
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

// SOFT DELETE USER
router.delete('/:id', deleteUser);

// DELETE ALL
router.delete('/', deleteAll);

export default router;
