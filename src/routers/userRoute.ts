import express, { Router } from "express";
import {
	authentication,
	confirmAccount,
	findOutToken,
	forgetPasswordForm,
	loginForm,
	newPassword,
	registerForm,
	resetPassword,
	userRegister,
} from "../controllers";

const userRoute = Router();
userRoute.use(express.json());

userRoute.get("/login", loginForm);
userRoute.post("/login", authentication);

userRoute.get("/register", registerForm);
userRoute.post("/register", userRegister);

userRoute.get("/confirm/:token", confirmAccount);

userRoute.get("/forget-password", forgetPasswordForm);
userRoute.post("/forget-password", resetPassword);
userRoute.get("/forget-password/:token", findOutToken);
userRoute.post("/forget-password/:token", newPassword);

export default userRoute;
