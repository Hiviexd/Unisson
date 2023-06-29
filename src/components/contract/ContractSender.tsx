import moment from "moment";
import { Typography } from "@mui/material";
import { ForwardToInbox } from "@mui/icons-material";

import "./../../styles/components/contract/ContractSender.scss";

export default function ContractSender(props: { user: any; contract: any }) {
    const user = props.user;
    const contract = props.contract;
    return (
        <div className="contract-sender">
            <div className="contract-sender-header">
                <ForwardToInbox className="contract-sender-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Expéditeur
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
                <b>Crée le:</b> {moment(contract?.createdAt).format("DD/MM/YYYY à HH:mm")}
            </Typography>
            <b>Message:</b>
            <Typography className="text-display" gutterBottom color="text.primary" component="div">
                {contract?.content}
            </Typography>
        </div>
    );
}
