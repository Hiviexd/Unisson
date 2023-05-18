import { Link, useNavigate } from "react-router-dom";
import { Typography, Rating } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import ServiceType from "./../../profile/ServiceType";

import "../../../styles/components/listing/ProfileSelector.scss";

export default function ProfileSelector(props: { user: any }) {
    const user = props.user;
    return (
        <div className="profile-selector">
            <div className="profile-selector-top" />
            <div className="profile-selector-image">
                <img
                    src="https://picsum.photos/200"
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
                    {user?.bio}
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
