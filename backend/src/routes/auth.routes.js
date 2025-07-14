// routes/auth.routes.js
import express from 'express';
import {
  signupUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/refresh', refreshAccessToken);

export { router as authRouter };
