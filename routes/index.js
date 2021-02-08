import express from "express";
import loginRouter from "./login.routes";
import registerRouter from "./register.routes";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);

export default router;
