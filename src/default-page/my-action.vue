<template>
  <div class="d-flex flex-fill flex-column">
    <div class="my-action-filter">
      <b-overlay :show="loading" rounded="sm">
        <s-input v-model="filter.project_id" :item="{ classLabel:'col pl-0', rowclass: 'mx-0', label:'', prefix:'Filter Proyek', type:'lookup-radio', validation:[], placeholder: '', api:'projects', pointer: { label: 'project_name', code: 'id', display: ['rel_department_id', 'project_name'] }, nm:true }" />
        <s-input class="mt-3" v-model="filter.modul_name" :item="{ notAppendToBody:true, type:'select', validation:[], placeholder: 'Periode Laporan', optionList:moduleList, formatter:momentFormat, nm:true }" />
        <s-input v-model="filter.periode_date" :item="{ type:'month', validation:[], placeholder: 'Periode Laporan', api:'', formatter:momentFormat, ic:'w-100 mt-3' }" />
        <hr>
      </b-overlay>
    </div>
    <div class="offcanvas-content pr-5 mr-n5 ps infinite flex-fill" v-infinite-scroll="getMyAction" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="navi navi-icon-circle">
        <sequential-entrance fromBottom delay="100">
          <div v-for="(m,i) in myactionList" @click="goto(m)" :key="i+'-my-action'" class="navi-item pointer card-activity" :class="m.action_name">
            <div class="navi-link align-items-start px-0">
              <div class="symbol symbol-50 mr-3">
                <div class="symbol-label">
                  <i v-if="m.action_name === 'revision_request'" class="ri-close-line ri-2x"></i>
                  <i v-else-if="m.action_name === 'verification_request'" class="ri-check-double-line ri-2x"></i>
                  <i v-else class="ri-check-line ri-2x"></i>
                </div>
              </div>
              <div class="navi-text">
                <div v-if="m.main_module === 'single_number' || m.main_module === 'data_input'" class="font-size-lg">
                  <span class="d-block font-size-sm">Form {{ m.modul_name | parse('modules') }}</span>
                  <span class="font-weight-bold">Periode {{ m.periode_date | parse('period') }}</span>
                </div>
                <div v-else class="font-size-lg">
                  <span class="d-block font-size-sm">Registrasi Pengguna</span>
                  <span class="font-weight-bold">{{ m.modul_name | parse('modules') }}</span>
                </div>
                <div class="text-muted font-size-sm font-weight-bold">{{ m.project_name }}</div>
              </div>
            </div>
            <template v-if="m.main_module === 'single_number'">
              <div v-if="m.data.length" class="mb-3">
                <span class="font-weight-bold d-block text-truncate status-text font-size-sm">{{ m.action_name | parse('verify') }}</span>
                <span class="text-dark-75 font-weight-bold d-block text-truncate">{{ m.data[0].clausul_number }} - {{ m.data[0].item_name }}</span>
              </div>
            </template>
            <template v-else-if="m.main_module === 'data_input'">
              <div v-if="m.data.length" class="mb-3">
                <span v-if="undoneStatus.includes(m.status_code)" class="font-weight-bold d-block text-truncate status-text font-size-sm">Penyelesaian Laporan <template v-if="m.data[0].number">- No. {{ m.data[0].number }} </template> </span>
                <span v-else class="font-weight-bold d-block text-truncate status-text font-size-sm">{{ m.action_name | parse('verify') }} <template v-if="m.data[0].number">- No. {{ m.data[0].number }} </template> </span>
                <span class="text-dark-75 font-weight-bold d-block text-truncate">Tanggal {{ m.data[0].date | parse('longDate') }}</span>
              </div>
            </template>
            <template v-else>
              <div v-if="m.data.length" class="mb-3">
                <span class="font-weight-bold d-block text-truncate status-text font-size-sm">{{ m.action_name | parse('verify') }}</span>
                <span class="text-dark-75 font-weight-bold d-block text-truncate">{{ m.data[0].fullname }}</span>
                <span class="text-dark-75 font-weight-bold d-block text-truncate">{{ m.data[0].fullname }}</span>
              </div>
            </template>
          </div>
        </sequential-entrance>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  name: 'my-action',
  props: {
    refreshKey: { type: Number, required: false, default () { return 0 } }
  },
  data () {
    return {
      myactionList: [],
      loading: false,
      page: 0,
      record: 1,
      activeData: null,
      filter: {
        project_id: null,
        periode_date: null,
        modul_name: null
      },
      moduleList: [
        { label: 'Semua Action', code: null },
        { label: 'Form SMK3L', code: 'smkkkl_appraisals' },
        { label: 'Form 5R', code: 'r_appraisals' },
        { label: 'Form SMM', code: 'mm_appraisals' },
        { label: 'Form QPASS', code: 'qpass_appraisals' },
        { label: 'Keluhan Pelanggan', code: 'customer_complaints' },
        { label: 'QA Non Conformance', code: 'qhse_nc_qa' },
        { label: 'HSE Tidak Sesuai', code: 'qhse_nc_hse' },
        { label: 'Pendaftaran Pengguna', code: 'users_verifications' }
      ],
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format('MMMM YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'MMMM YYYY').toDate() : null
        }
      },
      undoneStatus: ['open', 'on_investigation']
    }
  },
  watch: {
    filter: {
      deep: true,
      immediate: false,
      handler (to) {
        this.page = 0
        this.record = 1
        this.getMyAction(true)
      }
    },
    refreshKey: {
      deep: false,
      immediate: false,
      handler () {
        this.page = 0
        this.record = 1
        this.getMyAction(true)
      }
    }
  },
  mounted () {
    this.getMyAction()
  },
  methods: {
    getMyAction (reset = false) {
      if (this.page < this.record) {
        let date = this.filter.periode_date
        if (date) date = moment(moment(date, 'MMMM YYYY').toDate()).format('YYYY-MM-DD')
        else date = null
        this.page++
        let filter = {
          page: this.page,
          modul_name: this.filter.modul_name,
          project_id: this.filter.project_id,
          periode_date: date,
          limit: 15
        }
        this.loading = true
        this.$_api.list('/custom/my-actions', filter).then(res => {
          this.loading = false
          if (!reset) this.myactionList = [...this.myactionList, ...res.data]
          else this.myactionList = res.data
          this.record = res.record
          this.$store.commit('set', ['my-action-count', res.totalMyActions, true])
        }).catch((err) => {
          this.loading = false
          this.$_alert.error(err)
        })
      }
    },
    goto (data) {
      if (this.activeData !== data) {
        this.activeData = data
        let routeName = null
        let view = null
        if (data.modul_name === 'smkkkl_appraisals') {
          routeName = 'form-SMK3L'
          view = 'update'
        } else if (data.modul_name === 'r_appraisals') {
          routeName = 'form-5R'
          view = 'update'
        } else if (data.modul_name === 'qpass_appraisals') {
          routeName = 'form-QPASS'
          view = 'update'
        } else if (data.modul_name === 'mm_appraisals') {
          routeName = 'form-SMM'
          view = 'update'
        } else if (data.modul_name === 'qhse_nc_qa') {
          routeName = 'QA-non-conformance'
          view = 'update'
        } else if (data.modul_name === 'qhse_nc_hse') {
          routeName = 'HSE-tidak-sesuai'
          view = 'update'
        } else if (data.modul_name === 'customer_complaints') {
          routeName = 'keluhan-pelanggan'
          view = 'update'
        } else if (data.modul_name === 'users_verifications') {
          routeName = 'verifikasi-pengguna'
          view = 'detail'
        } else routeName = 'qhse-global'

        let param = data.data.length ? data.data[0] : {}
        delete param.item_name
        delete param.clausul_number
        param.rtn = new Date().getTime()
        this.$router.push({
          name: routeName,
          query: { ...{ view: view, id: data.id }, ...param }
        }).catch((err) => {
          return err
        })
      }
    }
  }
}
</script>

<style scoped>
  .infinite {
    height: 76vh;
    position: relative;
    overflow: auto;
  }
  .card-activity {
    display: block;
    border: 1px;
    border-top: 6px;
    border-radius: 8px;
    border-style: solid;
    margin-bottom: 1.25rem;
    padding: 0 1em;
  }
  /* =================================== */
  .card-activity.revision_request {
    border-color: #faedec;
  }
  .card-activity.revision_request .symbol .symbol-label {
    background-color: #faedec;
  }
  .card-activity.revision_request .symbol .symbol-label i {
    color: #d42b21;
  }
  .card-activity.revision_request .status-text {
    color: #d42b21;
  }
  .card-activity:hover.revision_request {
    background-color: #faedec;
  }
  .card-activity:hover.revision_request .symbol .symbol-label {
    background-color: #d42b21;
  }
  .card-activity:hover.revision_request .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.verification_request {
    border-color: #e1f8e9;
  }
  .card-activity.verification_request .symbol .symbol-label {
    background-color: #e1f8e9;
  }
  .card-activity.verification_request .symbol .symbol-label i {
    color: #0aab41;
  }
  .card-activity.verification_request .status-text {
    color: #0aab41;
  }
  .card-activity:hover.verification_request {
    background-color: #e1f8e9;
  }
  .card-activity:hover.verification_request .symbol .symbol-label {
    background-color: #0aab41;
  }
  .card-activity:hover.verification_request .symbol .symbol-label i {
    color: #fff;
  }

  /* =================================== */
  .card-activity.appraisal_request {
    border-color: #ddf1f6;
  }
  .card-activity.appraisal_request .symbol .symbol-label {
    background-color: #ddf1f6;
  }
  .card-activity.appraisal_request .symbol .symbol-label i {
    color: #00b4e3;
  }
  .card-activity.appraisal_request .status-text {
    color: #00b4e3;
  }
  .card-activity:hover.appraisal_request {
    background-color: #ddf1f6;
  }
  .card-activity:hover.appraisal_request .symbol .symbol-label {
    background-color: #00b4e3;
  }
  .card-activity:hover.appraisal_request .symbol .symbol-label i {
    color: #fff;
  }
</style>
