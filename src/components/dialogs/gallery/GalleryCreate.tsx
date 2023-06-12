import { useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";

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

import { Upload } from "@mui/icons-material";

export default function GalleryCreate(props: { setGallery: any }) {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [files, setFiles] = useState([]);
    const { setGallery } = props;

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
            "video/*": [".mp4"],
        },
        onDrop: (acceptedFiles) => {
            setImages(
                acceptedFiles
                    .filter((file) => file.type.includes("image"))
                    .map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
            );
            setVideos(
                acceptedFiles
                    .filter((file) => file.type.includes("video"))
                    .map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
            );
            setFiles(acceptedFiles);
        },
    });

    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e: any) => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        fetch(`/api/gallery/create`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    enqueueSnackbar("Galerie créée avec succès", { variant: "success" });
                    setGallery(data.data.images.concat(data.data.videos));
                    setImages([]);
                    setVideos([]);
                    setFiles([]);
                    setOpen(false);
                } else {
                    enqueueSnackbar(`Erreur lors de la création de la galerie:\n ${data.message}`, {
                        variant: "error",
                    });
                }
            });
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
                startIcon={<Upload />}>
                Ajouter des images/videos
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="create-gallery-dialog-title"
                aria-describedby="create-gallery-dialog-description">
                <DialogTitle id="create-gallery-dialog-title">Créer une galerie</DialogTitle>
                <DialogContent>
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <Typography variant="body2" color="text.secondary">
                            Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des
                            fichiers
                        </Typography>
                    </div>
                    {files && (
                        <div>
                            <DialogContentText id="create-gallery-dialog-description">
                                {images.length} Images sélectionnés
                            </DialogContentText>
                            <ImageList variant="quilted" cols={3} gap={8} sx={{ padding: 0 }}>
                                {images.map((file: any) => (
                                    <ImageListItem key={file.name}>
                                        <img src={file.preview} alt={file.name} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                            <DialogContentText id="create-gallery-dialog-description">
                                {videos.length} Videos sélectionnés
                            </DialogContentText>
                            {videos.map((file: any) => (
                                <video
                                    width="320"
                                    height="240"
                                    controls
                                    key={file.name}
                                    className="video">
                                    <source src={file.preview} type="video/mp4" />
                                </video>
                            ))}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button
                        variant="contained"
                        startIcon={<Upload />}
                        color="primary"
                        onClick={handleSubmit}
                        disabled={files.length === 0}>
                        Publier
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
