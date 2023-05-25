import { Link, useNavigate } from "react-router-dom";
import { Typography, Rating } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import text from "../../../utils/text";

import ServiceType from "./../../profile/ServiceType";

import "../../../styles/components/listing/ProfileSelector.scss";

export default function ProfileSelector(props: { user: any }) {
    const user = props.user;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user._id}`);
    }

    return (
        <div className="profile-selector" onClick={handleClick} style={{background: `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${user._id})`}}>
            <div className="profile-selector-top" />
            <div className="profile-selector-image">
                <img
                    src={`/api/assets/avatar/${user._id}`}
                    alt="Profile picture"
                    className="avatar"
                />
            </div>
            <div className="profile-selector-text">
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="title">
                    {user?.username}
                </Typography>
                <Rating
                    name="read-only"
                    value={user?.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                />
                <Typography variant="body2" color="text.secondary">
                    {user?.bio && text.truncateString(user?.bio, 100)}
                </Typography>
                <div className="profile-selector-info">
                    <ServiceType serviceType={user?.serviceType} />
                    <div className="profile-selector-location">
                        <LocationOn className="icon-color" />
                        <Typography
                            className="profile-selector-location-text"
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                            component="div">
                            {user?.location}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}
