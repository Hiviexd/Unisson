import { useNavigate } from "react-router-dom";
import { Typography, Rating } from "@mui/material";

import ServiceType from "../profile/ServiceType";

import "../../styles/components/collab/CollabSelector.scss";

export default function CollabUserSelector(props: { user: any }) {
    const user = props.user;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user.userId}`);
    }

    return (
        <div
            className="collab-selector"
            onClick={handleClick}
            style={{
                background: `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${user.userId})`,
            }}>
            <div className="collab-selector-top" />
            <div className="collab-selector-image">
                <img
                    src={`/api/assets/avatar/${user.userId}`}
                    alt="profile picture"
                    className="avatar"
                />
            </div>
            <div className="collab-selector-text">
                <Typography gutterBottom variant="h6" component="div" className="title">
                    {user?.username}
                </Typography>
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
