import { useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { useSnackbar } from "notistack";

import {
    Rating,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from "@mui/material";
import ReportButton from "../../profile/ReportButton";

import { Warning, Send } from "@mui/icons-material";

import "./../../../styles/components/dialogs/ReviewCreate.scss";
import "./../../../styles/components/profile/CreateReviewButton.scss";

export default function ReportCreate(props: { user: any }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const user = props.user;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleContentChange = (e: any) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e: any) => {
        fetch(`/api/admin/messages/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                type: "report",
                reportType: "user",
                culpritId: user._id,
                culpritUsername: user.username,
                content,
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

                enqueueSnackbar("Utilisateur signalé!", {
                    variant: "success",
                });
                setOpen(false);
            });
    };

    return (
        <>
            <div onClick={handleClickOpen}>
                <ReportButton />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="create-review-dialog-title"
                aria-describedby="create-review-dialog-description">
                <DialogTitle id="create-review-dialog-title">Signaler un utilisateur</DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-review-dialog-description">
                        Signaler un utilisateur pour un comportement inapproprié.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="name"
                        label="Comment..."
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleContentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} endIcon={<Send />}>
                        Envoyer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
