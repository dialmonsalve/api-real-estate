import type { NextFunction, Response, Request } from "express";
import User from "../models/User";

const existUserWhitEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "The user is already registered" }] });
		}
	} catch (err) {
		console.log(err);
	}

	next();
};


const notExistUserWithEmail = async(req: Request,
	res: Response,
	next: NextFunction,)=>{

  const { email, password } = req.body;

  const userOnDB = await User.findOne({ where: { email } });

	if (!userOnDB) {
		return res
			.status(400)
			.json({ errors: [{ msg: "The user doesn't exist" }] });
	}

	if (!userOnDB.confirm) {
		return res
			.status(400)
			.json({ errors: [{ msg: "Your account isn't confirmed" }] });
	}

	if (!userOnDB.verifyPassword(password)) {
		return res.status(400).json({ errors: [{ msg: "Error in credentials" }] });
	}

  next()
}

export { existUserWhitEmail };
