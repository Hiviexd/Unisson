import { Typography } from "@mui/material";

import "./../../styles/components/collab/CollabDescription.scss";

export default function CollabDescription(props: { desc: string }) {
    const desc = props.desc;
    return (
        <div className="collab-description">
            <Typography gutterBottom variant="h5" component="div">
                Description
            </Typography>
            <Typography
                className="text-display"
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div">
                {desc}
            </Typography>
        </div>
    );
}
