import { Report } from "@mui/icons-material";

import "./../../styles/components/profile/BanButton.scss";

export default function BanButton() {
    return (
        <div className="ban-button ban">
            <Report className="ban-icon" />
            Signaler
        </div>
    );
}
