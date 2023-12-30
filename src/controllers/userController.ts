import { type Request, type Response } from "express";

import { check, validationResult } from "express-validator";

import User from "../models/User";
import { generateId } from "../utils/jwt";
import { emailRegister } from "../utils/mailtrap";

const loginForm = (req: Request, res: Response) => {
	return res.json({ message: "login" });
};

const registerForm = (req: Request, res: Response) => {	
	return res.json({ message: "Register account" , csrfToken: req.csrfToken()});
};

const forgetPasswordForm = (req: Request, res: Response) => {
	
	return res.json({ message: "login" });
};

const userRegister = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	await check("name").notEmpty().withMessage("Name is requerid").run(req);
	await check("email")
		.isEmail()
		.withMessage("This field doesn't a valid email")
		.run(req);
	await check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least six characters")
		.run(req);
	await check("repeatPassword")
		.equals(password)
		.withMessage("Passwords aren't equals")
		.run(req);

	const results = validationResult(req);

	if (!results.isEmpty()) {
		return res.status(400).json({errors: results.array(), csrfToken: req.csrfToken()});
	}

	const isUserOnDB = await User.findOne({ where: { email } });

	if (isUserOnDB) {
		return res.status(400).json([{ msg: "The user is already registered", csrfToken: req.csrfToken() }]);
	}

	const user = await User.create({
		name,
		email,
		password,
		token: generateId(),
	});

	emailRegister({ name: user.name, email: user.email, token: user.token });
	console.log(req.csrfToken());

	return res.json({
		title: "Account created successfully",
		message: "Send to your email a confirmation, follow the link",
		user: {
			name,
			email,
			updatedAt: user.updatedAt,
			createdAt: user.createdAt,
		},
	});

};

const confirmAccount = async (req: Request, res: Response) => {
	const { token } = req.params;

	const user = await User.findOne({ where: { token } });

	if (!user) {
		return res.status(403).json({
			title: "Error confirming your account",
			msg: "There is a error confirming your account",
			error: true,
		});
	}

	user.token = null;
	user.confirm = true;

	await user.save();

	return res.json({
		title: "Confirmed account",
		msg: "Your account has been successfully confirmed",
	});
};

export {
	loginForm,
	registerForm,
	forgetPasswordForm,
	userRegister,
	confirmAccount,
};
