import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import db from "./config/db";
import { propertyRoute, userRoute } from "./routers";
import config from "./utils/config";

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(csrf({ cookie: true }));

app.use("/api/auth", userRoute);
app.use("/api", propertyRoute);

db.authenticate()
	.then((res) => {
		db.sync();
		console.log("Database is online");
	})
	.catch((err) => console.log(err));

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}...`);
});
