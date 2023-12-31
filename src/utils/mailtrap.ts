import nodemailer from "nodemailer";
import config from "./config";

interface Data {
	name: string;
	email: string;
	token: string | null;
}

const emailRegister = async (data: Data) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const { email, name, token } = data;

	// Send email
	await transport.sendMail({
		from: "realState.com",
		to: email,
		subject: "Confirm your account at realState.com",
		text: "Confirm your account at realState.com",
		html: `
			<p>Hello ${name}, Check your account at realState.com</p>

			<p> Your account is now ready, you just have to confirm it in the following link: 
				<a href="${config.backend}:${config.port}/api/auth/confirm/${token}"> Check your account</a> 
			</p>

			<p> If you did not create this account, you can ignore the message </p>
		`,
	});
};

const emailForgetPassword = async (data: Data) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const { email, name, token } = data;

	// Send email
	await transport.sendMail({
		from: "realState.com",
		to: email,
		subject: "Reset your password at realState.com",
		text: "Reset your password at realState.com",
		html: `
			<p>Hello ${name}, Have you requested to reset your password at realState.com?</p>

			<p> Follow the following link to reset your password: 
				<a href="${config.backend}:${config.port}/api/auth/forget-password/${token}"> Reset password</a> 
			</p>

			<p> if you did not request this password change, you can ignore the message </p>
		`,
	});
};

export { emailRegister, emailForgetPassword };
