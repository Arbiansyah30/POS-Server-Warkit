import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateAuthToken = (client: User): string => {
  const userDataForToken = { ...client, password: null };
  return jwt.sign({ ...userDataForToken }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

export const generateRefreshToken = (client: User): string => {
  const userDataForToken = { email: client.email };
  return jwt.sign({ ...userDataForToken }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "1d",
  });
};
