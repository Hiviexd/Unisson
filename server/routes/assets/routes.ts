import { Router } from "express";
import getAvatar from "./getAvatar";
import getGalleryImage from "./getGalleryImage";

const router = Router();

//? GET requests
router.get("/avatar/:id", getAvatar);
router.get("/galleries/:galleryId/images/:filename", getGalleryImage);

export const assetsRouter = router;
