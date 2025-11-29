import Log from "../models/log.model";
import type { Request, Response, NextFunction } from "express";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    await Log.create({
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });
  } catch (logErr) {
    console.error("Failed to log error:", logErr);
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
