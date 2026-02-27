import express from 'express'
import isAuth from '../middlewares/isAuth.js';
import { getCurrentUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/current-user", isAuth, getCurrentUser)

export default router