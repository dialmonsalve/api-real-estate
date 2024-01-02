import {Category, Price, User} from "./index.mjs";
// import Category  from "./Category.mjs";
// import Price from "./Price.mjs";
import db from "./db.mjs";
import categories from "./categories.mjs";
import prices from "./prices.mjs";
import users from "./users.mjs";

const importData = async () => {
	try {
		await db.authenticate();

		await db.sync();

		await Promise.all([
			Category.bulkCreate(categories),
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

		// await Promise.all([
		// 	Category.destroy({where:{}, truncate:true}),
		// 	Price.destroy({where:{}, truncate:true}),
		// ]);

		await db.sync({force:true})

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
