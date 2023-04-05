<template>
  <tool-bar />
  <q-page>
    <div class="row justify-center items-center content-center col-12">
      <div class="col-8 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div class="row justify-center text-bold text-primary" style="font-size: 1.5em">
          All platform tasks
        </div>
        <q-space />
        <q-pull-to-refresh @refresh="refresh">
          <q-table title="Tasks" :rows="tasks" :columns="columns" row-key="index" class="my-sticky-virtscroll-table">
            <template v-slot:top>
              <span class="text-h5">Tasks</span>
              <q-space />
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-sm">
                <q-btn icon="delete" color="negative" dense size="sm" @click="deleteTask(props.row.id)" />
              </q-td>
            </template>
          </q-table>
        </q-pull-to-refresh>
      </div>
    </div>
  </q-page>
</template>

<script>
import admTasksPage from './adm-tasks-page.js'
export default admTasksPage
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
