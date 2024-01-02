import { type Request, type Response } from "express";

import bcrypt from "bcrypt";

import User from "../models/User";
import { generateId, generateJWT } from "../utils/jwt";
import { emailRegister, emailForgetPassword } from "../utils/mailtrap";

const loginForm = (req: Request, res: Response) => {
	return res.json({ message: "login", csrtoekn: req.csrfToken() });
};

const authentication = async (req: Request, res: Response) => {
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

	const token = generateJWT({ id: userOnDB.id, name: userOnDB.name });

	return res
	.cookie("_token", token, {
		httpOnly: true,
		secure: true,
		sameSite: true,
	})
	.json({
		msg: "The user has been successfully authenticated",
		error: false,
		token,
	});
};

const registerForm = (req: Request, res: Response) => {
	return res.json({ message: "Register account" });
};

const forgetPasswordForm = (req: Request, res: Response) => {
	return res.json({ message: "forget-password" });
};

const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		token: generateId(),
	});

	emailRegister({ name: user.name, email: user.email, token: user.token });

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
			message: "There is a error confirming your account",
			error: true,
		});
	}

	user.token = null;
	user.confirm = true;

	await user.save();

	return res.json({
		title: "Confirmed account",
		message: "Your account has been successfully confirmed",
	});
};

const resetPassword = async (req: Request, res: Response) => {
	const { email } = req.body;

	const userOnDB = await User.findOne({ where: { email } });

	if (!userOnDB) {
		return res
			.status(400)
			.json({ errors: [{ msg: "The user isn't registered" }] });
	}

	userOnDB.token = generateId();

	await userOnDB.save();

	emailForgetPassword({ email, name: userOnDB.name, token: userOnDB.token });

	return res.json({
		title: "Reset your password",
		message: "We have sent your email with the instructions",
	});
};

const findOutToken = async (req: Request, res: Response) => {
	const { token } = req.params;

	const user = await User.findOne({ where: { token } });

	if (!user) {
		return res.status(403).json({
			errors: [{ msg: "There is an error when try to reset your password" }],
			error: true,
		});
	}

	return res.json({ title: "Reset your password" });
};

const newPassword = async (req: Request, res: Response) => {
	const { token } = req.params;
	const { password } = req.body;

	const user = await User.findOne({ where: { token } });

	if (!user) {
		return res.status(403).json({
			message: "There is a error when try to reset your password",
			error: true,
		});
	}

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);
	user.token = null;

	await user.save();

	return res.json({ message: "Password is changed successfully" });
};

export {
	authentication,
	confirmAccount,
	findOutToken,
	forgetPasswordForm,
	loginForm,
	newPassword,
	registerForm,
	resetPassword,
	registerUser,
};
