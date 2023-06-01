import { Router } from "express";
import { userRouter } from "./users/routes";
import { assetsRouter } from "./assets/routes";
import { postRouter } from "./posts/routes";
import { galleryRouter } from "./gallery/routes";
import { reviewsRouter } from "./reviews/routes";
import { adminRouter } from "./admin/routes";
import { isAdmin } from "../middlewares";

const router = Router();

router.use("/users", userRouter);
router.use("/assets", assetsRouter);
router.use("/posts", postRouter);
router.use("/gallery", galleryRouter);
router.use("/reviews", reviewsRouter);
router.use("/admin", isAdmin, adminRouter);

export const routes = router;
