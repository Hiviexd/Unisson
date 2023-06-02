import { Router } from "express";
import createMessage from "./createMessage";
import getMessage from "./getMessage";
import listMessages from "./listMessages";
import respondMessage from "./respondMessage";

const router = Router();

//? GET requests
router.get("/:id", getMessage);
router.get("/listing/get", listMessages);

//? POST requests
router.post("/create", createMessage);
router.post("/respond/:id", respondMessage);

export const adminMessagesRouter = router;
