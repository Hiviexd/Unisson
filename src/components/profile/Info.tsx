import { Typography, Rating } from "@mui/material";

import ServiceType from "./ServiceType";
import ChatButton from "./ChatButton";
import ProviderButton from "./ProviderButton";

export default function Info(props: { user: any }) {
    const user = props.user;

    const phoneNumber = () => {
        return user.phone
            .toString()
            .replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
    };

    return (
        <>
            <div className="profile-header-avatar">
                <img
                    src="https://picsum.photos/200"
                    alt="avatar"
                    className="avatar"
                />
            </div>
            <div className="profile-header-info">
                <Typography gutterBottom variant="h5" component="div">
                    {user?.username}
                </Typography>
                <ServiceType serviceType={user?.serviceType} />
                <Rating
                    name="read-only"
                    value={user?.rating}
                    readOnly
                    precision={0.5}
                />
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
                    +216 {phoneNumber()}
                </Typography>
                <div className="profile-header-bio">
                    <Typography gutterBottom component="div">
                        {user?.bio}
                    </Typography>
                </div>
                <ProviderButton user={user} />
                <ChatButton user={user} />
            </div>
        </>
    );
}
