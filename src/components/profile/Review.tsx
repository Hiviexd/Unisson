import { Typography, Rating } from "@mui/material";

import ReviewDelete from "../dialogs/ReviewDelete";
import ReviewUpdate from "../dialogs/ReviewUpdate";
import ReviewReport from "../dialogs/ReviewReport";

import user from "../../utils/user";

import "./../../styles/components/profile/Review.scss";

export default function Review(props: { loggedInUser: any; review: any }) {
    const { loggedInUser, review } = props;

    return (
        <div className="profile-body-review">
            <div className="profile-body-review-header">
                <div className="profile-review-avatar">
                    <img
                        src={`/api/assets/avatar/${review?.posterId}`}
                        alt="avatar"
                        className="review-avatar"
                    />
                </div>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="review-name">
                    {review?.posterName}
                </Typography>
                <Rating
                    name="read-only"
                    value={review?.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                />
            </div>
            <div className="profile-body-review-body">
                <Typography
                    className="text-display"
                    gutterBottom
                    color={review?.comment ? "text.primary" : "text.secondary"}
                    component="div">
                    {review?.comment || "No comment"}
                </Typography>
            </div>
            <div className="profile-body-review-footer">
                <div className="review-buttons">
                    <ReviewReport review={review} />

                    <div className="user-buttons">
                        {(loggedInUser._id === review.posterId ||
                            user.isAdmin(loggedInUser)) && (
                            <ReviewDelete review={review} />
                        )}
                        {loggedInUser._id === review.posterId && (
                            <ReviewUpdate review={review} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
