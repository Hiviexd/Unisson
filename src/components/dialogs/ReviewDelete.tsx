import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { useSnackbar } from "notistack";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

export default function ReviewDelete(props: { review: any }) {
    const [open, setOpen] = useState(false);

    const review = props.review;

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleDelete = (e: any) => {
        fetch(`/api/reviews/${review._id}/delete`, {
            method: "DELETE",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, { variant: "error" });
                } else {
                    enqueueSnackbar("Review deleted!", { variant: "success" });
                    setOpen(false);
                    window.location.reload();
                }
            });
    };

    return (
        <>
            <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-review-dialog-title"
                aria-describedby="delete-review-dialog-description">
                <DialogTitle id="delete-review-dialog-title">
                    Delete review
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-review-dialog-description">
                        Are you sure you want to delete this review?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        startIcon={<Delete />}
                        color="error"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
