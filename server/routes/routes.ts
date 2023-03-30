import { Router } from "express";
import { userRouter } from "./users/routes";
import { assetsRouter } from "./assets/routes";

const router = Router();

router.use("/users", userRouter);
router.use("/assets", assetsRouter);

export const routes = router;
