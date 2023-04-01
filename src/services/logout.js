import logoutApi from "src/composables/LogoutApi";

export default function logoutService() {
  const { logoutId } = logoutApi('logout');

  return {
    logoutId,
  };
}
