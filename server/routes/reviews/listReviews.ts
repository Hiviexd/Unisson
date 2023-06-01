import { Request, Response } from "express";
import { reviews } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { Review } from "../../../types/Review";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("Review Listing", req);
    logger.printInfo("Loading reviews...");
    let offset = Number(req.query.page) || 1;

    const result = await reviews.paginate(
        {
            profileId: req.params.id,
        },
        {
            limit: 20,
            page: offset,
            sort: {
                createdAt: -1,
            },
        }
    );

    return res.status(200).send({
        status: 200,
        data: {
            totalPages: result.totalPages,
            reviews: result.docs,
        },
    });
};
