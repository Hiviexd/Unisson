import { Router } from "express";
import multer from "multer";
import createGallery from "./createGallery";
import getGallery from "./getGallery";

const router = Router();

//? GET requests
router.get("/:userId", getGallery);

//? POST requests
router.post(
    "/create",
    multer({ storage: multer.memoryStorage() }).array("files"),
    createGallery
);

export const galleryRouter = router;
