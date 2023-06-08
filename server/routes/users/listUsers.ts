import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("User Listing", req);

    logger.printInfo("Loading page...");
    let offset = Number(req.query.page) || 1;
    const search = (req.query.search || "").toString().trim() || "";
    const serviceType = (req.query.service || "").toString().trim() || "";
    const location = (req.query.location || "").toString().trim() || "";
    const rating = (Number(req.query.rating) || undefined) as number | undefined;
    const maxPerPage = 20;

    const result = await users.paginate(
        search != undefined && search != ""
            ? {
                  username: { $regex: search, $options: "i" },
                  hidden: false,
              }
            : serviceType != undefined && serviceType != ""
            ? {
                  serviceType: { $in: serviceType.split(",") },
                  hidden: false,
              }
            : location != undefined && location != ""
            ? {
                  location: { $in: location.split(",") },
                  hidden: false,
              }
            : rating != undefined && rating != 0
            ? {
                  rating: { $gte: rating - 1, $lte: rating + 1 },
                  hidden: false,
              }
            : { hidden: false },
        {
            limit: maxPerPage,
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
            users: result.docs,
        },
    });
};
