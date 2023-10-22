import { Request, Response, Router } from "express";

import response from "../utils/response";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const mainRouter: Router = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);

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
