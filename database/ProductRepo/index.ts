import { Product } from "@prisma/client";
import prisma from "../";
import { v4 as uuid } from "uuid";

interface CreateProductPayload {
  name: string;
  price: number;
  categoryId: string;
  description: string;
}

export class ProductRepo {
  public static createProduct = async ({
    name,
    price,
    categoryId,
    description,
  }: CreateProductPayload): Promise<Product> =>
    prisma.product.create({
      data: {
        id: uuid(),
        name,
        price,
        categoryId,
        description,
      },
    });
}
