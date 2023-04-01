<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center">
      <div class="col-11 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div
          class="row justify-center text-bold text-primary"
          style="font-size: 1.5em"
        >
          All platform users
        </div>
        <q-space />
        <q-pull-to-refresh @refresh="refresh">
          <q-table
            title="Users"
            :rows="users"
            :columns="columns"
            row-key="index"
            class="my-sticky-virtscroll-table"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="0"
            hide-bottom
          >
            <template v-slot:top>
              <span class="text-h5">Users</span>
              <q-space />
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-sm">
                <q-btn
                  icon="delete"
                  color="negative"
                  dense
                  size="sm"
                  @click="deleteTask(props.row.id)"
                />
              </q-td>
            </template>
          </q-table>
        </q-pull-to-refresh>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import ToolBar from "components/ToolBar.vue";
import usersService from "src/services/users";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AllUsers",

  components: {
    ToolBar,
  },

  setup() {
    const users = ref([]);
    const { listAllUsers, remove } = usersService();

    onMounted(() => {
      if (
        localStorage.getItem("logout") === null ||
        localStorage.getItem("logout") === "true"
      ) {
        router.push({ name: "notFound" });
      } else {
        if (
          localStorage.getItem("admin") === "false" ||
          localStorage.getItem("admin") === null
        ) {
          router.push({ name: "notFound" });
        } else {
          getAllUsers();
        }
      }
    });

    const columns = [
      {
        name: "index",
        label: "#",
        field: "index",
        align: "left",
        sortable: true,
      },
      {
        name: "online",
        field: "online",
        label: "Online",
        align: "left",
        sortable: true,
      },
      {
        name: "real_name",
        field: "real_name",
        label: "Name",
        align: "left",
        sortable: true,
      },
      {
        name: "username",
        field: "username",
        label: "Username",
        align: "left",
        sortable: true,
      },
      {
        name: "email",
        field: "email",
        label: "Email",
        align: "left",
        sortable: true,
      },
      {
        name: "phone",
        field: "phone",
        label: "Phone",
        align: "left",
        sortable: true,
      },
      {
        name: "id",
        field: "id",
        label: "User ID",
        align: "left",
        sortable: true,
      },
      {
        name: "admin",
        field: "admin",
        label: "Admin",
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        field: "actions",
        label: "Actions",
        align: "right",
      },
    ];

    const $q = useQuasar();
    const router = useRouter();

    let rows = [];
    let userList = [];

    const getAllUsers = async () => {
      try {
        const data = await listAllUsers();
        users.value = data;
        userList = users.value;
        rows = [];
        for (let i = 0; i < userList.length; i++) {
          rows = rows.concat(userList[i]);
        }
        rows.forEach((row, index) => {
          row.index = ++index;
        });
      } catch (error) {
        $q.notify({
          message: "Not logged!",
          icon: "error",
          color: "negative",
        });
        console.log(error);
      }
    };

    const deleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Delete",
          message: "Do you want to delete this user?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          const deleted = await remove(id);
          if (!deleted) {
            $q.notify({
              message: "Error! Impossible to delete your own account",
              icon: "error",
              color: "negative",
            });
          } else {
            $q.notify({ message: "Deleted", icon: "check", color: "positive" });
            getAllUsers();
          }
        });
      } catch (error) {
        $q.notify({
          message: "Error! Please try again later...",
          icon: "error",
          color: "negative",
        });
      }
    };

    return {
      users,
      columns,
      deleteTask,
      pagination: ref({
        rowsPerPage: 0,
      }),

      refresh(done) {
        setTimeout(() => {
          getAllUsers();
          done();
        }, 1000);
      },
    };
  },
});
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0
</style>
