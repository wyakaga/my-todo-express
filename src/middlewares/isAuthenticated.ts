import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import prisma from "../configs/prisma.config";
import env from "../configs/env.config";
import response from "../utils/response";

declare global {
	namespace Express {
		interface Request {
			authInfo: string | JwtPayload | undefined;
		}
	}
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	const bearerToken = req.header("Authorization");

	if (!bearerToken) return response(res, 403, "Access Denied");

	const token = bearerToken.split(" ")[1];

	if (!token) return response(res, 403, "Access Denied");

	const isTokenValid = await prisma.tokenBlacklist.findUnique({ where: { token } });

	if (!isTokenValid) return response(res, 403, "Invalid token");

	jwt.verify(token, env.JWT_SECRET, (error, payload) => {
		if (error && error.name) return response(res, 403, error.message);
		if (error) return response(res, 500, "Internal Server Error", { error: error.message });
		req.authInfo = payload;
		next();
	});
};

export default isAuthenticated;
