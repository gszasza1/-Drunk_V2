import express from 'express';

import { authenticateJWT, isValidAccessToken } from '../middlewares/login';
import currentDrinkRouter from './current-drink';
import drinkRouter from './drink';
import festivalRouter from './festival';
import userRouter from './user';

var router = express.Router();

router.post("", isValidAccessToken);
router.use("/user", authenticateJWT, userRouter);
router.use("/festival", authenticateJWT, festivalRouter);
router.use("/drink", authenticateJWT, drinkRouter);
router.use("/current-drink", authenticateJWT, currentDrinkRouter);

export default router;
