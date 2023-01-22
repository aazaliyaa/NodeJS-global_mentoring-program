import { Router } from 'express';
import createJunction from '../controllers/junction.controller.js';

const router = Router();

// CREATE
router.post('/', createJunction);

export default router;
