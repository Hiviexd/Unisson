import { Typography } from "@mui/material";
import { AdminMessage } from "../../../types/AdminMessage";
import { AccessTime, Cancel, CheckCircle } from "@mui/icons-material";

import "./../../styles/components/admin/MessageCard.scss";

export default function MessageCard(props: { message: AdminMessage }) {
    const message: AdminMessage = props.message;

    const gradientStyle = {
        background: `linear-gradient(90deg, ${
            message.type === "request" ? "#AAC7D8" : "#F77171"
        } 0%, #f1f1f1 20%,  #f1f1f1 80%, ${
            message.status === "pending"
                ? "#ffac00"
                : message.status === "accepted"
                ? "#1df27d"
                : "#ff5050"
        } 105%)`,
    };

    function GetStatus() {
        switch (message.status) {
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
                            {message.type === "request" ? "Accepté" : "Traité"}
                        </Typography>
                    </>
                );
            case "rejected":
                return (
                    <>
                        <Cancel className="message-status-icon" />
                        <Typography variant="body2" color="text.secondary" component="div">
                            Rejeté
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
        <div className="message-card" style={gradientStyle}>
            <div className="message-text">
                <div className="message-avatar">
                    <img
                        src={`/api/assets/avatar/${message.userId}`}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <Typography variant="h6" component="div">
                    {message.username}
                </Typography>
                {message.type === "report" && (
                    <Typography
                        marginLeft={0.8}
                        variant="body2"
                        color="text.secondary"
                        component="div">
                        a signalé{" "}
                        {message.reportType === "review" ? <b>l'avis</b> : <b>le profil</b>} de{" "}
                        {message.culpritUsername}
                    </Typography>
                )}
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
