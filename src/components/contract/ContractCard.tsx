import { useNavigate } from "react-router-dom";
import { Contract } from "../../../types/Contract";
import moment from "moment";

import { Typography } from "@mui/material";
import { AccessTime, Cancel, CheckCircle } from "@mui/icons-material";

import "./../../styles/components/admin/MessageCard.scss";

export default function MessageCard(props: { contract: Contract; type: string }) {
    const navigate = useNavigate();

    const contract: Contract = props.contract;
    const type: string = props.type;

    const user = {
        _id: type === "sent" ? contract.recipientId : contract.senderId,
        username: type === "sent" ? contract.recipientUsername : contract.senderUsername,
    };

    const gradientStyle = {
        background: `linear-gradient(90deg, #AAC7D8 0%, #f1f1f1 20%,  #f1f1f1 80%, ${
            contract.status === "pending"
                ? "#ffac00"
                : contract.status === "accepted"
                ? "#1df27d"
                : "#ff5050"
        } 105%)`,
    };

    function handleClick() {
        navigate(`/contract/${contract._id}`);
    }

    function GetStatus() {
        switch (contract.status) {
            case "pending":
                return (
                    <>
                        <AccessTime className="message-status-icon" />
                        <Typography variant="body2" color="text.secondary" component="div">
                            En attente
                        </Typography>
                    </>
                );
            case "accepted":
                return (
                    <>
                        <CheckCircle className="message-status-icon" />
                        <Typography variant="body2" color="text.secondary" component="div">
                            Accepté
                        </Typography>
                    </>
                );
            case "rejected":
                return (
                    <>
                        <Cancel className="message-status-icon" />
                        <Typography variant="body2" color="text.secondary" component="div">
                            Refusé
                        </Typography>
                    </>
                );
            default:
                return (
                    <>
                        <AccessTime className="message-status-icon" />
                        <Typography variant="body2" color="text.secondary" component="div">
                            En attente
                        </Typography>
                    </>
                );
        }
    }

    return (
        <div className="message-card" style={gradientStyle} onClick={handleClick}>
            <div className="message-text">
                <div className="message-avatar">
                    <img src={`/api/assets/avatar/${user._id}`} alt="avatar" className="avatar" />
                </div>
                <Typography variant="h6" component="div">
                    {user.username}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    marginLeft={0.8}
                    marginTop={0.5}>
                    {moment(contract.updatedAt).format("DD/MM/YYYY à HH:mm")}
                </Typography>
            </div>
            <div className="message-status">
                <Typography variant="body2" color="text.secondary" component="div">
                    Statut:
                </Typography>
                <GetStatus />
            </div>
        </div>
    );
}
