
<template>
    <tas-base-crud :config="config" hide-detail>
      <!-- list-header -->
      <template v-slot:list-header>
        <mappingTask class="mb-5" />
      </template>

      <!-- create-form -->
      <template v-slot:create-form>
        <createTask />
      </template>
    </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-tasks',
  components: {
    mappingTask: () => import('./components/mapping-task.vue'),
    createTask: () => import('./components/form-tasks.vue')
  },
  data () {
    return {
      config: {
        title: 'Tasks',
        model_api: null,
        getter: 'tasks',
        setter: 'tasks',
        pk_field: null,
        permission: {
          create: 'create-tasks',
          read: 'view-tasks',
          update: 'update-tasks',
          delete: 'delete-tasks'
        },
        slave: [],
        fields: [
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'task_code', label: 'Task Code', methods: { list: true, detail: true, create: {validation: ['required']}, update: {validation: ['required']}, filter: false } },
          { id: 'task_name', label: 'Task Name', methods: { list: true, detail: true, create: {validation: ['required']}, update: {validation: ['required']}, filter: false } },
          { id: 'task_group', label: 'Task Group', methods: { list: true, detail: true, create: {validation: ['required']}, update: {validation: ['required']}, filter: false } },
          { id: 'description', label: 'Description', methods: { list: true, detail: true, create: true, update: true, filter: false } }
        ]
      }
    }
  },
  mounted() {
    // minimize sidebar menu
    this.$_sys.togleClass("kt_body", "aside-minimize", true);
    this.$store.commit("set", ["sideNavSecondary", false]);
  }
}
</script>
