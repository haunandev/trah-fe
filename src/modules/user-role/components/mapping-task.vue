<template>
    <b-card>
        <!-- title -->
        <b-card-title v-b-toggle="`mapping-role-task-collapse`">
            Mapping Role Task
        </b-card-title>
        <b-collapse visible id="mapping-role-task-collapse">
            <!-- roleGroupID -->
            <s-input
                v-model="roleGroupID"
                @input="$val => getTableFields($val)"
                :item="{
                    label: 'Role Groups',
                    type: 'lookup-radio',
                    validation: [],
                    placeholder: '',
                    api: 'role_groups',
                    pointer: {
                        label: 'group_name',
                        code: 'id',
                        display: ['group_name', 'description']
                    }
                }"
            />
            <!-- search -->
            <div class="card-title flex-fill mr-0">
                <div class="input-icon w-100">
                <input
                    v-model.lazy.trim="filter.search"
                    autocomplete="off"
                    name="search"
                    type="text"
                    class="form-control seach-form"
                    placeholder="Search task name ..."
                />
                <span>
                    <i class="ri-search-line text-primary"></i>
                </span>
                </div>
            </div>
            <!-- table -->
            <b-table
                id="mapping-table"
                hover
                no-border-collapse
                responsive
                sticky-header
                striped
                :items="items"
                :fields="fields"
                style="max-height: 80vh;"
                @filtered="onFiltered"
            >
                <template #cell(index)="{index}" >
                    {{ index + 1 + (filter.perPage * (filter.currentPage - 1)) }}
                </template>
                <template v-for="role in fields"
                    #[role.cell_name]="{item,field}"
                >
                    <b-form-checkbox
                        v-if="item.mapping_roles_tasks.find(v => v.task_id == item.id && v.role_id == field.role_id)"
                        switch
                        :key="`checkboxkey-${role.cell_name}-${item.id}`"
                        :id="`checkbox-${role.cell_name}-${item.id}`"
                        :name="`checkbox-${role.cell_name}-${item.id}`"
                        size="lg"
                        v-model="item.mapping_roles_tasks.find(v => v.task_id == item.id && v.role_id == field.role_id).active"
                        @change="$v => syncMappingRoleTasks(item.mapping_roles_tasks.find(v => v.task_id == item.id && v.role_id == field.role_id), $v)"
                    ></b-form-checkbox>
                    <b-form-checkbox
                        v-else
                        switch
                        :key="`checkboxkey-${role.cell_name}-${item.id}-create`"
                        :id="`checkbox-${role.cell_name}-${item.id}`"
                        :name="`checkbox-${role.cell_name}-${item.id}`"
                        size="lg"
                        @change="$v => createNewMappingRoles(item, field.role_id)"
                    ></b-form-checkbox>
                </template>
            </b-table>
            <!-- pagination -->
            <b-row>
                <b-col sm="5" md="4" class="my-1">
                    <b-form-group
                        label="Per page"
                        label-for="per-page-select"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                    >
                        <b-form-select
                            id="per-page-select"
                            @change="($v) => initData({
                                page: 1,
                                limit: $v,
                                search: filter.search
                            })"
                            v-model="filter.perPage"
                            :options="options.pageOptions"
                            size="sm"
                        ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col sm="7" md="8" class="my-1">
                    <b-pagination
                        v-model="filter.currentPage"
                        :total-rows="filter.totalRows"
                        :per-page="filter.perPage"
                        align="right"
                        class="my-0"
                        aria-controls="mapping-table"
                        @change="$v => initData({
                            page: $v,
                            limit: filter.perPage,
                            search: filter.search
                        })"
                    ></b-pagination>
                </b-col>
            </b-row>
        </b-collapse>
    </b-card>
</template>

<script>
export default {
    name: 'NurseryManagementMappingTask',

    data: () => ({
        fields: [],
        items: [],
        mapping: [],
        filter: {
            search: null,
            perPage: 20,
            currentPage: 1,
            totalRows: 0,
        },
        options: {
            pageOptions: [20, 50, 100, { value: 10000, text: "Show All" }],
        },
        roleGroupID: null
    }),

    mounted() {
        this.firstAccessPage()
    },
    watch: {
        'filter.search': {
            deep: false,
            immediate: false,
            handler(v) {
                this.initData({
                    page: 1,
                    limit: this.filter.perPage,
                    search: v
                })
            }
        }
    },

    methods: {
        createNewMappingRoles: async function (task, roleID) {
            const loading = this.$_alert.loading('Creating mapping role task ...')
            try {
                const storeData = {
                    role_id: roleID,
                    task_id: task.id,
                    active: 1
                }
                await this.$_api.create('mapping_roles_tasks', storeData).then(create => {
                    task.mapping_roles_tasks.push({
                        ...create.data,
                        active: create.data.active ? true : false
                    })
                    this.$_alert.success('Berhasil mengubah data!')
                })
            } catch (err) {
                console.log('mapping-task.vue createNewMappingRoles() error', err)
                this.$_alert(err)
            } finally {
                loading.close()
            }
        },
        getTableFields: async function (roleGroupID = null) {
            const loading = this.$_alert.loading('Loading roles ...')
            try {
                // set fields
                const getRoles = await this.$_api.list('roles', {
                    limit: 100,
                    role_group_id: roleGroupID || null
                }).then(res => res.data)
                const fields = [
                    {
                        key: 'index',
                        label: 'No',
                        sortable: false
                    },
                    {
                        key: 'task_code',
                        label: 'Tasks',
                        sortable: false,
                        stickyColumn: true
                    }
                ]
                for (const [rIndex, rData] of Object.entries(
                    getRoles.sort((a, b) => a.role_name.localeCompare(b.role_name))
                )) {
                    const field = {
                        key: `active-${rData.id}`,
                        label: rData.role_name,
                        sortable: false,
                        cell_name: `cell(active-${rData.id})`,
                        role_id: `${rData.id}`,
                    }
                    fields.push(field)
                }
                this.fields = fields
                } catch (err) {
                console.log('mapping-task.vue getTableFields() error', err)
                this.$_alert(err)
            } finally {
                loading.close()
            }
        },
        firstAccessPage: async function () {
            await this.getTableFields()
            await this.initData({
                page: this.filter.currentPage,
                limit: this.filter.perPage,
                search: this.filter.search
            })
        },
        initData: async function (param) {
            const loading = this.$_alert.loading('Loading roles tasks ...')
            try {
                // set items
                const getTasks = await this.$_api.list('tasks', param)
                const items = []
                for (const[tIndex, tData] of Object.entries(getTasks.data)) {
                    const item = tData
                    item.mapping_roles_tasks = item.mapping_roles_tasks.map(val => {
                        return {
                            ...val,
                            active: val.active ? true : false
                        }
                    })
                    items.push(item)
                }
                this.items = items
                console.log('items', items)
                this.filter.totalRows = getTasks.total
            } catch (err) {
                console.log('mapping-task.vue initData() error', err)
                this.$_alert(err)
            } finally {
                loading.close()
            }
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            // this.filter.currentPage = 1
            // this.initData({
            //     page: this.filter.currentPage,
            //     limit: this.filter.perPage,
            //     search: this.filter.search
            // })
            // this.onFilteredTable()
        },
        syncMappingRoleTasks: async function(mappingData, val) {
            const loading = this.$_alert.loading('Updating role task ...', true)
            try {
                await this.$_api.update('mapping_roles_tasks', {
                    ...mappingData,
                    active: val ? 1 : 0
                }).then(() => {
                    this.$_alert.success('Berhasil mengubah data!')
                })
            } catch (err) {
                setTimeout(() => {
                    mappingData.active = !val
                }, 200);
                console.log('mapping-task.vue syncMappingRoleTasks() error', err)
                this.$_alert(err)
            } finally {
                loading.close()
            }
        }
    },
};
</script>
