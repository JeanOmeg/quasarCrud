<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center col-12">
      <div class="col-8 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div class="row justify-center text-bold text-primary" style="font-size: 1.5em">
          Create or edit your task
        </div>
        <q-space />
        <q-card bordered class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="form.title" square filled clearable label="Title" hide-bottom-space lazy-rules :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Title is required. Title cannot be empty!',
              (val) =>
                (val && val.length < 150) ||
                'Title cannot be longer than 150 characters',
            ]" />
            <q-select v-model="form.status" :options="options" square filled v-if="form.status" label="Status" />

            <div class="row justify-between">
              <q-btn label="Cancel" color="negative" text-color="white" size="md" :to="{ name: 'home' }" />
              <q-btn label="Save" color="primary" type="submit" size="md" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import formTask from "./form-task.js"
export default formTask
</script>
