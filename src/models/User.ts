import { DataTypes, type Model } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db";

interface IUser extends Model {
  name: string;
  email: string;
  password: string;
  token: null | string;
  confirm: boolean;
  updatedAt:string;
  createdAt:string
}

const User = db.define<IUser>(
	"user",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: DataTypes.STRING,
		confirm: DataTypes.BOOLEAN,
	},
	{
		hooks: {
			beforeCreate: async (user) => {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password as string, salt);
			},
		},
	},
);

export default User;
