<template>
  <div class="container-fluid">
    <b-row>
      <!-- Greetings -->
      <b-col cols="12" xl="7" lg="6" class="">
        <div class="h-100 pb-5">
          <greetings />
        </div>
      </b-col>
      <!-- stock data -->
      <b-col cols="12" xl="5" lg="6">
      </b-col>
    </b-row>
    <!-- <div id="map" class="m-5"></div> -->
  </div>
</template>

<script lang="js">
import _config from "@/config.js";

export default {
  name: "dashboard-information",

  components: {
    greetings: () => import('./components/greetings.vue'),
  },
  
  data() {
    return {
      dataMaps: [],
      tempDataMaps: [],
    };
  },
  beforeMount() {},
  watch: {},
  methods: {
    initDashboard: async function () {
      const user = this.$_sys.userInfo()
      console.log('user',user)
    },
    initMap: async function (){
      this.$_api.get("/public/syt",{
        wins : "145145"
      }).then(response => {
        this.tempDataMaps = response.wincheck;
        console.log("this.tempDataMaps", this.tempDataMaps)
        if (this.tempDataMaps.length === 0) {
          this.dataMaps = [];
          return;
        }
        this.tempDataMaps.forEach(data => {
          let coordinates = [data.longitude, data.latitude];
          let obj = {
            type: "Feature",
            properties: {
              farmer: data.farmer,
              total_trees: data.qty_trees,
              district: data.district,
              village: data.village
            },
            geometry: {
              type: "Point",
              coordinates: coordinates
            }
          };
          this.dataMaps.push(obj);
        });
        const map = this.$refs.map;

        this.dataMaps.forEach(function(marker) {
          var el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundImage =
            "url(https://trees4trees.org/old/maps/marker.png)";
          el.style.width = "25px";
          el.style.height = "25px";
          el.style.backgroundSize = "cover";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          el.addEventListener("click", function(e) {
            var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="popup">
                <div class="popup__header">
                  <h3 class="popup__title">${marker.properties.farmer}</h3>
                </div>
                <div class="popup__body">
                  <p class="popup__text">Total Trees: ${marker.properties.total_trees}</p>
                  <p class="popup__text">District: ${marker.properties.district}</p>
                  <p class="popup__text">Village: ${marker.properties.village}</p>
                </div>
              </div>`
            );
            new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(popup)
              .addTo(map);
            popup.on("open", function() {
              map.flyTo({
                center: marker.geometry.coordinates,
                zoom: 11
              });
            });
          });
        });
      });

    },
    jumpToMap: async function (longitude, latitude){
      const map = this.$refs.map;
      map.flyTo({
        center: [longitude, latitude],
        zoom: 18
      });

    },
  },
  mounted: async function () {
    await this.initDashboard()
    // this.initMap();

    // mapboxgl.accessToken = _config.mapbox.token;
    //     var map = new mapboxgl.Map({
    //       container: "map",
    //       style: _config.mapbox.mapStyle,
    //       center: [106.816666, -6.2],
    //       zoom: 6
    //     });
    // map.addControl(new mapboxgl.NavigationControl());
    // this.$refs.map = map;
  },
};
</script>

<style scoped>
#map::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #ffffff;
  border-radius: 10px;
  z-index: 1;
}
#map {
  width: 98%;
  max-width: 98%;
  height: 600px;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.text-title-card {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  margin: unset !important;
}

.text-count-card {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 63px;
  margin: unset !important;
}

.text-blue {
  color: #2874bb;
}

.bg-primary-light {
  background: #f6faf1;
}
</style>
