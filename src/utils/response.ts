import { Response } from "express";

const response = (res: Response, statusCode: number, message: string, data?: unknown) => {
	res.status(statusCode).json({
		statusCode,
		message,
		data,
	});
};

export default response;
