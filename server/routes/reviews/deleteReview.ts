import { Request, Response } from "express";
import { reviews, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import updateReviewScore from "../../helpers/updateReviewScore";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("deleteReview", req);

    logger.printInfo(`Deleting review ${req.params.id}`);

    const review = await reviews.findOne({ _id: req.params.id });

    if (!review) {
        logger.printError(`Review ${req.params.id} not found!`);

        return res.status(404).send({
            status: 404,
            message: "Review not found!",
        });
    }

    const user = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!user) {
        logger.printError(`User not found!`);

        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });
    }

    if (review.posterId != user._id) {
        logger.printError(
            `User ${user._id} does not own review ${review._id}!`
        );

        return res.status(403).send({
            status: 403,
            message: "You do not own this review!",
        });
    }

    await review.deleteOne();

    const updatedUser = await users.findOne({ _id: review.profileId });

    await updateReviewScore(reviews, updatedUser, logger);

    logger.printSuccess(`Review ${review._id} deleted!`);

    return res.status(200).send({
        status: 200,
        message: "Review deleted!",
        data: {
            review,
        },
    });
};
