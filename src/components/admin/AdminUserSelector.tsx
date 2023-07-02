import { useNavigate } from "react-router-dom";
import { Typography, Rating } from "@mui/material";

import ServiceType from "../profile/ServiceType";

import "../../styles/components/collab/CollabSelector.scss";

export default function AdminUserSelector(props: { user: any }) {
    const user = props.user;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user._id}`);
    }

    const bgColor = !user.permissions.includes("user") ? "#f83e3e" : "#f1f1f1";

    let background = "";

    !user.permissions.includes("user")
        ? (background = `linear-gradient(0deg, #f83e3e -10%, #f1f1f1 25%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${user._id})`)
        : (background = `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${user._id})`);

    return (
        <div
            className="collab-user-selector"
            onClick={handleClick}
            style={{
                background: background,
            }}>
            <div className="collab-user-selector-top" />
            <div className="collab-user-selector-image">
                <img
                    src={`/api/assets/avatar/${user._id}`}
                    alt="profile picture"
                    className="avatar"
                />
            </div>
            <div className="collab-user-selector-text">
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
                <ServiceType user={user} serviceType={user?.serviceType} />
            </div>
        </div>
    );
}
