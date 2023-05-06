import { defineComponent, ref, onMounted } from 'vue'
import createsService from 'src/services/create'
import { useQuasar } from 'quasar'
import ToolBar from 'components/ToolBar.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'RegisterPage',

  components: {
    ToolBar,
  },

  setup() {
    const { createUser } = createsService()
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      const logout = localStorage.getItem('logout')
      if (logout === 'false') {
        router.push({ name: 'home' })
      }
    })

    const form = ref({
      real_name: '',
      username: '',
      email: '',
      phone: '',
      user_password: '',
      password: '',
    })

    const onSubmit = async () => {
      if (form.value.user_password !== form.value.password) {
        $q.notify({ message: 'Error', icon: 'check', color: 'negative' })
      } else {
        try {
          await createUser(form.value)
          $q.notify({ message: 'Created', icon: 'check', color: 'positive' })
          router.push({ name: 'loginPage' })
        } catch (error) {
          console.error(error)
        }
      }
    }
    return {
      form,
      onSubmit,
    }
  },
})
