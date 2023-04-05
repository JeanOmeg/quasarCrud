import { defineComponent, ref, onMounted } from "vue"
import ToolBar from "components/ToolBar.vue"
import usersService from "src/services/users"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "AllUsers",

  components: {
    ToolBar,
  },

  setup() {
    const users = ref([])
    const { listAllUsers, remove } = usersService()

    onMounted(() => {
      if (
        localStorage.getItem("logout") === null ||
        localStorage.getItem("logout") === "true"
      ) {
        router.push({ name: "notFound" })
      } else {
        if (
          localStorage.getItem("admin") === "false" ||
          localStorage.getItem("admin") === null
        ) {
          router.push({ name: "notFound" })
        } else {
          getAllUsers()
        }
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
    ]

    const $q = useQuasar()
    const router = useRouter()

    let rows = []
    let userList = []

    const getAllUsers = async () => {
      try {
        const data = await listAllUsers()
        users.value = data
        userList = users.value
        rows = []
        for (let i = 0; i < userList.length; i++) {
          rows = rows.concat(userList[i])
        }
        rows.forEach((row, index) => {
          row.index = ++index
        })
      } catch (error) {
        $q.notify({
          message: "Not logged!",
          icon: "error",
          color: "negative",
        })
        console.log(error)
      }
    }

    const deleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Delete",
          message: "Do you want to delete this user?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          const deleted = await remove(id)
          if (!deleted) {
            $q.notify({
              message: "Error! Impossible to delete your own account",
              icon: "error",
              color: "negative",
            })
          } else {
            $q.notify({ message: "Deleted", icon: "check", color: "positive" })
            getAllUsers()
          }
        })
      } catch (error) {
        $q.notify({
          message: "Error! Please try again later...",
          icon: "error",
          color: "negative",
        })
      }
    }

    return {
      users,
      columns,
      deleteTask,
      pagination: ref({
        rowsPerPage: 0,
      }),

      refresh(done) {
        setTimeout(() => {
          getAllUsers()
          done()
        }, 1000)
      },
    }
  },
})
