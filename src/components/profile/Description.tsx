import { Typography } from "@mui/material";
import { Info } from "@mui/icons-material";

import "./../../styles/components/profile/Description.scss";

export default function Description(props: { desc: string }) {
    const desc = props.desc;
    return (
        <div className="profile-body-card">
            <div className="profile-body-card-header">
                <Info className="profile-body-card-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Information
                </Typography>
            </div>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                {desc}
            </Typography>
        </div>
    );
}
