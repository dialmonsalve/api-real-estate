import type { Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import config from "../utils/config";
import { User } from "../models";

import { AuthenticatedRequest, IUser } from "../types";

export const protectPath = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const { _token } = req.cookies;

	if (!_token) {
		return res.status(401).json({ msg: "There is no token in the request" });
	}

	try {
		const decoded = jwt.verify(_token, `${config.keyJwt}`) as IUser;
		const user = await User.scope("deletePassword").findByPk(decoded.id);

		if (!user) {
			return res.json({ authenticated: false, msg: "redirecting" });
		}
		req.user = user;

		next();
    
	} catch (error) {
		console.log(error);
		return res.status(401).json({
      msg: 'Token no valid'
    })
	}
};
