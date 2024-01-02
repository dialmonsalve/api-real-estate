import { response, type Request, type Response } from "express";

import { Category, Price, Property } from "../models";
import { AuthenticatedRequest } from "../types";
import { Identifier } from "sequelize";

const admin = (req: Request, res: Response) => {
	return res.json({ message: "getProperties" });
};

const getProperty = async (req: Request, res: Response) => {
	const [categories, prices] = await Promise.all([
		Category.findAll(),
		Price.findAll(),
	]);
	return res.json({ categories, prices, data: {} });
};

const create = async (req: AuthenticatedRequest, res: Response) => {
	const {
		title,
		description,
		rooms,
		parking,
		wc,
		street,
		lat,
		lng,
		price,
		category,
		image,
	} = req.body;

	const userId = req.user?.id;

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
			categoryId: category,
			userId,
			image,
		});

		return res.json({
			msg: "Property has created successfully",
			id: propertySaved.id,
		});
	} catch (error) {
		console.log(error);
	}
};

const addImage = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const { user } = req;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	if (property.publish) {
		return res.json({ msg: `Property ${id} is published` });
	}

	if (user?.id.toString() !== property.userId.toString()) {
		return res.json({ msg: "User unauthorized" });
	}

	return res.json({ msg: "User authorized" });
};

const saveProperty = async (req: AuthenticatedRequest, res: Response)=>{

	const { id } = req.params;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	property.publish = true;

	await property.save();

	return res.json({ msg: "Property created successfully" });

}

export { admin, getProperty, create, addImage, saveProperty };
