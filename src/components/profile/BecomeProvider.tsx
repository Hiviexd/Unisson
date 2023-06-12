import { Typography } from "@mui/material";
import ProviderRequest from "../dialogs/ProviderRequest";

import "./../../styles/components/profile/BecomeProvider.scss";

export default function BecomeProvider() {
    return (
        <div className="become-provider-card">
            <Typography
                className="text-display"
                gutterBottom
                color="text.primary"
                variant="h6"
                component="div">
                Vous souhaitez partager vos services ?
            </Typography>
            <ProviderRequest />
        </div>
    );
}
