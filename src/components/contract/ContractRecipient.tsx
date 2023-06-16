import { Typography } from "@mui/material";
import { ForwardToInbox } from "@mui/icons-material";

import "./../../styles/components/contract/ContractSender.scss";

export default function ContractRecipient(props: { user: any; contract: any }) {
    const user = props.user;
    const contract = props.contract;
    return (
        <div className="contract-sender">
            <div className="contract-sender-header">
                <ForwardToInbox className="contract-sender-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Destinataire
                </Typography>
            </div>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                <b>Nom d'utilisateur:</b> {user?.username}
            </Typography>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                <b>Email:</b> {user?.email}
            </Typography>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                <b>Téléphone:</b> +216 {user?.phone}
            </Typography>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                <b>Service:</b> {user?.serviceType}
            </Typography>
            {contract.status !== "pending" && (
                <Typography
                    className="text-display"
                    gutterBottom
                    color="text.primary"
                    component="div">
                    <b>Réponse:</b> {contract?.response}
                </Typography>
            )}
        </div>
    );
}
