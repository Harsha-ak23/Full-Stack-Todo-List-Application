import User from "../models/user.model";
import type {Request, Response} from 'express';
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: JwtPayload & { id: string };
}


export const getUserController = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const userDetails = await User.findById(req.user.id).select("-password");

    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data:userDetails,
    });
  } catch (error: any) {
    console.error("Server Error in Get User API:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUserController = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const { username, address, phone, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, address, phone, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Server Error in Update User API:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

