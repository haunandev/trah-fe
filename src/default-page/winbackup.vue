<template>
  <div class="container">
    <div class="sidebar">
      <div class="heading">
        <h1>Locations Tree</h1>
      </div>
      <div id="listings" class="listings">
        <div class="mb-3">
          <b-input-group>
            <b-form-input
              v-model="win"
              placeholder="Search WIN"
              @keyup.enter="goWin"
            ></b-form-input>
            <template #append>
              <b-button variant="primary" @click="goWin"
                ><i class="ri-search-line"></i
              ></b-button>
            </template>
          </b-input-group>
          <p class="text-muted example-win">
            <small class="p-3" @click="exampleWin">
              Click this to try example win : 145145
            </small>
          </p>
        </div>
        <div class="information-win" v-if="data.member_name">
          <div class="information-win-logo text-center">
            <img
              v-if="data.logofile"
              :src="data.logofile"
              alt="logo"
              class="img-fluid"
            />
          </div>
          <div class="information-win-text">
            <div
              class="information-win-member-name"
              v-html="data.member_name"
            ></div>
            <div class="member-stats" v-html="data.member_stats"></div>
            <div class="main-text" v-html="data.main_text"></div>
          </div>
        </div>
        <div class="list-group">
          <p class="text-muted " v-if="winCheck.length">
            <small class="p-3">
              Click List to see detail
            </small>
          </p>
          <div v-if="isLoadingWIn" class="text-center">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>

          <div
            v-for="item in winCheck"
            :key="item.id"
            class="list-group-item list-group-item-action"
            @click="jumpToMarker(item.longitude, item.latitude)"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ item.farmer }}</h5>
              <small>{{ item.district }}</small>
            </div>
            <p class="mb-1">{{ item.village }}</p>
            <small>{{ item.latitude }}, {{ item.longitude }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- card in right map position absolute  -->
    <div
      class=" position-absolute card-information"
      v-if="isDialogInformation"
      style="right: 115px; top: 100px; z-index: 1000;width: 365px;background: transparent;"
    >
      <div class="img-farmer">
        <b-img
          center
          v-if="informationTreeDetail.farmer_image"
          :src="informationTreeDetail.farmer_image"
          alt="image"
          class="img-fluid w-100"
        />
      </div>

      <div class="d-flex w-100 justify-content-between information-farmer">
        <!-- farmer name,farmer address,qty trees -->
        <div class="d-flex flex-column">
          <h5 class="mb-1">{{ informationFarmer.farmer_name }}</h5>
          <small>{{ informationFarmer.farmer_address }}</small>
          <small>{{ informationFarmer.qty_trees }} Trees Planted</small>
          <!-- story -->
          <blockquote class="story mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor
            volutpat. Praesent sapien massa, convallis a pellentesque nec,
            egestas non nisi.
          </blockquote>
          <!-- Social media in footer -->
          <div class="d-flex justify-content-center mt-1">
            <div class="d-flex">
              <div class="mr-2">
                <b-img
                  center
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="image"
                  class="img-fluid w-100"
                />
              </div>
              <div class="mr-2">
                <b-img
                  center
                  src="https://img.icons8.com/color/48/000000/twitter.png"
                  alt="image"
                  class="img-fluid w-100"
                />
              </div>
              <div class="mr-2">
                <b-img
                  center
                  src="https://img.icons8.com/color/48/000000/instagram-new.png"
                  alt="image"
                  class="img-fluid w-100"
                />
              </div>
            </div>
            <div class="d-flex">
              <div class="mr-2">
                <b-img
                  center
                  src="https://img.icons8.com/color/48/000000/whatsapp.png"
                  alt="image"
                  class="img-fluid w-100"
                />
              </div>
              <div class="mr-2">
                <b-img
                  center
                  src="https://img.icons8.com/color/48/000000/youtube-play.png"
                  alt="image"
                  class="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>
<!-- 145145 -->

<script lang="js">
import _config from "@/config.js";

export default {
  name: "win",
  data() {
    return {
      win: "",
      urlKml: "",
      data: [],
      informationTrees: [],
      informationTreeDetail: [],
      informationFarmer : [],
      isDialogInformation : false,
      isAtStart : true,
      start : {
        center: [107.447975, -7.083062],
        zoom: 2,
        pitch: 0,
        bearing: 0
      },
      end : {
        center: [107.447975, -7.083062],
        zoom: 10,
        bearing: 130,
        pitch: 35
      },
      secondsPerRevolution : 120,
      maxSpinZoom : 5,
      slowSpinZoom : 3,
      userInteracting : false,
      spinEnabled : true,
      winCheck: [],
      isLoadingWIn: false,
      markerEditable : {},
    };
  },
  methods: {
    exampleWin() {
      this.win = "145145";
      this.goWin();
    },
    async goToModal(data) {
      // await this.$_api.get(`/public/trees-species/${id}`).then(response => {
      //   this.informationTreeDetail = response.data;
      //   this.informationTreeDetail.tree_category = this.informationTreeDetail.tree_category.replace(
      //     /_/g,
      //     " "
      //   );
        this.informationTreeDetail.farmer_name = "Wasis"
        this.informationTreeDetail.farmer_address = "Kalirejo Village,Kebumen"
        this.informationTreeDetail.farmer_image = "https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg"
        this.informationTreeDetail.story = "A tree has been planted to offset the carbon emissions from the delivery of your new furniture. We’re dedicated to reducing our impact on the environment and your tree will help to protect our planet. The planting of this tree will also help a local farming family who will grow the tree to maturity. See the map to view your tree’s location."
      //   console.log(this.informationTreeDetail);
      //   this.isDialogInformation = true;

      // });
      this.isDialogInformation = true;

      this.informationFarmer.farmer_name = data.farmer
      this.informationFarmer.qty_trees = data.qty_trees
      this.informationFarmer.farmer_address = data.village

    },
    spinGlobe(map) {
      const zoom = map.getZoom();
      if (this.spinEnabled && !this.userInteracting && zoom < this.maxSpinZoom) {
        let distancePerSecond = 360 / this.secondsPerRevolution;
        if (zoom > this.slowSpinZoom) {
          const zoomDif =
          (this.maxSpinZoom - zoom) / (this.maxSpinZoom - this.slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    },
    async goWin() {
      this.isLoadingWIn = true;
      const map = this.$refs.map;
      if (this.win === "") {
        this.$swal({
          title: "Error!",
          text: "WIN is empty",
          icon: "error",
          button: "OK"
        });
        return;
      }
      await this.$_api
        .get("/public/syt/", {
          wins: this.win
        })
        .then(response => {
          this.isLoadingWIn = false;
          this.data = response;
          this.winCheck = this.data.wincheck;
          if (this.winCheck.length > 0) {
            this.spinEnabled = false;
            this.userInteracting = false;
            this.isAtStart = false;
            map.fitBounds([
              [this.winCheck[0].longitude, this.winCheck[0].latitude],
              [this.winCheck[0].longitude, this.winCheck[0].latitude]
            ]);
            map.flyTo({
              center: [this.winCheck[0].longitude, this.winCheck[0].latitude],
              zoom: 10,
              bearing: 130,
              pitch: 35,
              duration: 1000
            });
          } else {
            this.$swal({
              title: "Error!",
              text: "WIN not found",
              icon: "error",
              button: "OK"
            });
            this.isAtStart = true;
            this.isLoadingWIn = false;
            return;
          }
          // map cluster from data this.winCheck
          map.addSource("trees", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: this.winCheck.map((tree) => {
                return {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [tree.longitude, tree.latitude]
                  },
                  properties: {
                    district : tree.district,
                    farmer: tree.farmer,
                    latitude: tree.latitude,
                    longitude: tree.longitude,
                    qty_trees: tree.qty_trees,
                    village: tree.village,
                  }
                };
              })
            },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
          });
          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "trees",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
              ]
            }
          });
          map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "trees",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12
            }
          });
          // map.addLayer marker https://trees4trees.org/old/maps/marker.png static
          map.loadImage(
            "https://cms.cryonetwork.net/api/file/data_file_medias/file_name/1/1683707941",
            (error, image) => {
              if (error) throw error;
              map.addImage("marker", image);
              map.addLayer({
                id: "unclustered-point",
                type: "symbol",
                source: "trees",
                filter: ["!", ["has", "point_count"]],
                layout: {
                  "icon-image": "marker",
                  "icon-size": 0.02,
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                },
              });
            }
          );
          map.on("click", "clusters", e => {
            const features = map.queryRenderedFeatures(e.point, {
              layers: ["clusters"]
            });
            const clusterId = features[0].properties.cluster_id;
            map
              .getSource("trees")
              .getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;
                map.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom
                });
              });
          });
          map.on("click", "unclustered-point", e => {
            this.goToModal(e.features[0].properties);
          });

          // isDialogInformation false when drag map or zoom map
          map.on("dragstart", () => {
            this.isDialogInformation = false;
          });
          map.on("zoomstart", () => {
            this.isDialogInformation = false;
          });


        });
    },
    jumpToMarker(long,lat) {
      const map = this.$refs.map;
      this.isDialogInformation = false;
      map.flyTo({
        center: [long,lat],
        zoom: 15,
      });
    },
  },
  beforeMount(){
  },
  mounted() {
    mapboxgl.accessToken = _config.mapbox.token;
      const map = new mapboxgl.Map({
        container: "map",
        style: _config.mapbox.mapStyle,
        projection: "globe",
        zoom: 1.5,
        center: [107.447975, -7.083062]
      });

      map.on('style.load', () => {
          map.setFog({});
      });
      map.on('mousedown', () => {
        this.userInteracting = true;
      });

      map.on('mouseup', () => {
        this.userInteracting = false;
        this.spinGlobe(map);
      });

      map.on('dragend', () => {
        this.userInteracting = false;
        this.spinGlobe(map);
      });
      map.on('pitchend', () => {
        this.userInteracting = false;
        this.spinGlobe(map);
      });
      map.on('rotateend', () => {
        this.userInteracting = false;
        this.spinGlobe(map);
      });

      map.on('moveend', () => {
        this.spinGlobe(map);
      });
      this.$refs.map = map;
      this.spinGlobe(map)
  },
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  .sidebar {
    display: none !important;
  }
  .sidebar-mobile {
    display: block !important;
    padding: 5px 15px;
    top: 0px;
    max-width: 100%;
    min-width: unset;
    transform: none;
    margin-left: 0px;
    border-radius: 10px;
    margin: 20px 15px;
    background-color: transparent;
    border: solid 1px #fff;
    float: right;
  }
  .form-input-win {
    width: 100%;
    color: #fff;
  }

  #map {
    width: 100% !important;
    height: 100vh;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
  }
}
.sidebar-mobile {
  display: none;
}
.main-text {
  /* description main-text */
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  margin-left: 10px;
}
.member-stats {
  display: block;
  font-family: "Open Sans", sans-serif;
  background: #eeeeee;
  padding: 10px;
  margin-bottom: 10px;
}
.member-stats >>> .left-data {
  font-size: 13px;
  text-transform: capitalize;
  font-weight: 600;
}
.member-stats >>> .color {
  margin: 0 5px;
}
.member-stats >>> .right-data {
  float: right;
  font-size: 13px;
  font-weight: 600;
}
.information-win-member-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-left: 10px;
}
blockquote::before {
  content: open-quote;
}
blockquote::after {
  content: close-quote;
}
blockquote {
  quotes: "“" "”" "‘" "’";
}
.story {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
}
.card-information {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.img-farmer {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.information-farmer {
  position: absolute;
  /* bottom: 0; */
  bottom: -100px;
  left: 0;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 999;
}
.information-farmer h5 {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: uppercase;
}
.information-farmer small {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
}

.custom-img {
  max-height: 500px;
  object-fit: cover;
}
.sidebar {
  position: absolute;
  width: 21.3333%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
}
.example-win small {
  font-size: 12px;
  color: #999;
  font-weight: 500;
  line-height: 1.5;
}
#map {
  position: absolute;
  left: 21.3333%;
  width: 78.6667%;
  top: 0;
  bottom: 0;
}

h1 {
  font-size: 22px;
  margin: 0;
  font-weight: 400;
  line-height: 20px;
  padding: 20px 2px;
}

.heading {
  background: #fff;
  border-bottom: 1px solid #eee;
  min-height: 60px;
  line-height: 60px;
  padding: 0 10px;
  background-color: #00853e;
  color: #fff;
}
.heading h1 {
  font-size: 25px;
  margin: 0;
  font-weight: 700;
  line-height: 20px;
  padding: 20px 2px;
  color: #fff;
  text-align: center;
}

.listings {
  height: 100%;
  overflow: auto;
  padding-bottom: 60px;
}

.listings .item {
  display: block;
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-decoration: none;
}

.listings .item:last-child {
  border-bottom: none;
}
.listings .item .title {
  display: block;
  color: #00853e;
  font-weight: 700;
}

.listings .item .title small {
  font-weight: 400;
}
.listings .item.active .title,
.listings .item .title:hover {
  color: #8cc63f;
}
.listings .item.active {
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-left: 0;
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-track {
  background: none;
}
::-webkit-scrollbar-thumb {
  background: #00853e;
  border-radius: 0;
}

/* Marker tweaks */
.mapboxgl-popup {
  padding-bottom: 50px;
}

.mapboxgl-popup-close-button {
  display: none;
}
.mapboxgl-popup-content {
  font: 400 15px/22px "Source Sans Pro", "Helvetica Neue", sans-serif;
  padding: 0;
  width: 180px;
}
.mapboxgl-popup-content h3 {
  background: #91c949;
  color: #fff;
  margin: 0;
  padding: 10px;
  border-radius: 3px 3px 0 0;
  font-weight: 700;
  margin-top: -15px;
}

.mapboxgl-popup-content h4 {
  margin: 0;
  padding: 10px;
  font-weight: 400;
}

.mapboxgl-popup-content div {
  padding: 10px;
}

.mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
  margin-top: 15px;
}

.mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
  border-bottom-color: #91c949;
}

#fly {
  display: block;
  position: relative;
  margin: 0px auto;
  width: 50%;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #ee8a65;
}

.win-track {
  position: absolute !important;
  padding: 10p;
  top: 245px;
  margin-left: 70px;
  z-index: 2;
  background-color: rgb(103 98 90 / 32%);
  border: solid 1px #242424;
}
</style>
