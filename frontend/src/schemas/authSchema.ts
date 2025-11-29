import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4)
});

export const registerSchema = z.object({
  username: z.string().min(2),
  email: z.email(),
  password: z.string().min(4),
  phone:z.string().min(10),
  address:z.string()
});

export const editUserSchema = z.object({
    username: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    address:z.string()
  });
  
export type EditUserFormType = z.infer<typeof editUserSchema>;

export type LoginFormType = z.infer<typeof loginSchema>;