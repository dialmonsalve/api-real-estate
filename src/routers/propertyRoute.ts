import express, { Router } from "express";
import { admin, getProperty, create } from "../controllers";
import { check } from "express-validator";
import { validFields } from "../middlewares";

const propertyController = Router();
propertyController.use(express.json());

propertyController.get("/my-properties", admin);

propertyController.get("/properties/create", getProperty);

propertyController.post(
	"/properties/create",
	[
		check("title", "Field title is required").notEmpty(),
		check("description", "Field description is required").notEmpty(),
		check(
			"description",
			"The description field must have a maximum of 200 characters",
		).isLength({ max: 200 }),
    check("category", "select a category").isNumeric(),
    check("price", "select a price range").isNumeric(),
    check("rooms", "select the amount of rooms").isNumeric(),
    check("parking", "select the amount of parking").isNumeric(),
    check("wc", "select the amount of bathrooms").isNumeric(),
    check("lat", "Locate the property on the map").notEmpty(),
		validFields,
	],
	create,
);

export default propertyController;
