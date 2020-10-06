import express from 'express';

import loginRouter from './login';
import registrationRouter from './registration';

const apiRouter = express.Router();

apiRouter.use("/registration", registrationRouter);

apiRouter.use("/login", loginRouter);

export default apiRouter;
