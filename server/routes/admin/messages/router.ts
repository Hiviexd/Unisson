import { Router } from "express";
import { isLoggedIn, isAdmin, isNotBanned } from "../../../middlewares";

import createMessage from "./createMessage";
import getMessage from "./getMessage";
import listMessages from "./listMessages";
import respondMessage from "./respondMessage";

const router = Router();

//? GET requests
router.get("/:id", isLoggedIn, getMessage);
router.get("/listing/get", isLoggedIn, isAdmin, listMessages);

//? POST requests
router.post("/create", isLoggedIn, isNotBanned, createMessage);
router.post("/:id/respond", isLoggedIn, isAdmin, respondMessage);

export const adminMessagesRouter = router;
