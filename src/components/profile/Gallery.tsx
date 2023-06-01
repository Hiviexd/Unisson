import { useState, useEffect } from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";

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

export default function Gallery(props: { userId: string }) {
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const userId = props.userId;

    useEffect(() => {
        fetch(`/api/gallery/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.images);
                setImages(data.data.images);
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

    /*const images = [
        {
            _id: "1",
            src: "https://picsum.photos/800/600",
        },
        {
            _id: "2",
            src: "https://picsum.photos/800/600",
        },
        {
            _id: "3",
            src: "https://picsum.photos/800/600",
        },
        {
            _id: "4",
            src: "https://picsum.photos/800/600",
        },
    ];*/

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

    if (images.length === 0 && loaded)
        return <ErrorPage text="This user has no images in their gallery..." />;

    return (
        <Lightbox
            open={loaded}
            slides={images}
            plugins={[Video, Inline, Counter, Slideshow, Thumbnails, Zoom]}
            inline={inline}
            thumbnails={{
                showToggle: true,
            }}
        />
    );
}
