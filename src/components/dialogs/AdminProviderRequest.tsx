import { useState, useEffect, useContext } from "react";
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

export default function AdminProviderRequest(props: { request: any }) {
    const request = props.request;

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(request.response);
    const [user, setUser] = useState({} as any);

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
        fetch(`/api/admin/messages/${request._id}/respond`, {
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

                enqueueSnackbar("Provider request rejected!", {
                    variant: "success",
                });
                setOpen(false);
                window.location.reload();
            });
    };

    const handleAccept = (e: any) => {
        fetch(`/api/admin/messages/${request._id}/respond`, {
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

                enqueueSnackbar("Provider request accepted!", {
                    variant: "success",
                });
                setOpen(false);
                window.location.reload();
            });
    };

    useEffect(() => {
        fetch(`/api/users/${request.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, {
                        variant: "error",
                    });
                    return;
                }

                setUser(r.data);
            });
    }, []);

    const phoneNumber = (num: number) => {
        return num.toString().replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
    };

    return (
        <div className="report-message-card">
            <div className="empty" onClick={handleClickOpen}>
                <MessageCard message={request} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
                aria-labelledby="admin-request-dialog-title"
                aria-describedby="admin-request-dialog-description">
                <DialogTitle id="admin-request-dialog-title">
                    Provider Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        marginBottom={1}
                        id="admin-request-dialog-requester">
                        Requester: {<b>{request.username}</b>}
                    </DialogContentText>
                    <DialogContentText
                        marginBottom={1}
                        id="admin-request-dialog-requester">
                        E-mail: {<b>{user?.email}</b>}
                    </DialogContentText>
                    <DialogContentText
                        marginBottom={1}
                        id="admin-request-dialog-requester">
                        Phone: {<b>+216 {user?.phone}</b>}
                    </DialogContentText>
                    <DialogContentText id="admin-request-dialog-reason">
                        Message:
                    </DialogContentText>
                    <Typography className="text-display" color="text.primary">
                        {request.content}
                    </Typography>
                    <TextField
                        autoFocus
                        multiline
                        disabled={request.status !== "pending"}
                        margin="dense"
                        id="name"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={response}
                        onChange={handleResponseChange}
                    />
                </DialogContent>
                {request.status === "pending" && (
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<DoDisturb />}
                            color="error"
                            onClick={handleReject}>
                            Reject
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<CheckCircle />}
                            color="success"
                            onClick={handleAccept}>
                            Accept
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}
