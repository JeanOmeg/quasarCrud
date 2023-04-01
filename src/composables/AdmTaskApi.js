import { api } from "boot/axios";

export default function admTaskApi(url) {

  const listAllTasks = async () => {
    try {
      const { data } = await api.get(url);
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

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    listAllTasks,
    remove,
    getById,
  };
}
