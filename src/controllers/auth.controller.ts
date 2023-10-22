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
	register: async (req: Request, res: Response) => {
		try {
			const { email, password }: { email: string; password: string } = req.body;

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gim;
			const checkUser = await prisma.user.findUnique({ where: { email } });

			if (checkUser) return response(res, 400, "User already registered!");
			if (!emailRegex.test(email)) return response(res, 403, "Invalid email address!");
			if (password.length < 6) return response(res, 403, "Password at least has 6 characters!");

			const hashed = bcrypt.hashSync(password, 10);

			const newUser = await prisma.user.create({
				data: { email, password: hashed },
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			response(res, 201, "Successfully registered!", newUser);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			const token = req.header("Authorization")?.split(" ")[1];
			if (!token) return response(res, 401, "Authentication is required");
			const isTokenInvalid = await prisma.tokenBlacklist.findUnique({ where: { token } });
			if (isTokenInvalid) return response(res, 403, "Invalid token");
			await prisma.tokenBlacklist.create({ data: { token } });
			response(res, 200, "Successfully logged out");
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
