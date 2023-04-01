import { api } from "boot/axios";

export default function userApi(url) {

  const listAllUsers = async (id) => {
    try {
      const { data } = await api.get(url, id);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const update = async (form, id) => {
    try {
      const { data } = await api.put(`${url}/${id}`, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    listAllUsers,
    post,
    update,
    remove,
    getById,
  };
}
