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
          Access your account
        </div>
        <q-space />
        <q-card bordered class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="form.email"
              type="email"
              label="Email"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Email is required. Email cannot be empty!',
                (val) =>
                  (val && val.length < 81) ||
                  'Invalid email!',
              ]"
              hide-bottom-space
            />
            <q-input
              square
              filled
              clearable
              v-model="form.password"
              type="password"
              label="Password"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Password is required. Password cannot be empty!',
                  (val) =>
                  (val && val.length < 50) ||
                  'Invalid password!',
              ]"
              hide-bottom-space
            />
            <div class="row justify-between">
              <q-btn
                size="md"
                label="Create"
                color="negative"
                text-color="white"
                :to="{ name: 'registerPage' }"
              />
              <q-btn label="Login" color="primary" type="submit" size="md" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import loginService from "src/services/login";
import ToolBar from "components/ToolBar.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginPage",

  components: {
    ToolBar,
  },

  setup() {
    const { login } = loginService();
    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      const logout = localStorage.getItem("logout");
      if (logout === "false") {
        router.push({ name: "home" });
      }
    });

    const form = ref({
      email: "",
      password: "",
    });

    const onSubmit = async () => {
      if (!form.value.email || !form.value.password) {
        $q.notify({
          message: "Email and/or Password is required!",
          icon: "error",
          color: "negative",
        });
      } else {
        try {
          const usuario = {
            email: form.value.email,
            password: form.value.password,
          };
          const { data } = await login(usuario);
          localStorage["userToken"] = data.token;
          localStorage["refreshToken"] = data.refreshToken;
          localStorage["admin"] = data.user.admin;
          localStorage["logout"] = "false";
          $q.notify({
            message: "Logged!",
            icon: "check",
            color: "positive",
          });
          router.push({ name: "home" });
        } catch (error) {
          console.error(error);
          localStorage.removeItem("admin");
          localStorage.removeItem("userToken");
          localStorage.removeItem("logout");
          router.push({ name: "loginPage" }).then(
            $q.notify({
              message: "Incorrect email or password!",
              icon: "error",
              color: "negative",
            })
          );
        }
      }
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>

<style>
.text-none {
  text-decoration: none;
}
</style>
