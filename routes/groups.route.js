import { Router } from 'express';
import {
  createGroup, updateGroup, findGroupById, getAllGroups, deleteGroup,
} from '../controllers/groups.controller.js';

const router = Router();

// READ
router.get('/', getAllGroups);

// READ USER BY ID
router.get('/:id', findGroupById);

// CREATE
router.post('/', createGroup);

// UPDATE
router.put('/:id', updateGroup);

// SOFT DELETE USER
router.delete('/:id', deleteGroup);

export default router;
