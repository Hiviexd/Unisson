import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../providers/AuthContext";

import { Typography, TextField, Button } from "@mui/material";
import { BorderColor, CheckCircle, DoDisturb } from "@mui/icons-material";

import "./../../styles/components/contract/ContractActions.scss";

export default function ContractActions(props: { contract: any; setContract: any }) {
    const contract = props.contract;
    const setContract = props.setContract;
    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [response, setResponse] = useState("");

    const handleResponseEdit = (e: any) => {
        setResponse(e.target.value);
    };

    const handleResponse = (e: any) => {
        const status = e.target.id;
        console.log(status);
        console.log(response);
        fetch(`/api/contracts/${contract._id}/respond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                status,
                response,
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, {
                        variant: "error",
                    });
                    return;
                }

                enqueueSnackbar(`Contrat ${status === "accepted" ? "acceptée" : "refusée"}!`, {
                    variant: "success",
                });
                setContract(r.data);
            });
    };

    return (
        <div className="contract-actions">
            <div className="contract-actions-header">
                <BorderColor className="contract-actions-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Actions
                </Typography>
            </div>
            <TextField
                className="contract-actions-text"
                label="Réponse"
                variant="outlined"
                multiline
                rows={4}
                onChange={handleResponseEdit}
            />
            <div className="contract-actions-buttons">
                <Button
                    className="contract-actions-button"
                    id="accepted"
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={handleResponse}>
                    Accepter
                </Button>
                <Button
                    className="contract-actions-button"
                    id="rejected"
                    variant="contained"
                    color="error"
                    startIcon={<DoDisturb />}
                    onClick={handleResponse}>
                    Refuser
                </Button>
            </div>
        </div>
    );
}
