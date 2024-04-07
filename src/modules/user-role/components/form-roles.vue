<template>
    <b-card class="animated">
        <div class="header">
            <h4 class="card-title">
                <a
                    @click="goBack()"
                    class="btn btn-outline-warning btn-icon btn-circle mr-2"
                    v-b-tooltip.top="$t('global.go_back')"
                >
                    <i class="ri-arrow-go-back-line p-0"></i>
                </a>
                <span>Form {{ id ? 'Ubah' : 'Tambah' }} Roles</span>
            </h4>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off" style="position: relative;">
                <!-- loading -->
                <div v-if="isLoading" class="card-img-overlay d-flex align-items-center justify-content-center flex-column" style="background-color: #ffffffaa;z-index: 2;">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="mr-2 text-muted">{{ isLoadingText || $t('global.loading') }} ...</div>
                        <div class="spinner spinner-primary mr-10"></div>
                    </div>
                </div>
                <!-- role_groups -->
                <s-input
                    v-model="mainData.role_group_id"
                    :item="{
                        label: 'Pilih Role Groups',
                        type: 'lookup-radio',
                        validation: ['required'],
                        placeholder: '',
                        api: 'role_groups',
                        pointer: {
                            label: 'group_name',
                            code: 'id',
                            display: ['group_name']
                        }
                    }"
                />
                <!-- role_code -->
                <s-input
                    v-model="mainData.role_code"
                    :item="{
                        label: 'Role Code',
                        type: 'text',
                        validation: ['required'],
                        placeholder: '',
                    }"
                />
                <!-- role_name -->
                <s-input
                    v-model="mainData.role_name"
                    :item="{
                        label: 'Role Name',
                        type: 'text',
                        validation: ['required'],
                        placeholder: '',
                    }"
                />
                <!-- description -->
                <s-input
                    v-model="mainData.description"
                    :item="{
                        label: 'Description',
                        type: 'textarea',
                        validation: [],
                        placeholder: '',
                    }"
                />
                <!-- Button -->
                <div class="text-left mt-8">
                    <b-button type="submit" variant="primary">
                        <i class="ri-save-line p-0"></i>
                        Simpan
                    </b-button>
                </div>
            </form>
        </ValidationObserver>
    </b-card>
</template>

<script>
export default {
    name: 'NurseryManagementFormRoles',
    props: {
        id: {
            default: null
        }
    },
    data: () => ({
        isLoading: false,
        isLoadingText: null,
        disabled: {},
        mainData: {}
    }),
    mounted() {
        this.initForm()
    },
    methods: {
        async initForm() {
            try {
                this.isLoading = true
                this.isLoadingText = 'Menyiapkan formulir'
                // const user = this.$_sys.userInfo()
                // if (user) {
                //     this.mainData.location_nursery_id = user.location_nursery_id
                //     if (user.location_nursery_id) this.disabled.location_nursery_id = true
                // }
                const ID = this.id || this.$route.query.id 
                if (ID) {
                    const role = await this.$_api.single('roles', null, ID).then(res => res.data)
                    console.log('role',role)
                    this.mainData = {
                        ...this.mainData,
                        ...role
                    }
                }
            } catch (err) {
                console.log(`initForm() err`, err)
                this.$_alert.error(err)
            } finally {
                this.isLoadingText = null
                this.isLoading = false
            }
        },
        goBack() {
            this.$parent.activeView = 'list'
            this.$parent.activeID = null
        },
        async onSubmit() {
            try {
                this.isLoading = true
                this.isLoadingText = 'Menyimpan data'
                const ID = this.id || this.$route.query.id
                if (ID) this.mainData.id = ID
                const submitData = await this.$_api[ID ? 'update' : 'create']('roles', this.mainData)
                if (submitData.status == 'error') {
                    this.$_alert.error(null,'Gagal',submitData.message)
                } else {
                    this.$_alert.success('Berhasil menyimpan data!')
                    this.goBack()
                }
            } catch (err) {
                console.log(`onSubmit() err`, err)
                this.$_alert.error(err)
            } finally {
                this.isLoadingText = null
                this.isLoading = false
            }
        }
    },
};
</script>