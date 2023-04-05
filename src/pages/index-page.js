import { defineComponent, ref, onMounted } from "vue"
import ToolBar from "components/ToolBar.vue"
import tasksService from "src/services/tasks"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "IndexPage",

  components: {
    ToolBar,
  },

  setup() {
    const tasks = ref([])
    const { listByIdUser, remove } = tasksService()

    onMounted(() => {
      if (
        localStorage.getItem("logout") === null ||
        localStorage.getItem("logout") === "true"
      ) {
        router.push({ name: "notFound" })
      } else {
        getTaskByIdUser()
      }
    })

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
    ]

    const $q = useQuasar()
    const router = useRouter()

    let rows = []
    let taskList = []

    const getTaskByIdUser = async (id) => {
      try {
        const data = await listByIdUser(id)
        tasks.value = data
        taskList = tasks.value
        rows = []
        for (let i = 0; i < taskList.length; i++) {
          rows = rows.concat(taskList[i])
        }
        rows.forEach((row, index) => {
          row.index = ++index
        })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Delete",
          message: "Do you want to delete this task?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id)
          getTaskByIdUser()
          $q.notify({ message: "Deleted", icon: "check", color: "positive" })
        })
      } catch (error) {
        $q.notify({ message: "Error!", icon: "times", color: "negative" })
      }
    }

    const editTask = (id) => {
      router.push({ name: "formTask", params: { id } })
    }

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
          getTaskByIdUser()
          done()
        }, 1000)
      },
    }
  },
})
