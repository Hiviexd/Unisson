import { useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { useSnackbar } from "notistack";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    ImageList,
    ImageListItem,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

export default function GalleryDelete(props: { setGallery: any }) {
    const [open, setOpen] = useState(false);
    //const [imageIds, setImageIds] = useState([]);
    //const [videoIds, setVideoIds] = useState([]);
    const { setGallery } = props;

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    /*const ImageSelector = (image: any) => {
        const [selected, setSelected] = useState(false);

        const handleClick = () => {
            console.log(image);
            setSelected(!selected);
            if (selected) {
                setImageIds([...imageIds, image._id]);
            } else {
                setImageIds(imageIds.filter((id) => id !== image._id));
            }
        };

        return (
            <ImageListItem
                key={image._id}
                onClick={handleClick}
                className={selected ? "selected" : ""}>
                <img src={encodeURI(image.src)} alt={image._id} />
            </ImageListItem>
        );
    };*/

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        fetch(`/api/gallery/delete`, {
            method: "DELETE",
            headers: {
                authorization: login.accountToken,
            },
            //body: JSON.stringify({ deletedImages: imageIds, deletedVideos: videoIds }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    enqueueSnackbar("images/vidéos supprimé avec succès", { variant: "success" });
                    setGallery(null);
                    //setImageIds([]);
                    //setVideoIds([]);
                    setOpen(false);
                    window.location.reload();
                } else {
                    enqueueSnackbar(
                        `Erreur lors de la modification de la galerie:\n ${data.message}`,
                        {
                            variant: "error",
                        }
                    );
                }
            });
    };

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpen}
                startIcon={<Delete />}>
                Supprimer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="delete-gallery-dialog-title"
                aria-describedby="delete-gallery-dialog-description">
                <DialogTitle id="delete-gallery-dialog-title">Supprimer galerie</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Êtes-vous sûr de vouloir supprimer cette galerie ? Cette action est
                        irréversible.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button
                        variant="contained"
                        startIcon={<Delete />}
                        color="error"
                        onClick={handleSubmit}>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
