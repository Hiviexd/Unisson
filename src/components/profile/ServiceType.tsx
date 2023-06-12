import { Typography } from "@mui/material";
import {
    CameraAlt,
    LibraryMusic,
    Restaurant,
    MeetingRoom,
    Shield,
    Person,
    ContentPasteGo,
} from "@mui/icons-material";

import text from "./../../utils/text";
import "./../../styles/components/profile/ServiceType.scss";

export default function ServiceType(props: { user?: any; serviceType: string }) {
    const user = props.user;
    const serviceType = props.serviceType;

    function getIcon() {
        if (user) {
            if (user.permissions.includes("admin")) return <Shield className="icon-color" />;
            if (user.permissions.includes("provider"))
                return <ContentPasteGo className="icon-color" />;
            if ((user.permissions = ["user"])) return <Person className="icon-color" />;
        }
        switch (serviceType) {
            case "photographe":
                return <CameraAlt className="icon-color" />;
            case "traiteur":
                return <Restaurant className="icon-color" />;
            case "bande": //! FIXME remove after db reset
                return <LibraryMusic className="icon-color" />;
            case "band":
                return <LibraryMusic className="icon-color" />;
            case "espace":
                return <MeetingRoom className="icon-color" />;
            case "salle":
                return <MeetingRoom className="icon-color" />;
            default:
                return <></>;
        }
    }

    function getRole() {
        if (user.permissions.includes("admin")) return "Administrateur";
        if (user.permissions.includes("provider")) return "Fournisseur";
        if ((user.permissions = ["user"])) return "Utilisateur";
    }

    if (user)
        return (
            <div className="profile-body-service-type">
                {getIcon()}
                <Typography
                    className="profile-body-service-type-text"
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div">
                    {getRole()}
                </Typography>
            </div>
        );

    return (
        <div className="profile-body-service-type">
            {getIcon()}
            <Typography
                className="profile-body-service-type-text"
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div">
                {serviceType && text.capitalizeFirstLetter(serviceType)}
            </Typography>
        </div>
    );
}
