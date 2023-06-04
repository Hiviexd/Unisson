import { Request, Response } from "express";
import { reviews, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { Review } from "../../../types/Review";
import crypto from "crypto";
import updateReviewScore from "../../helpers/updateReviewScore";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("createReview", req);

    logger.printInfo(`Creating review for user ${req.params.id}`);

    const { rating, comment } = req.body;

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError(`User ${req.params.id} not found!`);

        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });
    }

    const poster = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!poster)
        return res.status(404).send({
            status: 404,
            message: "poster not found!",
        });

    // check if user has already reviewed this profile
    const existingReview = await reviews.findOne({
        profileId: req.params.id,
        posterId: poster._id,
    });

    if (existingReview) {
        logger.printError(`User ${req.params.id} has already been reviewed!`);

        return res.status(400).send({
            status: 400,
            message: "User has already been reviewed!",
        });
    }

    if (!rating) {
        logger.printError(`Rating not found!`);

        return res.status(400).send({
            status: 400,
            message: "Rating not found!",
        });
    } else if (typeof rating != "number") {
        logger.printError(`Rating is not a number!`);

        return res.status(400).send({
            status: 400,
            message: "Rating is not a number!",
        });
    }

    if (rating < 1 || rating > 5) {
        logger.printError(`Rating is not between 1 and 5!`);

        return res.status(400).send({
            status: 400,
            message: "Rating is not between 1 and 5!",
        });
    }

    if (comment && typeof comment != "string") {
        logger.printError(`Comment is not a string!`);

        return res.status(400).send({
            status: 400,
            message: "Comment is not a string!",
        });
    }

    const review: Review = {
        _id: crypto.randomBytes(16).toString("hex"),
        profileId: req.params.id,
        posterId: poster._id,
        posterName: poster.username,
        rating: rating,
        comment: comment,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await reviews.create(review);

    logger.printSuccess(`Review for post ${req.params.id} created!`);

    await updateReviewScore(reviews, user, logger);

    return res.status(200).send({
        status: 200,
        message: "Review created!",
        data: {
            review,
        },
    });
};
