import { Router } from "express";
import { loginForm, registerForm, forgetPasswordForm } from "../controllers";

const userRoute = Router();

userRoute.get("/login", loginForm);
userRoute.get("/register", registerForm);
userRoute.get("/forget-password", forgetPasswordForm);

export default userRoute;
