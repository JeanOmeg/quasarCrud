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
          All your tasks
        </div>
        <q-space />
        <q-pull-to-refresh @refresh="refresh">
          <q-table
            title="Tasks"
            :rows="tasks"
            :columns="columns"
            row-key="index"
            class="my-sticky-virtscroll-table"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
            hide-bottom
          >
            <template v-slot:top>
              <span class="text-h5">Tasks</span>
              <q-space />
              <q-btn
                color="primary"
                label="New Task"
                :to="{ name: 'formTask' }"
                size="md"
              />
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-sm">
                <q-btn
                  icon="edit"
                  color="primary"
                  dense
                  size="sm"
                  @click="editTask(props.row.id)"
                />
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
        <q-space />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import ToolBar from "components/ToolBar.vue";
import tasksService from "src/services/tasks";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  components: {
    ToolBar,
  },

  setup() {
    const tasks = ref([]);
    const { listByIdUser, remove } = tasksService();

    onMounted(() => {
      if (
        localStorage.getItem("logout") === null ||
        localStorage.getItem("logout") === "true"
      ) {
        router.push({ name: "notFound" });
      } else {
        getTaskByIdUser();
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
        name: "title",
        field: "title",
        label: "Task",
        align: "left",
        sortable: true,
      },
      {
        name: "status",
        field: "status",
        label: "Status",
        align: "left",
        sortable: true,
      },
      {
        name: "created_at",
        field: "created_at",
        label: "Create",
        align: "left",
        sortable: true,
      },
      {
        name: "update_at",
        field: "update_at",
        label: "Update",
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
    let taskList = [];

    const getTaskByIdUser = async (id) => {
      try {
        const data = await listByIdUser(id);
        tasks.value = data;
        taskList = tasks.value;
        rows = [];
        for (let i = 0; i < taskList.length; i++) {
          rows = rows.concat(taskList[i]);
        }
        rows.forEach((row, index) => {
          row.index = ++index;
        });
      } catch (error) {
        console.log(error);
      }
    };

    const deleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Delete",
          message: "Do you want to delete this task?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          getTaskByIdUser();
          $q.notify({ message: "Deleted", icon: "check", color: "positive" });
        });
      } catch (error) {
        $q.notify({ message: "Error!", icon: "times", color: "negative" });
      }
    };

    const editTask = (id) => {
      router.push({ name: "formTask", params: { id } });
    };

    return {
      tasks,
      columns,
      deleteTask,
      editTask,
      pagination: ref({
        rowsPerPage: 0,
      }),
      refresh(done) {
        setTimeout(() => {
          getTaskByIdUser();
          done();
        }, 1000);
      },
    };
  },
});
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  height: 420px

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
