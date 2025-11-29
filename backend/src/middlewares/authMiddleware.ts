import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(400).json({ success: false, message: "Authentication token required" });
      return;
    }

    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error("SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & { id: string };
    req.user = decoded;

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(403).json({ success: false, message: "Token expired, please login again" });
      return;
    }

    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
