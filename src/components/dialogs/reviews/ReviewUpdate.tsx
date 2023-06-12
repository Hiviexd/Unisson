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
} from "@mui/material";

import { Edit } from "@mui/icons-material";

import "./../../../styles/components/dialogs/ReviewCreate.scss";

export default function ReviewUpdate(props: { review: any }) {
    const review = props.review;

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

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

    const handleUpdate = (e: any) => {
        fetch(`/api/reviews/${review._id}/update`, {
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
                    enqueueSnackbar(r.message, { variant: "error" });
                } else {
                    enqueueSnackbar("Review updated!", { variant: "success" });
                    setOpen(false);
                    window.location.reload();
                }
            });
    };

    return (
        <>
            <Button
                className="edit-button"
                variant="contained"
                size="small"
                color="primary"
                startIcon={<Edit />}
                onClick={handleClickOpen}>
                Modifier
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="delete-review-dialog-title"
                aria-describedby="delete-review-dialog-description">
                <DialogTitle id="delete-review-dialog-title">Modifier votre avis</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-review-dialog-description">
                        Modifiez votre avis ci-dessous.
                    </DialogContentText>
                    <div className="rating">
                        <span>Note:</span>
                        <Rating
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
                        defaultValue={review.comment}
                        onChange={handleCommentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        color="primary"
                        onClick={handleUpdate}>
                        Modifier
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
