import userApi from "src/composables/UserApi";

export default function usersService() {
  const { listAllUsers, post, update, remove, getById } = userApi("users");

  return {
    listAllUsers,
    post,
    update,
    remove,
    getById,
  };
}
