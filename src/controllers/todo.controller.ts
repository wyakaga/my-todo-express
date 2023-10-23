import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import prisma from "../configs/prisma.config";
import response from "../utils/response";
import isValidDate from "../utils/isValidDate";

export default {
	create: async (req: Request, res: Response) => {
		try {
			const { title, description, deadline } = req.body;
			const userId: number = (req.authInfo as JwtPayload).userId;

			if (!title || !description || !deadline) return response(res, 400, "All fields are required");
			if (!isValidDate(deadline)) return response(res, 400, "Date input should be in YYYY-MM-DD format")

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
	readAll: async (req: Request, res: Response) => {
		try {
			const userId: number = (req.authInfo as JwtPayload).userId;

			let orderBy: Prisma.TodoOrderByWithRelationInput = { id: "asc" };

			if (req.query.sortBy === "latest") orderBy = { deadline: "asc" };
			if (req.query.sortBy === "oldest") orderBy = { deadline: "desc" };

			const search = req.query.search || "";
			const limit = Number(req.query.limit) || 10;
			const page = Number(req.query.page) || 1;
			const skip = page === 1 ? 0 : (page - 1) * limit;

			const result = await prisma.todo.findMany({
				where: {
					OR: [
						{
							description: {
								contains: String(search),
								mode: "insensitive",
							},
						},
						{
							title: {
								contains: String(search),
								mode: "insensitive",
							},
						},
					],
					userId,
				},
				orderBy,
				take: limit,
				skip,
			});

			const count = await prisma.todo.count({
				where: {
					OR: [
						{
							description: {
								contains: String(search),
								mode: "insensitive",
							},
						},
						{
							title: {
								contains: String(search),
								mode: "insensitive",
							},
						},
					],
					userId,
				},
			});

			const totalPages = Math.ceil(count / limit);
			const nextPage = page < totalPages ? page + 1 : null;
			const prevPage = page > 1 ? page - 1 : null;

			const meta = {
				totalItems: count,
				totalPages,
				currentPage: page,
				nextPage: nextPage ? `${req.protocol}://${req.headers.host}/user?page=${nextPage}` : null,
				prevPage: prevPage ? `${req.protocol}://${req.headers.host}/user?page=${prevPage}` : null,
			};

			response(res, 200, "OK", { result, meta });
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
	readSingle: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const userId: number = (req.authInfo as JwtPayload).userId;

			const data = await prisma.todo.findUnique({
				where: {
					id: Number(id),
					userId,
				},
			});

			if (!data) return response(res, 404, "Data not found");

			response(res, 200, "OK", data);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
	updateTodo: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { title, description, deadline } = req.body;
			const userId: number = (req.authInfo as JwtPayload).userId;

			const checkTodo = await prisma.todo.findUnique({
				where: {
					id: Number(id),
					userId,
				},
			});

			if (!checkTodo) return response(res, 400, "No such data exist");
			if (!isValidDate(deadline)) return response(res, 400, "Date input should be in YYYY-MM-DD format")

			const [date] = checkTodo.deadline.toISOString().split("T");

			console.log(typeof deadline)

			const updatedData = {
				title: String(title) || checkTodo.title,
				description: String(description) || checkTodo.description,
				deadline: deadline ? new Date(deadline) : new Date(date),
			};

			const data = await prisma.todo.update({
				where: { id: Number(id) },
				data: updatedData,
			});

			response(res, 200, "Updated succesfully", data);
		} catch (error) {
			console.log(error);
			response(res, 500, "Internal Server Error", (error as Error).message);
		}
	},
};
