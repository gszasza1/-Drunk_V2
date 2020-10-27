import express from 'express';

import { addFestival } from '../middlewares/festival/addFestival';
import { deleteParticipageFestival } from '../middlewares/festival/deleteParticipageFestival';
import { getFestivalbyId } from '../middlewares/festival/getFestivalById';
import { getFestivals } from '../middlewares/festival/getFestivals';
import { participateInFestival } from '../middlewares/festival/participateInFestival';

var router = express.Router();

router.post("/create", addFestival);
router.get("", getFestivals);
router.get("/:id", getFestivalbyId);
router.post("/participate/:id", participateInFestival);
router.delete("/participate/:id", deleteParticipageFestival);
export default router;
