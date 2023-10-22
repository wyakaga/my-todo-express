import { Request, Response } from "express";

import prisma from "../configs/prisma.config";
import response from "../utils/response";
import { JwtPayload } from "jsonwebtoken";

export default {
	readSingle: async (req: Request, res: Response) => {
		try {
			const id = Number((req.authInfo as JwtPayload).userId);
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
	update: async (req: Request, res: Response) => {
		try {
			const id = Number((req.authInfo as JwtPayload).userId);
			const { firstName, lastName }: { firstName: string; lastName: string } = req.body;

			const checkUser = await prisma.user.findUnique({ where: { id } });
			if (!checkUser) return response(res, 400, "No such user exist!");

			const updatedData = {
				firstName: firstName || checkUser.firstName,
				lastName: lastName || checkUser.lastName,
			};

			const data = await prisma.user.update({
				where: { id },
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					createdAt: true,
					updatedAt: true,
				},
				data: updatedData,
			});

			response(res, 200, "Updated succesfully!", data);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
