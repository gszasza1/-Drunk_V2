import express from 'express';

import registrationRouter from './registration';

const apiRouter = express.Router();

apiRouter.use("/registration", registrationRouter);

export default apiRouter;
