<template>
  <div class="table-responsive table-matrix">
    <table class="table table-vertical-center table-borderless">
      <tbody v-if="matrixData">
        <!-- header  -->
        <tr>
          <td>Semua</td>
          <td>
            <div>
              <b-form-checkbox name="check-button" @change="selectAll($event)" switch>
              </b-form-checkbox>
            </div>
          </td>
          <td v-for="(n, hi) in 10" :key="'header-' + hi">
            {{ $_sys.numToSSColumnLetter(n) }}
            <div>
              <b-form-checkbox name="check-button" @change="selectAllCol($event, n)" switch>
              </b-form-checkbox>
            </div>
          </td>
        </tr>

        <tr v-for="(md, i) in matrixData" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <div>
              <b-form-checkbox name="check-button" @change="selectAllRow($event, i)" switch>
              </b-form-checkbox>
            </div>
          </td>
          <td v-for="(matrix, j) in md" :key="j">
            <div>
              <b-form-checkbox :id="matrix.id.toString()" @change="change($event, matrix)" v-model="listid"
                :value="matrix" button-variant="primary-light" button>
                {{ matrix.position }}
              </b-form-checkbox>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Matrix',
  props: {
    landId: {
      type: Number,
      required: true
    },
    defaultValue: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      landData: null,
      rows: null,
      columns: null,
      matrixData: null,
      listid: [],
      selected: [],
      asd: false
    }
  },
  async mounted () {
    if (this.landId) this.landData = await this.getLandData()

    // console.log('Land Data', this.landData)
    if (this.landData) {
      this.rows = this.landData.row
      this.columns = this.landData.column
      let tmpmatrixData = await this.getMatrix(this.landData.id)
      // split matrixData modulus 10
      let splitedMatrix = []
      let tmp = []
      for (let i = 0; i < tmpmatrixData.length; i++) {
        if (i % 10 === 0) {
          tmp = []
          splitedMatrix.push(tmp)
        }
        tmp.push(tmpmatrixData[i])
      }
      this.matrixData = splitedMatrix
    }
  },
  computed: {
  },
  watch: {
    selected (newValue, oldValue) {
      console.log(newValue, oldValue)
    },
    defaultValue: async function (val) {
      console.log('Default Value Watch : ', val)
      if (val.length > 0) {
        this.listid = [...this.listid, ...this.defaultValue]
      }
      console.log('Listid : ', this.listid)
    },
    landId: async function (val) {
      this.matrixData = null
      let tmpmatrixData = await this.getMatrix(val)
      let splitedMatrix = []
      let tmp = []
      for (let i = 0; i < tmpmatrixData.length; i++) {
        if (i % 10 === 0) {
          tmp = []
          splitedMatrix.push(tmp)
        }
        tmp.push(tmpmatrixData[i])
      }
      this.matrixData = splitedMatrix
    }
  },
  methods: {
    selectAllCol (checked, column) {
      let index = (column - 1)
      this.matrixData.forEach(data => {
        let obj = data[index]
        let id = obj.id
        let isAny = this.listid.find(item => item.id === id)
        if (checked && !isAny) {
          this.listid.push(obj)
        } else if (!checked && isAny) {
          this.listid = this.listid.filter(item => item.id !== id)
        }
      })
      this.$emit('change', this.listid)
    },
    selectAllRow (checked, index) {
      let a = this.matrixData[index]
      a.forEach(data => {
        let obj = data
        let id = obj.id
        let isAny = this.listid.find(item => item.id === id)
        if (checked && !isAny) {
          this.listid.push(obj)
        } else if (!checked && isAny) {
          this.listid = this.listid.filter(item => item.id !== id)
        }
      })
      this.$emit('change', this.listid)
    },
    selectAll (checked) {
      if (checked) {
        this.matrixData.forEach(data => {
          data.forEach(item => {
            let obj = item
            let id = obj.id
            let isAny = this.listid.find(item => item.id === id)
            if (!isAny) {
              this.listid.push(obj)
            }
          })
        })
      } else {
        this.listid = []
      }
      this.$emit('change', this.listid)
    },
    change (e, data) {
      // console.log(e)
      this.$emit('change', e)
    },
    filteredMatrix (r, c) {
      // console.log('FIltered ROw ')
      // filter matrix data by row and column
      if (this.matrixData) {
        return this.matrixData.filter(data => {
          return data.row === r && data.column === c
        })
      }
    },
    async getLandData () {
      return this.$_api
        .single('land', null, this.landId)
        .then(res => {
          if (res.success) return res.data
        })
        .catch(err => {
          this.$_alert.error(err, 'Data tidak ditemukan')
        })
    },
    // eslint-disable-next-line camelcase
    async getMatrix (land_id) {
      return this.$_api
        .dataset('matrix', { land_id, limit: 1000 })
        .then(res => {
          if (res.success) return res.data.data
        })
        .catch(err => {
          this.$_alert.error(err, 'Value tidak ditemukan')
        })
    }
  }

}
</script>

<style scoped>
.sticky {
  position: sticky !important;
  left: 0 !important;
  background-color: #ffffff;
  z-index: 2;
  /* max-width: 200px;
    min-width: 150px; */
  /* width: 200px; */
}

.sticky-top {
  position: sticky !important;
  top: 0 !important;
  background-color: #ffffff;
  z-index: 2;
  /* max-width: 200px;
    min-width: 150px; */
  /* width: 200px; */
}

.sticky-right {
  position: sticky !important;
  right: 0 !important;
  z-index: 2;
}
</style>
