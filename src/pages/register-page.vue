<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center col-12">
      <div class="col-4 q-gutter-sm q-col-gutter-sm">
        <div class="row justify-center text-bold text-primary" style="font-size: 1.5em">
          Create your account
        </div>
        <q-card bordered class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input square filled clearable v-model="form.real_name" type="text" label="Name" lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Name is required. Name cannot be empty!',
                (val) => (val && val.length < 201) || 'Name invalid!',
              ]" hide-bottom-space />
            <q-input square filled clearable v-model="form.username" type="text" label="Username" lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Username is required. Username cannot be empty!',
                (val) => (val && val.length < 41) || 'Invalid username!',
              ]" hide-bottom-space />
            <q-input square filled clearable v-model="form.email" type="email" label="Email" lazy-rules="ondemand" :rules="[
              (val) =>
                (val && val.length > 0) || 'Email is required. Email cannot be empty!',
              (val) => (val && val.length < 81) || 'Invalid email!',
            ]" hide-bottom-space />
            <q-input square filled clearable v-model="form.user_password" type="password" label="Password"
              lazy-rules="ondemand" :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Password is required. Password cannot be empty!',
                (val) => (val && val.length < 50) || 'Invalid password!',
              ]" hide-bottom-space />
            <q-input square filled clearable v-model="form.password" type="password" label="Confirm your password"
              lazy-rules="ondemand" :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Password is required. Password cannot be empty!',
                (val) => (val && val.length < 50) || 'Invalid password!',
              ]" hide-bottom-space />
            <q-input square filled clearable v-model="form.phone" type="tel" label="Cell Phone" mask="(##) ##### - ####"
              fill-mask lazy-rules="ondemand" :rules="[
                (val) =>
                  (val && val.length > 0) || 'Phone is required. Phone cannot be empty!',
                (val) => (val && val.length < 40) || 'Invalid phone!',
              ]" hide-bottom-space />
            <div class="row justify-between">
              <q-btn label="Cancel" color="negative" text-color="white" size="md" :to="{ name: 'loginPage' }" />
              <q-btn label="Create" color="primary" size="md" type="submit" />
            </div>
          </q-form>
        </q-card>
        <q-space />
      </div>
    </div>
  </q-page>
</template>

<script>
import registerPage from './register-page'
export default registerPage
</script>
