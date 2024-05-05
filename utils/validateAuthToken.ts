import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { errorResponse } from "./errorResponse";

export const validateAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.cookies) {
    return errorResponse(res, 401, "Please authenticate.", req.url);
  }

  const token = req.cookies?.access_token;

  jwt.verify(token, process.env.JWT_SECRET as string, async function (_err, decoded) {
    if (decoded === undefined) {
      return errorResponse(res, 401, "Please authenticate.", req.url);
    }
    // req["id"] = decoded["id"];
    next();
  });
};
