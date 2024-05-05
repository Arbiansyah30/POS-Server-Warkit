import { Category } from "@prisma/client";
import prisma from "../";
import { v4 as uuid } from "uuid";

interface CreateCategoryPayload {
  name: string;
  description: string;
}

export class CategoryRepo {
  public static getAllCategory = async (): Promise<Category[]> => prisma.category.findMany();
  public static createCategory = async ({
    name,
    description,
  }: CreateCategoryPayload): Promise<Category> =>
    prisma.category.create({
      data: {
        id: uuid(),
        name,
        description,
      },
    });
}
