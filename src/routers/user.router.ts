import { Router } from "express";

import userController from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/api/v1/user/:id", userController.readSingle);

export default userRouter;
