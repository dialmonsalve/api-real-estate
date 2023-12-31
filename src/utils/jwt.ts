
import jwt from "jsonwebtoken";
import config from "./config";

interface Data {
  id:string;
  name:string
}

const generateId = () =>
	Math.random().toString(32).substring(2) + Date.now().toString(32);

const generateJWT = (data: Data) =>
	jwt.sign({ id: data.id, name:data.name }, `${config.keyJwt}` , {
		expiresIn: "1d",
	});
  

export { generateId, generateJWT };
