import { DataTypes } from "sequelize";

import db from "../config/db";

const Property = db.define("property", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parking: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wc:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  street:{
    type: DataTypes.STRING(60),
    allowNull: false
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image : {
    type: DataTypes.STRING,
    allowNull: false
  },
  publish : {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

export default Property;
