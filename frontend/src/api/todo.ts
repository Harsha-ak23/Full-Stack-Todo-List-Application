import { api } from "./axios";

const API = "/todo";

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getTodos = async (token: string): Promise<ApiResponse<Todo[]>> => {
  const res = await api.get(`${API}/get`, authHeader(token));
  return res.data;
};

export const createTodo = async (
  token: string,
  data: Pick<Todo, "title" | "description">
): Promise<ApiResponse<Todo>> => {
  const res = await api.post(`${API}/create`, data, authHeader(token));
  return res.data;
};

export const updateTodo = async (
  token: string,
  id: string,
  data: Partial<Todo>
): Promise<ApiResponse<Todo>> => {
  const res = await api.put(`${API}/update/${id}`, data, authHeader(token));
  return res.data;
};

export const isCompletedTodo = async (
    token: string,
    id: string,
    isCompleted:boolean
  ): Promise<ApiResponse<Todo>> => {
    const res = await api.put(`${API}/isCompleted/${id}`, {isCompleted}, authHeader(token));
    return res.data;
  };

export const deleteTodo = async (
  token: string,
  id: string
): Promise<ApiResponse<null>> => {
  const res = await api.delete(`${API}/delete/${id}`, authHeader(token));
  return res.data;
};
