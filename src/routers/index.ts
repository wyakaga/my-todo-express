import { Request, Response, Router } from "express";

import response from "../utils/response";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import todoRouter from "./todo.router";

const mainRouter: Router = Router();

mainRouter.use("/api/v1/auth", authRouter);
mainRouter.use("/api/v1/user", userRouter);
mainRouter.use("/api/v1/todo", todoRouter);

mainRouter.get("/", async (req: Request, res: Response) => {
	response(res, 200, "OK", {
		authors: [
			{
				alias: "wyakaga",
				repository: "http://github.com/wyakaga",
			},
		],
	});
});

export default mainRouter;
