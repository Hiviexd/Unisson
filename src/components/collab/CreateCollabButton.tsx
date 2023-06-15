import { BorderColor } from "@mui/icons-material";

import "./../../styles/components/profile/CreateReviewButton.scss";

export default function CreateCollabButton() {
    return (
        <div className="review-button">
            <BorderColor className="review-button-icon" />
            Créer collaboration
        </div>
    );
}
