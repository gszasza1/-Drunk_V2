import express from 'express';

import { authenticateJWT, isValidAccessToken } from '../middlewares/login';
import userRouter from './user';

var router = express.Router();

router.post("", isValidAccessToken);
router.use("/user", authenticateJWT, userRouter);
export default router;
