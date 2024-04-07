<template>
  <div :class="[type === 'input' ? '' : 'h-100']">
    <div class="row">
      <div class="col-6">
        <!-- Auto COmplete Search  -->
        <gmap-autocomplete
          v-if="type === 'input'"
          :placeholder="placeholder"
          :value="addressMap"
          @place_changed="setPlace"
          class="form-control mb-5"
        ></gmap-autocomplete>

        <div class="alert alert-custom alert-default mb-0" role="alert">
          <div class="alert-text">
            <div class="row align-items-center">
              <div class="col-auto">
                <a>
                  <i class="ri-notification-fill ri-2x"></i>
                </a>
              </div>
              <div class="col-10">
                <p class="mb-0">
                  <template v-if="addressMap">
                    <a :href="location.pinLink" target="_blank">
                      {{ addressMap }}
                    </a>
                  </template>
                  <template v-else>
                    <p>
                      Belum ada alamat yang dipilih
                    </p>
                  </template>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <!-- Map Canvas  -->
        <GmapMap
          ref="mapRef"
          :options="mapOption"
          :center="mapCenter"
          :zoom="zoomNum"
          :streetViewControl="false"
        >
          <GmapInfoWindow
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          >
            <router-link :to="'proyek/detail?id=' + infoID">{{
              infoContent
            }}</router-link>
            <br />
            {{ infoAddress }}
          </GmapInfoWindow>
          <!-- <GmapMarker v-for="(pin,i) in markers" :key="i" :clickable="true" :position="pin.position" @click="toggleInfoWindow(pin,i)" :title="'aasdasdsa'"></GmapMarker> -->
          <Gmap-Marker
            v-if="place && type === 'input'"
            :draggable="true"
            @dragend="updateMaker"
            :position="place"
          ></Gmap-Marker>
          <gmap-custom-marker
            v-for="(pin, i) in markers"
            :key="i"
            :marker="pin.position"
            @click.native="toggleInfoWindow(pin, i)"
          >
            <img :src="pin.pin" />
          </gmap-custom-marker>
        </GmapMap>
      </div>
    </div>
  </div>
</template>
<style>
.vue-map-container {
  width: 100%;
  height: 100%;
}
.vue-map {
  border-radius: 10px;
}
.description-card {
  background-color: #f3f6f9;
  padding: 10px;
  border-radius: 5px;
}
</style>
<script>
// https://www.npmjs.com/package/vue2-google-maps
export default {
  name: 'gmaps',
  props: [
    'zoomNum',
    'positionPin',
    'type',
    'multiplePin',
    'placeholder',
    'sendData'
  ],
  data () {
    return {
      zoom: 10,
      mapOption: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      mapCenter: {
        lat: -7.0245542,
        lng: 110.3470253
      },
      markers: '',
      place: '',
      infoContent: '',
      infoAddress: '',
      infoID: '',
      addressMap: '',
      location: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      isLocked: false
    }
  },
  watch: {
    multiplePin: {
      deep: true,
      immediate: false,
      handler (t) {
        this.addMarkers(t)
      }
    },
    positionPin: {
      deep: true,
      immediate: true,
      handler (t) {
        if (t) this.addSingleMarkers(t)
      }
    },
    sendData: {
      deep: true,
      immediate: true,
      handler (t) {
        if (t && t.lat && t.lng) this.handleUpdateForm(t)
      }
    }
  },
  methods: {
    addMarkers (data) {
      if (data) {
        let newMarkers = []
        data.forEach(e => {
          if (e.location.lat && e.location.lng) {
            newMarkers.push({
              position: e.location,
              infoText: e.nama_proyek,
              address: e.lokasi_proyek,
              id: e.id_proyek,
              pin: e.pin
            })
          }
          // console.log(e)
        })
        this.markers = newMarkers
      }
    },
    addSingleMarkers (data) {
      if (data.lat && data.long) {
        let newMarkers = []
        newMarkers.push({
          position: { lat: data.lat, lng: data.long },
          infoText: data.nama_proyek,
          address: data.lokasi_proyek,
          pin: require('@/assets/images/pin/Frame_Proyek.png')
        })
        this.markers = newMarkers
        this.$set(this.mapCenter, 'lat', data.lat)
        this.$set(this.mapCenter, 'lng', data.long)
      }
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText
      this.infoAddress = marker.address
      this.infoID = marker.id
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    async setPlace (place) {
      let position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.place = position
      this.addressMap = place.formatted_address
      this.$set(this.mapCenter, 'lat', place.geometry.location.lat())
      this.$set(this.mapCenter, 'lng', place.geometry.location.lng())
      this.locknloud()

      await this.$_sys
        .geocodeFromCoordinate(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )
        .then(res => {
          if (res.success) {
            this.location = res.result

            this.$set(this.location, 'lat', place.geometry.location.lat())
            this.$set(this.location, 'lng', place.geometry.location.lng())

            this.addressMap = res.result.formatted_address
            this.locknloud()
          } else this.locknloud()
        })
    },
    handleUpdateForm (e) {
      let position = {
        lat: e.lat,
        lng: e.lng
      }
      this.place = position
      this.addressMap = e.formatted_address
      this.$set(this.mapCenter, 'lat', e.lat)
      this.$set(this.mapCenter, 'lng', e.lng)
      // this.isLocked = true
    },
    async updateMaker (event) {
      let position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.place = position
      this.$set(this.mapCenter, 'lat', event.latLng.lat())
      this.$set(this.mapCenter, 'lng', event.latLng.lng())

      await this.$_sys
        .geocodeFromCoordinate(event.latLng.lat(), event.latLng.lng())
        .then(res => {
          if (res.success) {
            this.location = res.result

            this.$set(this.location, 'lat', event.latLng.lat())
            this.$set(this.location, 'lng', event.latLng.lng())

            this.addressMap = res.result.formatted_address
            this.locknloud()
          } else this.locknloud()
        })
    },
    locknloud () {
      this.isLocked = !this.isLocked
      this.$emit('inputChange', this.location)
    }
  }
}
</script>
