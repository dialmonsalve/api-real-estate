import type { Model } from "sequelize";
import { Request } from 'express';

export interface IUser extends Model {
  
	id: string;
	name: string;
	email: string;
	password: string;
	token: null | string;
	confirm: boolean;
	updatedAt: string;
	createdAt: string;
	verifyPassword: (password: string) => boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}