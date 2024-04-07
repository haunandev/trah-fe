<template>
  <div class="detail-wrapper animated">
    <slot v-if="isBodySlot" name="detail-body" />
    <div v-else class="card card-custom mb-5">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-dark">
            {{ $t("global.detail") }} {{ title }}</span
          >
          <!-- <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> -->
        </h3>
        <div class="card-toolbar">
          <!-- <a @click="emitEvent('print')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.export')">
            <i class="ri-printer-line p-0"></i>
          </a>
          <div class="v-separator mx-3"></div> -->
          <a
            v-if="!$store.state.unknownRoute"
            @click="emitEvent('back')"
            class="btn btn-outline-primary btn-icon btn-circle"
            v-b-tooltip.top="$t('global.go_back')"
          >
            <i class="ri-arrow-go-back-line p-0"></i>
          </a>
        </div>
      </div>
      <div class="card-body py-2 mt-3">
        <slot name="detail-card-body" v-bind:rowData="realData">
          <div class="table-responsive">
            <div v-if="isLoading" style="position: relative;min-height: 200px;">
              <div class="card-img-overlay d-flex align-items-center justify-content-center" style="background-color: #ffffffaa;z-index: 2;">
                  <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
                  <div class="spinner spinner-primary mr-10"></div>
              </div>
            </div>
            <table v-if="!isLoading" class="table table-detail">
              <tbody>
                <tr
                  v-for="(h, j) in fields.filter(
                    x => x.show === true && $_sys.isAllowed(x.permission)
                  )"
                  :key="j"
                >
                  <td class="nowrap-table">{{ h.label }}</td>
                  <td class="nowrap-table">&emsp;:&nbsp;</td>

                  <td>
                    <template v-if="mainData[h.id] instanceof Array">
                      <template v-for="(v, k) in mainData[h.id]">
                        <template v-if="v.data instanceof Array">
                          <template v-if="v.type === 'text'">
                            <template v-for="(d, l) in v.data">
                              <span
                                :key="k + '-value-multiple' + l"
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
                          <template v-else-if="v.type === 'link'">
                            <template v-for="(d, l) in v.data">
                              <a
                                :key="k + '-value-multiple-' + l"
                                class="text-primary"
                                :class="[
                                  classReader(d, h.class)
                                    ? classReader(d, h.class)
                                    : 'btn-primary'
                                ]"
                                :href="d"
                                target="_blank"
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
                            :class="classReader(d, h.class[k])"
                            >{{ v.data | parse(h.transform[k]) }}</span
                          >
                          <a
                            v-else-if="v.type === 'button'"
                            :key="k + '-value'"
                            class="btn btn-sm "
                            :class="[
                              classReader(d, h.class[k])
                                ? classReader(d, h.class[k])
                                : 'btn-primary'
                            ]"
                            @click="h.event.click[k]"
                            >{{ v.data | parse(h.transform[k]) }}</a
                          >
                          <a
                            v-else-if="v.type === 'link'"
                            :key="k + '-value'"
                            class="text-primary "
                            :class="[classReader(d, h.class[k])]"
                            :href="d"
                            target="_blank"
                            >{{ v.data | parse(h.transform[k]) }}</a
                          >
                          <img
                            v-else-if="v.type === 'file'"
                            :key="k + '-value'"
                            class="img-table"
                            :class="classReader(d, h.class[k])"
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
                    </template>
                    <template v-else>
                      <template v-if="mainData[h.id].data instanceof Array">
                        <template v-if="mainData[h.id].type === 'text'">
                          <template v-for="(d, k) in mainData[h.id].data">
                            <span
                              :key="k + '-value'"
                              :class="classReader(d, h.class)"
                              >{{ d | parse(h.transform)
                              }}{{
                                k != mainData[h.id].data.length - 1 ? ", " : " "
                              }}</span
                            >
                          </template>
                        </template>
                        <template v-else-if="mainData[h.id].type === 'button'">
                          <template v-for="(d, k) in mainData[h.id].data">
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
                        <template v-else-if="mainData[h.id].type === 'link'">
                          <template v-for="(d, k) in mainData[h.id].data">
                            <a
                              :key="k + '-value'"
                              class="d-block text-primary "
                              :class="[classReader(d, h.class)]"
                              :href="d"
                              target="_blank"
                              >{{ d | parse(h.transform) }}</a
                            >
                          </template>
                        </template>
                        <template v-else-if="mainData[h.id].type === 'file'">
                          <template v-for="(d, k) in mainData[h.id].data">
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
                        <template
                          v-else-if="mainData[h.id].type == 'file-multiple-img'"
                        >
                          <template v-for="(d, k) in mainData[h.id].data">
                            <img
                              :key="k + '-value'"
                              class="img-table "
                              :class="classReader(d, h.class)"
                              v-img-fb="d.file.url"
                              :alt="h.id"
                              @click="emitEvent('zoom', d.file.url)"
                            />
                          </template>
                        </template>
                        <template
                          v-else-if="
                            mainData[h.id].type === 'file-multiple-video'
                          "
                        >
                          <template v-for="(d, k) in mainData[h.id].data">
                            <video
                              :key="k + '-value'"
                              class="img-table "
                              :class="classReader(d, h.class)"
                              controls
                              :src="d"
                              :alt="h.id"
                            />
                          </template>
                        </template>
                        <template v-else>
                          <span :key="k + '-value'"
                            >{{ $t("error.view_type") }}
                            {{ "(" + mainData[h.id].type + ")" }}</span
                          >
                        </template>
                      </template>
                      <template v-else>
                        <span
                          v-if="mainData[h.id].type === 'text'"
                          :class="classReader(mainData[h.id].data, h.class)"
                          >{{ mainData[h.id].data | parse(h.transform) }}</span
                        >
                        <div
                          v-else-if="mainData[h.id].type === 'color'"
                        >
                          <div class="d-flex">
                            <div :style="{'background-color': mainData[h.id].data, 'height': '70px', 'width': '70px'}"
                              class="rounded"
                            ></div>
                            <div class="ml-2">
                              <p class="mb-2">Hex: {{ mainData[h.id].data }}</p>
                              <p>RGB: {{ $_sys.hexToRgb(mainData[h.id].data) }}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          v-else-if="mainData[h.id].type === 'tinymce'"
                          v-html="mainData[h.id].data"
                          :class="classReader(mainData[h.id].data, h.class)"
                        ></div>
                        <a
                          v-else-if="mainData[h.id].type === 'button'"
                          class="btn btn-sm "
                          :class="[
                            classReader(mainData[h.id].data, h.class)
                              ? classReader(mainData[h.id].data, h.class)
                              : 'btn-primary'
                          ]"
                          @click="h.event.click"
                          >{{ mainData[h.id].data | parse(h.transform) }}</a
                        >
                        <a
                          v-else-if="mainData[h.id].type === 'link'"
                          class="text-primary "
                          :class="[classReader(mainData[h.id].data, h.class)]"
                          :href="d"
                          target="_blank"
                          >{{ mainData[h.id].data | parse(h.transform) }}</a
                        >
                        <img
                          v-else-if="mainData[h.id].type === 'file'"
                          class="img-table "
                          :class="classReader(mainData[h.id].data, h.class)"
                          v-img-fb="mainData[h.id].data"
                          :alt="h.id"
                          @click="emitEvent('zoom', mainData[h.id].data)"
                        />
                        <span v-else
                          >{{ $t("error.view_type") }}
                          {{ "(" + mainData[h.id].type + ")" }}</span
                        >
                      </template>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </slot>
      </div>
    </div>
    <slot name="detail-footer" v-bind:rowData="realData"></slot>
    <div v-if="slaveList.length !== 0 && activeSlave">
      <b-nav v-if="slaveList.length > 1" pills class="nav-light-primary">
        <b-nav-item
          v-for="(s, i) in slaveList"
          :key="i"
          :active="activeSlave.name === s.name"
          @click="setActiveSlave(s)"
          class="font-weight-bold"
        >
          {{ s.name }}</b-nav-item
        >
      </b-nav>
      <div v-if="activeSlave">
        <component :is="componentLoader"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-detail",
  props: {
    API: { type: String, required: true },
    fields: { type: Array, required: true },
    export: { type: Boolean, required: false },
    title: { type: String, required: true },
    permission: { type: Object, required: true },
    slave: { type: Array, required: false },
    id: { type: Number, required: true },
    isBodySlot: { required: true },
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
      mainData: null,
      slaveList: [],
      activeSlave: null,
      isLoading: false,
      realData: null
    };
  },
  watch: {
    id: {
      deep: false,
      immediate: true,
      handler(to, from) {
        if (!this.isBodySlot) this.getData(to);
        else if (this.slave && this.slave.length > 0) this.loadSlave();
      }
    }
  },
  computed: {
    componentLoader() {
      let loader = this.activeSlave.slave;
      return () => import(`@/modules/${loader}.vue`);
    }
  },
  beforeDestroy() {
    if (!this.slave) this.$store.commit("set", ["activeSlave", {}, true]);
  },
  methods: {
    emitEvent(e, data = null) {
      // console.log("e", e);
      // console.log("data", data);
      const value = data || true;
      this.$emit(e, value);
    },
    async getData(id) {
      this.isLoading = true;
      if (this.isCustomAPI) {
        this.$_api.get(this.API, { id: id }).then(
          res => {
            this.mainData = null;
            this.realData = res.data;
            let data = res.data;
            if (this.slave && this.slave.length > 0) this.loadSlave(data);
            this.buildData(data).then(res => {
              this.mainData = res;
              this.isLoading = false;
            });
          },
          err => {
            this.$_alert.error(err);
          }
        );
      } else {
        const endpoint = this.API.split("?");
        this.$_api.single(endpoint[0], endpoint[1], id).then(
          res => {
            this.mainData = null;
            this.realData = res.data;
            let data = res.data;
            if (this.slave && this.slave.length > 0) this.loadSlave(data);
            this.buildData(data).then(res => {
              this.mainData = res;
              this.isLoading = false;
            });
          },
          err => {
            this.$_alert.error(err);
          }
        );
      }
    },
    async buildData(data) {
      let newData = {};
      this.fields.forEach(f => {
        if (f.view_data instanceof Array) {
          let newMask = [];
          f.view_data.forEach((v, i) => {
            newMask.push({ type: f.type[i], data: this.renderVal(data, v) });
          });
          newData[f.id] = newMask;
        } else {
          newData[f.id] = {
            type: f.type,
            data: this.renderVal(data, f.view_data)
          };
        }
      });
      return newData;
    },
    renderVal(source, prop) {
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
      } else if (prop.includes("file")) {
        //Looping for file
        let tmp = [];
        //OBJECT FILE
        if (source[prop] instanceof Object) {
          tmp.push(source[prop].url);
        } else {
          console.log("Array");
          //ARRAY FILE
          source[prop].forEach((f, i) => {
            console.log("f", f);
            tmp.push(f[`file_${prop}`].url);
          });
        }

        return tmp;
      } else {
        return source[prop];
      }
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
    async loadSlave(data) {
      this.slave.forEach(async (s, index) => {
        const isAllowed = s.permission
          ? this.$_sys.isAllowed(s.permission)
          : await this.checkSlavePermission(s.module);
        // console.log(s.module, isAllowed)
        if (isAllowed) {
          let tmpSlave = {
            name: s.name,
            master: this.title,
            slave: s.module,
            param: s.as_param,
            key: data ? data[s.key_field] : this.id,
            rules: s.overwrite
          };
          this.slaveList.push(tmpSlave);
        }
        if (this.slaveList.length !== 0 && !this.activeSlave)
          this.setActiveSlave(this.slaveList[0]);
      });
    },
    setActiveSlave(data) {
      this.activeSlave = Object.assign({}, this.activeSlave, data);
      this.$store.commit("set", ["activeSlave", data, true]);
    },
    async checkSlavePermission(path) {
      const component = await import(`@/modules/${path}.vue`);
      const compData = component.default.data();
      return this.$_sys.isAllowed(compData.config.permission.read);
    }
  }
};
</script>

<style scoped>
.v-separator {
  border-right: 2px solid #e4e6ef;
  height: 100%;
}

.table-detail tr:first-child td {
  border-top: none !important;
}

.color-inherit {
  color: inherit;
}

.img-table {
  height: 150px;
  width: 150px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 1rem;
}
</style>
