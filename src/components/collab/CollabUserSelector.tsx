import { useNavigate } from "react-router-dom";
import { Typography, Rating } from "@mui/material";
import { AccessTime, CheckCircle, DoDisturb } from "@mui/icons-material";

import ServiceType from "../profile/ServiceType";

import "../../styles/components/collab/CollabUserSelector.scss";

export default function CollabUserSelector(props: { user: any; hidden: boolean }) {
    const { user, hidden } = props;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user.userId}`);
    }

    function StatusIcon() {
        switch (user.status) {
            case "accepted":
                return <CheckCircle color="success" className="icon" />;
            case "rejected":
                return <DoDisturb color="error" className="icon" />;
            default:
                return <AccessTime color="warning" className="icon" />;
        }
    }

    return (
        <div
            className="collab-selector"
            onClick={handleClick}
            style={{
                background: `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${
                    user.userId || user._id
                })`,
            }}>
            <div className="collab-selector-top" />
            <div className="collab-selector-image">
                <img
                    src={`/api/assets/avatar/${user.userId || user._id}`}
                    alt="profile picture"
                    className="avatar"
                />
            </div>
            <div className="collab-selector-text">
                <div className="collab-selector-text-top">
                    <Typography gutterBottom variant="h6" component="div" className="title">
                        {user?.username}
                    </Typography>
                    {hidden && <StatusIcon />}
                </div>
                <Rating
                    name="read-only"
                    value={user?.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                />
                <ServiceType serviceType={user?.serviceType} />
            </div>
        </div>
    );
}
