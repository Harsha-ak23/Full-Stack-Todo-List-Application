import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {Request, Response} from 'express';

export const createUserController = async (req:Request, res:Response) : Promise<any> => {
  try {
    const { username, email, phone, address, password, avatar } =
      req.body;
    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required Field" });
    }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registed, Please Login",
      });
    }
    if (password.length <= 5) {
      return res.status(400).json({
        success: false,
        message: "Password Length must be greater than 5",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      address,
      avatar,
      password: hashPass,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "New User Created Successfully" });
  } catch (error:any) {
    console.log("Server Error in Sign Up API : ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error in Sign Up API", error });
  }
};

export const loginUserController = async (req: Request, res:Response) : Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password should not be empty",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password Invalid" });
    }
    const secret = process.env.SECRET;

    if(!secret){
        throw new Error("Secret is not defined in environment variables");
    }

    const token = jwt.sign({ id: existingUser._id }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User Login Successfully",
      token,
      data: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error:any) {
    console.log("Server Error in Login API : ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Login API",
      error,
    });
  }
};
