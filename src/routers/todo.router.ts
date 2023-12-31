import { Router } from "express";

import todoController from "../controllers/todo.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const todoRouter: Router = Router();

todoRouter.post("/", isAuthenticated, todoController.create);
todoRouter.get("/", isAuthenticated, todoController.readAll);
todoRouter.get("/:id", isAuthenticated, todoController.readSingle);
todoRouter.patch("/:id", isAuthenticated, todoController.updateTodo);
todoRouter.patch("/:id/status", isAuthenticated, todoController.updateStatus);
todoRouter.delete("/:id", isAuthenticated, todoController.delete);

export default todoRouter;
