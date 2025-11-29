
import type { Request, Response } from "express";
import User from "../models/user.model";
import Todo from "../models/todo.model";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: JwtPayload & { id: string };
}

// Create Todo
export const createTodoController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    const newTodo = await Todo.create({
      title,
      description,
      user: req.user.id, // IMPORTANT
    });

    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { todo: newTodo._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ success: true, message: "Todo created successfully", data: newTodo });
  } catch (error: any) {
    console.log("Server Error in Create Todo API:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Todos 
export const getTodoController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const userDetails = await User.findById(req.user.id).populate("todo");

    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all todos successfully",
      data: userDetails.todo,
    });
  } catch (error: any) {
    console.log("Server Error in Get Todo API:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update 
export const updateTodoController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const todoId = req.params.id;

    const todo = await Todo.findOne({ _id: todoId, user: req.user.id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found or not yours" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Todo updated successfully", data: updatedTodo, });
  } catch (error: any) {
    console.log("Server Error in Update Todo API:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// isCompleted Update Todo
export const isCompletedTodoController = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user?.id) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing user ID in token",
        });
      }
  
      const todoId = req.params.id;
  
      const todo = await Todo.findOne({ _id: todoId, user: req.user.id });
  
      if (!todo) {
        return res
          .status(404)
          .json({ success: false, message: "Todo not found or not yours" });
      }
  
      const { isCompleted } = req.body;
  
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        {  isCompleted },
        { new: true, runValidators: true }
      );
  
      res
        .status(200)
        .json({ success: true, message: "Todo isCompleted updated successfully", updatedTodo });
    } catch (error: any) {
      console.log("Server Error in Update Todo API:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Delete Todo
export const deleteTodoController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID in token",
      });
    }

    const todoId = req.params.id;

    const todo = await Todo.findOne({ _id: todoId, user: req.user.id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found or not yours" });
    }

    await Todo.findByIdAndDelete(todoId);

    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { todo: todoId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: null,
    });
  } catch (error: any) {
    console.log("Server Error in Delete Todo API:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
