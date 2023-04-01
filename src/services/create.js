import createApi from "src/composables/CreateApi";

export default function createsService() {
  const { createUser } = createApi("register");

  return {
    createUser,
  };
}
