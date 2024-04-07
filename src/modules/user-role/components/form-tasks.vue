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
                <span>Form Create Task</span>
            </h4>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off" style="position: relative;">
                <!-- task_type -->
                <s-input
                    v-model="mainData.task_type"
                    :item="{
                        label: 'Tipe',
                        type: 'select-button',
                        validation: ['required'],
                        placeholder: '',
                        optionList: [{
                            label: 'Default',
                            code: 1
                        },{
                            label: 'Custom',
                            code: 2
                        }]
                    }"
                />
                <!-- default type -->
                <div v-if="mainData.task_type == 1">
                    <h5>Default Task Group : </h5>
                    <b-row>
                        <b-col
                            v-for="(column, colIndex) in defaultTypeTask" :key="`column-toggle-export-${colIndex}`"
                            cols="12"
                            lg="3"
                            md="6"
                        >
                            <div class="form-group row align-items-center">
                            <label
                                :for="`toggle-${column.key}`"
                                class="col-lg-8 col-9 col-form-label text-capitalize"
                                >{{ column.label }}</label
                            >
                            <div class="col-3">
                                <span class="switch switch-icon">
                                <label>
                                    <input
                                    :id="`toggle-${column.key}`"
                                    v-model="column.is_active"
                                    type="checkbox"
                                    checked="checked"
                                    name="select"
                                    :true-value="true"
                                    :false-value="false"
                                    />
                                    <span></span>
                                </label>
                                </span>
                            </div>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- table_name -->
                    <s-input
                        v-model="mainData.table_name"
                        :item="{
                            label: 'Table Name',
                            type: 'text',
                            validation: ['required'],
                            placeholder: '',
                        }"
                    />
                </div>
                <div v-else >
                    <!-- task_code -->
                    <s-input
                        v-model="mainData.task_code"
                        :item="{
                            label: 'Task Code',
                            type: 'text',
                            validation: ['required'],
                            placeholder: '',
                        }"
                    />
                    <!-- task_name -->
                    <s-input
                        v-model="mainData.task_name"
                        :item="{
                            label: 'Task Name',
                            type: 'text',
                            validation: ['required'],
                            placeholder: '',
                        }"
                    />
                    <!-- task_group -->
                    <s-input
                        v-model="mainData.task_group"
                        :item="{
                            label: 'Task Group',
                            type: 'text',
                            validation: ['required'],
                            placeholder: '',
                        }"
                    />
                    <!-- description -->
                    <s-input
                        v-model="mainData.description"
                        :item="{
                            label: 'Task Description',
                            type: 'text',
                            validation: ['required'],
                            placeholder: '',
                        }"
                    />
                </div>
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
    name: 'NurseryFeFormTasks',

    data: () => ({
        mainData: {
            task_type: 1
        },
        defaultTypeTask: [
            {
                label: 'Create',
                key: 'create',
                is_active: true,
                desc: 'Membuat Data'
            },
            {
                label: 'Update',
                key: 'update',
                is_active: true,
                desc: 'Mengubah Data'
            },
            {
                label: 'Delete',
                key: 'delete',
                is_active: true,
                desc: 'Menghapus Data'
            },
            {
                label: 'View',
                key: 'view',
                is_active: true,
                desc: 'Melihat Data List'
            },
            {
                label: 'Show',
                key: 'show',
                is_active: true,
                desc: 'Melihat Data Detail'
            },
            {
                label: 'Lookup',
                key: 'lookup',
                is_active: true,
                desc: 'Melihat Dataset'
            },
            {
                label: 'Verif',
                key: 'verif',
                is_active: false,
                desc: 'Verifikasi Data'
            },
            {
                label: 'Unverif',
                key: 'unverif',
                is_active: false,
                desc: 'Unverifikasi Data'
            },
        ]
    }),

    mounted() {
        
    },

    methods: {
        goBack() {
            this.$parent.activeView = 'list'
            this.$parent.activeID = null
        },
        onSubmit: async function () {
            const loading = this.$_alert.loading('Menyimpan data ...')
            try {
                if (this.mainData.task_type == 1) {
                    const tableName = this.mainData.table_name
                    const taskGroup = tableName.replace(/_/g, ' ').toUpperCase()
                    for (const [keyTask, valTask] of Object.entries(this.defaultTypeTask.filter(v => v.is_active === true))) {
                        const storeData = {
                            task_code: `${valTask.key}-${tableName}`,
                            task_name: `${valTask.label} ${this.$_sys.snakeToCapitalized(tableName)}`,
                            task_group: taskGroup,
                            description: `${valTask.desc} ${this.$_sys.snakeToCapitalized(tableName)}`,
                        }
                        await this.$_api.create('tasks', storeData)
                    }
                    await this.goBack()
                } else {
                    await this.$_api.create('tasks', this.mainData)
                    await this.goBack()
                }
            } catch (err) {
                console.log('onSubmit() err',err)
                this.$_alert.error(err)
            } finally {
                loading.close()
            }
        }
    },
};
</script>