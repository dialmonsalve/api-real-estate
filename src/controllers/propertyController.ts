import { type Request, type Response } from "express";

import { Category, Price, Property } from "../models";
import { AuthenticatedRequest } from "../types";

const admin = async (req: AuthenticatedRequest, res: Response) => {
	const { user } = req;
	const { page } = req.query;

	const regex = /^[1-9]$/;

	if (!regex.test(`${page}`)) {
		return res.json({ query: "/my-properties?property=1" });
	}

	try {
		const limit = 10;
		const offset = Number(page) * limit - limit;

		const [properties, total] = await Promise.all([
			Property.findAll({
				limit,
				offset,
				where: {
					userId: user?.id,
				},
				include: [
					{ model: Category, as: "category" },
					{ model: Price, as: "price" },
				],
			}),
			Property.count({
				where: {
					userId: user?.id,
				},
			}),
		]);

		return res.json({
			data: { properties, total, totalPages: Math.ceil(total / limit) },
		});
	} catch (error) {
		console.log(error);
	}
};

const categoriesAndPrices = async (req: Request, res: Response) => {
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

const saveProperty = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	property.publish = true;

	await property.save();

	return res.json({ msg: "Property created successfully" });
};

const edit = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const { user } = req;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	if (user?.id.toString() !== property.userId.toString()) {
		return res.json({ msg: "User unauthorized" });
	}

	const [categories, prices] = await Promise.all([
		Category.findAll({raw:true}),
		Price.findAll({raw:true}),
	]);

	return res.json({ categories, prices, data: property });
};

const update = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const { user } = req;

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

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	if (user?.id.toString() !== property.userId.toString()) {
		return res.json({ msg: "User unauthorized" });
	}

	try {
		property.set({
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
			userId: user.id,
			image,
		});

		property.save();

		return res.json({
			msg: "Property has updated successfully",
			id,
		});
	} catch (error) {
		console.log(error);
	}

	const [categories, prices] = await Promise.all([
		Category.findAll(),
		Price.findAll(),
	]);

	return res.json({ categories, prices, data: req.body });
};

const remove = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const { user } = req;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	if (user?.id.toString() !== property.userId.toString()) {
		return res.json({ msg: "User unauthorized" });
	}

	await property.destroy();

	return res.json({ msg: "Property has been deleted successfully" });
};

const getProperty = async (req: Request, res: Response) => {
	const { id } = req.params;

	const property = await Property.findByPk(id);

	if (!property) {
		return res.status(404).json({ msg: `Property ${id} doesn't exist` });
	}

	try {
		const property = Property.findByPk(id, {
			include: [
				{ model: Category, as: "category" },
				{ model: Price, as: "price" },
			],
		});

		return res.json({ property });
	} catch (error) {
		console.log(error);
	}
};

export {
	admin,
	categoriesAndPrices,
	getProperty,
	create,
	addImage,
	saveProperty,
	edit,
	update,
	remove,
};
