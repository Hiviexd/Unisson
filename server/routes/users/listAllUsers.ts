import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("User Listing", req);

    logger.printInfo("Loading all users...");
    let offset = Number(req.query.page) || 1;
    const search = (req.query.search || "").toString().trim() || "";
    const maxPerPage = 12;

    const result = await users.paginate(
        search != undefined && search != ""
            ? {
                  username: { $regex: search, $options: "i" },
              }
            : {},
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
