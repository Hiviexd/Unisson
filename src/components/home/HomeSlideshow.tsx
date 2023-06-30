import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import image1 from "../../assets/salleDimmed.jpg";
import image2 from "../../assets/traiteurDimmed.jpg";
import image3 from "../../assets/bandDimmed.jpg";
import image4 from "../../assets/photographeDimmed.jpg";
import unissonLogo from "../../assets/unisson.svg";

import "./../../styles/components/home/HomeSlideshow.scss";

export default function HomeSlideshow() {
    const images = [image1, image2, image3, image4];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-slideshow" style={{ backgroundImage: `url(${images[currentImage]})` }}>
            <div className="home-slideshow-text">
                <Typography variant="h1">Unisson</Typography>
                <Typography variant="h5">
                    Votre évènement, <br /> Notre priorité
                </Typography>
                <img src={unissonLogo} className="logo" alt="logo" />
            </div>
            <Link to="/listing" className="home-slideshow-button">
                Accéder aux services
            </Link>
        </div>
    );
}
