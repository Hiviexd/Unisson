import { Request, Response } from "express";
import { collabs } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("listCollabs", req);
    const { page } = req.query;

    logger.printInfo("Getting collabs...");

    let offset = Number(page) || 1;
    let collabsPerPage = 10;

    const result = await collabs.paginate(
        { "users.userId": req.body.loggedInUser._id },
        {
            limit: collabsPerPage,
            page: offset,
            sort: {
                createdAt: -1,
            },
        }
    );

    logger.printSuccess("Collabs found!");

    return res.status(200).send({
        status: 200,
        message: "Collabs found!",
        data: {
            totalPages: result.totalPages,
            collabs: result.docs,
        },
    });
};
