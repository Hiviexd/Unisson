import { Request, Response } from "express";
import { contracts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

const logger = new LoggerConsumer("contracts");

export default async (req: Request, res: Response) => {
    logger.printInfo("Getting contracts...");

    const { loggedInUser } = req.body;

    let offset = Number(req.query.page) || 1;
    let type = (req.query.type || "").toString().trim();

    const result = await contracts.paginate(
        type === "sent" ? { senderId: loggedInUser._id } : { recipientId: loggedInUser._id },
        {
            limit: 20,
            page: offset,
            sort: {
                updatedAt: -1,
            },
        }
    );

    logger.printSuccess("Contracts found!");

    return res.status(200).send({
        status: 200,
        message: "Contracts found!",
        data: {
            totalPages: result.totalPages,
            type,
            contracts: result.docs,
        },
    });
};
