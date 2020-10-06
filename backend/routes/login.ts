import express from 'express';

import { createJwt } from '../middlewares/login';

var router = express.Router();

router.post("", createJwt);
router.post("/refresh");
export default router;
