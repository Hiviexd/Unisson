import { LoggerConsumer } from "../helpers/LoggerConsumer";

export default async function updateReviewScore(
    reviews: any,
    user: any,
    logger: LoggerConsumer
) {
    logger.printInfo(`Updating review scores for user ${user._id}`);
    const userReviews = await reviews.find({ profileId: user._id });

    // calculate average rating
    let totalRating = 0;
    userReviews.forEach((review: any) => {
        totalRating += review.rating;
    });
    const averageRating = totalRating / userReviews.length;

    // update user profile
    await user.updateOne({ rating: averageRating });
    logger.printSuccess(`Review scores updated for user ${user._id}`);
}
