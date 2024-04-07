<template>
  <tas-base-crud :config="config">
  </tas-base-crud>
</template>

<script>
export default {
  name: "crud-persons",
  data: () => ({
    config: {
      title: "Family Tree",
      model_api: null,
      filter_api: {},
      getter: "persons",
      setter: "persons",
      pk_field: null,
      permission: {
        create: "create-persons",
        read: "view-persons",
        update: "update-persons",
        delete: "delete-persons"
      },
      slave: [],
      fields: [
        // id
        {
          id: "id",
          methods: {
            list: false,
            detail: false,
            create: false,
            update: false,
            filter: false
          }
        },
        // fullname
        {
          id: "fullname",
          label: "Fullname",
          methods: {
            list: true,
            detail: true,
            create: {
              validation: ['required']
            },
            update: {
              validation: ['required']
            },
            filter: false
          }
        },
        // username
        {
          id: "username",
          label: "Username",
          methods: {
            list: true,
            detail: true,
            create: true,
            update: true,
            filter: false
          }
        },
        // telephone
        {
          id: "telephone",
          label: "Phone",
          methods: {
            list: true,
            detail: true,
            create: true,
            update: true,
            filter: false
          }
        },
        // email
        {
          id: "email",
          label: "Email",
          methods: {
            list: false,
            detail: true,
            create: {
              type: 'email'
            },
            update: {
              type: 'email'
            },
            filter: false
          }
        },
        // img_photo_user
        {
          id: "img_photo_user",
          label: "Foto Profil",
          methods: {
            list: false,
            detail: {
              type: "file",
              view_data: "img_photo_user.url"
            },
            create: {
              type: "file",
              attr: [{ accept: "image/*, .pdf" }, { limit: 5 }]
            },
            update: {
              type: "file",
              attr: [{ accept: "image/*, .pdf" }, { limit: 5 }]
              // view_data: 'image_thumbnail'
            },
            filter: false
          }
        },
        // address
        {
          id: "address",
          label: "Alamat",
          methods: {
            list: false,
            detail: true,
            create: {
              type: "textarea",
              attr: [{ rows: 5 }]
            },
            update: {
              type: "textarea",
              attr: [{ rows: 5 }]
            },
            filter: false
          }
        },
      ]
    }
  }),
  mounted() {
    const user = this.$_sys.userInfo()
    if (user) {
    }
  }
};
</script>