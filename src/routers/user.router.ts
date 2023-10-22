import { Router } from "express";

import userController from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter: Router = Router();

userRouter.get("/", isAuthenticated, userController.readSingle);
userRouter.patch("/", isAuthenticated, userController.update);

export default userRouter;
