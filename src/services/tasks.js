import taskApi from "src/composables/TaskApi";

export default function tasksService() {
  const { listByIdUser, post, update, remove, getById } = taskApi("tasks");

  return {
    listByIdUser,
    post,
    update,
    remove,
    getById,
  };
}
