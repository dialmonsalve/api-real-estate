import { type Request, type Response } from "express";

import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/User";
import { generateId, generateJWT } from "../utils/jwt";
import { emailRegister, emailForgetPassword } from "../utils/mailtrap";

const getProperties = (req: Request, res: Response) => {
	return res.json({ message: "getProperties" });
};

export {
	getProperties
};
