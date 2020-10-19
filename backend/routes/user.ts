import express from 'express';

import { getUserInformation } from '../middlewares/user/getUserInformation';

var router = express.Router();

router.get("/", getUserInformation);
export default router;
