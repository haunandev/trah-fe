<template>
  <div class="card card-custom mb-5">
    <div v-if="title" class="card-header border-0 pt-6 pb-0" style="min-height:unset;">
      <h4 class="mb-3">{{ title }}</h4>
    </div>
    <!-- <slot name='header-table'></slot> -->
    <div class="card-header border-0 py-0">
      <div class="card-title flex-fill mr-0">
        <div class="input-icon w-100">
          <input
            v-model.lazy.trim="inputSearch"
            autocomplete="off"
            name="search"
            type="text"
            class="form-control seach-form"
            :placeholder="$t('global.search') + ' ' + title"
          />
          <span>
            <i class="ri-search-line text-primary"></i>
          </span>
        </div>
      </div>
      <div class="card-toolbar">
        <slot name="table-action" />
        <div v-if="$_sys.isAllowed(permission.create)" class="mx-2"></div>
        <a
          @click="emitEvent('add_new')"
          v-if="$_sys.isAllowed(permission.create)"
          class="btn btn-primary btn-icon btn-circle"
          v-b-tooltip.top="$t('global.add_new')"
        >
          <i class="ri-add-line p-0"></i>
        </a>
        <div class="v-separator mx-2"></div>
        <a
          v-b-modal.modal-visibility
          class="btn btn-outline-primary btn-icon btn-circle mr-2"
          v-b-tooltip.top="$t('global.visibility')"
        >
          <i class="ri-layout-3-line p-0"></i>
        </a>
        <a
          v-if="!hideFilter"
          @click="emitEvent('filter')"
          class="btn btn-outline-primary btn-icon btn-circle"
          v-b-tooltip.top="$t('global.filter')"
        >
          <i class="ri-filter-2-line p-0"></i>
        </a>
        <!-- <a @click="emitEvent('reload')" class="btn btn-outline-danger btn-icon btn-circle" v-b-tooltip.top="$t('global.reload')">
          <i class="ri-refresh-line p-0"></i>
        </a> -->
        <div v-if="this.export || this.import" class="v-separator mx-2"></div>
        <export-excel
          v-if="this.export"
          @done="isLoadingExport = false"
          :fieldsXLS="exportLabel"
          :data="exportData"
          :beforeGenerate="getExportData"
          :worksheet="'Data ' + title"
          :name="
            title.split(' ').join('-') +
              '_' +
              $_sys.dateNow('DD-MM-YYYY') +
              '.xls'
          "
        >
          <a
            class="btn btn-outline-primary btn-icon btn-circle mr-2"
            v-b-tooltip.top="$t('global.export')"
          >
            <i class="ri-file-excel-2-line p-0"></i>
          </a>
        </export-excel>
        <a
          v-if="this.import"
          @click="emitEvent('import')"
          class="btn btn-outline-primary btn-icon btn-circle mr-2"
          v-b-tooltip.top="$t('global.import')"
        >
          <i class="ri-upload-2-line p-0"></i>
        </a>
      </div>
      <b-toast
        id="export-toast"
        variant="success"
        solid
        no-auto-hide
        no-close-button
        :visible="isLoadingExport"
      >
        <template #toast-title>
          <div class="d-flex flex-grow-1 align-items-center pt-2">
            <b-spinner label="Spinning" small></b-spinner>
            <strong class="mr-auto pl-3"> Mengunduh File ...</strong>
            <small class="text-muted mr-2">
              <time-ago locale="id"></time-ago>
            </small>
          </div>
        </template>
        File Excel akan langsung terunduh ketika proses Ekspor data ke Excel
        selesai
      </b-toast>
    </div>
    <div class="card-body pb-0 pt-3">
      <slot name="inline-filter"></slot>
      <!-- <div v-if="filterList.length>0" class="row no-gutters">
        <div class="col-auto">
          <span class="d-block label label-inline bg-white mr-1">{{ $t('global.filter_label') }} :</span>
        </div>
        <div class="col">
          <span v-for="(f,i) in filterList" :key="i+'-key-filter'" class="label label-inline label-light-primary mr-1 mb-1 pr-1"> {{f.id === 'search' ? $t('global.search_label')  : f.type }} : {{ f.display || f.value }} <i @click="removeFilter(f.id)" class="ri-close-line ml-2 pointer text-danger"></i>
          </span>
          <span @click="removeFilter()" class="label label-inline label-light-danger mr-1 mb-1 pointer">{{ $t('global.delete_all') }}</span>
        </div>
      </div> -->
    </div>
    <slot name="header-table"></slot>
    <div class="card-body pt-2">
      <div class="table-responsive" style="position: relative;">
        <div
            v-if="isLoading && mainData.length > 0"
            class="card-img-overlay d-flex align-items-center justify-content-center flex-column"
            style="background-color: #ffffffaa;z-index: 5;"
        >
            <div class="d-flex align-items-center justify-content-center">
            <div class="mr-2 text-muted">{{ $t("global.loading") }} ...</div>
            <div class="spinner spinner-primary mr-10"></div>
            </div>
        </div>
        <table
          class="table table-head-custom table-vertical-center table-head-bg table-borderless table-hover"
          :class="{ [API]: true }"
        >
          <slot name="list-header-table" @click="emitEvent('orderField', d)">
            <thead>
              <tr>
                <th class="sticky"></th>
                <th
                  class="position-relative"
                  v-for="(h, i) in fields.filter(
                    x => x.show === true && $_sys.isAllowed(x.permission)
                  )"
                  :key="i + '-header'"
                  :class="[{ sticky: i === -10 }, { pointer: h.order }]"
                  @click="orderField(h)"
                >
                  <span
                    class="d-block nowrap"
                    :class="{ 'text-dark-75 mr-5': h.id === orderID }"
                    >{{ h.label }}</span
                  >
                  <i
                    v-if="h.id === orderID"
                    class="sort-table text-dark-75"
                    :class="'ri-sort-' + paramAPI.sort.toLowerCase()"
                  ></i>
                </th>
              </tr>
            </thead>
          </slot>
          <tbody v-if="mainData.length > 0">
            <tr v-for="(b, i) in mainData" :key="i + '-body'">
              <td class="sticky">
                <div
                  class=" d-flex flex-row justify-content-center align-items-center"
                >
                  <slot name="table-data-action" v-bind:rowData="b.real"></slot>
                  <a
                    v-b-tooltip.top.viewport="$t('global.detail')"
                    @click="emitEvent('detail', b.real)"
                    v-if="$_sys.isAllowed(permission.read)"
                    class="btn btn-icon btn-info btn-xs mx-1"
                    style="background-color: rgba(0, 207, 232, 0.12); border: none;"
                  >
                    <i class="ri-information-line text-primary"></i>
                  </a>
                  <a
                    v-b-tooltip.top.viewport="$t('global.update')"
                    @click="emitEvent('update', b.real)"
                    v-if="$_sys.isAllowed(permission.update)"
                    class="btn btn-icon btn-warning btn-xs mx-1"
                    style="background-color: rgba(255, 159, 67, 0.12); border: none"
                  >
                    <i class="ri-edit-2-line text-warning"></i>
                  </a>
                  <a
                    v-b-tooltip.top.viewport="$t('global.delete')"
                    @click="deleteData(b.real)"
                    v-if="$_sys.isAllowed(permission.delete)"
                    class="btn btn-icon btn-danger btn-xs mx-1"
                    style="background-color: #FFE2E5; border: none"
                  >
                    <i class="ri-delete-bin-2-line text-danger"></i>
                  </a>
                </div>
              </td>
              <td
                v-for="(h, j) in fields.filter(
                  x => x.show === true && $_sys.isAllowed(x.permission)
                )"
                :key="j"
                :class="{ sticky: j === -20 }"
                class=""
              >
                <template v-if="h.type === 'slot' || h.type === 'row-slot'">
                  <slot
                    v-if="h.type === 'slot'"
                    :name="h.id"
                    v-bind:rowData="b.real[h.id]"
                  ></slot>
                  <slot
                    v-else-if="h.type === 'row-slot'"
                    :name="h.id"
                    v-bind:rowData="b.real"
                  ></slot>
                </template>
                <template v-else>
                  <div
                    v-if="b.mask[h.id] instanceof Array"
                    class="d-flex align-items-center"
                  >
                    <template v-for="(v, k) in b.mask[h.id]">
                      <template v-if="v.data instanceof Array">
                        <template v-if="v.type === 'text'">
                          <template v-for="(d, l) in v.data">
                            <span
                              :key="k + '-value-multiple' + l"
                              class="text-line-2"
                              :class="classReader(d, h.class)"
                              >{{ d | parse(h.transform) }}
                              {{ l != v.data.length - 1 ? ", " : " " }}</span
                            >
                          </template>
                        </template>
                        <template v-else-if="v.type === 'button'">
                          <template v-for="(d, l) in v.data">
                            <a
                              :key="k + '-value-multiple-' + l"
                              class="btn btn-sm "
                              :class="[
                                classReader(d, h.class)
                                  ? classReader(d, h.class)
                                  : 'btn-primary'
                              ]"
                              @click="h.event.click"
                              >{{ d | parse(h.transform) }}</a
                            >
                          </template>
                        </template>
                        <template v-else-if="v.type === 'file'">
                          <template v-for="(d, l) in v.data">
                            <img
                              :key="k + '-value-multiple-' + l"
                              class="img-table "
                              :class="classReader(d, h.class)"
                              v-img-fb="d"
                              :alt="h.id"
                              @click="emitEvent('zoom', d)"
                            />
                          </template>
                        </template>
                        <template v-else>
                          <span :key="k + '-value-multiple-' + l"
                            >{{ $t("error.view_type") }}
                            {{ "(" + v.type + ")" }}
                          </span>
                        </template>
                      </template>
                      <template v-else>
                        <span
                          v-if="v.type === 'text'"
                          :key="k + '-value'"
                          class="text-line-2"
                          :class="classReader(v, h.class[k])"
                          >{{ v.data | parse(h.transform[k]) }}</span
                        >
                        <a
                          v-else-if="v.type === 'button'"
                          :key="k + '-value'"
                          class="btn btn-sm "
                          :class="[
                            classReader(v, h.class[k])
                              ? classReader(v, h.class[k])
                              : 'btn-primary'
                          ]"
                          @click="h.event.click[k]"
                          >{{ v.data | parse(h.transform[k]) }}</a
                        >
                        <img
                          v-else-if="v.type === 'file'"
                          :key="k + '-value'"
                          class="img-table "
                          :class="classReader(v, h.class[k])"
                          v-img-fb="v.data"
                          :alt="h.id"
                          @click="emitEvent('zoom', v.data)"
                        />
                        <span v-else :key="k + '-value'"
                          >{{ $t("error.view_type") }}
                          {{ "(" + v.type + ")" }}</span
                        >
                      </template>
                    </template>
                  </div>
                  <template v-else>
                    <template v-if="b.mask[h.id].data instanceof Array">
                      <template v-if="b.mask[h.id].type === 'text'">
                        <template v-for="(d, k) in b.mask[h.id].data">
                          <span
                            :key="k + '-value'"
                            class="text-line-2"
                            :class="classReader(d, h.class)"
                            >{{ d | parse(h.transform)
                            }}{{
                              k != b.mask[h.id].data.length - 1 ? ", " : " "
                            }}</span
                          >
                        </template>
                      </template>
                      <template v-else-if="b.mask[h.id].type === 'button'">
                        <template v-for="(d, k) in b.mask[h.id].data">
                          <a
                            :key="k + '-value'"
                            class="btn btn-sm "
                            :class="[
                              classReader(d, h.class)
                                ? classReader(d, h.class)
                                : 'btn-primary'
                            ]"
                            @click="h.event.click"
                            >{{ d | parse(h.transform) }}</a
                          >
                        </template>
                      </template>
                      <template v-else-if="b.mask[h.id].type === 'file'">
                        <template v-for="(d, k) in b.mask[h.id].data">
                          <img
                            :key="k + '-value'"
                            class="img-table "
                            :class="classReader(d, h.class)"
                            v-img-fb="d"
                            :alt="h.id"
                            @click="emitEvent('zoom', d)"
                          />
                        </template>
                      </template>
                      <template v-else>
                        <span :key="k + '-value'"
                          >{{ $t("error.view_type") }}
                          {{ "(" + b.mask[h.id].type + ")" }}</span
                        >
                      </template>
                    </template>
                    <template v-else>
                      <span
                        v-if="b.mask[h.id].type === 'text'"
                        class="text-line-2"
                        :class="classReader(b.mask[h.id].data, h.class)"
                        >{{ b.mask[h.id].data | parse(h.transform) }}</span
                      >
                      <div
                        v-else-if="b.mask[h.id].type === 'money'"
                        class="d-flex justify-content-between"
                      >
                        <span class="">Rp.</span>
                        <span class="text-right">{{
                          b.mask[h.id].data | parse(h.transform)
                        }}</span>
                      </div>
                      <div
                        v-else-if="b.mask[h.id].type === 'moneyUsd'"
                        class="d-flex justify-content-between"
                      >
                        <span class="">$.</span>
                        <span class="text-right">{{
                          b.mask[h.id].data | parse(h.transform)
                        }}</span>
                      </div>
                      <a
                        v-else-if="b.mask[h.id].type === 'button'"
                        class="btn btn-sm "
                        :class="[
                          classReader(b.mask[h.id].data, h.class)
                            ? classReader(b.mask[h.id].data, h.class)
                            : 'btn-primary'
                        ]"
                        @click="h.event.click"
                        >{{ b.mask[h.id].data | parse(h.transform) }}</a
                      >
                      <img
                        v-else-if="b.mask[h.id].type === 'file'"
                        class="img-table "
                        :class="classReader(b.mask[h.id].data, h.class)"
                        v-img-fb="b.mask[h.id].data"
                        :alt="h.id"
                        @click="emitEvent('zoom', b.mask[h.id].data)"
                      />
                      <span v-else
                        >{{ $t("error.view_type") }}
                        {{ "(" + b.mask[h.id].type + ")" }}</span
                      >
                    </template>
                  </template>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="mainData.length === 0" class="text-center my-3 pb-5">
        <img
          src="/static/img/qhse/no-data_form.svg"
          style="width:120px;margin:2em 0;"
          alt=""
        />
        <div v-if="isLoading" class="d-flex align-items-center justify-content-center mb-5">
          <div class="mr-2 text-muted">{{ $t("global.loading") }} ...</div>
          <div class="spinner spinner-primary mr-10"></div>
        </div>
        <div v-else>
          <p v-if="!paramAPI.search">Belum ada data yang ditambahkan</p>
          <p v-else>{{ paramAPI.search }} tidak ditemukan</p>
        </div>
      </div>
      <div
        v-if="mainData.length > 0"
        class="d-flex justify-content-between align-items-center flex-wrap"
      >
        <div class="pagination d-flex flex-wrap py-2 mr-3">
          <button
            type="button"
            @click="goPage('first')"
            :disabled="paramAPI.page == 1"
            class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1"
          >
            <i class="ri-skip-back-mini-line"></i>
          </button>
          <button
            type="button"
            @click="goPage('prev')"
            :disabled="paramAPI.page == 1"
            class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"
          >
            {{ $t("global.prev") }}
          </button>
          <input
            @change="goPage('input')"
            v-model.lazy="paramAPI.page"
            type="text"
            name="pagination"
            autocomplete="off"
            class="form-control form-control-sm pagination-text mr-1 my-1"
            :placeholder="$t('global.goto')"
          />
          <button
            type="button"
            @click="goPage('next')"
            :disabled="paramAPI.page == maxPage"
            class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"
          >
            {{ $t("global.next") }}
          </button>
          <button
            type="button"
            @click="goPage('last')"
            :disabled="paramAPI.page == maxPage"
            class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1"
          >
            <i class="ri-skip-forward-mini-line"></i>
          </button>
        </div>
        <div class="d-flex align-items-center py-3">
          <!-- <div v-if="isLoading" class="d-flex align-items-center">
            <div class="mr-2 text-muted">{{ $t("global.loading") }} ...</div>
            <div class="spinner spinner-primary mr-10"></div>
          </div> -->
          <v-select
            class="limit-table mr-4"
            placeholder="Limit Data"
            v-model="paramAPI.limit"
            :value="paramAPI.limit"
            append-to-body
            :searchable="false"
            :clearable="false"
            :options="[10, 20, 50, 100]"
          ></v-select>
          <span class="text-muted">{{ detailPagination }}</span>
        </div>
      </div>
    </div>
    <b-modal
      :hide-footer="true"
      size="lg"
      centered
      id="modal-visibility"
      :title="$t('global.visibility') + ' Tabel ' + title"
    >
      <div class="row">
        <div
          v-for="(v, y) in fields"
          :key="y + '-visibility'"
          class="col-lg-6 col-sm-12"
        >
          <div class="form-group row align-items-center">
            <label
              :for="v.data"
              class="col-lg-8 col-9 col-form-label text-capitalize"
              >{{ v.label }}</label
            >
            <div class="col-3">
              <span class="switch switch-icon">
                <label>
                  <input
                    :id="v.data"
                    v-model="v.show"
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
        </div>
      </div>
    </b-modal>
  </div>
</template>
<style>
.limit-table .vs__dropdown-toggle {
  border: 1px solid #e4e6ef;
}

.limit-table .vs__open-indicator {
  fill: #d3d6e2;
}

.v-separator {
  border-right: 2px solid #e4e6ef;
  height: 100%;
}
</style>
<style scoped>
.sticky {
  position: sticky !important;
  left: 0 !important;
  background-color: #ffffff;
  z-index: 2;
  max-width: 200px;
  min-width: 0px;
  /* width: 200px; */
}

.sticky-left {
  position: sticky !important;
  right: 0 !important;
  z-index: 2;
}

.pagination-text {
  width: 80px;
  text-align: center;
}

.seach-form {
  border-radius: 18px;
}

.img-table {
  height: 50px;
  width: 50px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
}

.table-hover tbody tr:hover td {
  color: #3f4254;
  background-color: #f5f5f5 !important;
}

.action-table {
  width: 1%;
  height: 100%;
  white-space: nowrap;
  text-align: right;
  position: relative;
}

.action-table .action-button {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 5px;
  background-color: transparent;
  transform: translate(0, -50%);
  height: 100%;
  transition: all 0.5s ease;
  opacity: 0;
  padding: 1rem;
}

.action-table .action-button a {
  margin-right: 0.25em;
}

.table-hover tbody tr:hover td.action-table .action-button {
  opacity: 1;
  background-color: #f5f5f5 !important;
}

.sort-table {
  transition: all 0.5s ease;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate(0, -50%);
}
</style>
<script>
export default {
  name: "main-table",
  props: {
    API: { type: String, required: true },
    endpoint: { type: Object, required: true },
    fields: { type: Array, required: true },
    export: { type: Boolean, required: false },
    import: { type: Boolean, required: false },
    title: { type: String, required: true },
    permission: { type: Object, required: true },
    slave: { type: Boolean, required: false, default: false },
    filters: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    hideFilter: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isCustomAPI: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      orderID: "",
      total: 0,
      maxPage: 0,
      mainData: [],
      isLoading: true,
      paramAPI: {
        page: 1,
        limit: 10,
        order: "",
        sort: "DESC",
        search: "",
        filters: {}
      },
      inputSearch: null,
      exportLabel: {},
      exportData: null,
      isLoadingExport: false
    };
  },
  computed: {
    detailPagination() {
      let _inPage =
        this.paramAPI.limit > this.mainData.length
          ? this.mainData.length
          : this.paramAPI.limit;
      return (
        this.$t("global.display") +
        " " +
        _inPage +
        " " +
        this.$t("global.of") +
        " " +
        this.total +
        " " +
        this.$t("global.record")
      );
    },
    filterList() {
      let search;
      let filter = [];
      let _mask = this.paramAPI.filters || {};
      if (this.paramAPI.search && this.paramAPI.search !== "") {
        search = { id: "search", type: "search", value: this.paramAPI.search };
      } else search = null;
      if (this.fields && Object.entries(_mask).length !== 0) {
        Object.keys(_mask).forEach(e => {
          let field = this.fields.filter(x => x.id === e)[0];
          if (field) {
            let label = field.label;
            filter.push({ id: e, type: label, value: _mask[e], display: null });
          }
        });
      }
      if (search) filter.unshift(search);
      return filter;
    },
    urlProperties() {
      if (!this.slave) return { ...this.$route.query, ...this.paramAPI };
      else return this.paramAPI;
    }
  },
  watch: {
    urlProperties: {
      deep: true,
      immediate: false,
      handler(to) {
        this.getData(to);
      }
    },
    filters: {
      deep: true,
      immediate: true,
      handler(to) {
        let param = Object.assign({}, this.paramAPI);
        param.page = 1;
        param.filters = to;
        this.paramAPI = Object.assign(this.paramAPI, param);
        // this.$set(this.paramAPI, 'filters', to)
      }
    },
    "$route.query": {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (!to.page && !this.slave) this.changeParam(this.paramAPI, true);
      }
    },
    inputSearch: {
      deep: false,
      immediate: false,
      handler(to) {
        let param = Object.assign({}, this.paramAPI);
        param.page = 1;
        param.search = to;
        this.paramAPI = Object.assign(this.paramAPI, param);
      }
    }
  },
  methods: {
    emitEvent(e, data = null) {
      const value = data || true;
      this.$emit(e, value);
    },
    changeParam(e, replace) {
      let queryRoute = {
        page: e.page || 1,
        limit: e.limit || 10,
        order: e.order || "",
        sort: e.sort || "",
        search: e.search || "",
        filters:
          typeof e.filters === "string" ? e.filters : JSON.stringify(e.filters)
      };
      if (replace) {
        let _mask = queryRoute;
        _mask.page = String(_mask.page);
        _mask.limit = String(_mask.limit);
        if (JSON.stringify(this.$route.query) !== JSON.stringify(_mask)) {
          this.$router.replace({
            query: Object.assign({ ...this.$route.query }, queryRoute)
          });
        } else this.getData(e);
      } else this.getData(e);
    },
    async getExportData() {
      this.exportLabel = Object.assign({}, {});
      this.exportData = null;
      this.isLoadingExport = true;
      const param = Object.assign({}, this.paramAPI);
      delete param.limit;
      delete param.page;
      await this.$_api[this.isCustomAPI ? "get" : "dataset"](
        this.API,
        param
      ).then(async res => {
        if (res.data.length > 0) {
          await this.buildData(res.data, true).then(e => {
            const data = e.map(x => x.export);
            const header = this.fields.filter(
              x => x.show === true && this.$_sys.isAllowed(x.permission)
            );
            for (let iH = 0; iH < header.length; iH++) {
              const el = Object.assign({}, header[iH]);
              this.$set(this.exportLabel, el.label, el.id);
            }
            this.exportData = data;
          });
        } else {
          this.$_alert.error(
            null,
            "Data Kosong",
            "Tidak dapat mengeksport data kosong"
          );
        }
      });
    },
    getData(param) {
      this.isLoading = true;
      if (param) {
        if (param.filters) {
          param.filters =
            typeof param.filters === "string"
              ? JSON.parse(param.filters)
              : param.filters;
          if (this.slave) {
            // let _filter = { ...param.filters, ...this.$store.state.activeSlave.param }
            // eslint-disable-next-line standard/computed-property-even-spacing
            param.filters[
              this.$store.state.activeSlave.param
            ] = this.$store.state.activeSlave.key;
            //console.log(param);
          }
        } else param.filters = {};
      } else param = this.paramAPI;
      if (this.API.includes('GEKO')) {
        let newParam = {
          ...param,
          ...param.filters
        }
        delete newParam.filters
        this.$_sys.apiGekoCall('get', this.API + `?${new URLSearchParams(newParam)}`).then(
          e => {
            let data = e.data.data;
            this.total = e.data.total;
            this.mainData = [];
            this.maxPage = Math.ceil(e.data.total / param.limit);
            this.buildData(data).then(e => {
              this.mainData = e;
              this.isLoading = false;
            });
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.$_api[this.isCustomAPI ? "get" : "list"](this.API, param).then(
          e => {
            let data = e.data;
            this.total = e.total;
            this.mainData = [];
            this.maxPage = Math.ceil(e.total / param.limit);
            this.buildData(data).then(e => {
              this.mainData = e;
              this.isLoading = false;
            });
          },
          err => {
            console.log(err);
            // show modal error here if needed
            this.isLoading = false;
            this.$_alert.error(
              null,
              "Data Error",
             err.data.message
            );
          }
        );
      }
    },
    async buildData(data, fromExport = false) {
      return new Promise(async (resolve, reject) => {
        let result = [];
        await data.forEach(d => {
          let newData = {};
          let newExport = {};
          this.fields.forEach(f => {
            const transform = f.transform;
            if (f.view_data instanceof Array) {
              let newMask = [];
              f.view_data.forEach((v, i) => {
                newMask.push({ type: f.type[i], data: this.renderVal(d, v) });
              });
              newData[f.id] = newMask;
              if (fromExport) {
                if (transform) {
                  newExport[f.id] = newMask.map(x =>
                    this.$options.filters.parse(x.data, transform)
                  );
                } else newExport[f.id] = newMask.map(x => x.data);
              }
            } else {
              newData[f.id] = {
                type: f.type,
                data: this.renderVal(d, f.view_data)
              };
              if (fromExport) {
                if (transform) {
                  newExport[f.id] = this.$options.filters.parse(
                    this.renderVal(d, f.view_data),
                    transform
                  );
                } else newExport[f.id] = this.renderVal(d, f.view_data);
              }
            }
          });
          let _temp = {
            real: d,
            mask: newData,
            export: newExport
          };
          result.push(_temp);
        });
        resolve(result);
      });
    },
    renderVal(source, prop) {
      if (!prop) return null;
      let _index = prop.indexOf(".");
      if (_index > -1) {
        let e = prop.split(".");
        for (let i = 0; i < e.length; i++) {
          if (source[e[i]]) source = source[e[i]];
          else {
            if (Array.isArray(source)) {
              let tmp = [];
              source.forEach(el => {
                tmp.push(el[e[i]]);
              });
              source = tmp;
            }
          }
        }
        return source;
      } else return source[prop];
    },
    classReader(value, classes) {
      if (classes instanceof Object) {
        if (value instanceof Array) {
          value.forEach(val => {
            return classes[val];
          });
        } else return classes[value];
      } else return classes;
    },
    goPage(e, event = null) {
      if (event) console.log(event);
      switch (e) {
        case "first":
          this.paramAPI.page = 1;
          break;
        case "last":
          // this.paramAPI.page = Number(this.maxPage)
          // let a = this.maxPage / this.paramAPI.limit; why its divide by limit?
          let a = this.maxPage;
          this.paramAPI.page =
            a - parseInt(a) > 0 ? parseInt(a.toFixed(0)) + 1 : a;
          break;
        case "next":
          this.paramAPI.page =
            this.paramAPI.page < this.maxPage
              ? Number(this.paramAPI.page) + 1
              : this.paramAPI.page;
          break;
        case "prev":
          this.paramAPI.page =
            this.paramAPI.page === 1
              ? this.paramAPI.page
              : Number(this.paramAPI.page) - 1;
          break;
        case "input":
          if (!isNaN(this.paramAPI.page)) {
            if (this.paramAPI.page > this.maxPage) {
              this.paramAPI.page = this.maxPage;
            } else if (this.paramAPI.page < 1) this.paramAPI.page = 1;
          }
          break;
      }
    },
    orderField(e) {
      if (e.order) {
        if (e.view_data instanceof Array) {
          if (e.view_data[0] !== this.paramAPI.order) {
            this.paramAPI.order = e.view_data[0];
            this.paramAPI.sort = "DESC";
            this.orderID = e.id;
          } else {
            this.paramAPI.sort = this.paramAPI.sort === "ASC" ? "DESC" : "ASC";
          }
        } else {
          if (e.view_data !== this.paramAPI.order) {
            this.paramAPI.order = e.view_data;
            this.paramAPI.sort = "DESC";
            this.orderID = e.id;
          } else {
            this.paramAPI.sort = this.paramAPI.sort === "ASC" ? "DESC" : "ASC";
          }
        }
      }
    },
    removeFilter(id = null) {
      if (!id) {
        this.paramAPI.search = "";
        this.paramAPI.filters = {};
      } else {
        if (id === "search") {
          this.paramAPI.search = "";
        } else {
          const _mask = { ...this.paramAPI.filters };
          delete _mask[id];
          this.$set(this.paramAPI, "filters", _mask);
        }
      }
    },
    async deleteData(data) {
      const confirm = await this.$_alert.confirm(
        "Hapus Permanen",
        "Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?"
      )
      if (confirm.isConfirmed) {
        try {
          this.isLoading = true
          const deleteData = await this.$_api.delete(this.endpoint.delete, { data: data })
          if (deleteData) {
            await this.getData(this.paramAPI);
            this.$_alert.success(null, deleteData.message);
            this.emitEvent("delete");
          }
        } catch (err) {
          this.$_alert.error(err);
          this.isLoading = false
        }
      }
    }
  }
};
</script>
