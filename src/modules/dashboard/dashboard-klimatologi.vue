<template>
    <div>
        <div class="card card-custom mt-5">
            <div class="row" v-if="envData">
                <div class="col-lg-4 col-md-4 col-sm-12" v-for="(nganu, i ) in envData" :key="'nganu-' + i">
                    <div class="card m-5 pl-5 pr-5  py-4">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex flex-column text-dark">
                                <span class="font-weight-bold font-size-sm">{{ nganu.label }}</span>
                                <span class="font-weight-bolder" :style="`color: ${nganu.color}; font-size: 2.3rem`"> {{
                                    nganu.value}}</span>
                            </div>
                            <span class="d-flex flex-column justify-content-center align-items-center " :style="`background-color: ${nganu.background}; border-radius: 8px; width: 70px; height: 70px;`">
                                <i :style="'color: ' + nganu.color" class=" icon-3x font-weight-bold" :class="{
                                    [nganu.icon]: true
                                }"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rainfall  -->
        <div class="card card-custom mt-5 p-5 pt-10">
            <div class="card-header p-0 ml-5">
                <h3>
                    <span class="card-label font-weight-bolder text-blue">
                        Statistik Curah Hujan
                    </span>
                    <p><small>Tahun {{ selectedYearDashboard }}</small></p>
                </h3>
            </div>
            <div class="card-content">
                <apexchart ref="chartRainfall" :height="300" type="area" :options="rainfallChartOpt"
                    :series="rainfallChartSeries">
                </apexchart>

                <div class="card card-custom mt-5 p-5">
                    <div class="card-header p-0">
                        <h3>
                            <span class="card-label font-weight-bolder text-blue">
                                Tabel Detail Jumlah Hari Hujan
                            </span>
                            <p><small>Tahun {{ selectedYearDashboard }}</small></p>
                        </h3>
                    </div>
                    <div class="card-content">
                        <div class="table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Bulan</th>
                                        <th v-for="(header, i) in rainfallTable.header" :key="i">{{ header }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Hari Hujan</td>
                                        <td v-for="(data, i) in rainfallTable.data" :key="i">{{ data }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Temperature  -->
        <div class="card card-custom mt-5 p-5 pt-10">
            <div class="card-header p-0 ml-5">
                <h3>
                    <span class="card-label font-weight-bolder text-orange">
                        Statistik Temperatur
                    </span>
                    <p><small>Tahun {{ selectedYearDashboard }}</small></p>
                </h3>
            </div>
            <div class="card-content">
                <apexchart ref="chartTemperature" :height="300" type="area" :options="temperatureChartOpt"
                    :series="temperatureChartSeries">
                </apexchart>
            </div>
        </div>

        <!-- Temperature  -->
        <div class="card card-custom mt-5 p-5 pt-10">
            <div class="card-header p-0 ml-5">
                <h3>
                    <span class="card-label font-weight-bolder text-primary">
                        Statistik Kelembaban
                    </span>
                    <p><small>Tahun {{ selectedYearDashboard }}</small></p>
                </h3>
            </div>
            <div class="card-content">
                <apexchart ref="chartHumidity" :height="300" type="area" :options="humidityChartOpt"
                    :series="humidityChartSeries">
                </apexchart>
            </div>
        </div>

    </div>

</template>

<script>

import moment from 'moment'
export default {
  name: 'dashboard-klimatologi',
  data () {
    return {
      envData: [
        {
          label: 'Curah Hujan Harian',
          color: '#218AEC',
          icon: 'ri-temp-hot-line',
          value: '-',
          background: '#DEEDFC'
        },

        {
          label: 'Temperatur',
          color: '#F25F5F',
          icon: 'ri-temp-hot-line',
          value: '-',
          background: '#FDE7E7'
        },
        {
          label: 'Kelembaban',
          color: '#FFAB2E',
          icon: 'ri-haze-line',
          value: '-',
          background: '#FFF2E0'
        }
      ],
      selectedYearDashboard: null,
      selectedHanca: null,
      hancaObject: null,
      //   envData: null,

      // Rainfall
      rainfallChartOpt: {
        // colors: ['#229eb5', '#e44881'],
        // grid: {
        //   show: true,
        //   xaxis: {
        //     lines: {
        //       show: true
        //     }
        //   },
        //   yaxis: {
        //     lines: {
        //       show: true
        //     }
        //   }
        // },
        // chart: {
        //   type: 'area',
        //   toolbar: {
        //     show: false
        //   }
        // },
        // stroke: {
        //   curve: 'smooth',
        //   lineCap: 'round',
        //   width: 2
        // },
        // dataLabels: {
        //   enabled: false
        // },
        // xaxis: {
        //   type: 'category',
        //   categories: []
        // },
        // noData: {
        //   text: 'Loading Chart',
        //   align: 'center',
        //   verticalAlign: 'middle',
        //   offsetX: 0,
        //   offsetY: 0,
        //   style: {
        //     color: undefined,
        //     fontSize: '14px',
        //     fontFamily: undefined
        //   }
        // },
        // chart: {
        //   height: 350,
        //   type: 'area'
        // },
        // dataLabels: {
        //   enabled: false
        // },
        // stroke: {
        //   curve: 'smooth'
        // },
        // xaxis: {
        //   type: 'datetime',
        //   categories: []
        // },
        // tooltip: {
        //   x: {
        //     format: 'MMMM yyyy'
        //   }
        // }
      },
      rainfallChartSeries: [],
      rainfallTable: {
        header: null,
        data: null
      },

      // Temperatur
      temperatureChartOpt: {},
      temperatureChartSeries: [],

      // Kelembaban
      humidityChartOpt: {},
      humidityChartSeries: []
    }
  },
  beforeMount () {
    this.selectedYearDashboard = this.$store.state.selectedYearDashboard
  },
  mounted () {
    this.getEnv()
    this.getChartRainfall()
    this.getTableRainFall()
    this.getChartTemperature()
    this.getChartHumidity()
  },
  watch: {
    '$store.state.selectedYearDashboard': {
      handler (val) {
        this.selectedYearDashboard = val
        this.getChartRainfall()
        this.getTableRainFall()
        this.getChartTemperature()
        this.getChartHumidity()
      },
      deep: true
    }
  },
  methods: {
    hancaChange (data) {
      console.log('Hanca Change : ', data)
      this.getSingleHanca(data)
    },
    async getSingleHanca (id) {
      await this.$_api.single('land', null, id).then(res => {
        this.hancaObject = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    async getEnv () {
      await this.$_api.list('environment', { sort: 'desc', limit: 1 }).then(res => {
        if (res) {
        //   this.envData = res.data[0]
          let data = res.data[0]
          this.$set(this.envData[0], 'value', `${data.rainfall} Mm`)
          this.$set(this.envData[1], 'value', `${data.temperature} °C`)
          this.$set(this.envData[2], 'value', `${data.humidity} %`)

          console.log(this.envData)
        }
      })
    },
    async getChartRainfall () {
      await this.$_api.get(`dashboard/rainfall-statistics/chart/${this.selectedYearDashboard}`, {}).then(async (res) => {
        const data = res.data
        let dataSeries = []
        let tmpCategories = []

        for (let index = 0; index < data.length; index++) {
          let name = `${this.selectedYearDashboard}-${data[index].month}-01`
          name = moment(name).format('MMM YYYY')
          tmpCategories.push(name)
          let total = data[index].total
          dataSeries.push(total)
        }

        // update chart option
        this.$refs.chartRainfall.updateOptions({
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: true,
            background: {
              borderRadius: 30
            }
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'category',
            categories: tmpCategories
          },
          yaxis: {
            title: {
              text: 'Milimeter(Mm)'
            }
          }
        })

        // update chart series
        this.$refs.chartRainfall.updateSeries([{
          name: 'Rata-rata Curah Hujan',
          data: dataSeries
        }], true)
      })
    },
    async getTableRainFall () {
      await this.$_api.get(`dashboard/rainfall-statistics/table/${this.selectedYearDashboard}`, {}).then(async (res) => {
        if (res) {
          let data = res.data
          let headerTable = []
          let dataTable = []
          for (let index = 0; index < data.length; index++) {
            let month = `${data[index].year}-${data[index].month}-01`
            let formated = moment(month).format('MMM YYYY')
            headerTable.push(formated)
            dataTable.push(data[index].total)
          }
          this.$set(this.rainfallTable, 'header', headerTable)
          this.$set(this.rainfallTable, 'data', dataTable)
        }
      })
    },
    async getChartTemperature () {
      await this.$_api.get(`dashboard/temperature-statistics/chart/${this.selectedYearDashboard}`, {}).then(async (res) => {
        const data = res.data
        let dataSeries = []
        let tmpCategories = []

        for (let index = 0; index < data.length; index++) {
          let name = `${this.selectedYearDashboard}-${data[index].month}-01`
          name = moment(name).format('MMM YYYY')
          tmpCategories.push(name)
          let total = data[index].total
          dataSeries.push(total)
        }

        // update chart option
        this.$refs.chartTemperature.updateOptions({
          colors: ['#F1811A'],
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: true,
            background: {
              borderRadius: 30
            }
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'category',
            categories: tmpCategories
          },
          yaxis: {
            title: {
              text: 'Celcius(°C)'
            }
          }
        })

        // update chart series
        this.$refs.chartTemperature.updateSeries([{
          name: 'Rata-rata Temperatur',
          data: dataSeries
        }], true)
      })
    },
    async getChartHumidity () {
      await this.$_api.get(`dashboard/humidity-statistics/chart/${this.selectedYearDashboard}`, {}).then(async (res) => {
        const data = res.data
        let dataSeries = []
        let tmpCategories = []

        for (let index = 0; index < data.length; index++) {
          let name = `${this.selectedYearDashboard}-${data[index].month}-01`
          name = moment(name).format('MMM YYYY')
          tmpCategories.push(name)
          let total = data[index].total
          dataSeries.push(total)
        }

        // update chart option
        this.$refs.chartHumidity.updateOptions({
          colors: ['#6E9A34'],
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: true,
            background: {
              borderRadius: 200
            }
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'category',
            categories: tmpCategories
          },
          yaxis: {
            title: {
              text: 'Persen(%)'
            }
          }
        })

        // update chart series
        this.$refs.chartHumidity.updateSeries([{
          name: 'Rata-rata Kelembaban',
          data: dataSeries
        }], true)
      })
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

.text-orange {
    color: #F1811A;
}

.text-lg {
    font-size: 40px;
}
</style>
