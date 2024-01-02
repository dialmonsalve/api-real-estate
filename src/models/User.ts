import { DataTypes, type Model } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db";
import { IUser } from "../types";

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
		scopes :{
			deletePassword:{
				attributes:{
					exclude: ["password", "token", "confirm", "createdAt", "updatedAt"]
				}
			}
		}
	},
);

User.prototype.verifyPassword = function (password: string) {
	return bcrypt.compareSync(password, this.password);
};

export default User;
