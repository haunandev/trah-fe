<template>
  <tas-base-crud :config="config" />
</template>

<script>
export default {
  name: "crud-users",
  data() {
    return {
      config: {
        title: "Users",
        model_api: null,
        filter_api: {
          location_nursery_id: null
        },
        getter: "users",
        setter: "users",
        pk_field: null,
        permission: {
          create: "create-users",
          read: "view-users",
          update: "update-users",
          delete: "delete-users"
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
          // location_nursery_id
          {
            id: "location_nursery_id",
            label: "Lokasi Persemaian",
            methods: {
              list: { view_data: "rel_location_nursery_id" },
              detail: { view_data: "rel_location_nursery_id" },
              create: {
                setter: "master_location_nurserys",
                getter: "master_location_nurserys",
                type: "lookup-radio",
                value: null,
                attr: {
                  disabled: false,
                },
                option: {
                  list_pointer: {
                    label: "name_location_nursery",
                    code: "id",
                    display: ["name_location_nursery"]
                  }
                },
                validation: []
              },
              update: {
                setter: "master_location_nurserys",
                getter: "master_location_nurserys",
                type: "lookup-radio",
                value: null,
                attr: {
                  disabled: false,
                },
                option: {
                  list_pointer: {
                    label: "name_location_nursery",
                    code: "id",
                    display: ["name_location_nursery"]
                  }
                },
                validation: []
              },
              filter: {
                setter: "master_location_nurserys",
                getter: "master_location_nurserys",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "name_location_nursery",
                    code: "id",
                    display: ["name_location_nursery"]
                  }
                }
              }
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
          // password
          {
            id: "password",
            label: "Password",
            methods: {
              list: false,
              detail: true,
              create: true,
              update: false,
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
          // role_id
          {
            id: "role_id",
            label: "Role",
            methods: {
              list: { view_data: "rel_role_id" },
              detail: { view_data: "rel_role_id" },
              create: {
                setter: "roles",
                getter: "roles",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "role_name",
                    code: "id",
                    display: ["role_name"]
                  }
                }
              },
              update: {
                setter: "roles",
                getter: "roles",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "role_name",
                    code: "id",
                    display: ["role_name"]
                  }
                }
              },
              filter: {
                setter: "roles",
                getter: "roles",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "role_name",
                    code: "id",
                    display: ["role_name"]
                  }
                }
              }
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
          // nip
          {
            id: "nip",
            label: "ID Karyawan",
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // status_code
          {
            id: "status_code",
            label: "Status",
            methods: {
              list: {
                order: true,
                class: {
                  user_inactive: "badge badge-danger",
                  user_active: "badge badge-primary"
                },
                transform: "status_user"
              },
              detail: {
                order: true,
                class: {
                  user_inactive: "badge badge-danger",
                  user_active: "badge badge-primary"
                },
                transform: "status_user"
              },
              create: {
                view_data: "status_code",
                type: "radio",
                value: "user_active",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    list: [
                      { label: "Aktif", code: "user_active" },
                      { label: "Non Aktif", code: "user_inactive" }
                    ]
                  }
                },
                validation: ["required"]
              },
              update: {
                view_data: "status_code",
                type: "radio",
                value: "user_active",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    list: [
                      { label: "Aktif", code: "user_active" },
                      { label: "Non Aktif", code: "user_inactive" }
                    ]
                  }
                },
                validation: ["required"]
              },
              filter: false
            }
          }
        ]
      }
    };
  },
  mounted() {
    const user = this.$_sys.userInfo()
    if (user) {
      const locationNursery = user.location_nursery_id
      if (locationNursery) {
        this.config.filter_api.location_nursery_id = user.location_nursery_id
        const fieldLocationNursery = this.config.fields.find(v => v.id == 'location_nursery_id')
        if (fieldLocationNursery) {
          fieldLocationNursery.methods.create.value = user.location_nursery_id
          fieldLocationNursery.methods.create.attr.disabled = true
          fieldLocationNursery.methods.update.value = user.location_nursery_id
          fieldLocationNursery.methods.update.attr.disabled = true
          fieldLocationNursery.methods.filter = false
        }
      } else {
        delete this.config.filter_api.location_nursery_id
      }
    }
  }
};
</script>
