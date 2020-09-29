import express from 'express';

import { validateMemberInput } from '../middlewares/registration';

var router = express.Router();

/* GET home page. */
router.post("/member", validateMemberInput);
export default router;
