import { ContentPasteGo } from "@mui/icons-material";

import "./../../styles/components/profile/ProviderButton.scss";

export default function ProviderButton(props: { user: any }) {
    const user = props.user;

    const handleClick = () => {
        console.log("provider request");
    };

    return (
        <div className="provider-button" onClick={handleClick}>
            <ContentPasteGo className="provider-icon" />
            Become a provider
        </div>
    );
}
