import { Router } from "express";

import authController from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post("/api/v1/login", authController.login);

export default authRouter;
