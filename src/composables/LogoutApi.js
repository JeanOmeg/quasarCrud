import { api } from "boot/axios";

export default function logoutApi(url) {
  const logoutId = async (id) => {
    try {
      const { data } = await api.put(url, id);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    logoutId,
  };
}
