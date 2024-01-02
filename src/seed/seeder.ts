import {Category, Price, User} from "../models";
import db from "../config/db";
import category from "./categories";
import prices from "./prices";
import users from "./user";

const importData = async () => {
	try {
		await db.authenticate();

		await db.sync();

		await Promise.all([
			Category.bulkCreate(category),
			Price.bulkCreate(prices),
			User.bulkCreate(users),
		]);

		console.log("Data inserts successfully");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const deleteData = async ()=>{


	try {
		await db.authenticate();

		await db.sync();

		await Promise.all([
			Category.destroy({where:{}, truncate:true}),
			Price.destroy({where:{}, truncate:true}),
		]);

		// await db.sync({force:true})

		console.log("Truncate Data successfully");
		process.exit(0);
		
	} catch (error) {
		console.log(error);
		process.exit(1);
		
	}
}

if (process.argv[2] === "-i") {
	importData();
}
if (process.argv[2] === "-d") {
	deleteData();
}
