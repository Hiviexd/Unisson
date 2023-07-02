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
import CreateContractButton from "../../contract/CreateContractButton";

import { Send } from "@mui/icons-material";

export default function ContractCreate(props: { user: any }) {
    const user = props.user;
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

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
        fetch(`/api/contracts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                recipientId: user._id,
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

                enqueueSnackbar("Contrat envoyée!", {
                    variant: "success",
                });
                setOpen(false);
            });
    };

    return (
        <>
            <div onClick={handleClickOpen}>
                <CreateContractButton />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="provider-request-dialog-title"
                aria-describedby="provider-request-dialog-description">
                <DialogTitle id="provider-request-dialog-title">Créer un contrat</DialogTitle>
                <DialogContent>
                    <DialogContentText id="provider-request-dialog-description">
                        Utilisez ce formulaire pour envoyer un contrat à un founisseur. Veuillez
                        vous assurer d'inclure le plus de détails possible dans votre message.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="name"
                        label="Message"
                        type="text"
                        fullWidth
                        variant="outlined"
                        rows={5}
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
