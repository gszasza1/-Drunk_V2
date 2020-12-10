import express from 'express';

import { deleteCurrentDrinkByUser } from '../middlewares/current-drink/deleteUserDrinkByUser';
import { getCurrentDrinkByUser } from '../middlewares/current-drink/getCurrentDrinkByUser';

const router = express.Router();

router.get("", getCurrentDrinkByUser);
router.delete("/:id", deleteCurrentDrinkByUser);
export default router;
