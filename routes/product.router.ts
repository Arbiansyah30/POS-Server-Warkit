import express from "express";
import { createProduct } from "../controllers/product.controller";
import { validateAuthToken } from "../utils/validateAuthToken";
const router = express.Router();

router.post("/create", validateAuthToken, createProduct);

export default router;
