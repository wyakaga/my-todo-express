import { Request, Response } from "express";

import prisma from "../configs/prisma.config";
import response from "../utils/response";

export default {
	readSingle: async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id);
			const data = await prisma.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			response(res, 200, "OK", data);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
