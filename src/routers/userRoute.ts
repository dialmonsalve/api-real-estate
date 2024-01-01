import express, { Router } from "express";

import { check } from "express-validator";
import { validFields, passwordMatch } from "../middlewares";

import {
	authentication,
	confirmAccount,
	findOutToken,
	forgetPasswordForm,
	loginForm,
	newPassword,
	registerForm,
	resetPassword,
	registerUser,
} from "../controllers";

import { existUserWhitEmail } from "../utils";

const userRoute = Router();
userRoute.use(express.json());

// Endpoints to login page
userRoute.get("/login", loginForm);

userRoute.post(
	"/login",
	[
		check("email", "Field email is required").isEmail(),
		check("password", "Field password is required").notEmpty(),
		validFields,
	],
	authentication,
);

// Endpoints to register page
userRoute.get("/register", registerForm);

userRoute.post(
	"/register",
	[
		check("name", "Name is requerid").notEmpty(),
		check("email", "This field doesn't a valid email").isEmail(),
		check("password", "Password must be at least six characters").isLength({
			min: 6,
		}),
		passwordMatch,
		existUserWhitEmail,
		validFields,
	],
	registerUser,
);

// Endpoints to confirm token page
userRoute.get("/confirm/:token", confirmAccount);

// Endpoints to forget password page
userRoute.get("/forget-password", forgetPasswordForm);

userRoute.post(
	"/forget-password",
	[check("email", "This field doesn't a valid email").isEmail(), validFields],
	resetPassword,
);

userRoute.get("/forget-password/:token", findOutToken);

userRoute.post(
	"/forget-password/:token",
	[
		check("password", "Password must be at least six characters").isLength({
			min: 6,
		}),
		validFields,
	],
	newPassword,
);

export default userRoute;
