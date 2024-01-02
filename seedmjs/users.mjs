import bcrypt from "bcrypt";

const users = [
	{
		name: "user1",
		email: "user1@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		confirm: 1,
	},
	{
		name: "user2",
		email: "user2@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		confirm: 1,
	},
	{
		name: "user3",
		email: "user3@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		confirm: 1,
	},
	{
		name: "user4",
		email: "user4@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		confirm: 1,
	},
];

export default users;
