import express from 'express';

import loginRouter from './login';
import logoutRouter from './logout';
import registrationRouter from './registration';

const apiRouter = express.Router();

apiRouter.use("/registration", registrationRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/logout", logoutRouter);

export default apiRouter;
