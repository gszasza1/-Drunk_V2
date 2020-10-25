import express from 'express';

import { addFestival } from '../middlewares/festival/addFestival';
import { getFestivalbyId } from '../middlewares/festival/getFestivalById';
import { getFestivals } from '../middlewares/festival/getFestivals';

var router = express.Router();

router.post("/create", addFestival);
router.get("", getFestivals);
router.get("/:id", getFestivalbyId);
export default router;
