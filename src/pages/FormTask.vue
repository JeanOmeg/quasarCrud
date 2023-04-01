<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center">
      <div class="col-10 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div
          class="row justify-center text-bold text-primary"
          style="font-size: 1.5em"
        >
          Create or edit your task
        </div>
        <q-space />
        <q-card bordered class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.title"
              square
              filled
              clearable
              label="Title"
              hide-bottom-space
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Title is required. Title cannot be empty!',
                (val) =>
                  (val && val.length < 150) ||
                  'Title cannot be longer than 150 characters',
              ]"
            />
            <q-select
              v-model="form.status"
              :options="options"
              square
              filled
              v-if="form.status"
              label="Status"
            />

            <div class="row justify-between">
              <q-btn
                label="Cancel"
                color="negative"
                text-color="white"
                size="md"
                :to="{ name: 'home' }"
              />
              <q-btn label="Save" color="primary" type="submit" size="md" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
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
</script>
