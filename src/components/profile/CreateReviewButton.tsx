import { BorderColor } from "@mui/icons-material";

import "./../../styles/components/profile/CreateReviewButton.scss";

export default function ProviderButton() {
    const handleClick = () => {
        console.log("create review");
    };

    return (
        <div className="review-button" onClick={handleClick}>
            <BorderColor className="review-button-icon" />
            Create a review
        </div>
    );
}
