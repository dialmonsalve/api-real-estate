import { DataTypes } from "sequelize";

import db from "../config/db";

const Price = db.define("price", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }

})

export default Price;