import { Request, Response, Router } from "express";

import response from "../utils/response";

const mainRouter: Router = Router();

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
