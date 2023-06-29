import { EmailOutlined } from "@mui/icons-material";

import "./../../styles/components/contract/CreateContractButton.scss";

export default function ProviderButton() {
    return (
        <div className="contract-button">
            <EmailOutlined className="contract-icon" />
            Réserver
        </div>
    );
}
