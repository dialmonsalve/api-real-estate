import Property from "./Property.mjs";
import Price from "./Price.mjs";
import Category from "./Category.mjs";
import User from "./User.mjs";

Property.belongsTo(Price,{foreignKey:"priceId"})
Property.belongsTo(Category,{foreignKey:"categoryId"})
Property.belongsTo(User,{foreignKey:"userId"})

export { Property, Price, Category, User };
