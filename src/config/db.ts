import {   Sequelize } from "sequelize";

import config from "../utils/config";

const db = new Sequelize(
	config.database.name,
	config.database.username,
	config.database.password,
	{
		host: config.database.host,
		port: config.database.port,
		dialect: "mysql",
		define: {
			timestamps: true,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		operatorsAliases:{
		}
	},
);

export default db;
