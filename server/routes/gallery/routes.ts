import { Router } from "express";
import { isLoggedIn, isProvider } from "../../middlewares";
import multer from "multer";
import createGallery from "./createGallery";
import getGallery from "./getGallery";
import deleteGallery from "./deleteGallery";
import addGalleryImages from "./addGalleryImages";
import DeleteGalleryImages from "./DeleteGalleryImages";

const router = Router();

//? POST requests
router.post(
    "/create",
    multer({ storage: multer.memoryStorage() }).array("files"),
    isLoggedIn,
    isProvider,
    createGallery
);
router.post(
    "/add",
    multer({ storage: multer.memoryStorage() }).array("files"),
    isLoggedIn,
    isProvider,
    addGalleryImages
);

//? DELETE requests
router.delete("/delete", isLoggedIn, isProvider, deleteGallery);
router.delete("/delete/images", isLoggedIn, isProvider, DeleteGalleryImages);

//? GET requests
router.get("/:userId", getGallery);

export const galleryRouter = router;
