import { DataTypes} from "sequelize";
import bcrypt from "bcrypt";
import db from "./db.mjs";

const User = db.define(
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
				user.password = await bcrypt.hash(user.password, salt);
			},
		},
	},
);

User.prototype.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

export default User;
