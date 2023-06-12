import { useState, useEffect } from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";

import { Typography, Button } from "@mui/material";
import { Collections, Edit, Delete, Upload } from "@mui/icons-material";

import Lightbox from "yet-another-react-lightbox";
import {
    Video,
    Inline,
    Counter,
    Slideshow,
    Thumbnails,
    Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import GalleryCreate from "../dialogs/gallery/GalleryCreate";
import GalleryAdd from "../dialogs/gallery/GalleryAdd";
import GalleryDelete from "../dialogs/gallery/GalleryDelete";

import "./../../styles/components/profile/Gallery.scss";

export default function Gallery(props: { userId: string; loggedInUser: any }) {
    const [gallery, setGallery] = useState(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const userId = props.userId;
    const loggedInUser = props.loggedInUser;

    const Buttons = () => {
        if (!images.length)
            return (
                <div className="profile-body-gallery-buttons">
                    <GalleryCreate setGallery={setImages} />
                </div>
            );
        return (
            <div className="profile-body-gallery-buttons">
                <GalleryAdd setGallery={setImages} />
                <GalleryDelete setGallery={setImages} />
            </div>
        );
    };

    useEffect(() => {
        fetch(`/api/gallery/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setGallery(data.data);
                setImages(data.data.images.concat(data.data.videos));
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setLoaded(true);
            });
    }, [userId]);

    const inline = {
        style: {
            width: "775%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
            margin: "0 auto",
        },
    };

    const videos = [
        {
            type: "video",
            poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            sources: [
                {
                    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    type: "video/mp4",
                },
            ],
        },
    ];

    if (!loaded) return <LoadingPage />;

    if (images.length === 0 && loaded && loggedInUser._id !== userId) return;

    return (
        <div className="profile-body-card">
            <div className="profile-body-card-header">
                <Collections className="profile-body-card-icon" />
                <Typography color="text.secondary" variant="h5" component="div">
                    Galerie
                </Typography>
            </div>
            {loggedInUser._id === userId && <Buttons />}
            {images.length !== 0 && loaded && (
                <Lightbox
                    open={loaded}
                    slides={images}
                    plugins={[Video, Inline, Counter, Slideshow, Thumbnails, Zoom]}
                    inline={inline}
                    thumbnails={{
                        showToggle: true,
                    }}
                />
            )}
        </div>
    );
}
