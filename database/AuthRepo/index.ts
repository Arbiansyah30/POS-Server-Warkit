import { User } from "@prisma/client";
import prisma from "../";

export class AuthRepo {
  public static findUser = async (email: string): Promise<User | null> =>
    prisma.user.findFirst({
      where: {
        email,
      },
    });
}
