<template>
  <div class="container">
    <div class="card card-custom">
      <div class="card-body pb-0">
        <div class="flex-fill align-items-center row mr-0">
          <div class="col-lg-12 col-sm-12">
            <s-input v-model="selectedyear"
              :item="{ label: 'Tahun', classLabel: 'myLabel', type: 'year', validation: [], placeholder: 'Periode Laporan', api: '', formatter: momentFormat, ic: 'w-100 mt-3' }"
              @input="yearChange" />
          </div>
        </div>
      </div>
    </div>

    <div class="card card-custom mt-5">
      <div class="card-body pb-0">
        <div class="flex-fill align-items-center row mr-0">
          <div class="col-lg-12 col-sm-12">
            <div class="d-flex justify-content-between align-items-center">
              <ul v-if="slaveList.length !== 0 && activeSlave" class="nav nav-tabs nav-tabs-line w-100" role="tablist">
                <li v-for="(s, i) in slaveList" :key="i" class="nav-item col-4" @click="setActiveSlave(s)">
                  <a class="nav-link font-size-h6 font-weight-bold border-2 pb-4 mx-0 pointer justify-content-center"
                    :class="activeSlave.path === s.path ? 'active' : ''">{{ s.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeSlave">
      <component v-if="activeSlave.component" :is="componentLoader"></component>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'dashboard-pertumbuhan',
  data () {
    return {
      selectedyear: null,
      momentFormat: {
        stringify: (date) => {
          return date ? moment(date).format('YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'YYYY').toDate() : null
        }
      },
      activeSlave: null,
      slaveList: [
        { id: 'general', name: 'General', path: 'dashboard-general', component: true },
        { id: 'pertumbuhan', name: 'Pertumbuhan', path: 'dashboard-pertumbuhan', component: true },
        { id: 'klimatologi', name: 'Klimatologi', path: 'dashboard-klimatologi', component: true }
      ]
    }
  },
  computed: {
    componentLoader () {
      if (this.activeSlave.component) {
        let loader = this.activeSlave.path
        return () => import(`@/modules/dashboard/${loader}.vue`)
      }
    }
  },
  beforeMount () {
    this.setActiveSlave(this.slaveList[0])
    if (this.$store.state.selectedYearDashboard) {
      this.selectedyear = this.$store.state.selectedYearDashboard
    } else {
      this.selectedyear = moment(new Date()).format('YYYY')
      this.$store.commit('set', ['selectedYearDashboard', this.selectedyear, false])
    }
  },
  methods: {
    setActiveSlave (e) {
      this.activeSlave = Object.assign({}, e)
      if (e.component) {
        this.$store.commit('set', ['activeSlave', { master: this.title }, true])
      } else {
        if (e.path) {
          //   console.log('ada path', e.path)
          //   let filter = {
          //     periode_year: moment(this.mainYear).set('date', 1).set('month', 0).format('YYYY-MM-DD')
          //   }
          //   this.$_api.list(e.path, filter).then(res => {
          //     this.$set(this.mainData, e.id, res.data[0])
          //   }).catch((err) => {
          //     this.$_alert.error(err)
          //   })
        } else {
          // load dasboard
        }
      }
    },
    yearChange (e) {
      this.$store.commit('set', ['selectedYearDashboard', e, false])
    }
  }

}
</script>

<style>
.nav.nav-tabs.nav-tabs-line .nav-link:hover:not(.disabled),
.nav.nav-tabs.nav-tabs-line .nav-link.active,
.nav.nav-tabs.nav-tabs-line .show>.nav-link {
  border-bottom: unset !important;
  /* border-top-left-radius: 25px !important;
    border-top-right-radius: 25px !important; */
}

.nav.nav-tabs.nav-tabs-line .nav-link:hover:not(.disabled),
.nav.nav-tabs.nav-tabs-line .nav-link.active {
  position: relative
}

.nav.nav-tabs.nav-tabs-line .nav-link:hover:not(.disabled)::before,
.nav.nav-tabs.nav-tabs-line .nav-link.active::before {
  content: '';
  position: absolute;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  border: 5px solid rgb(110, 154, 52);
  /* border-radius: 10px; */
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

/* .primary-underline:before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 0;
    border: 10px solid #06CC6B;
    border-radius: 10px;
} */
</style>
