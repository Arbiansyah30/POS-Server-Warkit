import { type Request, type Response } from "express";
import { AuthRepo } from "../database/AuthRepo";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { generateAuthToken, generateRefreshToken } from "../utils/generateAuthToken";

type UserData = Omit<User, "password"> & { password?: string };

export const Login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let user = await AuthRepo.findUser(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      const result: UserData = { ...user };
      delete result.password;

      const access_token = generateAuthToken(result as User);
      const refresh_token = generateRefreshToken(result as User);
      if (isPasswordMatch) {
        res.cookie("refresh_token", refresh_token, {
          maxAge: 86400000,
          httpOnly: true,
          secure: false,
        });
        res.cookie("access_token", access_token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: false,
        });
        res.set("Access-Control-Allow-Credentials", "true");
        res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.status(200).json({ message: "User found", access_token, refresh_token });
      }
    }

    return res.status(404).json({ message: "Invalid username/password!" });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
