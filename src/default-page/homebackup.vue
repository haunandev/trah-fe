<template>
  <div class="bg-white">
    <Navbar />
    <!-- CAROUSEL -->
    <section class="page-header home-section">
      <b-carousel
        id="banner-home"
        v-model="slide"
        :interval="4000"
        indicators
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <div class="overlay"></div>

        <b-carousel-slide
          v-for="(item, index) in banners"
          :key="index"
          class="carousel-fade"
        >
          <template #img>
            <img
              v-if="item.file_banner"
              :src="item.file_banner.url"
              :alt="item.title"
              class="img-fluid img-slider "
            />
          </template>
          <b-row class="section-area-caption">
            <b-col> </b-col>
            <b-col>
              <div class="slider-content">
                <h3>{{ item.title }}</h3>
                <h2>{{ item.subtitle }}</h2>
                <p>{{ item.description }}</p>
                <div class="slider-btn">
                  <a :href="item.link" class="btn btn-default">{{
                    item.button_text
                  }}</a>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-carousel-slide>
      </b-carousel>
    </section>

    <!--END CAROUSEL -->

    <b-container fluid="lg">
      <!-- MAP -->
      <section class="map home-section">
        <div class="container mt-10">
          <!-- CARD WITH MAP AND FILTER YEAR -->
          <div class="row">
            <!-- TEXT CENTER HEADING -->
            <div class="col-12 mb-8">
              <!-- <h1 class="text-center">Tracking Tree</h1> -->
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Map</h4>
                </div>
                <div class="card-body">
                  <div class="filter mb-4">
                    <label>Year</label>
                    <select class="form-control">
                      <option>2022</option>
                    </select>
                  </div>
                  <!-- select box province,unit management,village -->
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Province</label>
                        <select
                          class="form-control"
                          v-model="selectProvince"
                          @change="getDataUnitManagement($event)"
                        >
                          <option selected value="">All</option>
                          <option
                            v-for="province in provinces"
                            :value="province.province_code"
                            :key="province.id"
                            >{{ province.province_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Unit Management</label>
                        <select
                          class="form-control"
                          v-model="selectUnitManagement"
                          @change="getDataVillage($event)"
                        >
                          <option selected value="">All</option>
                          <option
                            v-for="unit in unitManagements"
                            :value="unit.mu_no"
                            :key="unit.mu_no"
                            >{{ unit.unit_management_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Village</label>
                        <!-- looping village -->
                        <select
                          class="form-control"
                          v-model="selectVillage"
                          @change="initMap($event)"
                        >
                          <option selected value="">All</option>
                          <option
                            v-for="village in villages"
                            :value="village.village_code"
                            :key="village.village_no"
                            >{{ village.village_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- end select box province,unit management,village -->
                  <div id="containerMap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- END MAP -->

      <section class="benefit home-section">
        <div class="container mt-10">
          <div class="row">
            <div class="col-12 col-md-6 col-sm-12  text-center">
              <img
                src="https://picsum.photos/1024/480/?image=55"
                class="rounded resize-img-home"
                alt="..."
              />
            </div>
            <div class="col-12 col-md-6 col-sm-12 text-left margin-top-home">
              <div class="d-inline flex p-2">
                <h1>Plant a Tree! It's Easy...</h1>
                <div class="vertical-line">
                  <p>
                    Quisque velit nisi, pretium ut lacinia in, elementum id
                    enim. Curabitur arcu erat, accumsan id imperdiet et,
                    porttitor at sem. Pellentesque in ipsum id orci porta
                    dapibus. Vivamus magna justo, lacinia eget consectetur sed,
                    convallis at tellus. Nulla porttitor accumsan tincidunt.
                    Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    Quisque velit nisi, pretium ut lacinia in, elementum id
                    enim. Curabitur arcu erat, accumsan id imperdiet et,
                    porttitor at sem. Pellentesque in ipsum id orci porta
                    dapibus. Vivamus magna justo, lacinia eget consectetur sed,
                    convallis at tellus. Nulla porttitor accumsan tincidunt.
                    Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div>
                <!-- BUTTON -->
                <b-button
                  variant="primary"
                  size="lg"
                  to="/win"
                  target="_blank"
                  class="mt-2"
                >
                  Plant A Tree
                </b-button>
                <b-button
                  variant="outline-primary"
                  to="/win"
                  target="_blank"
                  size="lg"
                  class="mt-2"
                >
                  See You Tree
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="achievement home-section">
        <!-- ACHIEVEMENT TREE -->
        <div class="container mt-10">
          <div class="row">
            <div class="col-12 col-md-4 col-sm-12">
              <b-card
                class="text-center card-achievement"
                title="Trees planted"
              >
                <b-card-text>
                  <b-row>
                    <b-col md="12" class="text-center">
                      <img
                        alt=""
                        src="https://trees4trees.org/wp-content/uploads/2020/07/tree_optimized.svg"
                      />
                    </b-col>
                    <b-col md="12" class="text-center mt-1">
                      <h1>3,193,959</h1>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card>
            </div>
            <div class="col-12 col-md-4 col-sm-12">
              <b-card
                class="text-center card-achievement"
                title="Families helped"
              >
                <b-card-text>
                  <b-row>
                    <b-col md="12" class="text-center">
                      <img
                        alt=""
                        src="https://trees4trees.org/wp-content/uploads/2020/07/people_optimized.svg"
                      />
                    </b-col>
                    <b-col md="12" class="text-center mt-1">
                      <h1>23,773</h1>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card>
            </div>
            <div class="col-12 col-md-4 col-sm-12">
              <b-card
                class="text-center card-achievement"
                title="CO2 captured (tonne)"
              >
                <b-card-text>
                  <b-row>
                    <b-col md="12" class="text-center">
                      <img
                        alt=""
                        src="https://trees4trees.org/wp-content/uploads/2020/07/global-warming_optimized.svg"
                      />
                    </b-col>
                    <b-col md="12" class="text-center ">
                      <h1>481,860</h1>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </section>

      <!-- DESCRIPTION -->
      <section class="description home-section"></section>

      <!-- VISIT TREE TECHNOLOGY -->
      <section class="visit home-section mt-10">
        <div class="container ">
          <div class="row">
            <div class="col-12 col-md-6 col-sm-12  text-center ">
              <img
                src="https://static.wixstatic.com/media/88ae06_8e799fdd953843c5afaa2f45bba91f92~mv2.png/v1/fill/w_273,h_545,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MOBILE%202.png"
                class="rounded  mt-5 "
                alt="..."
              />
              <!-- IMG IN RIGHT -->
              <img
                src="https://static.wixstatic.com/media/88ae06_20a1a073f23b4a98a6d4242e65c023ec~mv2.png/v1/fill/w_270,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MOBILE%201.png"
                class="rounded  mt-5 description-img-right"
                alt="..."
              />
            </div>
            <div class="col-12 col-md-6 col-sm-12 text-left mt-10">
              <div class="description-right">
                <h6 class="text-white">Tree Tracker</h6>
                <h1 class="text-white">
                  Since 2009, Trees4Trees has been using an
                </h1>
                <h1 class="text-black">online map trees tracker</h1>
                <h1 class="text-white">so you can visit your trees anytime!</h1>
                <button
                  class="mt-2 btn btn-white-light"
                  to="/win"
                  target="_blank"
                >
                  Visit Your Tree
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PARTNERS -->
      <section class="partners home-section mt-40">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-12 col-sm-12 text-center">
              <h1 class="text-black">Our Partners</h1>
              <p class="text-black">
                We are proud to work with these partners to plant trees and
                improve the lives of people in need.
              </p>
            </div>
            <div class="col-12 col-md-12 col-sm-12 text-center mt-5">
              <b-row>
                <b-col cols="12">
                  <carousel :perPage="3">
                    <slide class="p-2 d-flex justify-content-center">
                      <img
                        src="https://trees4trees.org/wp-content/uploads/2020/10/jonas-Logo.png"
                        alt="..."
                        class="resize-img-partner"
                      />
                    </slide>
                    <slide class="p-2 d-flex justify-content-center">
                      <img
                        src="https://trees4trees.org/wp-content/uploads/2020/04/baker-e1591166642848.png"
                        class="resize-img-partner"
                      />
                    </slide>
                    <slide class="p-2 d-flex justify-content-center">
                      <img
                        src="https://trees4trees.org/wp-content/uploads/2020/04/tree-e1591166968625.png"
                        class="resize-img-partner"
                      />
                    </slide>
                  </carousel>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </section>
      <div class="mt-20">
        <Footer />
      </div>
    </b-container>
  </div>
</template>
<script>
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  components: {
    Navbar,
    Footer
  },
  name: "home",
  data() {
    return {
      slide: 0,
      sliding: null,
      provinces: [],
      selectProvince: "",
      unitManagements: [],
      selectUnitManagement: "",
      villages: [],
      selectVillage: "",
      trees: [],
      banners: []
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    async initMap() {
      document.getElementById("containerMap").innerHTML =
        " <div id='map' style='height: 400px'></div>";
      const filter = {};
      const filterMaps = {};
      if (this.selectProvince) {
        filter.province_id = this.selectProvince;
        filterMaps.province_code = this.selectProvince;
      }
      if (this.selectUnitManagement) {
        filter.mu_id = this.selectUnitManagement;
        filterMaps.mu_no = this.selectUnitManagement;
      }

      if (this.selectVillage) {
        filter.village_id = this.selectVillage;
        filterMaps.village_code = this.selectVillage;
      }

      var map = L.map("map", {
        preferCanvas: true // recommended when loading large layers.
      });
      map.setView(new L.LatLng(-7.02034, 110.424604), 7);

      var OpenTopoMap = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 30,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      );
      OpenTopoMap.addTo(map);

      // Instantiate KMZ layer (async)
      var kmz = L.kmzLayer().addTo(map);

      kmz.on("load", function(e) {
        control.addOverlay(e.layer, e.name);
        // e.layer.addTo(map);
      });

      // GET API DATA FROM SERVER
      const maps = await this.$_api
        .get("/public/maps", filterMaps)
        .then(response => {
          return response.data;
        });

      const trees = await this.$_api
        .get("/public/trees", filter)
        .then(response => {
          return response.data;
        });

      // if trees not undefined
      if (trees) {
        // dyanamic marker
        for (let i = 0; i < trees.length; i++) {
          L.marker([trees[i].latitude, trees[i].longitude])
            .addTo(map)
            .bindPopup(trees[i].tree_name)
            .openPopup();
        }
      }

      if (maps) {
        // LOOPING DATA FROM API AND KMZ.LOAD
        for (let i = 0; i < maps.length; i++) {
          kmz.load(maps[i].file_maps);
        }
      }

      var control = L.control
        .layers(null, null, { collapsed: false })
        .addTo(map);
    },
    // get data province
    async getDataProvince() {
      await this.$_api.get("/public/province").then(response => {
        this.provinces = response.data;
        this.initMap();
      });
    },
    // get data unit management with params province
    async getDataUnitManagement(event) {
      await this.$_api
        .get("/public/unit-management", {
          province_code: event.target.value
        })
        .then(response => {
          this.unitManagements = response.data;
          this.initMap();
        });
    },
    // get data village with params unit management
    async getDataVillage(event) {
      await this.$_api
        .get("/public/village", {
          unit_management_id: event.target.value
        })
        .then(response => {
          this.villages = response.data;
          this.initMap();
        });
    },
    // get data banner
    async getDataBanner() {
      await this.$_api.get("/public/banner").then(response => {
        this.banners = response.data;
      });
    }
  },
  mounted() {
    this.initMap();
    this.getDataProvince();
    this.getDataBanner();
  }
};
</script>
<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #080d15;
  opacity: 0.7;
}
.carousel-caption {
  top: 50%;
  transform: translateY(-50%);
}

.slider-content h3 {
  display: inline-block;
  font-size: 30px;
  color: #fefefe;
  padding: 16px 15px 11px 12px;
  text-transform: uppercase;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  opacity: 0;
  transform: translateY(-25px);
  -webkit-transform: translateY(-25px);
  -ms-transform: translateY(-25px);
}
.slider-content h2 {
  font-size: 50px;
  line-height: 72px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  padding-top: 15px;
  margin-bottom: 0;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  opacity: 0;
  /* transform: translateY(-15px);
      -webkit-transform: translateY(-15px);
      -ms-transform: translateY(-15px); */
  letter-spacing: -6px;
}
.slider-content p {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  opacity: 0;
  transform: translateY(-15px);
  -webkit-transform: translateY(-15px);
  -ms-transform: translateY(-15px);
}
.btn-default {
  color: #fff;
  background: #53a92c;
  padding: 15px 30px;
  border: 0;
  margin: 25px 16px 0 0;
  /* animation-delay: 2s;
    -webkit-animation-delay: 2s; */
  animation-duration: 2s;
  text-transform: uppercase;
}
.btn-default:hover {
  color: #53a92c !important;
  background: #fff;
  animation-name: bounce;
  animation-timing-function: ease;
}
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0);
  }
}
.btn-default:before,
.btn-default:after,
.btn-default:before,
.btn-default:after {
  background: #ffffff;
}
.slider-btn {
  opacity: 0;
  transform: translateY(15px);
  -webkit-transform: translateY(15px);
  -ms-transform: translateY(15px);
}

.carousel-item.active .slider-content h3,
.carousel-item.active .slider-content p,
.carousel-item.active .slider-content .slider-btn {
  opacity: 1;
  -webkit-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
}
.carousel-item.active .slider-content h2 {
  opacity: 1;
  letter-spacing: 1px;
}

.carousel-item.active .slider-content h3 {
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}
.carousel-item.active .slider-content h2 {
  -webkit-transition-delay: 0.8s;
  transition-delay: 0.8s;
}
.carousel-item.active .slider-content p {
  -webkit-transition-delay: 0.9s;
  transition-delay: 0.9s;
}
.carousel-item.active .slider-content .slider-btn {
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  -webkit-transition-delay: 1s;
  transition-delay: 1s;
}

.carousel-control {
  width: 0;
  opacity: 1;
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  font-size: 24px;
  line-height: 52px;
  background: #53a92c;
  z-index: 3;
  text-align: center;
}
.carousel-control:focus,
.carousel-control:hover {
  background: #97b182;
}

.flexBox {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.resize-img-home {
  width: 500px;
  height: 500px;
}
.vertical-line {
  border-left: 3px solid #71af34;
  padding-left: 10px;
}
@media only screen and (max-width: 600px) {
  .resize-img-home {
    width: 350px !important;
    height: auto !important;
  }
  .margin-top-home {
    margin-top: 20px;
  }
  .card-achievement {
    margin-top: 10px;
  }
  .description-right {
    width: 100%;
    margin: auto;
    padding: 10px;
    margin-top: 50px;
  }
}

.card-achievement {
  box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
  height: 200px !important;
}
/* .achievement {
    background-image: url("https://static.wixstatic.com/media/88ae06_8fef32a86ca0412b907ce44763f369e5~mv2.jpg/v1/fill/w_1195,h_952,al_c,q_85,enc_auto/88ae06_8fef32a86ca0412b907ce44763f369e5~mv2.jpg");
    width: 1519px;
    height: 781px;
    object-fit: cover;
    object-position: 50% 50%;
  } */
.visit {
  background: #71af34;
}
.description-right {
  width: 50%;
  padding: 10px;
}
.description-img-right {
  position: absolute;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 80px;
}
.resize-img-partner {
  margin: auto;
  padding: 10px;
  width: 50%;
}
</style>
