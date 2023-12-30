import express, { Router } from "express";
import { loginForm, registerForm, forgetPasswordForm, userRegister, confirmAccount } from "../controllers";

const userRoute = Router();
userRoute.use(express.json());

userRoute.get("/login", loginForm);

userRoute.get("/register", registerForm);
userRoute.post("/register", userRegister);

userRoute.get("/confirm/:token", confirmAccount)
userRoute.get("/forget-password", forgetPasswordForm);

export default userRoute;
