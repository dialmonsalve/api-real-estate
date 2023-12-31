import { type Request, type Response } from "express";

import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/User";
import { generateId, generateJWT } from "../utils/jwt";
import { emailRegister, emailForgetPassword } from "../utils/mailtrap";

const loginForm = (req: Request, res: Response) => {
	return res.json({ message: "login" });
};

const authentication = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	await check("email")
		.isEmail()
		.withMessage("Field email is required")
		.run(req);
	await check("password")
		.notEmpty()
		.withMessage("Field password is required")
		.run(req);

	const results = validationResult(req);

	if (!results.isEmpty()) {
		return res.status(400).json({ errors: results.array() });
	}

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
		.json({ msg: "The user has been successfully authenticated", error: false })
		.cookie("_token", token, {
			httpOnly: true,
			secure: true,
			sameSite:true
		});
};

const registerForm = (req: Request, res: Response) => {
	return res.json({ message: "Register account" });
};

const forgetPasswordForm = (req: Request, res: Response) => {
	return res.json({ message: "forget-password" });
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
		return res.status(400).json({ errors: results.array() });
	}

	const userOnDB = await User.findOne({ where: { email } });

	if (userOnDB) {
		return res
			.status(400)
			.json({ errors: [{ msg: "The user is already registered" }] });
	}

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
			title: "Error confirming your account",
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

	await check("email")
		.isEmail()
		.withMessage("This field doesn't a valid email")
		.run(req);

	const results = validationResult(req);

	if (!results.isEmpty()) {
		return res.status(400).json({ errors: results.array() });
	}

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
			title: "Reset your password",
			message: "There is a error when try to reset your password",
			error: true,
		});
	}

	return res.json({ title: "Reset your password" });
};

const newPassword = async (req: Request, res: Response) => {
	await check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least six characters")
		.run(req);

	const results = validationResult(req);

	if (!results.isEmpty()) {
		return res.status(400).json({ errors: results.array() });
	}

	const { token } = req.params;
	const { password } = req.body;

	const user = await User.findOne({ where: { token } });

	if (!user) return;

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
	userRegister,
};
