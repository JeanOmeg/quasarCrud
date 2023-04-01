import { api } from "boot/axios";

export default function createApi(url) {
  const createUser = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    createUser,
  };
}
