import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routers";
import db from "./config/db";

const PORT = process.env.PROD_PORT || process.env.DEV_PORT;

dotenv.config();
const app = express();
require("dotenv").config();

app.use("/api/auth", userRoute);

db.authenticate()
	.then((res) => {
		console.log(res);
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log(`Server listen on port ${PORT}...`);
});
