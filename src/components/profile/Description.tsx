import { Typography } from "@mui/material";

import "./../../styles/components/profile/Description.scss";

export default function Description(props: { desc: string }) {
    const desc = props.desc;
    return (
        <div className="profile-body-card">
            <Typography gutterBottom variant="h5" component="div">
                Description
            </Typography>
            <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div">
                {desc}
            </Typography>
        </div>
    );
}
