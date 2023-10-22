import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import prisma from "../configs/prisma.config";
import env from "../configs/env.config";
import response from "../utils/response";

export default {
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const user = await prisma.user.findUnique({ where: { email } });

			if (!user) return response(res, 401, "Invalid email or password!");

			const isPwdValid = bcrypt.compareSync(password, user.password);

			if (!isPwdValid) return response(res, 401, "Invalid email or password!");

			const payload = { userId: user.id };
			const jwtSecret = env.JWT_SECRET;
			const jwtOptions = { expiresIn: "1d" };

			jwt.sign(payload, jwtSecret, jwtOptions, async (error, token) => {
				if (error) throw error;
				response(res, 200, "Successfully logged in!", { token });
			});
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
