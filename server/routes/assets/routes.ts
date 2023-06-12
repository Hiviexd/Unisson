import { Router } from "express";
import getAvatar from "./getAvatar";
import getGalleryImage from "./getGalleryImage";
import getGalleryVideo from "./getGalleryVideo";
import getGalleryVideoThumb from "./getGalleryVideoThumb";

const router = Router();

//? GET requests
router.get("/avatar/:id", getAvatar);
router.get("/galleries/:galleryId/images/:filename", getGalleryImage);
router.get("/galleries/:galleryId/videos/:filename", getGalleryVideo);
router.get("/galleries/:galleryId/videos/thumb/:filename", getGalleryVideoThumb);

export const assetsRouter = router;
