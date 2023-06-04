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
import CreateReviewButton from "../profile/CreateReviewButton";

import { Warning, Send } from "@mui/icons-material";

import "./../../styles/components/dialogs/ReviewCreate.scss";
import "./../../styles/components/profile/CreateReviewButton.scss";

export default function ReviewReport(props: { review: any }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const review = props.review;

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
                reportType: "review",
                culpritId: review.posterId,
                culpritUsername: review.posterName,
                content,
                reviewId: review._id,
                reviewContent: review.comment,
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

                enqueueSnackbar("Review reported!", {
                    variant: "success",
                });
                setOpen(false);
            });
    };

    return (
        <>
            <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Warning />}
                onClick={handleClickOpen}>
                Report
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="create-review-dialog-title"
                aria-describedby="create-review-dialog-description">
                <DialogTitle id="create-review-dialog-title">
                    Report Review
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-review-dialog-description">
                        Report this review to the admins. Please provide a valid
                        reason for reporting this review.
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
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        endIcon={<Send />}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
