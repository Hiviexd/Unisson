import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import { useSnackbar } from "notistack";

import {
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { CheckCircle, DoDisturb } from "@mui/icons-material";

import MessageCard from "../admin/MessageCard";

import "./../../styles/components/dialogs/AdminReport.scss";

export default function AdminReport(props: { report: any }) {
    const report = props.report;

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(report.response);

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleResponseChange = (e: any) => {
        setResponse(e.target.value);
    };

    const handleReject = (e: any) => {
        fetch(`/api/admin/messages/${report._id}/respond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                status: "rejected",
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

                enqueueSnackbar("Signalement rejeté!", {
                    variant: "success",
                });
                setOpen(false);
                window.location.reload();
            });
    };

    const handleAccept = (e: any) => {
        fetch(`/api/admin/messages/${report._id}/respond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                status: "accepted",
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

                enqueueSnackbar("Signalement accepté!", {
                    variant: "success",
                });
                setOpen(false);
                window.location.reload();
            });
    };

    return (
        <div className="report-message-card">
            <div className="empty" onClick={handleClickOpen}>
                <MessageCard message={report} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
                aria-labelledby="admin-report-dialog-title"
                aria-describedby="admin-report-dialog-description">
                <DialogTitle id="admin-report-dialog-title">
                    {report.reportType === "user"
                        ? "Signalement d'utilisateur"
                        : "Signalement d'avis"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText marginBottom={1} id="admin-report-dialog-reporter">
                        Signaleur: {<b>{report.username}</b>}
                    </DialogContentText>
                    <DialogContentText marginBottom={1} id="admin-report-dialog-reported">
                        Utilisateur signalé:{" "}
                        <Link className="link-decoration" to={`/profile/${report.culpritId}`}>
                            {report.culpritUsername}
                        </Link>
                    </DialogContentText>
                    {report.reviewContent && (
                        <>
                            <DialogContentText id="admin-report-dialog-reason">
                                Avis signalé:
                            </DialogContentText>
                            <Typography
                                marginBottom={1}
                                className="text-display"
                                color="text.primary">
                                {report.reviewContent}
                            </Typography>
                        </>
                    )}
                    <DialogContentText id="admin-report-dialog-reason">Raison:</DialogContentText>
                    <Typography className="text-display" color="text.primary">
                        {report.content}
                    </Typography>
                    <TextField
                        autoFocus
                        multiline
                        disabled={report.status !== "pending"}
                        margin="dense"
                        id="name"
                        label="Réponse"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={response}
                        onChange={handleResponseChange}
                    />
                </DialogContent>
                {report.status === "pending" && (
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<DoDisturb />}
                            color="error"
                            onClick={handleReject}>
                            Rejeter
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<CheckCircle />}
                            color="success"
                            onClick={handleAccept}>
                            Résoudre
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}
