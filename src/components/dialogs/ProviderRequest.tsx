import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
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
import ProviderButton from "../profile/ProviderButton";

import { Send } from "@mui/icons-material";

export default function ProviderRequest(props: { navbar?: boolean }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const navbar = props.navbar;

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
                type: "request",
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

                enqueueSnackbar("Provider request sent!", {
                    variant: "success",
                });
                setOpen(false);
            });
    };

    return (
        <>
            <div onClick={handleClickOpen}>
                <ProviderButton />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="provider-request-dialog-title"
                aria-describedby="provider-request-dialog-description">
                <DialogTitle id="provider-request-dialog-title">Provider Request</DialogTitle>
                <DialogContent>
                    <DialogContentText id="provider-request-dialog-description">
                        Use this form to request to become a provider. Please be sure to include as
                        much detail as possible.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="name"
                        label="Message"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleContentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} endIcon={<Send />}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
