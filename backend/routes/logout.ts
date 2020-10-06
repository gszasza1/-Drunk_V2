import express from 'express';

import { filterToken } from '../middlewares/login';

var router = express.Router();

router.post("", filterToken);
export default router;
