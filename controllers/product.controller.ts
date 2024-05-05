import type { Request, Response } from "express";
import z, { ZodError } from "zod";
import { ProductRepo } from "../database/ProductRepo";

const ProductSchema = z.object({
  price: z.number(),
  name: z.string().optional(),
  stock: z.number().optional(),
  description: z.string().optional(),
  categoryId: z.string(),
});

export const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    ProductSchema.parse(req.body);
    const product = await ProductRepo.createProduct(req.body);
    return res.status(201).json({
      message: "Product Created",
      status: 201,
      data: product,
    });
  } catch (err: unknown) {
    const error = err as ZodError;
    return res.status(400).json({
      message: "Validation Error",
      status: 400,
      errors: error.issues.map((issue) => ({
        message: issue.message,
        field: issue.path.join("."),
      })),
    });
  }
};
