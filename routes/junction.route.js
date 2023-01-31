import { Router } from 'express';
import { createJunction, addUsersToGroup } from '../controllers/junction.controller.js';

const router = Router();

// CREATE
router.post('/', createJunction);

// http://localhost:3000/junction?groupId=1&userIds=3
router.get('/', addUsersToGroup);

export default router;
