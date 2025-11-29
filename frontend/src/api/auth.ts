import { api } from "./axios";

const API = "/auth";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  data: {
    _id: string;
    email: string;
    username: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

// LOGIN
export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`${API}/login`, body);
  return res.data;
};

// REGISTER
export const registerUser = async (data: RegisterPayload): Promise<ApiResponse<null>> => {
  const res = await api.post(`${API}/signup`, data);
  return res.data;
};
