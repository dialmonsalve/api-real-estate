import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import db from "./config/db";
import config from "./utils/config";
import { userRoute } from "./routers";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use("/api/auth", userRoute);

db.authenticate()
	.then((res) => {
		db.sync();
		console.log("Database is online");
	})
	.catch((err) => console.log(err));

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}...`);
});
