<template>
  <div class="lookup-wrapper">
    <button
      type="button"
      @click="openModal()"
      :class="classes"
      class="btn btn-light-primary btn-block text-truncate"
      :disabled="disabled"
    >
      {{ caption | parse(pipeLabel) }}
    </button>
    <template v-if="multiple">
      <div v-if="selectedLabel">
        <div v-if="selectedLabel.length === 0" class="invalid-feedback">
          {{ errors[0] }}
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="!selectedLabel" class="invalid-feedback">{{ errors[0] }}</div>
    </template>
    <b-modal
      ref="lookup-modal"
      id="lookup-modal"
      :centered="true"
      :hide-footer="true"
      :hide-header="true"
      :size="'xl'"
      @hide="$emit('input', revertValue(modelData))"
    >
      <div v-if="isLoading" class="card-img-overlay d-flex align-items-center justify-content-center flex-column" style="background-color: #ffffffaa;z-index: 2;">
          <div class="d-flex align-items-center justify-content-center">
              <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
              <div class="spinner spinner-primary mr-10"></div>
          </div>
      </div>
      <!-- <h3 class="mb-3">{{ placeholder || multiple? $t('global.select_multiple') : $t('global.select_single') }} {{ title }}</h3> -->
      <h3 class="mb-3">{{ title }}</h3>
      <div class="row">
        <div
          :class="multiple ? 'col-lg-8' : 'col-lg-12'"
          class="mb-lg-0 mb-md-3"
        >
          <div class="row align-items-center">
            <div class="col-lg-10">
              <div class="input-icon w-100 mt-2 mb-2">
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
            <div class="col-auto">
              <lookup-add v-if="allowAdd" />
              <!-- <button @click="$bvModal.hide('lookup-modal')" class="btn btn-sm btn-outline-primary float-right mt-2 mb-2">
              <span>
                <i class="ri-add-line btn-icon"></i>
              </span>
              Tambah baru
            </button> -->
            </div>
          </div>

          <div class="table-responsive mb-2">
            <table class="table table-hover table-lookup">
              <thead v-if="multiple && tableHeader">
                <tr @click="selectAll()" class="pointer">
                  <th>
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        :checked="hasCheckedAll"
                        name="select-all"
                        ref="select-all"
                      />
                      <span></span>&nbsp;</label
                    >
                  </th>
                  <th :colspan="tableHeader.length">
                    {{ $t("global.select_all") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="dataList && dataList.length">
                <tr
                  v-for="(d, j) in dataList"
                  :key="j"
                  @click="addValue(d)"
                  class="pointer bg-transparent"
                >
                  <td style="width:1%">
                    <label :class="multiple ? 'checkbox' : 'radio'">
                      <input
                        :disabled="!multiple"
                        :type="multiple ? 'checkbox' : 'radio'"
                        :name="'lookup-item-' + j"
                        :value="
                          multiple
                            ? d
                            : {
                                [pointer.label]: d[pointer.label],
                                [pointer.code]: d[pointer.code],
                                data: d
                              }
                        "
                        v-model="modelData"
                        @click="addValue(d)"
                      />
                      <span></span>&nbsp;</label
                    >
                  </td>
                  <td v-for="(h, i) in tableHeader" :key="i">
                    <span v-if="h.search('|') != -1">
                      {{ d[h.split("|")[0]] | parse(h.split("|")[1]) }}
                    </span>
                    <span v-else> {{ d[h] }} </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="text-center">
                    Belum ada data. Silakan tambah data terlebih dahulu.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between">
            <div class="d-flex mt-5 mb-1">
              <button
                v-if="!multiple"
                @click="$bvModal.hide('lookup-modal')"
                class="btn btn-sm btn-primary"
              >
                {{ $t("global.select_save") }}
              </button>
            </div>

            <div
              class="pagination d-flex flex-wrap justify-content-end align-content-end mt-5"
            >
              <button
                @click="goPage('first')"
                :disabled="paramAPI.page === 1"
                class="btn btn-icon btn-sm btn-outline-primary mr-1 my-1"
              >
                <i class="ri-skip-back-mini-line"></i>
              </button>
              <button
                @click="goPage('prev')"
                :disabled="paramAPI.page === 1"
                class="btn btn-sm btn-outline-primary mr-1 my-1"
              >
                {{ $t("global.prev") }}
              </button>
              <input
                @change="goPage('input')"
                v-model.lazy="temp_page"
                type="text"
                name="pagination"
                autocomplete="off"
                class="form-control form-control-sm pagination-text mr-1 my-1"
                :placeholder="$t('global.goto')"
              />
              <button
                @click="goPage('next')"
                :disabled="paramAPI.page === maxPage"
                class="btn btn-sm btn-outline-primary mr-1 my-1"
              >
                {{ $t("global.next") }}
              </button>
              <button
                @click="goPage('last')"
                :disabled="paramAPI.page === maxPage"
                class="btn btn-icon btn-sm btn-outline-primary mr-1 my-1"
              >
                <i class="ri-skip-forward-mini-line"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-if="multiple" class="col-lg-4">
          <div class="d-flex flex-column flex-fill h-100">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <label class="mb-0">{{ $t("global.selected") }} :</label>
                <span
                  v-if="multiple"
                  class="label label-md label-rounded label-success ml-1"
                  >{{
                    selectedLabel ? selectedLabel.length : selectedLabel
                  }}</span
                >
                <a
                  @click="modelData = []"
                  v-if="multiple && selectedLabel && selectedLabel.length > 0"
                  class="text-danger ml-2 pointer"
                  >Hapus Semua</a
                >
              </div>
              <div v-if="multiple" class="d-flex">
                <button
                  :disabled="!hasPrevPaginSelected"
                  @click="selectedOffset -= 8"
                  class="btn btn-icon btn-sm btn-outline-primary mr-2"
                >
                  <i class="ri-skip-back-mini-line"></i>
                </button>
                <button
                  :disabled="!hasNextPaginSelected"
                  @click="selectedOffset += 8"
                  class="btn btn-icon btn-sm btn-outline-primary"
                >
                  <i class="ri-skip-forward-mini-line"></i>
                </button>
              </div>
            </div>
            <div class="flex-fill">
              <template v-if="multiple">
                <template v-if="paginSelected.length != 0">
                  <ul class="list-unstyled selected-lookup mt-3">
                    <li v-for="(s, i) in paginSelected" :key="i">
                      {{ s }}
                      <i
                        @click="removeValue(s)"
                        class="ri-close-circle-fill text-danger pointer"
                      ></i>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <div
                    class="alert alert-custom alert-light-primary fade show mb-5 py-2 px-4 mt-5"
                    role="alert"
                  >
                    <div class="alert-icon">
                      <i
                        style="font-size: 1.5rem;"
                        class="flaticon-warning"
                      ></i>
                    </div>
                    <div class="alert-text">
                      <span class="d-block font-size-sm">
                        {{ $t("global.unselected") }}</span
                      >
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <template v-if="selectedLabel">
                  <ul class="list-unstyled selected-lookup mt-3">
                    <li>
                      {{ selectedLabel }}
                      <i
                        class="ri-close-circle-fill text-danger pointer"
                        @click="removeValue(selectedLabel)"
                      ></i>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <div
                    class="alert alert-custom alert-light-primary fade show mb-5 py-2 px-4 mt-5"
                    role="alert"
                  >
                    <div class="alert-icon">
                      <i
                        style="font-size: 1.5rem;"
                        class="flaticon-warning"
                      ></i>
                    </div>
                    <div class="alert-text">
                      <span class="d-block font-size-sm">
                        {{ $t("global.unselected") }}</span
                      >
                    </div>
                  </div>
                </template>
              </template>
            </div>
            <div class="d-flex justify-content-end">
              <button
                @click="$bvModal.hide('lookup-modal')"
                class="btn btn-sm btn-primary"
              >
                {{ $t("global.select_save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Lookup-input",
  props: {
    title: { type: String, required: false, default: "" },
    value: { required: true },
    multiple: { type: Boolean, required: false, default: true },
    endpoint: { type: String, required: true },
    param: { type: Object, required: false },
    placeholder: { type: String, required: false },
    pointer: { type: Object, required: false },
    errors: { type: Array, required: false },
    classes: { type: Object, required: false },
    defaultCaption: { type: String, required: false, default: null },
    allowAdd: { type: Boolean, required: false, default: false },
    isObject: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    listApi: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      dataList: null,
      tableHeader: null,
      paramAPI: {
        search: null,
        page: 1,
        limit: 10
      },
      inputSearch: null,
      maxPage: 0,
      temp_page: 1,
      modelData: this.multiple ? [] : {},
      selectedOffset: 0,
      errorList: false,
      isLoading: false
    };
  },
  computed: {
    selectedLabel: function() {
      if (this.multiple) {
        console.log("this.multiple", this.multiple);
        if (this.modelData.length === 0) return null;
        else return this.modelData.map(x => x[this.pointer.label]);
      } else {
        if (!Object.keys(this.modelData).length === 0) return null;
        else {
          const label =
            this.pointer.label.search("|") !== -1
              ? this.pointer.label.split("|")[0]
              : this.pointer.label;
          return this.modelData[label];
        }
      }
    },
    pipeLabel: function() {
      return this.pointer.label.search("|") !== -1
        ? this.pointer.label.split("|")[1]
        : null;
    },
    paginSelected: function() {
      if (this.multiple) {
        if (this.selectedLabel) {
          return this.selectedLabel.slice(
            this.selectedOffset,
            8 + this.selectedOffset
          );
        }
        return [];
      } else return [];
    },
    hasNextPaginSelected() {
      const nextOffset = this.selectedOffset + 8;
      if (this.multiple) {
        if (this.selectedLabel) {
          return Boolean(
            this.selectedLabel.slice(nextOffset, 8 + nextOffset).length
          );
        }
        return false;
      } else return false;
    },
    hasPrevPaginSelected() {
      const prevOffset = this.selectedOffset - 8;
      if (this.multiple) {
        if (this.selectedLabel) {
          return Boolean(
            this.selectedLabel.slice(prevOffset, 8 + prevOffset).length
          );
        }
        return false;
      } else return false;
    },
    hasCheckedAll() {
      if (this.modelData instanceof Array && this.dataList) {
        const sameOption = this.modelData.filter(x =>
          this.dataList.some(
            y => x[this.pointer.label] === y[this.pointer.label]
          )
        );
        return Boolean(sameOption.length === this.dataList.length);
      } else return false;
    },
    caption() {
      if (this.multiple) {
        if (this.selectedLabel) {
          return this.selectedLabel.length === 0
            ? this.$t("global.select_multiple")
            : this.selectedLabel.length + " Terpilih";
        }
        return this.$t("global.select_multiple");
      } else {
        return this.selectedLabel
          ? this.selectedLabel
          : this.defaultCaption || this.$t("global.select_single");
      }
    }
  },
  watch: {
    paramAPI: {
      immediate: false,
      deep: true,
      handler(to, from) {
        this.getList(to);
      }
    },
    inputSearch: {
      deep: false,
      immediate: false,
      handler(to) {
        let param = Object.assign({}, this.paramAPI);
        param.page = 1;
        param.search = to;
        this.temp_page = 1;
        this.paramAPI = Object.assign({}, param);
      }
    },
    paginSelected(val) {
      if (val.length === 0 && this.hasPrevPaginSelected) {
        this.selectedOffset -= 8;
      }
    },
    value: {
      immediate: true,
      deep: true,
      handler(to, from) {
        // console.log('TO : ', to)
        this.$emit("change", to);
        if (to) this.convertValue(to);
        else this.modelData = {};
      }
    }
  },
  beforeMount() {
    // console.log('Props : ', this.param, ' : ', this.isObject)
  },
  methods: {
    revertValue(data) {
      if (data) {
        if (this.multiple) {
          return data.map(x => x[this.pointer.code]);
        } else {
          if (this.isObject) {
            return data;
          } else {
            return data[this.pointer.code];
          }
        }
      }
    },
    convertValue(data) {
      if (!this.dataList) {
        this.getList().then(e => {
          if (!this.errorList) this.convertValue(data);
        });
      } else {
        if (data) {
          if (this.multiple) {
            const newData = this.dataList.filter(x =>
              data.some(y => x[this.pointer.code] === y[this.pointer.code])
            );
            this.modelData = newData.concat(this.modelData);
          } else {
            var newData = null;
            if (data.data) {
              newData = this.dataList.filter(
                x => data[this.pointer.code] === x[this.pointer.code]
              )[0];
            } else {
              newData = this.dataList.filter(
                x => data === x[this.pointer.code]
              )[0];
            }

            if (newData) {
              this.$set(
                this.modelData,
                this.pointer.code,
                newData[this.pointer.code]
              );
              this.$set(
                this.modelData,
                this.pointer.label,
                newData[this.pointer.label]
              );
            } else {
              this.findValue(data).then(res => {
                this.$set(
                  this.modelData,
                  this.pointer.code,
                  res[this.pointer.code]
                );
                this.$set(
                  this.modelData,
                  this.pointer.label,
                  res[this.pointer.label]
                );

                this.$set(this.modelData, "data", res);
              });
            }
          }
        }
      }
    },
    openModal() {
      this.$refs["lookup-modal"].show();
      this.getList();
    },
    findValue(id) {
      return this.$_api
        .single(this.endpoint, null, id)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          this.$_alert.error(err, "Value tidak ditemukan");
        });
    },
    addValue(val) {
      if (this.multiple) {
        let index = this.modelData.findIndex(
          x => JSON.stringify(x) === JSON.stringify(val)
        );
        index !== -1
          ? this.modelData.splice(index, 1)
          : this.modelData.unshift(val);
      } else {
        const checkVal =
          this.modelData[this.pointer.code] === val[this.pointer.code];
        if (!checkVal) {
          this.$set(this.modelData, this.pointer.code, val[this.pointer.code]);
          this.$set(
            this.modelData,
            this.pointer.label,
            val[this.pointer.label]
          );
          this.$set(this.modelData, "data", val);
        } else {
          this.removeValue(val);
        }
      }
    },
    removeValue(val) {
      if (this.multiple) {
        this.modelData.splice(
          this.modelData.indexOf(
            this.modelData.filter(x => x[this.pointer.label] === val)[0]
          ),
          1
        );
      } else this.modelData = {};
    },
    selectAll() {
      if (this.$refs["select-all"].checked) {
        this.$refs["select-all"].checked = false;
        this.modelData = this.modelData.filter(
          x =>
            !this.dataList.some(
              y => x[this.pointer.label] === y[this.pointer.label]
            )
        );
      } else {
        this.$refs["select-all"].checked = true;
        const unSelected = this.dataList.filter(
          x =>
            !this.modelData.some(
              y => x[this.pointer.label] === y[this.pointer.label]
            )
        );
        this.modelData = unSelected.concat(this.modelData);
      }
    },
    goPage(e, event = null) {
      switch (e) {
        case "first":
          this.paramAPI.page = 1;
          break;
        case "last":
          this.paramAPI.page = Number(this.maxPage);
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
          if (!isNaN(this.temp_page)) {
            if (this.temp_page > this.maxPage) {
              this.paramAPI.page = this.maxPage;
            } else if (this.temp_page < 1) this.paramAPI.page = 1;
            else this.paramAPI.page = this.temp_page;
          }
          break;
      }
      this.temp_page = this.paramAPI.page;
    },
    async getList(localParam = null) {
      // console.log('Param : ', this.param)
      if (!localParam) {
        localParam = {
          search: this.paramAPI.search,
          page: this.paramAPI.page,
          limit: 10,
          active: 1
        };
      }
      let newParam = { ...localParam, ...this.param };
      this.isLoading = true
      await this.$_api[this.listApi ? 'list' : 'dataset'](this.endpoint, newParam)
        .then(res => {
          // res = res.data;
          res.total = res.total;
          this.errorList = false;
          this.dataList = res.data;
          this.maxPage = Math.ceil(res.total / newParam.limit);
          if (this.pointer.display) this.tableHeader = this.pointer.display;
          else this.tableHeader = Object.keys(res.data[0]);
        })
        .catch(err => {
          this.errorList = true;
          this.$_alert.error(err, "Daftar pilihan tidak ditemukan");
        }).finally(() => {
          this.isLoading = false
        });
    }
  }
};
</script>

<style scoped>
.lookup-wrapper {
  max-width: 250px;
  width: 100%;
}

/* .lookup-value-wrapper {
                      display: flex;
                      align-self: center;
                      margin-left: 1rem;
                    } */
.pagination-text {
  width: 80px;
  text-align: center;
}

.table-lookup tr:first-child td {
  border-top: none !important;
}

.selected-lookup li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ebedf3;
  border-radius: 0.42rem;
}

.label.label-rounded {
  border-radius: 50%;
}
</style>
