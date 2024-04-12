import express from "express";
import { Login } from "../controllers/auth.controller";
const router = express.Router();

router.post("/login", Login);

export default router;
