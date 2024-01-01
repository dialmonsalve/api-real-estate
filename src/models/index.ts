import Property from "./Property";
import Price from "./Price";
import Category from "./Category";
import User from "./User";

Property.belongsTo(Price,{foreignKey:"priceId"})
Property.belongsTo(Category,{foreignKey:"categoryId"})
Property.belongsTo(User,{foreignKey:"userId"})

export { Property, Price, Category, User };
