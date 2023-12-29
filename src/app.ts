import express from "express";
import config from "./utils/config";
import db from "./config/db";
import { userRoute } from "./routers";

const app = express();

app.use("/api/auth", userRoute);

db.authenticate()
.then((res) => {

	console.log("Database is online");
	
})
.catch((err) => console.log(err));

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}...`);
});
