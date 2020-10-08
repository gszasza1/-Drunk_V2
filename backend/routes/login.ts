import express from 'express';

import { createJwt, refreshToken } from '../middlewares/login';

var router = express.Router();

router.post("", createJwt);
router.post("/refresh", refreshToken);
export default router;
