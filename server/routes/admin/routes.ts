import { Router } from "express";
import { isLoggedIn, isAdmin } from "../../middlewares";
import banUser from "./banUser";
import promoteUser from "./promoteUser";
import demoteUser from "./demoteUser";
import unbanUser from "./unbanUser";
import { adminMessagesRouter } from "./messages/router";

const router = Router();

//? POST requests
router.post("/ban/:id", isLoggedIn, isAdmin, banUser);
router.post("/promote/:id", isLoggedIn, isAdmin, promoteUser);
router.post("/demote/:id", isLoggedIn, isAdmin, demoteUser);
router.post("/unban/:id", isLoggedIn, isAdmin, unbanUser);

//? other routers
router.use("/messages", adminMessagesRouter);

export const adminRouter = router;
