import express from 'express';

import { createFirm, createMember, hashPassword, validateFirmInput, validateMemberInput } from '../middlewares/registration';

var router = express.Router();

router.post("/member", validateMemberInput, hashPassword, createMember);
router.post("/firm", validateFirmInput, hashPassword, createFirm);
export default router;
