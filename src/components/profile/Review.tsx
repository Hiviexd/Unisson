import { Typography, Rating, Button } from "@mui/material";
import { Warning, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";

import "./../../styles/components/profile/Review.scss";

export default function Review(props: { review: any }) {
    const review = props.review;

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
                    gutterBottom
                    color={review?.comment ? "text.primary" : "text.secondary"}
                    component="div">
                    {review?.comment || "No comment"}
                </Typography>
            </div>
            <div className="profile-body-review-footer">
                <div className="review-buttons">
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<Warning />}>
                        Report
                    </Button>
                    <div className="user-buttons">
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            startIcon={<Delete />}>
                            Delete
                        </Button>
                        <Button
                            className="edit-button"
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<Edit />}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
