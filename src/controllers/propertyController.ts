import { type Request, type Response } from "express";

import {Category, Price, Property} from "../models";

const admin = (req: Request, res: Response) => {
	return res.json({ message: "getProperties" });
};

const getProperty = async (req: Request, res: Response) => {

	const [categories, prices] = await Promise.all([
		Category.findAll(),
		Price.findAll(),
		
	])
	return res.json({ categories, prices, data:{} });
};

const create = async (req: Request, res: Response) => {

	const { title, description, rooms, parking, wc, street, lat, lng, price, category } = req.body

	try {
		const propertySaved = await Property.create({
			title,
			description,
			rooms,
			parking,
			wc,
			street,
			lat,
			lng,
			priceId: price,
			categoryId: category
		})
	} catch (error) {
		console.log(error);
		
	}
	

};

export {
	admin,
	getProperty,
	create
};
