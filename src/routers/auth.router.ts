import { Router } from "express";

import authController from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const authRouter: Router = Router();

authRouter.post("/api/v1/login", authController.login);
authRouter.post("/api/v1/register", authController.register);
authRouter.delete("/api/v1/logout",isAuthenticated ,authController.logout);

export default authRouter;
