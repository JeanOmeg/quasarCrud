<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center col-12">
      <div class="col-4 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div class="row justify-center text-bold text-primary" style="font-size: 1.5em">
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
                  (val && val.length > 0) || 'Email is required. Email cannot be empty!',
                (val) => (val && val.length < 81) || 'Invalid email!',
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
                (val) => (val && val.length < 50) || 'Invalid password!',
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
  import login from './login.js'
  export default login
</script>

<style>
  .text-none {
    text-decoration: none;
  }
</style>
