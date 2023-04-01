<template>
  <q-header elevated>
    <div class="row justify-center">
      <div class="col-11 q-gutter-sm q-col-gutter-sm">
        <q-toolbar class="row justify-between bg-primary text-white">
          <div>
            <q-btn
              v-if="logoutif === 'false'"
              size="md"
              icon="menu"
              aria-label="Menu"
              @click="drawer = !drawer"
            />
          </div>
          <div>
            <q-toolbar-title style="font-size: 1.7rem">
              TO-DO LIST
            </q-toolbar-title>
          </div>
          <div>
            <q-btn
              v-if="logoutif === 'false'"
              icon="logout"
              color="negative"
              size="md"
              @click="logout"
            />
          </div>
        </q-toolbar>
        <q-space />
      </div>
    </div>
  </q-header>
  <q-drawer
    v-model="drawer"
    :width="150"
    elevated
    mini-to-overlay
    class="bg-white"
  >
    <q-list>
      <div>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </div>
      <div v-if="admin === 'true'">
        <EssentialLink
          v-for="link in adminLinks"
          :key="link.title"
          v-bind="link"
        />
      </div>
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import logoutService from "src/services/logout";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Tasks",
    caption: "",
    icon: "library_add_check",
    route: { name: "home" },
  },
  {
    title: "New task",
    caption: "",
    icon: "add_task",
    route: { name: "formTask" },
  },
];

const adminList = [
  {
    title: "All tasks",
    caption: "",
    icon: "fact_check",
    route: { name: "allTasks" },
  },
  {
    title: "All users",
    caption: "",
    icon: "group",
    route: { name: "allUsers" },
  },
];

export default defineComponent({
  name: "ToolBar",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { logoutId } = logoutService();
    const logoutif = localStorage.getItem("logout");
    const admin = localStorage.getItem("admin");
    const logout = async (id) => {
      try {
        try {
          await logoutId(id);
        } catch (error) {
          console.log(error);
        }
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("admin");
        localStorage.removeItem("logout");
        $q.notify({
          message: "Logout!",
          icon: "error",
          color: "negative",
        });
        router.push({ name: "loginPage" });
      } catch (error) {
        $q.notify({
          message: "Error! Not logged or error connection server",
          icon: "error",
          color: "negative",
        });
      }
    };

    return {
      essentialLinks: linksList,
      adminLinks: adminList,
      logoutif,
      admin,
      drawer: ref(false),
      miniState: ref(true),
      logout,
    };
  },
});
</script>
