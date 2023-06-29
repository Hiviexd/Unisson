import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import user from "../../utils/user";
import { useNavigate } from "react-router-dom";

import { Typography, Rating, Tooltip } from "@mui/material";

import ServiceType from "./ServiceType";
import ChatButton from "./ChatButton";
import Calendar from "./Calendar";
import ContractCreate from "../dialogs/contract/ContractCreate";
import EditProfileButton from "./EditProfileButton";
import BanButton from "./BanButton";
import ReportButton from "./ReportButton";

import "./../../styles/components/profile/Info.scss";

export default function Info(props: { user: any }) {
    const selectedUser = props.user;
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const phoneNumber = (num: number) => {
        return num.toString().replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
    };

    const handleProfileEdit = () => {
        navigate(`/settings`);
    };

    return (
        <div
            className="profile-header"
            style={{
                background: `linear-gradient(0deg, #f1f1f1 50%, rgba(0, 0, 0, 0.3) 130%) center no-repeat, url(/api/assets/avatar/${selectedUser._id})`,
            }}>
            <div className="profile-header-avatar">
                <img
                    src={`/api/assets/avatar/${selectedUser._id}`}
                    alt="avatar"
                    className="avatar"
                />
            </div>
            <div className="profile-header-info">
                <Typography gutterBottom variant="h5" component="div">
                    {selectedUser?.username}
                </Typography>
                {selectedUser?.permissions.includes("provider") && (
                    <>
                        <ServiceType serviceType={selectedUser?.serviceType} />
                        <Calendar user={selectedUser} />
                        <Tooltip title={selectedUser?.rating} placement="right" arrow>
                            <div className="profile-header-rating">
                                <Rating
                                    name="read-only"
                                    value={selectedUser?.rating}
                                    readOnly
                                    precision={0.5}
                                />
                            </div>
                        </Tooltip>
                    </>
                )}
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                    {selectedUser?.email}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                    +216 {selectedUser?.phone && phoneNumber(selectedUser.phone)}
                </Typography>
                <div className="profile-header-bio">
                    <Typography gutterBottom component="div">
                        {selectedUser?.bio}
                    </Typography>
                </div>
                {login._id === selectedUser._id ? (
                    <div onClick={handleProfileEdit}>
                        <EditProfileButton />
                    </div>
                ) : (
                    <>
                        {/*<ChatButton user={selectedUser} />*/}
                        {!user.isProvider(login) && <ContractCreate user={selectedUser} />}
                        {user.isAdmin(login) ? <BanButton /> : <ReportButton />}
                    </>
                )}
            </div>
        </div>
    );
}
