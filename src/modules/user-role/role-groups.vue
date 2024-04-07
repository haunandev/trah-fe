
<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-role_groups',
  components: {},
  data () {
    return {
      config: {
        title: 'Role Groups',
        model_api: null,
        getter: 'role_groups',
        setter: 'role_groups',
        pk_field: null,
        permission: {
          create: 'create-role_groups',
          read: 'view-role_groups',
          update: 'update-role_groups',
          delete: 'delete-role_groups'
        },
        slave: [],
        fields: [
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'group_name', label: 'Name', methods: { list: true, detail: true, create: {validation: ['required']}, update: {validation: ['required']}, filter: false } },
          { id: 'description', label: 'Description', methods: { list: true, detail: true, create: true, update: true, filter: false } }
        ]
      }
    }
  }
}
</script>
