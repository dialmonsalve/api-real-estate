import express, { Router } from "express";
import { admin, getProperty, create, addImage, saveProperty } from "../controllers";
import { check } from "express-validator";
import { protectPath, validFields } from "../middlewares";

const propertyController = Router();
propertyController.use(express.json());

propertyController.get("/my-properties", protectPath, admin);

propertyController.get("/properties/create", protectPath, getProperty);

propertyController.post(

	"/properties/create",
	[
		protectPath,
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

propertyController.get("/properties/add-image/:id", protectPath, addImage)

propertyController.post("/properties/add-image/:id", protectPath, saveProperty)

export default propertyController;
