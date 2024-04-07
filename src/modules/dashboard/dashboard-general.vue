<template>
  <div>
    <div class="row" v-if="cardData">
      <div class="col-lg-3 col-md-6 col-sm-12 mt-5" v-for="(cd, i ) in cardData" :key="'cd-' + i">
        <div class="card card-custom pl-5 pr-5 py-4">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column text-dark">
              <span class="font-weight-bold font-size-sm">{{ cd.label }}</span>
              <span class="font-weight-bolder" :style="`color: ${cd.color}; font-size: 2.3rem`"> {{
                cd.value
                }}</span>
            </div>
            <span class="d-flex flex-column justify-content-center align-items-center "
              :style="`background-color: ${cd.background}; border-radius: 8px; width: 70px; height: 70px;`">
              <i :style="'color: ' + cd.color" class=" icon-3x font-weight-bold" :class="{ [cd.icon]: true }"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Hanca</p>
          <p class="text-count-card text-blue">{{ cardData.total_hanca }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Varietas Durian</p>
          <p class="text-count-card text-blue">{{ cardData.total_varietas }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Pohon Durian</p>
          <p class="text-count-card text-blue">{{ cardData.total_planting }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Pohon Durian Sehat</p>
          <p class="text-count-card text-primary">{{ cardData.total_pohon_sehat }}</p>
        </div>
      </div> -->
    </div>

    <!-- <div class="row" v-if="cardData">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Pohon Durian Sakit</p>
          <p class="text-count-card text-danger">{{ cardData.total_pohon_sakit }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Pohon Sulam Ulang</p>
          <p class="text-count-card text-warning">{{ cardData.total_pohon_sulam_ulang }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Panen</p>
          <p class="text-count-card text-primary">{{ cardData.total_panen }}</p>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card card-custom mt-5 p-5">
          <p class="text-title-card">Total Buah yang Dipanen</p>
          <p class="text-count-card text-primary">{{ cardData.total_buah_panen }}</p>
        </div>
      </div>
    </div> -->

    <div class="card card-custom mt-5 p-5">
      <div class="card-header pl-0 ml-5 mr-5">
        <h3>
          <span class="card-label font-weight-bolder text-primary">
            Persebaran Varietas Durian Tiap Hanca
          </span>
          <p><small>Tahun 2022</small></p>
        </h3>
      </div>
      <div class="card-content">
        <apexchart :height="300" type="bar" :options="varietasChartOpt" :series="varietasSeries"></apexchart>
      </div>
    </div>

    <div class="card card-custom mt-5 p-5">
      <div class="card-header pl-0 ml-5 mr-5">
        <h3>
          <span class="card-label font-weight-bolder text-primary">
            Monitoring Fresh Garden Durian Gunung Pati
          </span>
          <p><small>Tahun 2022</small></p>
        </h3>
      </div>
      <div class="card-content ml-5 mr-5">
        <div class="table table-responsive">
          <table class="table">
            <thead class="bg-primary-light">
              <tr>
                <th class=" text-primary">Hanca</th>
                <th class=" text-primary">Pengelola</th>
                <th class="text-center text-primary">Jumlah Pohon</th>
                <th class="text-center text-primary">Pohon Sakit</th>
                <th class="text-center text-primary">Pohon Sehat</th>
                <th class="text-center text-primary">Sulam Ulang</th>
                <th class="text-center text-primary">Berbunga</th>
                <th class="text-center text-primary">Total panen</th>
                <th class="text-center text-primary">Total Buah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in tableData" :key="'table' + i">
                <td class="font-weight-bolder">Hanca {{ data.name_hanca }}</td>
                <td class="">{{ data.farmers }}</td>
                <td class="text-center">{{ data.total_tree }}</td>
                <td class="text-center">{{ data.pohon_sakit }}</td>
                <td class="text-center">{{ data.total_tree }}</td>
                <td class="text-center">{{ data.sulam_ulang }}</td>
                <td class="text-center">{{ data.berbunga }}</td>
                <td class="text-center">{{ data.total_panen }}</td>
                <td class="text-center">{{ data.total_buah }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'dashboard-general',
  data () {
    return {
      varietasData: null,
      selectedYearDashboard: null,
      cardData: [
        {
          label: 'Total Hanca',
          color: '#218AEC',
          icon: 'ri-collage-line',
          value: '-',
          background: '#DEEDFC'
        },

        {
          label: 'Total Varietas Durian',
          color: '#218AEC',
          icon: 'ri-seedling-line',
          value: '-',
          background: '#DEEDFC'
        },
        {
          label: 'Total Pohon Durian',
          color: '#218AEC',
          icon: 'ri-seedling-line',
          value: '-',
          background: '#DEEDFC'
        },
        {
          label: 'Total Pohon Sehat',
          color: '#6E9A34',
          icon: 'ri-empathize-line',
          value: '-',
          background: '#ebffe7'
        },
        {
          label: 'Total Pohon Sakit',
          color: '#F25F5F',
          icon: 'ri-first-aid-kit-line',
          value: '-',
          background: '#FDE7E7'
        },

        {
          label: 'Total Pohon Sulam Ulang',
          color: '#FFAB2E',
          icon: 'ri-recycle-line',
          value: '-',
          background: '#FFF2E0'
        },
        {
          label: 'Total Panen',
          color: '#6E9A34',
          icon: 'ri-apps-line',
          value: '-',
          background: '#ebffe7'
        },
        {
          label: 'Total Buah Panen',
          color: '#6E9A34',
          icon: 'ri-medicine-bottle-line',
          value: '-',
          background: '#ebffe7'
        }
      ],
      tableData: null,
      varietasChartOpt: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4
          }
        },
        xaxis: {
          type: 'category',
          // categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
          //   '01/05/2011 GMT', '01/06/2011 GMT'
          // ]
          categories: []
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: 0
        },
        fill: {
          opacity: 1
        }
      },
      varietasSeries: [
        // {
        //   name: 'PRODUCT A',
        //   data: [44, 55, 41, 67, 22, 43]
        // },
        // {
        //   name: 'PRODUCT B',
        //   data: [13, 23, 20, 8, 13, 27]
        // },
        // {
        //   name: 'PRODUCT C',
        //   data: [11, 17, 15, 15, 21, 14]
        // },
        // {
        //   name: 'PRODUCT D',
        //   data: [21, 7, 25, 13, 22, 8]
        // }
      ]
    }
  },
  beforeMount () {
    this.selectedYearDashboard = this.$store.state.selectedYearDashboard
  },
  mounted () {
    this.getVarietas()
    this.getCard()
    this.getChart()
    this.getTable()
  },
  watch: {
    '$store.state.selectedYearDashboard': {
      handler (val) {
        this.selectedYearDashboard = val
        this.getCard()
        this.getChart()
        this.getTable()
      },
      deep: true
    }
  },
  methods: {
    async getVarietas () {
      await this.$_api.dataset('varietas', { limit: 1000 }).then((res) => {
        this.varietasData = res.data.data
        for (let index = 0; index < this.varietasData.length; index++) {
          const obj = this.varietasData[index]
          this.varietasSeries.push({
            id: obj.id,
            name: obj.name,
            data: []
          })
        }
      })
    },
    async getChart () {
      await this.$_api.get(`dashboard/general/chart/${this.selectedYearDashboard}`, {}).then(async (res) => {
        // console.log('Respon dashboar general : ', res.data)
        const data = res.data
        for (const [key, value] of Object.entries(data)) {
          let name = `Hanca ` + key
          // push xaxis
          this.varietasChartOpt.xaxis.categories.push(name)

          // build data for varietas series by name
          await this.buildDataChart(value)
        }
      })
    },
    async getCard () {
      await this.$_api.get(`dashboard/general/card/${this.selectedYearDashboard}`, {}).then(async (res) => {
        const data = res.data
        // this.cardData = data
        console.log('Data Card : ', data)
        this.$set(this.cardData[0], 'value', data.total_hanca)
        this.$set(this.cardData[1], 'value', data.total_varietas)
        this.$set(this.cardData[2], 'value', data.total_planting)
        this.$set(this.cardData[3], 'value', data.total_pohon_sehat)
        this.$set(this.cardData[4], 'value', data.total_pohon_sakit)
        this.$set(this.cardData[5], 'value', data.total_pohon_sulam_ulang)
        this.$set(this.cardData[6], 'value', data.total_panen)
        this.$set(this.cardData[7], 'value', data.total_buah_panen)
      })
    },
    async getTable () {
      await this.$_api.get(`dashboard/general/monitoring-table/${this.selectedYearDashboard}`, {}).then(async (res) => {
        const data = res.data
        const tmp = []
        for (const [key, value] of Object.entries(data)) {
          tmp.push(value[0])
        }
        this.tableData = tmp
        // console.log('Data table : ', this.tableData)
      })
    },
    async buildDataChart (data) {
      for (let index = 0; index < this.varietasSeries.length; index++) {
        const name = this.varietasSeries[index].name
        const dataFiltered = data.find(d => d.name_varietas === name)
        if (dataFiltered) {
          let total = dataFiltered.total
          this.varietasSeries[index].data.push(total)
        } else {
          this.varietasSeries[index].data.push(0)
        }
      }
    }
  }
}
</script>

<style>
.text-title-card {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  margin: unset !important;
}

.text-count-card {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 63px;
  margin: unset !important;
}

.text-blue {
  color: #2874BB;
}

.bg-primary-light {
  background: #F6FAF1;
}
</style>
