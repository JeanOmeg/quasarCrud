import { defineComponent, ref, onMounted } from "vue";
import taskService from "src/services/tasks";
import ToolBar from "components/ToolBar.vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "FormTask",

  components: {
    ToolBar,
  },

  setup() {
    const { post, getById, update } = taskService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      if (
        localStorage.getItem("logout") === null ||
        localStorage.getItem("logout") === "true"
      ) {
        router.push({ name: "notFound" });
      }
      if (route.params.id) {
        getTask(route.params.id);
      }
    });

    const form = ref({
      title: "",
      status: "",
    });

    const getTask = async (id) => {
      try {
        const [formValue] = await getById(id);
        form.value = formValue;
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value, route.params.id);
        } else {
          await post(form.value);
        }
        if (form.value.id) {
          $q.notify({ message: "Edited", icon: "check", color: "positive" });
        } else {
          $q.notify({ message: "Created", icon: "check", color: "positive" });
        }
        router.push({ name: "home" });
      } catch (error) {
        $q.notify({
          message: "Error! Not logged or error connection server",
          icon: "error",
          color: "negative",
        });
        console.error(error);
      }
    };

    return {
      form,
      onSubmit,
      options: ["Not started", "Started", "Paused", "Done"],
    };
  },
});
