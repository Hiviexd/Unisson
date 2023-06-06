import { Request, Response } from "express";
import { collabs } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("listCollabs", req);
    const search = (req.query.search || "").toString().trim() || "";
    const serviceType = (req.query.service || "").toString().trim() || "";
    const { page, limit } = req.query;

    logger.printInfo("Getting collabs...");

    let offset = Number(page) || 1;
    let collabsPerPage = Number(limit) || 20;

    const result = await collabs.paginate(
        search != undefined && search != ""
            ? {
                  name: { $regex: search, $options: "i" },
                  hidden: false,
              }
            : serviceType != undefined && serviceType != ""
            ? {
                  "users.serviceType": { $in: serviceType.split(",") },
                  hidden: false,
              }
            : { hidden: false },
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
