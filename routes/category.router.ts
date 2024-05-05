import express from "express";
import { createCategory, getAllCategory } from "../controllers/category.controller";
import { validateAuthToken } from "../utils/validateAuthToken";
const router = express.Router();

router.get("/", getAllCategory);
router.post("/create", validateAuthToken, createCategory);

export default router;
