import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ServiceType from "../profile/ServiceType";

import { AccessTime, CheckCircle, DoDisturb } from "@mui/icons-material";
import "../../styles/components/profile/CreateReviewButton.scss";

export default function CollabSelector(props: { collab: any }) {
    const collab = props.collab;
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    function handleClick() {
        navigate(`/collab/${collab._id}`);
    }

    function handleHover() {
        setHover(!hover);
    }

    function StatusIcon() {
        return collab?.hidden ? <AccessTime color="warning" className="icon" /> : null;
    }

    return (
        <div className="collab-selector" onClick={handleClick}>
            <div className="collab-selector-top" />
            <div
                key={collab._id}
                className={`collab-selector-avatars ${hover ? "hover" : ""}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                {collab.users.map((user: any) => (
                    <img
                        src={`/api/assets/avatar/${user.userId || user._id}`}
                        alt="profile picture"
                        className="collab-selector-avatar"
                    />
                ))}
            </div>
            <div className="collab-selector-text">
                <Typography gutterBottom variant="h6" component="div" className="title">
                    {collab?.name}
                </Typography>
                <StatusIcon />

                {collab?.users?.map((user: any) => (
                    <ServiceType serviceType={user?.serviceType} />
                ))}
            </div>
        </div>
    );
}
