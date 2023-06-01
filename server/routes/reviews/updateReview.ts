import { Request, Response } from "express";
import { reviews, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import updateReviewScore from "../../helpers/updateReviewScore";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("updateReview", req);

    logger.printInfo(`Updating review ${req.params.id}`);

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

    if (req.body.rating) {
        if (typeof req.body.rating != "number") {
            logger.printError(`Rating is not a number!`);

            return res.status(400).send({
                status: 400,
                message: "Rating is not a number!",
            });
        } else if (req.body.rating < 0 || req.body.rating > 5) {
            logger.printError(`Rating is not between 0 and 5!`);

            return res.status(400).send({
                status: 400,
                message: "Rating is not between 0 and 5!",
            });
        }

        review.rating = req.body.rating;
    } else {
        logger.printError(`Rating not found!`);

        return res.status(400).send({
            status: 400,
            message: "Rating not found!",
        });
    }

    if (req.body.comment) {
        if (typeof req.body.comment != "string") {
            logger.printError(`Comment is not a string!`);

            return res.status(400).send({
                status: 400,
                message: "Comment is not a string!",
            });
        }

        review.comment = req.body.comment;
    } else {
        review.comment = undefined;
    }

    review.updatedAt = new Date();

    review.posterName = user.username;

    await review.save();

    const updatedUser = await users.findOne({ _id: review.profileId });

    await updateReviewScore(reviews, updatedUser, logger);

    logger.printSuccess(`Review ${review._id} updated!`);

    return res.status(200).send({
        status: 200,
        message: "Review updated!",
        data: {
            review,
        },
    });
};
