import { Request, Response } from "express";
import { adminMessages } from "../../../../database";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";

const logger = new LoggerConsumer("adminMessages");

export default async (req: Request, res: Response) => {
    logger.printInfo("Getting admin messages...");

    let offset = Number(req.query.page) || 1;
    let type = (req.query.type || "request").toString().trim();

    const result = await adminMessages.paginate(
        // get messages where type = request or type = report
        type === "request" ? { type: "request" } : { type: "report" },
        {
            limit: 20,
            page: offset,
            sort: {
                createdAt: -1,
            },
        }
    );

    logger.printSuccess("Admin messages found!");

    return res.status(200).send({
        status: 200,
        message: "Admin messages found!",
        data: {
            totalPages: result.totalPages,
            type,
            messages: result.docs,
        },
    });
};
