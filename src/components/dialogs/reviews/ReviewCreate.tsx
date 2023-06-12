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
import CreateReviewButton from "../../profile/CreateReviewButton";

import { Send } from "@mui/icons-material";

import "./../../../styles/components/dialogs/ReviewCreate.scss";
import "./../../../styles/components/profile/CreateReviewButton.scss";

export default function ReviewCreate(props: { userId: string }) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const userId = props.userId;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (e: any) => {
        setRating(e.target.value);
    };

    const handleSubmit = (e: any) => {
        fetch(`/api/reviews/${userId}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                rating: Number(rating),
                comment,
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

                enqueueSnackbar("Review created!", {
                    variant: "success",
                });
                setOpen(false);
                window.location.reload();
            });
    };

    return (
        <div className="create-review-button">
            <div onClick={handleClickOpen}>
                <CreateReviewButton />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="create-review-dialog-title"
                aria-describedby="create-review-dialog-description">
                <DialogTitle id="create-review-dialog-title">Soumetter un avis</DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-review-dialog-description">
                        Utilisez ce formulaire pour soumettre un avis à propos de cet utilisateur.
                    </DialogContentText>
                    <div className="rating">
                        <span>Note: </span>
                        <Rating
                            className="rating-stars"
                            name="simple-controlled"
                            precision={0.5}
                            value={rating}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <TextField
                        autoFocus
                        multiline
                        margin="none"
                        id="name"
                        label="Commentaire"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleCommentChange}
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
        </div>
    );
}
