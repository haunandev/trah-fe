<template>
  <div class="py-5">
    <b-container>
      <b-card>
        <b-card-title class="d-flex align-items-center">
          <img :src="$_config.logo.lg" alt="" class="max-h-75px mr-3" />
          <h3>Form Request Addendum Distribusi</h3>
        </b-card-title>
        <div v-if="!loadingLine">
          <h1>Belum ada data.</h1>
        </div>
        <div v-else-if="isCreateSuccess">
          <b-card class="text-center">
            <i class="ri-checkbox-circle-line text-primary" style="font-size: 100px;"></i>
            <h1>Request addendum sudah berhasil dikirim!</h1>
            <p>Silakan tutup halaman ini dan hubungi pihak persemaian terkait untuk kelanjutan proses distribusi addendum.</p>
          </b-card>
        </div>
        <ValidationObserver v-else v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off" style="position: relative;">
            <table-detail
              :items="tableDetailItems"
            ></table-detail>

            <!-- Daftar Bibit -->
            <b-card class="mb-5">
              <h5 class="mb-2"><i class="ri-plant-line text-dark mr-2" style="font-size: large;"></i> Daftar Bibit :</h5>
              <b-table
                :fields="tableSummariesFields"
                :items="tableSummariesItems"
              >
                <template v-for="cellName in ['cell(total_load)','cell(total_damaged)','cell(total_received)','cell(total_missing)','cell(total_return)','cell(total_resend)']"
                  #[cellName]="{value}"
                >
                  <div :key="cellName">
                    {{ value | parse('number') }}
                  </div>
                </template>

                <template v-slot:custom-foot="{items}">
                  <tr>
                    <th>
                      Jumlah Bibit
                    </th>
                    <th v-for="keydata in ['total_penlub','total_load','total_damaged','total_received','total_missing','total_return','total_resend']" :key="`tablefootertotal-${keydata}`">
                      {{items.reduce((acc,val) => {
                        return acc + parseInt(val[keydata])
                      }, 0) | parse('concat_bibit')}}
                    </th>
                  </tr>
                </template>
              </b-table>
            </b-card>

            <b-card class="mb-5">
              <b-card-title>
                <h5 v-b-toggle="`list-farmer-loading-line`" class="mb-2"><i class="ri-team-line text-dark mr-2" style="font-size: large;"></i> Daftar Petani :</h5>
              </b-card-title>

              <b-collapse
                v-if="loadingLine && loadingLine.detail_farmers"
                id="list-farmer-loading-line"
                visible
              >
                <div v-for="(farmer, fIndex) in loadingLine.detail_farmers" :key="`list-farmer-${fIndex}`">
                  <h6 v-b-toggle="`listFarmerTableBAST-${fIndex}`" class="mt-3">
                    {{ fIndex + 1 }}. {{ farmer.farmer_no }} - {{ farmer.farmer_name }}
                  </h6>
                  <b-collapse :id="`listFarmerTableBAST-${fIndex}`" visible>
                    <b-row>
                      <!-- Pengembalian Bibit Toggle -->
                      <b-col cols="auto">
                        <div class="form-group row align-items-center">
                          <label
                            :for="`toggle-pengembalian-bibit-${fIndex}`"
                            class="col-auto col-form-label text-capitalize"
                          >Pengembalian Bibit</label>
                          <div class="col-auto">
                            <span class="switch switch-icon">
                              <label>
                                <input
                                  :id="`toggle-pengembalian-bibit-${fIndex}`"
                                  v-model="farmer.is_return"
                                  @change="toggleReSeed('return', farmer.is_return, farmer)"
                                  :disabled="farmer.return_toggle_disabled ? true : false"
                                  type="checkbox"
                                  checked="checked"
                                  name="select"
                                  :true-value="1"
                                  :false-value="0"
                                />
                                <span></span>
                              </label>
                            </span>
                          </div>
                        </div>
                      </b-col>
                      <!-- Pengiriman Ulang Bibit Toggle -->
                      <b-col cols="auto">
                        <div class="form-group row align-items-center">
                          <label
                            :for="`toggle-pengiriman-ulang-bibit-${fIndex}`"
                            class="col-auto col-form-label text-capitalize"
                          >Request Pengiriman Ulang Bibit</label>
                          <div class="col-auto">
                            <span class="switch switch-icon">
                              <label>
                                <input
                                  :id="`toggle-pengiriman-ulang-bibit-${fIndex}`"
                                  v-model="farmer.is_resend"
                                  @change="toggleReSeed('resend', farmer.is_resend, farmer)"
                                  :disabled="farmer.resend_toggle_disabled ? true : false"
                                  type="checkbox"
                                  checked="checked"
                                  name="select"
                                  :true-value="1"
                                  :false-value="0"
                                />
                                <span></span>
                              </label>
                            </span>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-table
                      :fields="tableDetailSeedFarmers"
                      :items="farmer.detail_seed_farmers"
                    >
                      <template v-for="cellName in ['cell(total_load)','cell(total_damaged)','cell(total_received)','cell(total_missing)']"
                        #[cellName]="{value}"
                      >
                        <div :key="cellName">
                          {{ value | parse('number') }}
                        </div>
                      </template>

                      <template #cell(actions)="{item}">
                        <!-- return -->
                        <b-row v-if="farmer.is_return">
                          <b-col>
                            <!-- total_return -->
                            <s-input
                              v-model="item.total_return"
                              @input="summariesReSeed(item)"
                              :item="{
                                  label: 'Total Pengembalian',
                                  type: 'number',
                                  validation: [`min_value:${item.return_min_value || 0}`],
                                  placeholder: '',
                              }"
                            />
                          </b-col>
                          <b-col v-if="item.total_return > 0">
                            <!-- return_description -->
                            <s-input
                              v-model="item.return_description"
                              @input="summariesReSeed()"
                              :item="{
                                  label: 'Alasan Pengembalian',
                                  type: 'text',
                                  validation: item.total_return > 0 ? ['required'] : [],
                                  placeholder: '',
                              }"
                            />
                          </b-col>
                        </b-row>
                        <!-- resend -->
                        <b-row v-if="farmer.is_resend">
                          <b-col>
                            <!-- total_resend -->
                            <s-input
                              v-model="item.total_resend"
                              @input="summariesReSeed(item)"
                              :item="{
                                  label: 'Total Pengiriman Ulang',
                                  type: 'number',
                                  validation: [`min_value:${item.resend_min_value || 0}|max_value:${item.total_penlub}`],
                                  placeholder: '',
                              }"
                            />
                          </b-col>
                          <b-col v-if="item.total_resend > 0">
                            <!-- resend_description -->
                            <s-input
                              v-model="item.resend_description"
                              @input="summariesReSeed()"
                              :item="{
                                  label: 'Alasan Pengiriman Ulang',
                                  type: 'text',
                                  validation: item.total_resend > 0 ? ['required'] : [],
                                  placeholder: '',
                              }"
                            />
                          </b-col>
                        </b-row>
                      </template>
                    </b-table>
                  </b-collapse>
                </div>
              </b-collapse>
            </b-card>

            <!-- Pengembalian Bibit -->
            <div v-if="mainData.is_return" class="animated mb-5">
              <!-- date_pengembalian_bibit -->
              <s-input
                  v-model="mainData.date_pengembalian_bibit"
                  :item="{
                      label: 'Tanggal Pengembalian Bibit',
                      type: 'date',
                      validation: ['required'],
                      placeholder: '',
                  }"
              />
            </div>

            <!-- Request Pengiriman Ulang Bibit -->
            <div v-if="mainData.is_resend && false" class="animated mb-5">
              <!-- date_request_pengiriman_ulang_bibit -->
              <s-input
                  v-model="mainData.date_request_pengiriman_ulang_bibit"
                  :item="{
                      label: 'Tanggal Pengiriman Ulang Bibit',
                      type: 'date',
                      validation: ['required'],
                      placeholder: '',
                  }"
              />
            </div>

            <!-- description -->
            <s-input
                v-model="mainData.description"
                :item="{
                    label: 'Catatan',
                    type: 'textarea',
                    validation: ['required'],
                    placeholder: '',
                }"
            />

            <b-button type="submit" variant="light-primary">
              <i class="ri-save-3-line"></i>
              Simpan
            </b-button>
          </form>
        </ValidationObserver>
      </b-card>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'FormNurseryManagementRequestDistributionAddendum',

  data: () => ({
    loadingLine: null,
    mainData: {
      is_return: 0,
      is_resend: 0,
    },
    tableDetailItems: [],
    tableDetailSeedFarmers: [
      {
        label: 'Jenis Bibit',
        key: 'rel_tree_id',
        sortable: true
      },{
        label: 'Permintaan',
        key: 'total_penlub'
      },{
        label: 'Dimuat',
        key: 'total_load'
      },{
        label: 'Rusak',
        key: 'total_damaged'
      },{
        label: 'Diterima',
        key: 'total_received'
      },{
        label: 'Hilang',
        key: 'total_missing'
      },{label: '', key: 'actions'}
    ],
    tableSummariesFields: [
      {
        label: 'Jenis Bibit',
        key: 'rel_tree_id',
        sortable: true
      },
      {
        label: 'Permintaan',
        key: 'total_penlub',
        sortable: true
      },
      {
        label: 'Dimuat',
        key: 'total_load',
        sortable: true
      },
      {
        label: 'Rusak',
        key: 'total_damaged',
        sortable: true
      },
      {
        label: 'Diterima',
        key: 'total_received',
        sortable: true
      },
      {
        label: 'Hilang',
        key: 'total_missing',
        sortable: true
      },
      {
        label: 'Pengembalian',
        key: 'total_return',
        sortable: true
      },
      {
        label: 'Request Pengiriman Ulang',
        key: 'total_resend',
        sortable: true
      },
    ],
    tableSummariesItems: [],
    isCreateSuccess: 0
  }),

  computed: {
  },

  mounted() {
    this.initForm()
  },

  methods: {
    afterCreateSucceed: async function () {
      this.$_alert.show({
        icon: "success",
        title: 'Sukses!',
        text: 'Berhasil mengirim data permintaan addendum distribusi!',
      }).then(() => {
        this.isCreateSuccess = 1
        this.$router.push({path: this.$route.path, query: {}})
        window.close();
      })
    },
    checkData: async function (loadingLine) {
      try {
        loadingLine.detail_farmers.map(farmer => {
          let unload = 0
          let tooMuch = 0
          farmer.detail_seed_farmers.map(seed => {
            const totalPenlub = parseInt(seed.total_penlub)
            const totalLoad = parseInt(seed.total_load)
            const totalDamaged = parseInt(seed.total_damaged)
            const totalMissing = parseInt(seed.total_missing)
            const diff = totalPenlub - totalLoad

            if (diff > 0) {
              unload += diff
              seed.total_resend = diff + totalDamaged + totalMissing
              seed.resend_min_value = diff
              seed.resend_description = `Kurang ${totalDamaged ? '+ Rusak ' : ''} ${totalMissing ? '+ Hilang ' : ''}`
            } else if (diff < 0) {
              tooMuch += diff
              seed.total_return = (diff * -1) + totalDamaged + totalMissing
              seed.return_min_value = (diff * -1)
              seed.return_description = `Kelebihan ${totalDamaged ? '+ Rusak ' : ''} ${totalMissing ? '+ Hilang ' : ''}`
            }
          })
          if (unload > 0) {
            farmer.is_resend = 1
            farmer.resend_toggle_disabled = true
          }
          if ((tooMuch * -1) > 0) {
            farmer.is_return = 1
            farmer.return_toggle_disabled = true
          }
        })
      } catch (err) {
        console.log('checkData() error', err)
        this.$_alert.error(err)
      }
    },
    getPlantingHoleGeko: async function (loadingLine, trees) {
      try {
        let plantingHoles = await this.$_sys.apiGekoCall('get', `GetPlantingHoleAdmin`, {
          program_year: loadingLine.program_year,
          typegetdata: 'all',
          ff: loadingLine.ff_no
        }).then(res => res.data.data.result.data)
        console.log('plantingHoles.length',plantingHoles.length)
        for (const [phIndex, phVal] of Object.entries(plantingHoles)) {
          const detailPH = await this.$_sys.apiGekoCall('get', 'GetPlantingHoleDetail', {
            ph_form_no: phVal.ph_form_no
          }).then(res => res.data.data.result)

          const findFarmer = loadingLine.detail_farmers.find(f => f.farmer_no == detailPH.data.farmer_no)
          if (findFarmer) {
            detailPH.list_detail.map(dps => {
              const findSeedFarmer = findFarmer.detail_seed_farmers.find(dsf => dsf.tree_code == dps.tree_code)
              if (findSeedFarmer) findSeedFarmer.total_penlub += parseInt(dps.amount)
              else {
                const findMainTree = trees.find(tree => tree.tree_code == dps.tree_code)
                if (findMainTree) {
                  findFarmer.detail_seed_farmers.push({
                    detail_farmer_id: findFarmer.id,
                    total_damaged: 0,
                    total_load: 0,
                    total_missing: 0,
                    total_received: 0,
                    tree_code: dps.tree_code,
                    tree_id: findMainTree.id,
                    rel_tree_id: findMainTree.tree_name,
                    total_penlub: dps.amount,
                    newItem: true
                  })
                }
              }
            })
          }
        }

        return true
      } catch (err) {
        console.log('getPlantingHoleGeko() error', err)
        this.$_alert.error(err)
      }
    },
    getTrees: async function () {
      try {
        let trees = await this.$_api.get('public/list', {
            model: "master_trees",
            limit: '500'
        }).then(res => res.data)

        return trees
      } catch (err) {
        console.log('initForm() error', err)
        this.$_alert.error(err)
      }
    },
    initForm: async function () {
      const loading = this.$_alert.loading('Memuat Form ...')
      try {
        this.loadingLine = null
        const routeQ = this.$route.query
        const loadingLineID = routeQ ? routeQ.loading_line_id : null
        const requestBy = routeQ ? routeQ.request_by : null
        if (!loadingLineID || !requestBy) {
          loading.close()
          setTimeout(() => {
            this.$_alert.error(null,'Gagal','Gagal memuat form')
          }, 100);
          return;
        }

        const trees = await this.getTrees()

        let loadingLine = await this.$_api.get('public/show', {
            model: "loading_line",
            id: loadingLineID
        }).then(res => res.data)

        // sorting detail_farmers
        loadingLine.detail_farmers = await loadingLine.detail_farmers
          .map(f => {
            return {
              ...f,
              is_return: 0,
              is_pengiriman_ulang: 0,
              detail_seed_farmers: f.detail_seed_farmers.map(dsf => {
                return {
                  ...dsf,
                  total_penlub: 0
                }
              })
            }
          })
          .sort((a,b) => a.farmer_name.localeCompare(b.farmer_name))

        const getPHGEKO = await this.getPlantingHoleGeko(loadingLine, trees)
        if (getPHGEKO) {
          await this.initTableDetailItems(loadingLine)

          this.loadingLine = await loadingLine

          await this.checkData(loadingLine)

          await this.summariesReSeed()
        }
        loading.close()
      } catch (err) {
        console.log('initForm() error', err)
        loading.close()
        setTimeout(() => {
          this.$_alert.error(err)
        }, 100);
      }
    },
    initTableDetailItems: async function (loadingLine) {
      const items = [
        {
          label: 'Tahun Program',
          value: loadingLine.program_year
        },
        {
          label: 'Lokasi Persemaian',
          value: loadingLine.rel_location_nursery_id
        },
        {
          label: 'Management Unit',
          value: loadingLine.mu_name
        },
        {
          label: 'Tanggal Distribusi',
          value: loadingLine.distribution_date,
          type: 'longDate'
        },
        {
          label: 'Nama FF',
          value: loadingLine.ff_name,
        },
        {
          label: 'Kode FF',
          value: loadingLine.ff_no,
        },
      ]
      this.tableDetailItems = items
    },
    onSubmit: async function () {
      if (!this.mainData.is_resend && !this.mainData.is_return) {
        this.$_alert.error(null,'Gagal','Tidak ada pengembalian atau request pengiriman ulang bibit!')
        return;
      }
      const loading = this.$_alert.loading('Mengirim request ...')
      try {
        // check existing request
        const checkExisting = await this.$_api.get('public/list', {
          model: 'detail_adendum',
          loading_line_id: this.loadingLine.id
        }).then(res => res.data)
        if (checkExisting.length) {
          this.$_alert.error(null,'Sudah Ada','Sudah pernah melakukan request addendum pada ff ini! Silakan ditunggu pengiriman dari persemaian atau bisa menghubungi pihak persemaian terkait.')
          return;
        }
        
        const storeMain = {
          model: 'detail_adendum',
          loading_line_id: this.loadingLine.id,
          request_by: this.$route.query.request_by,
          status_verified: 0,
          verified_by: null,
          return_date: this.mainData.is_return ? this.mainData.date_pengembalian_bibit : null,
          distribution_date: null,
          description: this.mainData.description,
          status_allocation: 0,
          list_adendum: []
        }
        // set list_adendum data
        this.loadingLine.detail_farmers.map(f => {
          if (f.is_return || f.is_resend) {
            f.detail_seed_farmers.map(fSeed => {
              const diffResend = parseInt(fSeed.resend_min_value || 0)
              const diffReturn = parseInt(fSeed.return_min_value || 0)
              const totalReturn = parseInt(fSeed.total_return || 0)
              const totalResend = parseInt(fSeed.total_resend || 0)
              const totalPenlub = parseInt(fSeed.total_penlub || 0)
              const totalLoad = parseInt(fSeed.total_load || 0)
              const totalReceived = parseInt(fSeed.total_received || 0)
              const dAdendum = {
                farmer_no: f.farmer_no,
                farmer_name: f.farmer_name,
                before_qty_seed: totalPenlub,
                tree_id: fSeed.tree_id,
              }

              if (f.is_return && totalReturn > 0) storeMain.list_adendum.push({
                ...dAdendum,
                category_id: 1,
                after_qty_seed: totalReturn,
                description_reason: fSeed.return_description
              })

              if (f.is_resend && totalResend > 0) storeMain.list_adendum.push({
                ...dAdendum,
                category_id: 2,
                after_qty_seed: totalResend,
                description_reason: fSeed.resend_description
              })

              if (f.is_return && diffReturn > 0) storeMain.list_adendum.push({
                ...dAdendum,
                category_id: 3,
                after_qty_seed: diffReturn,
                description_reason: 'Kelebihan pengiriman bibit dari persemaian.'
              })

              if (f.is_resend && diffResend > 0) storeMain.list_adendum.push({
                ...dAdendum,
                category_id: 4,
                after_qty_seed: diffResend,
                description_reason: 'Kekurangan pengiriman bibit dari persemaian.'
              })
            })
          }
        })
        console.log('onSubmit() storeMain', storeMain)

        await this.$_api.post('public/create', storeMain)
        await loading.close()
        setTimeout(() => {
          this.afterCreateSucceed()
        }, 100);
      } catch (err) {
        console.log(`onSubmit() error`, err)
        await loading.close()
        setTimeout(() => {
          this.$_alert.error(err)
        }, 100);
      } finally {await loading.close()}
    },
    summariesReSeed(input = null) {
      const items = []
      const loadingLine = this.loadingLine

      if (loadingLine) {
        loadingLine.detail_farmers.map(f => {
          const isReturn = f.is_return || false
          const isResend = f.is_resend || false
          f.detail_seed_farmers.map(s => {
            // if (input && parseInt(s.total_penlub) < parseInt(s.total_return || 0) || parseInt(s.total_penlub) < parseInt(s.total_resend || 0)) {
            //   this.$_alert.error('Jumlah melebihi permintaan (penlub) !')
            //   setTimeout(() => {
            //     input.total_return = 0
            //     input.total_resend = 0
            //   }, 100);
            // } else {
              const findExist = items.find(v => v.tree_id == s.tree_id)
              if (!findExist) {
                items.push({
                  tree_id: s.tree_id,
                  rel_tree_id: s.rel_tree_id,
                  total_penlub: parseInt(s.total_penlub),
                  total_load: parseInt(s.total_load),
                  total_damaged: parseInt(s.total_damaged),
                  total_received: parseInt(s.total_received),
                  total_missing: parseInt(s.total_missing),
                  total_return: isReturn ? parseInt(s.total_return || 0) : 0,
                  total_resend: isResend ? parseInt(s.total_resend || 0) : 0,
                })
              } else {
                findExist.total_penlub += parseInt(s.total_penlub)
                findExist.total_load += parseInt(s.total_load)
                findExist.total_damaged += parseInt(s.total_damaged)
                findExist.total_received += parseInt(s.total_received)
                findExist.total_missing += parseInt(s.total_missing)
                findExist.total_return += isReturn ? parseInt(s.total_return || 0) : 0
                findExist.total_resend += isResend ? parseInt(s.total_resend || 0) : 0
              }
            // }
          })
        })
      }

      this.tableSummariesItems = items.sort((a,b) => a.rel_tree_id.localeCompare(b.rel_tree_id))

      if (items.find(v => v.total_return > 0)) this.mainData.is_return = 1
      else this.mainData.is_return = 0
      if (items.find(v => v.total_resend > 0)) this.mainData.is_resend = 1
      else this.mainData.is_resend = 0

      return true
    },
    toggleReSeed: async function (type, status, farmer) {

      if (status) {
          farmer.detail_seed_farmers.map(data => {
            const totalDamaged = parseInt(data.total_damaged)
            const totalMissing = parseInt(data.total_missing)
            if (type == 'return') {
              data.total_return = totalDamaged
              data.return_description = ''
              if (totalDamaged) data.return_description += 'Bibit Rusak'
            }
            if (type == 'resend') {
              data.total_resend = totalDamaged + totalMissing
              data.resend_description = ''
              if (totalDamaged) data.resend_description += 'Bibit Rusak'
              if (totalMissing) data.resend_description += `${totalDamaged ? '& ' : ''}Bibit Hilang`
            }
          })
      }

      setTimeout(() => {
        this.summariesReSeed()
      }, 100);
    }
  },
};
</script>
