import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("User Listing", req);

    logger.printInfo("Loading page...");
    let offset = Number(req.query.page) || 1;
    const search = (req.query.query || "").toString().trim() || "";
    const maxPerPage = 20;

    const result = await users.paginate(
        search != undefined && search != ""
            ? {
                  username: { $in: search.split(",") },
                  serviceType: { $in: search.split(",") },
                  hidden: false,
              }
            : {
                  hidden: false,
              },
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
