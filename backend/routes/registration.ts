import express from 'express';

import { createFirm, createMember, hashPassword, validateMemberInput } from '../middlewares/registration';

var router = express.Router();

router.post("/member", validateMemberInput, hashPassword, createMember);
router.post("/firm", validateMemberInput, hashPassword, createFirm);
export default router;
