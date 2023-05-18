import { Router } from "express";
import { userRouter } from "./users/routes";
import { assetsRouter } from "./assets/routes";
import { postRouter } from "./posts/routes";
import { reviewsRouter } from "./reviews/routes";

const router = Router();

router.use("/users", userRouter);
router.use("/assets", assetsRouter);
router.use("/posts", postRouter);
router.use("/reviews", reviewsRouter);

export const routes = router;
