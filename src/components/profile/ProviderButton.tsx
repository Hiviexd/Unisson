import { ContentPasteGo } from "@mui/icons-material";

import "./../../styles/components/profile/ProviderButton.scss";

export default function ProviderButton() {
    return (
        <div className="provider-button">
            <ContentPasteGo className="provider-icon" />
            Devenir un fournisseur
        </div>
    );
}
