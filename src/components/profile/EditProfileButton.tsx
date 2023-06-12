import { Edit } from "@mui/icons-material";

import "./../../styles/components/profile/EditProfileButton.scss";

export default function ProviderButton() {
    return (
        <div className="edit-profile-button">
            <Edit className="edit-profile-icon" />
            Modifier profil
        </div>
    );
}
