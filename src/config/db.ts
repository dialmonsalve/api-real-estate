import { Dialect, Sequelize } from "sequelize";

const db = new Sequelize(
	process.env.DB_NAME ?? "",
	process.env.DB_USER ?? "",
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: 3006,
		dialect: process.env.DB_DIALECT as Dialect,
		define: {
			timestamps: true,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		operatorsAliases: {},
	},
);

export default db;
