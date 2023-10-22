import { Router } from "express";

import authController from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const authRouter: Router = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.delete("/logout", isAuthenticated, authController.logout);

export default authRouter;
