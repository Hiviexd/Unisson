//? import dependencies
import express, { Handler } from "express";
import { LoggerConsumer } from "../server/helpers/LoggerConsumer";
import dotenv from "dotenv";
import path from "path";
import "../database";

const logger = new LoggerConsumer("database");

//? import routes
import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

//? middleware
app.use(express.json());

//? routes
app.use("/api", routes);

//? error handling
app.use((err, req, res, next) => {
	logger.printError("Server error: ", err.message);
	res.status(500).send("Internal server error");
});

// //? 404
// app.use((req, res) => {
// 	res.status(404).send("Not found");
// });

if (process.env.NODE_ENV == "production") {
	app.use("/assets", express.static(path.resolve("./dist/assets")));

	app.use("/", (req, res) => res.sendFile(path.resolve("./dist/index.html")));

	app.listen(app.get("port"), () => {
		logger.printSuccess(
			"Server started on port ".concat(app.get("port"))
		);
	});
}

export const handler: Handler = app;

//? export
export default app;
