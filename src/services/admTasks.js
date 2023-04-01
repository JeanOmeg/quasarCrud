import admTaskApi from "src/composables/AdmTaskApi";

export default function admTasksService() {
  const { listAllTasks, remove, getById } = admTaskApi("admtasks");

  return {
    listAllTasks,
    remove,
    getById,
  };
}
