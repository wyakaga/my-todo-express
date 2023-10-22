import { Router } from "express";

import userController from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/api/v1/user/:id", userController.readSingle);
userRouter.patch("/api/v1/user/:id", userController.update);

export default userRouter;
