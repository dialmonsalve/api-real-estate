import { type Request, type Response } from "express";

const loginForm = (req: Request, res: Response) => {
	

	return res.json({ Message: "login" });
};

const registerForm = (req: Request, res: Response) => {
	

	return res.json({ Message: "login" });
};

const forgetPasswordForm = (req: Request, res: Response) => {
	

	return res.json({ Message: "login" });
};

export { loginForm, registerForm, forgetPasswordForm };
