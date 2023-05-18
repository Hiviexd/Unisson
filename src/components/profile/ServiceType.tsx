import { Typography } from "@mui/material";
import {
    CameraAlt,
    LibraryMusic,
    Restaurant,
    MeetingRoom,
} from "@mui/icons-material";

import text from "./../../utils/text";
import "./../../styles/components/profile/ServiceType.scss";

export default function ServiceType(props: { serviceType: string }) {
    const serviceType = props.serviceType;

    function getIcon() {
        switch (serviceType) {
            case "photographe":
                return <CameraAlt className="icon-color" />;
            case "traiteur":
                return <Restaurant className="icon-color" />;
            case "bande":
                return <LibraryMusic className="icon-color" />;
            case "espace":
                return <MeetingRoom className="icon-color" />;
            default:
                return <></>;
        }
    }
    return (
        <div className="profile-body-service-type">
            {getIcon()}
            <Typography
                className="profile-body-service-type-text"
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div">
                {text.capitalizeFirstLetter(serviceType)}
            </Typography>
        </div>
    );
}
