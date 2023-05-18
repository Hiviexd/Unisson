import { Request, Response } from "express";
import { reviews } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { Review } from "../../../types/Review";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("createReview", req);

    logger.printInfo(`Creating review for post ${req.params.id}`);

   const reviewList = await reviews.findOne({ _id: req.params.id });

    if (!reviewList) {
        logger.printError("Post not found");
        return res.status(404).send({
            status: 404,
            message: "Post not found",
        });
    }

    reviewList.reviews.push({
        _id: crypto.randomBytes(20).toString("hex").slice(20),
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
        createdAt: new Date(),
    } as Review);


    logger.printSuccess(`Review for post ${req.params.id} created!`);

    return res.status(200).send({
        status: 200,
        message: "Review created!",
        data: {
            postId: reviewList._id,
            review: reviewList.reviews[reviewList.reviews.length - 1],
        },
    });
}