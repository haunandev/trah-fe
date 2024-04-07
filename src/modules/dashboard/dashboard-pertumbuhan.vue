<template>
    <div>
        <div class="card card-custom mt-5">
            <div class="card-body pb-0">
                <div class="flex-fill align-items-center row mr-0">
                    <div class="col-lg-12 col-sm-12">
                        <s-input v-model="selectedHanca" :item="{
                            classLabel: 'col pl-0',
                            classItem: 'pr-7',
                            rowclass: 'mx-0',
                            groupClass: 'w-100',
                            label: 'Wilayah',
                            prefix: '',
                            type: 'select',
                            validation: ['required'],
                            placeholder: '',
                            api: 'land',
                            pointer: {
                                label: 'name',
                                code: 'id',
                                display: ['name']
                            },
                            isObject: true,
                            nm: false
                        }" @input="hancaChange" />
                    </div>
                </div>
            </div>
        </div>

        <div class="card card-custom mt-5 p-5 pt-10">
            <div class="card-header p-0 ml-5">
                <h3>
                    <span class="card-label font-weight-bolder text-primary">
                        Statistik Pertumbuhan
                    </span>
                    <p><small>Wilayah Hanca {{ hancaObject ? hancaObject.name : '-' }}</small></p>
                </h3>
            </div>
            <div class="card-content">
                <apexchart :height="300" type="area" :options="presenceChartOpt" :series="presenceChartSeries">
                </apexchart>

                <div class="card card-custom mt-5 p-5">
                    <div class="card-header p-0">
                        <h3>
                            <span class="card-label font-weight-bolder text-primary">
                                Detail Statistik Tinggi Tanaman
                            </span>
                            <p><small>Hanca {{ hancaObject ? hancaObject.name : '-' }} Tahun 2022</small></p>
                        </h3>
                    </div>
                    <div class="card-content">
                        <div class="table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Hanca</th>
                                        <th>Pengelola</th>
                                        <th>Jumlah Pohon</th>
                                        <th>Pohon Sakit</th>
                                        <th>Pohon Sehat</th>
                                        <th>Sulam Ulang</th>
                                        <th>Berbunga</th>
                                        <th>Total panen</th>
                                        <th>Total Buah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
  name: 'dashboard-pertumbuhan',
  data () {
    return {
      selectedHanca: null,
      hancaObject: null,
      presenceChartOpt: {
        colors: ['#229eb5', '#e44881'],
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        chart: {
          type: 'area',
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'round',
          width: 2
        },
        dataLabels: {
          enabled: false
        },
        noData: {
          text: 'Loading Chart',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        }
      },
      presenceChartSeries: []
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
    }
  },
  mounted () {
    // console.log('adasdsa')
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
</style>
