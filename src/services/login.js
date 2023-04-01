import loginApi from "src/composables/LoginApi";

export default function loginService() {
  const { login } = loginApi('login');

  return {
    login,
  };
}
