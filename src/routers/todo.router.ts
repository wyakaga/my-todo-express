import { Router } from "express";

import todoController from "../controllers/todo.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const todoRouter: Router = Router();

todoRouter.post("/", isAuthenticated, todoController.create);
todoRouter.get("/", isAuthenticated, todoController.readAll);

export default todoRouter;
