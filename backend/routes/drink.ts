import express from 'express';

import { addDrink } from '../middlewares/drink/addDrink';
import { buyDrink } from '../middlewares/drink/buyDrink';
import { deleteParticipageDrink } from '../middlewares/drink/deleteDrink';
import { getDrinkbyId } from '../middlewares/drink/getDrinkById';
import { getDrinks } from '../middlewares/drink/getDrinks';
import { updateDrinkbyId } from '../middlewares/drink/updateDrink';

const router = express.Router();

router.post("", addDrink);
router.get("", getDrinks);
router.get("/:id", getDrinkbyId);
router.put("/:id", updateDrinkbyId);
router.delete("/:id", deleteParticipageDrink);
router.post("/buydrink", buyDrink);
export default router;
