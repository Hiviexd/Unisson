import { useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { useSnackbar } from "notistack";
import * as EmailValidator from "email-validator";

import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Chip,
    Avatar,
} from "@mui/material";
import CreateCollabButton from "../../collab/CreateCollabButton";

import { Add, Send } from "@mui/icons-material";

import "./../../../styles/components/dialogs/CollabCreate.scss";
import "./../../../styles/components/profile/CreateReviewButton.scss";

export default function CollabCreate(props: { collabs: any; setCollabs: any }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { collabs, setCollabs } = props;

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleEnter = (e: any) => {
        if (e.key === "Enter") {
            handleUserAdd(e);
            e.target.value = "";
        }
    };

    const handleUserAdd = (e: any) => {
        // prevent user from adding their email
        if (email === login.email) {
            enqueueSnackbar("Vous ne pouvez pas vous ajouter", {
                variant: "error",
            });
            return;
        }

        // check if user is already in collab
        users.forEach((user: any) => {
            if (user.email === email) {
                enqueueSnackbar("Utilisateur déjà dans la liste", {
                    variant: "error",
                });
                return;
            }
        });

        // check if there are already 4 users
        if (users.length >= 4) {
            enqueueSnackbar("Vous ne pouvez pas inviter plus de 4 personnes", {
                variant: "error",
            });
            return;
        }

        //validate email
        if (!EmailValidator.validate(email.trim().toLowerCase())) {
            enqueueSnackbar("E-mail invalide", {
                variant: "error",
            });
            return;
        }

        fetch(`/api/users/email/${email}`, {
            method: "GET",
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, {
                        variant: "error",
                    });
                    return;
                }
                setUsers([...users, r.data]);
                setEmail("");
            });
    };

    const handleSubmit = (e: any) => {
        fetch(`/api/collabs/create`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                users,
                name,
                description,
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

                enqueueSnackbar("Invitations collab envoyé!", {
                    variant: "success",
                });
                setOpen(false);
                // add new collab to the start of the list
                setCollabs([r.data, ...collabs]);
            });
    };

    return (
        <div className="create-review-button">
            <div onClick={handleClickOpen}>
                <CreateCollabButton />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="create-collab-dialog-title"
                aria-describedby="create-collab-dialog-description">
                <DialogTitle id="create-collab-dialog-title">Créer un collaboration</DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-collab-dialog-description">
                        Ajouter des utilisateurs à votre collaboration avec leur e-mail. Vous pouvez
                        ajouter jusqu'à 4
                    </DialogContentText>
                    <div className="users-list">
                        {users.map((user: any) => (
                            <Chip
                                key={user._id}
                                avatar={<Avatar src={`/api/assets/avatar/${user._id}`} />}
                                label={user.email}
                                onDelete={() => {
                                    setUsers(users.filter((u) => u !== user));
                                }}
                            />
                        ))}
                    </div>
                    <div className="add-user">
                        <TextField
                            autoFocus
                            margin="none"
                            id="email"
                            placeholder="E-mail"
                            type="text"
                            variant="standard"
                            onChange={handleEmailChange}
                            onKeyDown={handleEnter}
                        />
                        <IconButton color="primary" aria-label="add user" onClick={handleUserAdd}>
                            <Add />
                        </IconButton>
                    </div>
                    <div className="text-inputs">
                        <TextField
                            className="collab-name"
                            id="name"
                            label="Nom du collaboration"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleNameChange}
                        />
                        <TextField
                            multiline
                            rows={4}
                            margin="none"
                            id="description"
                            label="Description du collaboration"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} endIcon={<Send />}>
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
