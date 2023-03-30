import { Request, Response } from "express";
import { users } from "../../../database";
import { PasswordManager } from "../../helpers/PasswordManager";

export default async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// ? Check if the provided data is valid
	if (
		!email ||
		!password ||
		typeof email != "string" ||
		typeof password != "string"
	)
		return res.status(400).send({
			status: 400,
			message: "Invalid credentials",
		});

	const user = await users.findOne({
		email: email.trim(),
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "Invalid email or password.",
		});

	const passwordManager = new PasswordManager(password, user.passwordHash);

	if (!(await passwordManager.isValid()))
		return res.status(400).send({
			status: 400,
			message: "Invalid email or password.",
		});

	return res.status(200).send({
		status: 200,
		message: "Authorized!",
		data: {
			_id: user._id,
            email: user.email,
			username: user.username,
			accountToken: user.accountToken,
			authenticated: true,
			permissions: user.permissions,
		},
	});
};
