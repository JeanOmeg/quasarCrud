import { api } from "boot/axios";

export default function loginApi(url) {
  const login = async (login) => {
    try {
      const { data } = await api.post(url, login);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    login,
  };
}
