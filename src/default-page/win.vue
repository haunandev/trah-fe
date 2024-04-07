<template>
  <div class="map-container">
    <div class="sidebar">
      <ul class="sidebar-logo">
        <li>
          <img src="@/assets/images/favicon.png" fluid alt="logo" />
        </li>
      </ul>
      <ul class="sidebar-item">
        <li>
          <a href="#">
            <i class="ri-home-7-fill sidebar-icon"></i>
            <span class="sidebar-text">
              <h6>Home</h6>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="ri-map-pin-fill sidebar-icon"></i>
            <span class="sidebar-text">
              <h6>Location</h6>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="sidebar-text ">
              <i class="ri-gift-fill sidebar-icon"></i>
              <h6>Plant</h6>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-track-trees" v-if="!isCardTrackTrees">
      <div class="card-header-track-trees">
        <h5>Your Tree Location</h5>
      </div>
      <div class="card-form-track-trees">
        <div class="form-group">
          <input
            type="text"
            class="form-track-trees"
            id="win"
            v-model="win"
            placeholder="enter tree code here...."
          />
          <button class="btn-search-track-trees" @click="goWin">
            <i class="ri-search-line"></i>
          </button>
        </div>
      </div>
      <div class="card-footer-track-trees">
        <a href="#" @click="exampleWin">
          <h5>
            Visit Sample Tree
            <i class="ri-arrow-right-fill arrow-right"></i>
          </h5>
        </a>
      </div>
    </div>
    <div class="card-information-left" v-if="!isInformationLeft">
      <div class="card-information-member">
        <div class="row p-5 ">
          <div class="col-3">
            <div class="card-information-member-image">
              <img
                src="https://dummyimage.com/300.png/09f/fff"
                alt=""
                class="img-fluid rounded-circle"
              />
            </div>
          </div>
          <div class="col-9">
            <h5 class="header-member">Barker and Stonehouse</h5>
            <div class="row">
              <div class="col-7 member-left">
                Member Since
              </div>
              <div class="col-1 member-center">
                :
              </div>
              <div class="col-2 member-right">
                2020
              </div>
            </div>
            <div class="row">
              <div class="col-7 member-left">
                Trees Planted
              </div>
              <div class="col-1 member-center">
                :
              </div>
              <div class="col-2 member-right">
                174108
              </div>
            </div>
            <div class="row">
              <div class="col-7 member-left">
                Families Helped
              </div>
              <div class="col-1 member-center">
                :
              </div>
              <div class="col-2 member-right">
                1933
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="card-information-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium
            ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis
            porttitor volutpat. Curabitur non nulla sit amet nisl tempus
            convallis quis ac lectus.
          </p>
        </div>
      </div>
      <div class="card-information-list-farmer">
        <div class="card-information-list-farmer-header p-5">
          <div class="farmer-left">
            <h5>Our Farmer</h5>
          </div>
          <div class="farmer-right">
            <span class="badge badge-pill badge-primary">15 Farmer</span>
          </div>
        </div>
        <hr />
        <div class="card-information-list-farmer-body p-5">
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
          <div class="card mb-2">
            <div class="body-list-farmer">
              <div class="title-farmer-list">
                Sutarman
              </div>
              <span class="badge badge-pill badge-warning">
                Polengan
              </span>
            </div>
            <div class="lat-long-farmer">
              -7.5757832527160645, 110.33051300048828
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-information-right" v-if="!isInformationRight">
      <b-tabs
        class="card-information-navbar"
        active-nav-item-class="active-tab-information"
        align="center"
        v-model="tabIndex"
      >
        <b-tab active>
          <template #title>
            <i class="ri-arrow-left-line mt-2" @click="tabIndex--"></i>
          </template>
          <div class="card-information-farmer">
            <div>
              <img
                class="img-fluid card-information-farmer-img"
                src="https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg"
              />
            </div>
            <div class="card-detail-information-farmer">
              <div class="row">
                <div class="col-6">
                  <div class="farmer-name">
                    Sutarman
                  </div>
                </div>
                <div class="col-6 farmer-address">
                  <span class="badge badge-pill badge-warning text-white"
                    >Polengan</span
                  >
                </div>
              </div>
              <div class="farmer-plant">
                <i class="ri-leaf-line"></i> 15 Trees Planted
              </div>
              <b-tabs card class="tab-farmers">
                <b-tab title="Farmer Story"
                  ><p class="text-truncate-description">
                    Meet Sutarman, the farmer who could make crops grow even in
                    the most adverse conditions. Rain or shine, he worked
                    tirelessly on his farm to provide for his family. Sutarman's
                    love for agriculture was unmatched. His passion for raising
                    fruits and vegetables had been passed down for generations
                    in his family.
                  </p>
                </b-tab>
                <b-tab title="Farmer Testiomonial"
                  ><p class="text-truncate-description">
                    "Hello! My name is Sutarman and I've been farming for as
                    long as I can remember. Let me tell you, it's not an easy
                    job but it's definitely rewarding. Being able to provide
                    fresh and healthy produce for my local community is
                    something that I take very seriously. I wake up early every
                    morning to tend to my crops and make sure everything is
                    growing as it should. It's hard work, but it's worth it."
                  </p>
                </b-tab>
              </b-tabs>
            </div>
          </div>
          <div class="card-social-media ">
            <div class="d-flex justify-content-center ">
              <div class="d-flex m-auto">
                <div class="m-auto">
                  <b-img
                    center
                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                    alt="image"
                    class="img-fluid w-75 h-75"
                  />
                </div>
                <div class="m-auto">
                  <b-img
                    center
                    src="https://img.icons8.com/color/48/000000/twitter.png"
                    alt="image"
                    class="img-fluid w-75 h-75"
                  />
                </div>
                <div class="m-auto">
                  <b-img
                    center
                    src="https://img.icons8.com/color/48/000000/instagram-new.png"
                    alt="image"
                    class="img-fluid w-75 h-75"
                  />
                </div>
                <div class="m-auto">
                  <b-img
                    center
                    src="https://img.icons8.com/color/48/000000/whatsapp.png"
                    alt="image"
                    class="img-fluid w-75 h-75"
                  />
                </div>
                <div class="m-auto">
                  <b-img
                    center
                    src="https://img.icons8.com/color/48/000000/youtube-play.png"
                    alt="image"
                    class="img-fluid w-75 h-75"
                  />
                </div>
              </div>
            </div>
          </div>
          <iframe
            class="inframe-drone"
            width="100%"
            height="640"
            frameborder="0"
            allow="xr-spatial-tracking; gyroscope; accelerometer"
            allowfullscreen
            scrolling="no"
            src="https://kuula.co/share/NQNr8?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
          ></iframe>
        </b-tab>
        <b-tab disabled>
          <template #title>
            <!-- if tabindex 0 show title Farmer Information else tabinde 1 show title Tree Information -->
            <h5 class="text-white">
              {{ tabIndex == 0 ? "Farmer Information" : "Tree Information" }}
            </h5>
          </template>
        </b-tab>
        <b-tab>
          <template #title>
            <i class="ri-arrow-right-line mt-2" @click="tabIndex++"></i>
          </template>
          <div>
            <b-carousel
              id="carousel-fade"
              style="text-shadow: 0px 0px 2px #000"
              fade
              indicators
            >
              <b-carousel-slide>
                <template #img>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/330px-Ash_Tree_-_geograph.org.uk_-_590710.jpg"
                    class="d-block img-fluid w-100 carousel-height-img"
                    alt="..."
                  />
                </template>
              </b-carousel-slide>
              <b-carousel-slide>
                <template #img>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/330px-Ash_Tree_-_geograph.org.uk_-_590710.jpg"
                    class="d-block img-fluid w-100 carousel-height-img"
                    alt="..."
                  />
                </template>
              </b-carousel-slide>
            </b-carousel>
          </div>
          <div class="card-detail-information-tree">
            <div class="row">
              <div class="col-6">
                <div class="tree-name">
                  Prunus Africana
                </div>
              </div>
              <div class="col-6 tree-donated">
                <span class="badge badge-pill badge-warning text-white"
                  >500 Trees Donated</span
                >
              </div>
            </div>
            <div class="card-detail-information-description">
              <p>
                Prunus africana is a tree species indigenous to Africa. It is
                known for its medicinal properties, particularly in the
                treatment of prostate issues. The bark and leaves of the tree
                are used to create herbal remedies
              </p>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <div id="map"></div>
  </div>
</template>
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
      isCardTrackTrees : false,
      isInformationRight : true,
      isInformationLeft : true,
      tabIndex : 0,
    };
  },
  methods: {
    exampleWin() {
      this.win = "145145";
      this.goWin();
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
          this.isCardTrackTrees = true;
          this.isInformationRight = false;
          this.isInformationLeft = false;
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

          map.on("load", () => {
            map.resize();
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
    // check resolution screen
    console.log(window.innerWidth);
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
          map.resize();
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
      map.on("load", () => {
            map.resize();
      });

      this.$refs.map = map;
      this.spinGlobe(map)
  },
};
</script>

<style>
@media (min-width: 1400px) {
  .card-information-list-farmer {
    height: 440px !important;
    max-height: 440px !important;
  }
  .card-information-list-farmer-body {
    height: 335px !important;
    max-height: 335px !important;
  }
  .card-information-farmer-img {
    width: 386px !important;
    height: 185px !important;
  }
  .card-detail-information-farmer {
    top: 234px !important;
  }
  .card-social-media {
    top: 495px !important;
  }
  .inframe-drone {
    height: 191px !important;
    top: 562px !important;
  }
  .card-detail-information-tree {
    height: 425px !important;
  }
}
.card-detail-information-description {
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin: auto;
  padding: 5px;
}
.card-detail-information-description p {
  font-size: 14px;
  line-height: 20px;
  color: #000;
  font-weight: 400;
}
.card-detail-information-tree {
  position: absolute;
  width: 100%;
  height: 250px;
  background: #fff;
  z-index: 999;
  top: 340px;
  left: 0;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.tree-name {
  font-size: 16px;
  font-weight: 600;
  color: #5c8f35;
  line-height: 27px;
  margin-bottom: 0px;
  padding-left: 10px;
}
.tree-donated {
  text-align: right;
  margin-top: 2px;
  padding-right: 23px;
  font-size: 12px;
  line-height: 27px;
}
.carousel-height-img {
  height: 300px !important;
  object-fit: cover;
}
.active-tab-information {
  background: transparent !important;
  border: none !important;
}
.nav-item a {
  background: transparent !important;
  border: none !important;
}
.inframe-drone {
  position: absolute;
  width: 100%;
  height: 110px;
  z-index: 999;
  top: 498px;
  left: 0;
  border-radius: 5px;
}
.text-truncate-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-social-media {
  position: absolute;
  width: 100%;
  background: #fff;
  z-index: 999;
  top: 439px;
  left: 0;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-radius: 5px;
}
.farmer-plant {
  padding-left: 10px;
  font-size: 14px;
  line-height: 27px;
  font-weight: 600;
  color: #000;
}
.farmer-name {
  font-size: 16px;
  font-weight: 600;
  color: #5c8f35;
  line-height: 27px;
  margin-bottom: 0px;
  padding-left: 10px;
}
.farmer-address {
  text-align: right;
  margin-top: 2px;
  padding-right: 23px;
  font-size: 12px;
  line-height: 27px;
}
.card-detail-information-farmer {
  position: absolute;
  width: 100%;
  background: #fff;
  z-index: 999;
  top: 195px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0px 0px 10px 10px;
}
.card-information-farmer-img {
  position: absolute;
  top: 49px;
  width: 386px;
  height: 150px;
  left: 0px;
  object-fit: cover;
}
.card-information-navbar {
  position: absolute;
  width: 100%;
  height: 49px;
  left: 0px;
  top: 0px;
  background: #5c8f35;
  border-radius: 8px 8px 0px 0px;
}
.card-information-navbar h5 {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 0px;
  padding: 5px;
}
.lat-long-farmer {
  padding: 10px;
}
.title-farmer-list {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
.body-list-farmer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.card-information-list-farmer-body {
  overflow-x: auto;
  height: 175px;
  max-height: 175px;
}
.card-information-list-farmer-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  height: 50px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 14px;
  color: #5c8f35;
  line-height: 27px;
}
.farmer-right {
  margin-bottom: 8px;
}
.card-information-list-farmer-header h5 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #5c8f35;
  line-height: 27px;
}
.card-information-description p {
  font-size: 11px;
  color: #000;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  line-height: 1.5;
  text-align: justify;
  text-justify: inter-word;
  padding: 0px 10px;
  margin-bottom: 10px;
  overflow: hidden;
  height: 100px;
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-weight: 500;
}

.header-member {
  color: #5c8f35;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.member-left {
  font-size: 14px;
  color: #000;
}
.member-center {
  font-size: 14px;
  color: #000;
}
.member-right {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.card-information-member-image {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0px;
  top: 0px;
  right: 0px;
  padding-right: 5px;
}
.card-information-right {
  position: absolute;
  width: 386px;
  height: 90%;
  right: 105px;
  top: 20px;
  background: rgba(0, 0, 0, 0.27);
  border-radius: 8px;
  z-index: 999;
}
.card-information-list-farmer {
  position: absolute;
  width: 360px;
  max-height: 280px;
  height: 280px;
  left: 50%;
  transform: translateX(-50%);
  top: 300px;
  background: #ffffff;
  border-radius: 8px;
  z-index: 999;
  white-space: nowrap;
}
.card-information-member {
  position: absolute;
  width: 360px;
  height: 265px;
  top: 20px;
  background: #ffffff;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.card-information-left {
  position: absolute;
  width: 386px;
  height: 90%;
  left: 105px;
  top: 30px;
  background: rgba(0, 0, 0, 0.27);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  z-index: 999;
}
.arrow-right {
  position: absolute;
  top: 50%;
  right: 280px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}
.card-footer-track-trees {
  position: absolute;
  width: 100%;
  height: 50px;
  padding: 20px;
  top: 120px;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-color: #ffffff;
  text-decoration-thickness: 2px;
}
.card-footer-track-trees h5 {
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 15px;
  font-style: italic;
}
.form-track-trees {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: 95%;
  height: 45px;
  left: 10px;
  top: 78px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #ffffff;
  border-radius: 52px;
  padding-left: 20px;
}
.btn-search-track-trees {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 10px;
  top: 78px;
  background: transparent;
  border-radius: 52px;
  border: none;
  outline: none;
  cursor: pointer;
}
.form-track-trees::-webkit-input-placeholder {
  color: black;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  font-family: "Poppins", sans-serif;
}
.card-header-track-trees h5 {
  font-size: 23px;
  font-weight: 900;
  margin-bottom: 0;
  color: #fff;
  text-align: left;
  padding: 20px;
}
.card-track-trees {
  position: fixed;
  background: rgba(15, 31, 15, 0.71);
  border-radius: 12px;
  width: 460px;
  height: 200px;
  max-height: 200px;
  max-width: 460px;
  z-index: 999;
  right: 0;
  bottom: 210px;
  top: 190px;
  left: 140px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  opacity: 0.8;
  -webkit-transition: all 300ms;
  -o-transition: all 300ms;
  transition: all 300ms;
}
.map-container {
  position: relative;
  width: 100% !important;
  height: 100% !important;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.sidebar {
  position: fixed;
  background: rgba(255, 255, 255, 0.1);
  width: 59px;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 999;
  -webkit-transition: left 300ms;
  -o-transition: left 300ms;
  transition: left 300ms;
  display: flex;
  align-items: center;
}
.sidebar-item {
  position: relative;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}
.sidebar-item li {
  list-style: none;
  cursor: pointer;
}
.sidebar-icon {
  font-size: 30px;
  color: #fff;
  margin-bottom: 5px;
}
.sidebar-text h6 {
  color: #fff;
  font-size: 8px;
  font-weight: 900;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.sidebar-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}
.sidebar-logo img {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  background: #fff;
  border-radius: 50%;
  padding: 5px;
}
</style>
