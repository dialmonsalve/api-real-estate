import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

const passwordMatch = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { password } = req.body;

	await check("repeatPassword")
		.equals(password)
		.withMessage("Passwords aren't equals")
		.run(req);

	next();
};

export { passwordMatch };
