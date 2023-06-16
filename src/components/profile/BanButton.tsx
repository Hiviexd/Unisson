import { Gavel } from "@mui/icons-material";

import "./../../styles/components/profile/BanButton.scss";

export default function BanButton() {
    return (
        <div className="ban-button">
            <Gavel className="ban-icon" />
            Bannir
        </div>
    );
}
