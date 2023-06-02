import { Typography, Rating, Tooltip } from "@mui/material";

import ServiceType from "./ServiceType";
import ChatButton from "./ChatButton";
import ProviderButton from "./ProviderButton";
import Calendar from "./Calendar";

import "./../../styles/components/profile/Info.scss";

export default function Info(props: { user: any }) {
    const user = props.user;

    const phoneNumber = (num: number) => {
        return num.toString().replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
    };

    return (
        <div
            className="profile-header"
            style={{
                background: `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${user._id})`,
            }}>
            <div className="profile-header-avatar">
                <img
                    src={`/api/assets/avatar/${user._id}`}
                    alt="avatar"
                    className="avatar"
                />
            </div>
            <div className="profile-header-info">
                <Typography gutterBottom variant="h5" component="div">
                    {user?.username}
                </Typography>
                <ServiceType serviceType={user?.serviceType} />
                <Calendar availability={user?.availability} />
                <Tooltip title={user?.rating} placement="right" arrow>
                    <div className="profile-header-rating">
                        <Rating
                            name="read-only"
                            value={user?.rating}
                            readOnly
                            precision={0.5}
                        />
                    </div>
                </Tooltip>
                <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div">
                    {user?.email}
                </Typography>
                <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div">
                    +216 {user?.phone && phoneNumber(user.phone)}
                </Typography>
                <div className="profile-header-bio">
                    <Typography gutterBottom component="div">
                        {user?.bio}
                    </Typography>
                </div>
                <ProviderButton user={user} />
                <ChatButton user={user} />
            </div>
        </div>
    );
}
