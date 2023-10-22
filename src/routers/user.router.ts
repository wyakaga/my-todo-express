import { Router } from "express";

import userController from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter: Router = Router();

userRouter.get("/api/v1/user/:id", isAuthenticated, userController.readSingle);
userRouter.patch("/api/v1/user/:id", isAuthenticated, userController.update);

export default userRouter;
