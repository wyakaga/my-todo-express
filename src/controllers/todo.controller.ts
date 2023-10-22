import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import prisma from "../configs/prisma.config";
import response from "../utils/response";

export default {
	create: async (req: Request, res: Response) => {
		try {
			const { title, description, deadline } = req.body;
			const userId: number = (req.authInfo as JwtPayload).userId;

			if (!title || !description || !deadline) return response(res, 400, "All fields are required");

			const content = {
				title,
				description,
				deadline: new Date(deadline),
				userId,
			};

			const data = await prisma.todo.create({ data: content });
			response(res, 201, "Created successfully", data);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
