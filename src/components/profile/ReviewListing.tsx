import { Pagination } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Review from "./Review";
import LoadingPage from "../../pages/LoadingPage";
import ErrorPage from "../../pages/ErrorPage";
import ReviewCreate from "../dialogs/reviews/ReviewCreate";

import { Typography } from "@mui/material";
import { Reviews } from "@mui/icons-material";

import { AuthContext } from "../../providers/AuthContext";

import "./../../styles/components/profile/ReviewListing.scss";

export default function ReviewListing(props: { userId: string }) {
    const userId = props.userId;
    const [reviews, setReviews] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { login } = useContext(AuthContext);

    function refreshReviews() {
        fetch(`/api/reviews/${userId}?page=${page}`)
            .then((r) => r.json())
            .then((d) => {
                setReviews(d.data.reviews);
                setTotalPages(d.data.totalPages);
            });
    }

    function handlePageChange(event: any, value: number) {
        setPage(value);
        refreshReviews();
    }

    useEffect(() => {
        refreshReviews();
    }, [userId, page]);

    if (reviews === null)
        return (
            <div className="profile-body-reviews">
                <LoadingPage />
            </div>
        );

    return (
        <div className="profile-body-card">
            <div className="profile-body-card-header">
                <Reviews className="profile-body-card-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Avis
                </Typography>
            </div>
            <div className="profile-body-reviews">
                {login.authenticated && login._id !== userId && <ReviewCreate userId={userId} />}
                {reviews.length === 0 ? (
                    <ErrorPage text="Pas d'avis..." />
                ) : (
                    <div className="profile-body-reviews-list">
                        {reviews.map((review: any) => (
                            <Review key={review._id} loggedInUser={login} review={review} />
                        ))}
                    </div>
                )}
                <div className="profile-body-reviews-pagination">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
}
