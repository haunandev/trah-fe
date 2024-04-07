
<template>
  <tas-base-crud :config="config">
    <!-- create-form -->
    <template v-slot:create-form>
      <rolesForm />
    </template>

    <!-- update-form -->
    <template v-slot:update-form="{data}">
      <rolesForm :id="data.id" />
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-roles',
  components: {
    rolesForm: () => import('./components/form-roles.vue')
  },
  data () {
    return {
      config: {
        title: 'Roles',
        model_api: null,
        getter: 'roles',
        setter: 'roles',
        pk_field: null,
        permission: {
          create: 'create-roles',
          read: 'view-roles',
          update: 'update-roles',
          delete: 'delete-roles'
        },
        slave: [],
        fields: [
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'role_code', label: 'Role Code', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'role_name', label: 'Role Name', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'description', label: 'Description', methods: { list: false, detail: true, create: true, update: true, filter: false } },
          { id: 'rel_role_group_id', label: 'Role Group', methods: { list: true, detail: true, create: true, update: true, filter: false } },
        ]
      }
    }
  }
}
</script>
