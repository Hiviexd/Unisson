import { BorderColor } from "@mui/icons-material";

import "./../../styles/components/profile/CreateReviewButton.scss";

export default function ProviderButton() {
    return (
        <div className="review-button">
            <BorderColor className="review-button-icon" />
            Ajouter avis
        </div>
    );
}
