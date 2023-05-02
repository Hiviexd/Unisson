import { Router } from "express";
import { userRouter } from "./users/routes";
import { assetsRouter } from "./assets/routes";
import { postRouter } from "./posts/routes";

const router = Router();

router.use("/users", userRouter);
router.use("/assets", assetsRouter);
router.use("/posts", postRouter);

export const routes = router;
