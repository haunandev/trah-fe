<template>
  <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column-fluid pt-md-5">
      <div class="container">
        <div id="list" class="animated">
          <div class="card card-custom mb-5">
            <!-- Card Header  -->
            <div class="card-header border-0 pt-5">
              <div class="card-title flex-fill mr-0">
                <h3>MAP Kebun</h3>
              </div>
              <div class="card-toolbar">
                <a class="btn btn-outline-primary btn-icon mr-2" v-b-tooltip.top="'Ubah Area'" @click="onEdit">
                  <i class="ri-edit-fill p-0"></i>
                </a>
                <!-- <a class="btn btn-outline-primary btn-icon" v-b-tooltip.top="'Layar Penuh'"
                  @click="toogleFullscreen('mapCard')">
                  <i class="ri-fullscreen-fill p-0"></i>
                </a> -->
              </div>
            </div>

            <div class="card-header" v-if="editMode">
              <div class="flex-fill align-items-center row mr-0">
                <div class="col-lg-4 col-sm-12">
                  <s-input v-model="selectedHanca" :item="{
                    classLabel: 'col pl-0',
                    classItem: 'pr-7',
                    rowclass: 'mx-0',
                    groupClass: 'w-100',
                    label: 'Hanca',
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
                    isObject: false,
                    nm: false
                  }" @input="hancaChange" />
                </div>

                <div class="col-lg-4 col-sm-12">
                  <input type="color" id="favcolor" name="favcolor" v-model="selectedColor" />
                </div>
              </div>
            </div>

            <div class="card-body py-2 mt-3">

              <!-- <template>
                <v-stage ref="stage" :config="stageSize">
                  <v-layer>
                    <v-shape :config="{
                      sceneFunc: function (context, shape) {
                        context.beginPath()
                        context.moveTo(20, 50)
                        context.lineTo(220, 80)
                        context.quadraticCurveTo(150, 100, 260, 170)
                        context.closePath()

                        // special Konva.js method
                        context.fillStrokeShape(shape)
                      },
                      fill: '#00D2FF',
                      stroke: 'black',
                      strokeWidth: 4
                    }" />
                  </v-layer>
                </v-stage>
              </template> -->
              <!-- <PinchScrollZoom ref="zoomer" :minScale="0.3" :maxScale="0.7" :width="1000" :height="800"
                :contentWidth="5800" :contentHeight="5800" :scale="scale" :origin-x="0" :origin-y="0"
                :throttleDelay="100" @scaling="scalingHandler" class="psz"> -->
              <template>
                <v-stage ref="stage" @click="addCircle" @mousedown="startDrawing" @mousemove="onDrawing"
                  @mouseup="endDrawing" :config="stageSize" id="container">
                  <v-layer>

                    <!-- map image -->
                    <v-image :config="{
                      image: image,
                      width: scale(3279),
                      height: scale(2788)
                    }" />

                    <!-- Line when drawing  -->
                    <template v-if="editMode">
                      <v-line v-for="line in lines" :key="line.id" :config="{
                        stroke: 'black',
                        points: line.points,
                      }" />
                    </template>

                    <!-- Line after drawing  -->
                    <template v-else>
                      <v-line v-for="(hanca, i) in hancas" :key="'area-' + i" @click="handleMouseClick($event, hanca)"
                        @mousemove="handleMouseMove($event, hanca.name)" @mouseout="handleMouseOut"
                        @mouseover="handleMouseOver" :config="{
                          fill: hanca.coords ? hanca.coords.color : '',
                          points: hanca.coords ? hanca.coords.points : [],
                          opacity: 0,
                          closed: true,
                          key: hanca.id
                        }" />

                    </template>

                  </v-layer>

                  <!-- Layer Tooltip  -->
                  <v-layer>
                    <v-label ref="tooltip" :config="tooltipConfig">
                      <v-tag :config="{
                        fill: 'black',
                        pointerDirection: 'down',
                        pointerWidth: 10,
                        pointerHeight: 10,
                        lineJoin: 'round',
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 10,
                        shadowOffsetY: 10,
                        shadowOpacity: 0.5,
                      }">

                      </v-tag>
                      <v-text :config="textConfig">

                      </v-text>
                    </v-label>
                  </v-layer>
                </v-stage>
              </template>
              <!-- </PinchScrollZoom> -->

              <!-- <div id="container"></div> -->

              <!-- <template>
                <canvas v-if="selected" ref="canvas" class="ul-public-image-map" @mousemove="getMousePos($event)"
                  @click="setSelected">
                  <img ref="image" :src="selected.img" :alt="selected.name" @load="initCanvas()" />
                </canvas>
              </template> -->

              <!-- <PinchScrollZoom ref="zoomer" :minScale="0.3" :maxScale="0.7" :width="1000" :height="800"
                :contentWidth="5800" :contentHeight="5800" :scale="scale" :origin-x="0" :origin-y="0"
                :throttleDelay="100" @scaling="scalingHandler" class="psz">

                <img src="/static/img/map/map-full.png" usemap="#image-map">

                <map name="image-map">
                  <area target="_self" alt="1" href="#" @mouseover="showTootip" id="asd"
                    v-b-tooltip.viewport="{ customClass: 'tooltip-area' }" title="asdasdsa"
                    coords="972,2333,750,2037,1431,1492,1801,1320,2031,1262,2252,1353,2400,1418,2531,1591,2654,1829,2778,2042,2876,2331,2769,2257,2556,1976,2474,1870,1752,2083,1472,2149,1185,2223"
                    shape="poly">
                  <area target="_self" alt="2" title="2" href="#"
                    coords="979,2339,1208,2851,2333,2577,2509,2243,2715,2191,2478,1861,1755,2078,1146,2243"
                    shape="poly">
                  <area target="_self" alt="3" title="3" href="#"
                    coords="1198,2845,1218,3020,1260,3133,1301,3216,1342,3319,1384,3433,1466,3422,1642,3412,1910,3412,2086,3412,2354,3391,2488,3391,2385,3123,2416,2690,2344,2576"
                    shape="poly">
                  <area target="_self" alt="4" title="4" href="#"
                    coords="2674,2944,2612,3140,2736,3192,2654,3398,2881,3522,3139,3522,3159,3667,3366,3698,3593,3739,3748,3770,3924,3708,4027,3605,4130,3419,4244,3213,4285,3140,4089,3068,4037,3140,3851,3017,3707,3078,3531,3120,3294,3078,3149,2996,3046,2913,2932,2903,2777,2975"
                    shape="poly">
                  <area target="_self" alt="5" title="5" href="#"
                    coords="2519,2253,2664,2934,2746,2955,2839,2934,2953,2903,3036,2903,3098,2934,3139,2975,3242,3058,3366,3078,3511,3089,3624,3068,3727,3047,3841,3006,4027,3109,4089,3058,4275,3151,4574,3027,4543,2831,4347,2779,4213,2697,4202,2573,4109,2511,4006,2501,3893,2377,3820,2325,3727,2335,3676,2377,3531,2315,3325,2201,3376,2078,3438,1902,3149,2129,2943,2274,2850,2335,2705,2212"
                    shape="poly">
                  <area target="_self" alt="6" title="6" href="#"
                    coords="3438,1878,3810,2095,3748,2229,3841,2250,4037,2466,4533,2487,4543,2270,4595,2095,4615,1599,4522,1321,4409,1187,4264,1166,4171,1187,4006,1290,3841,1455,3707,1620,3583,1754"
                    shape="poly">
                  <area target="_self" alt="7" title="7" href="#"
                    coords="3893,3790,3975,3997,3924,4172,3800,4471,3975,4451,4120,4440,4326,4409,4481,4317,4574,4172,4677,3873,4657,3708,4615,3491,4584,3295,4574,3202"
                    shape="poly">
                </map>

              </PinchScrollZoom> -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// Image Map Generated by http://www.image-map.net/
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'
import area from './area.js'
const width = window.innerWidth
const height = window.innerHeight

export default {
  name: 'Map',
  components: {
    PinchScrollZoom
  },
  data () {
    return {
      selectedHanca: null,
      selectedColor: '#000000',
      editMode: false,
      // scale: 0.3,
      stageSize: {
        width: width,
        height: height
      },
      image: null,
      stage: null,
      shapesLayer: null,
      tooltipLayer: null,
      tooltip: null,
      textTooltip: null,
      tooltipConfig: {
        x: 170,
        y: 75,
        opacity: 0.75,
        visible: false
      },
      textConfig: {
        text: 'Tooltip pointing down',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
      },
      areas: area.area,
      isDrawing: false,
      lines: [],
      circles: [],
      // circleConfig: {
      //   radius: 20,
      //   stroke: '#666',
      //   fill: '#ddd',
      //   strokeWidth: 2,
      //   draggable: true
      // }
      hancas: []
    }
  },
  async beforeMount () {
    await this.getHanca()
  },
  mounted () {
    const image = new window.Image()
    if (this.editMode) {
      image.src = '/static/img/map/mapgaris.png'
    } else {
      image.src = '/static/img/map/full-map.png'
    }
    this.image = image
  },
  watch: {
  },
  methods: {
    hancaChange (e) {
      console.log('Hanca Change : ', e)
      console.log('Selected Color : ', this.selectedColor)
      if (e) {
        document.body.style.cursor = 'crosshair'
      }
    },
    scale (value) {
      let scaling = 69
      return value - (scaling / 100 * value)
    },
    onEdit () {
      this.editMode = !this.editMode
      if (this.editMode) {
        if (this.selectedHanca) {
          document.body.style.cursor = 'crosshair'
        } else {
          document.body.style.cursor = 'not-allowed'
        }
      } else {
        document.body.style.cursor = 'default'
      }

      // this.image.src = this.editMode ? '/static/img/map/mapgaris.png' : '/static/img/map/full-map.png'
    },
    addCircle (e) {
      // const pos = e.target.getStage().getPointerPosition()
      // console.log('POS : ', pos)
      // const config = {
      //   x: pos.x,
      //   y: pos.y,
      //   radius: 50,
      //   stroke: '#666',
      //   fill: 'green',
      //   strokeWidth: 2,
      //   draggable: true
      // }
      // this.circles.push({ id: this.circles.length, config })
      // console.log('CIRCLES : ', this.circles)
      // const circle = new window.Circle(x, y, 10)
      // this.shapesLayer.add(circle)
    },
    handleMouseMove (e, name) {
      var shape = e.target
      if (shape) {
        var mousePos = shape.getRelativePointerPosition()
        var x = mousePos.x
        var y = mousePos.y - 5
        var text = name

        this.tooltipConfig.x = x
        this.tooltipConfig.y = y
        this.tooltipConfig.visible = true

        this.textConfig.text = text
      }
    },
    handleMouseOver (e) {
      var shape = e.target
      if (shape) {
        document.body.style.cursor = 'pointer'
        shape.opacity(0.5)
      }
    },
    handleMouseOut (e) {
      var shape = e.target
      if (shape) {
        document.body.style.cursor = 'default'
        shape.opacity(0)
        this.tooltipConfig.visible = false
      }
    },
    handleMouseClick (e, hanca) {
      var shape = e.target
      if (shape) {
        this.$router.push({
          name: 'Lahan (Hanca)',
          query: {
            view: 'detail',
            id: hanca.id
          }
        })
        // this.shapesLayer.remove(shape)
      }
      document.body.style.cursor = 'default'
    },
    startDrawing (e) {
      if (this.editMode) {
        if (this.selectedHanca) {
          document.body.style.cursor = 'crosshair'

          this.isDrawing = true
          const pos = e.target.getStage().getPointerPosition()
          this.lines = [...this.lines, { points: [pos.x, pos.y] }]
        } else {
          document.body.style.cursor = 'not-allowed'
        }
      }
    },
    onDrawing (e) {
      if (this.editMode) {
        // no drawing - skipping
        if (!this.isDrawing) {
          return
        }
        const stage = e.target.getStage()
        const point = stage.getPointerPosition()
        let lastLine = this.lines[this.lines.length - 1]
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y])

        // replace last
        this.lines.splice(this.lines.length - 1, 1, lastLine)
      }
    },
    endDrawing (e) {
      if (this.editMode) {
        this.isDrawing = false
        let finalLines = []
        this.lines.forEach(line => {
          finalLines.push(line.points)
          let tmp = {
            id: this.selectedHanca,
            lines: {
              color: this.selectedColor,
              points: line.points
            }
          }
          this.updateHanca(tmp)
          // this.areas.push(tmp)
          // console.log('AREAS : ', this.areas)
        })
      }
    },
    async getHanca () {
      await this.$_api.list('land', {}).then(res => {
        let data = res.data
        // JSON.parse(data.coords) if not null
        data.forEach(item => {
          item.coords = JSON.parse(item.coords)
        })
        this.hancas = data
      })
    },
    async updateHanca (data) {
      let tmpHanca = null
      await this.$_api.single('land', null, data.id).then(async res => {
        tmpHanca = res.data
        this.$set(tmpHanca, 'coords', data.lines)
        await this.$_api.update('land', tmpHanca).then(res => {
          console.log('Updated Hanca : ', res)
        })
      }).catch(err => {
        console.log('ERROR : ', err)
      })
    }
  }
}
</script>

<style>
#contai #container {
  /* background: black url('/static/img/map/line-building.png') no-repeat 1px 0px; */
  /* background: grey url('/static/img/map/map-sample.jpeg') no-repeat 1px 0px; */
}
