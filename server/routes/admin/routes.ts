import { Router } from "express";
import banUser from "./banUser";
import promoteUser from "./promoteUser";
import demoteUser from "./demoteUser";
import unbanUser from "./unbanUser";
import { adminMessagesRouter } from "./messages/router";

const router = Router();

//? POST requests
router.post("/ban/:id", banUser);
router.post("/promote/:id", promoteUser);
router.post("/demote/:id", demoteUser);
router.post("/unban/:id", unbanUser);

//? other routers
router.use("/messages", adminMessagesRouter);

export const adminRouter = router;
