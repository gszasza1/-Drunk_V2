import express from 'express';

import { isValidAccessToken } from '../middlewares/login';

isValidAccessToken;
var router = express.Router();

router.post("", isValidAccessToken);
export default router;
