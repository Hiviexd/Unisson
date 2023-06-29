import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import moment from "moment";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import ContractSender from "../components/contract/ContractSender";
import ContractRecipient from "../components/contract/ContractRecipient";
import ContractActions from "../components/contract/ContractActions";

import { Typography, Alert } from "@mui/material";
import { ContentPasteSearch } from "@mui/icons-material";

import "../styles/pages/Contract.scss";

export default function Contract() {
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sender, setSender] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const { id } = useParams();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/contracts/${id}`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((res) => res.json())
            .then(async (d1) => {
                setContract(d1.data);
                fetch(`/api/users/${d1.data.senderId}`)
                    .then((res) => res.json())
                    .then((d2) => {
                        setSender(d2.data);
                        fetch(`/api/users/${d1.data.recipientId}`)
                            .then((res) => res.json())
                            .then((d3) => {
                                setRecipient(d3.data);
                                setLoading(false);
                            });
                    });
            });
    }, [id]);

    if (contract === null || sender === null || recipient === null || loading)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    if (contract === undefined)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <ErrorPage text="pas trouvé..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="contract-layout">
                <div className="contract-page">
                    <div className="contract-header">
                        <ContentPasteSearch className="icon" />
                        <Typography color="text.secondary" variant="h5" component="div">
                            Contract
                        </Typography>
                    </div>
                    <div className="contract-body">
                        <Alert
                            variant="filled"
                            severity={
                                contract.status === "pending"
                                    ? "warning"
                                    : contract.status === "accepted"
                                    ? "success"
                                    : "error"
                            }
                            sx={{
                                borderRadius: "10px",
                                boxShadow: "0 0 5px 0 rgba(41, 41, 41, 0.5)",
                                width: "100%",
                            }}>
                            Cet contract est{" "}
                            <b>
                                {contract.status === "pending"
                                    ? "en attente de réponse"
                                    : contract.status === "accepted"
                                    ? "accepté le " +
                                      moment(contract.updatedAt).format("DD/MM/YYYY à HH:mm")
                                    : "refusé le" +
                                      moment(contract.updatedAt).format("DD/MM/YYYY à HH:mm")}
                            </b>
                        </Alert>
                        <ContractSender user={sender} contract={contract} />
                        <ContractRecipient user={recipient} contract={contract} />
                        {contract.status === "pending" && login._id === contract.recipientId && (
                            <ContractActions contract={contract} setContract={setContract} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
