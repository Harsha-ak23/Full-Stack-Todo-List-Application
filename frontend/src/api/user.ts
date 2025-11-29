import { api } from "./axios";
import type { EditUserFormType } from "../schemas/authSchema";

export const getUserApi = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/user/get", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const updateUserAPI = async (id: string, data: EditUserFormType) => {
    const token = localStorage.getItem("token");
  const res = await api.put(`/user/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
