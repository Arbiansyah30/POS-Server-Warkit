import type { Request, Response } from "express";
import { CategoryRepo } from "../database/CategoryRepo";

interface ErrorObject {
  message: string;
  field: string;
}

export const getAllCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await CategoryRepo.getAllCategory();

    return res.json({
      message: "Categories fetched successfully!",
      status: 200,
      data: categories,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: "Internal server error",
      status: 500,
      error: {
        message: err.message,
      },
    });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name, description } = req.body;
  let errors: Array<ErrorObject> = [];

  if (!name) {
    errors.push({
      message: "Name is required!",
      field: "name",
    });
  }

  if (!description) {
    errors.push({
      message: "Description is required!",
      field: "description",
    });
  }

  if (!!errors.length) {
    return res.status(400).json({
      message: "Validation error",
      status: 400,
      errors,
    });
  }

  try {
    const category = await CategoryRepo.createCategory({ name, description });
    return res.json({
      message: "Category created successfully!",
      status: 201,
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Internal server error",
      status: 500,
      error: {
        message: error.message,
      },
    });
  }
};
