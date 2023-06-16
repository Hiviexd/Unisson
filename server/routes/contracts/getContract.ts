import { Request, Response } from "express";
import { contracts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

const logger = new LoggerConsumer("contracts");

export default async (req: Request, res: Response) => {
    logger.printInfo("Getting contract...");

    const contract = await contracts.findOne({ _id: req.params.id });

    if (!contract) {
        logger.printError("Contract not found");
        return res.status(404).send({
            status: 404,
            message: "Contract not found",
        });
    }

    logger.printSuccess("Contract found!");

    return res.status(200).send({
        status: 200,
        message: "Contract found!",
        data: contract,
    });
};
