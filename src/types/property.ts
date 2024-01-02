import type { Model } from "sequelize";

export interface IProperty extends Model {
	id: string;
	title: string;
	description: string;
	rooms: number;
	parking: number;
	wc: number;
	street: string;
	lat: string;
	lng: string;
	priceId: string;
	categoryId: number;
	userId: string;
	publish:boolean
}
