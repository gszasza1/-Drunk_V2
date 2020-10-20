import express from 'express';

import { addFestival } from '../middlewares/festival/addFestival';

var router = express.Router();

router.post("/create", addFestival);
export default router;
