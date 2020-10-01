import express from 'express';

import { validateMemberInput } from '../middlewares/registration';
import { createMember } from '../middlewares/registration/createMember';
import { hashPassword } from '../middlewares/registration/hashPassword';

var router = express.Router();

/* GET home page. */
router.post("/member", validateMemberInput, hashPassword, createMember);
export default router;
