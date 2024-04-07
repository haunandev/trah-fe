<template>
  <div class="bg-white">
    <Navbar />

    <b-container fluid="lg">
      <section class="map-location-capacity">
        <div class="mt-10 text-center">
          <h1><strong>Location & Capacity</strong></h1>
        </div>
        <div class="mt-10 mt-lg-10">
          <b-card>
            <b-row>
              <b-col md="3" lg="3" sm="12">
                <label class="mb-2 p-2"><strong>Year</strong></label>
                <div class="text-center">
                  <b-form-select
                    id="input-3"
                    v-model="year"
                    :options="yearOptions"
                    required
                  ></b-form-select>
                </div>
              </b-col>
              <b-col md="3" lg="3" sm="12">
                <label class="mb-2 p-2"><strong>Province</strong></label>
                <div class="text-center">
                  <b-form-select
                    id="input-3"
                    v-model="selectProvince"
                    @change="getDataUnitManagement($event)"
                    required
                  >
                    <option value="" disabled>Select Province</option>
                    <option
                      v-for="province in provinces"
                      :key="province.id"
                      :value="province.province_code"
                    >
                      {{ province.province_name }}
                    </option>
                  </b-form-select>
                </div>
              </b-col>
              <b-col md="3" lg="3" sm="12">
                <label class="mb-2 p-2"><strong>Unit Management</strong></label>
                <div class="text-center">
                  <b-form-select
                    id="input-3"
                    v-model="selectUnitManagement"
                    @change="getDataVillage($event)"
                    required
                  >
                    <option value="" disabled>Select Unit Management</option>
                    <option
                      v-for="unit in unitManagements"
                      :value="unit.mu_no"
                      :key="unit.mu_no"
                    >
                      {{ unit.unit_management_name }}
                    </option>
                  </b-form-select>
                </div>
              </b-col>
              <b-col md="3" lg="3" sm="12">
                <label class="mb-2 p-2"><strong>Village</strong></label>
                <div class="text-center">
                  <b-form-select
                    id="input-3"
                    v-model="selectUnitManagement"
                    @change="getDataVillage($event)"
                    required
                  >
                    <option value="" disabled>Select Village</option>
                    <option
                      v-for="village in villages"
                      :value="village.village_code"
                      :key="village.village_no"
                    >
                      {{ village.village_name }}
                    </option>
                  </b-form-select>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>

        <div class="map-container mt-10 mt-lg-10">
          <b-card>
            <div id="containerMap"></div>
          </b-card>
        </div>
      </section>

      <section class="nursery-location-capacity">
        <div class="mt-10 text-center">
          <h1><strong>Nursery</strong></h1>
        </div>
        <b-card class="mt-2 mt-lg-10">
          <div id="map"></div>
        </b-card>
      </section>

      <section class="number-nursery-location-capacity">
        <div class="row">
          <div
            class="col-lg-3 col-md-6 col-sm-12 mt-5"
            v-for="(cd, i) in cardData"
            :key="'cd-' + i"
          >
            <div class="card card-custom pl-5 pr-5 py-4">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex flex-column text-dark">
                  <span class="font-weight-bold font-size-sm">{{
                    cd.label
                  }}</span>
                  <span
                    class="font-weight-bolder"
                    :style="`color: ${cd.color}; font-size: 2.3rem`"
                  >
                    {{ cd.value }}</span
                  >
                </div>
                <span
                  class="d-flex flex-column justify-content-center align-items-center "
                  :style="
                    `background-color: ${cd.background}; border-radius: 8px; width: 70px; height: 70px;`
                  "
                >
                  <i
                    :style="'color: ' + cd.color"
                    class=" icon-3x font-weight-bold"
                    :class="{ [cd.icon]: true }"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="team-location-capacity mt-5 mt-lg-10">
        <h2 class="font-weight-bold mb-2">Our Team</h2>
        <h6
          class="mt-lg-4 mt-5 mb-4 font-weight-bold"
          v-for="(item, index) in teams"
          :key="index"
        >
          {{ index }}
          <div class="row pb-5 mb-4">
            <div
              class="col-lg-3 col-md-6 mb-4 mb-lg-0"
              v-for="(itemTeam, indexTeam) in item"
              :key="indexTeam"
            >
              <div class="card shadow-sm border-0 rounded">
                <div class="card-body p-0">
                  <img
                    :src="itemTeam.file_team"
                    :alt="itemTeam.data.name"
                    class="w-100 card-img-top img-fluid"
                  />
                  <div class="p-4">
                    <h5 class="mb-0">{{ itemTeam.data.name }}</h5>
                    <p class="small text-muted">
                      {{ itemTeam.data.category_team_name }} -
                      {{ itemTeam.data.job }}
                    </p>
                    <ul class="social mb-0 list-inline mt-3">
                      <li class="list-inline-item m-0">
                        <a href="#" class="social-link"
                          ><i class="fa fa-facebook-f"></i
                        ></a>
                      </li>
                      <li class="list-inline-item m-0">
                        <a href="#" class="social-link"
                          ><i class="fa fa-twitter"></i
                        ></a>
                      </li>
                      <li class="list-inline-item m-0">
                        <a href="#" class="social-link"
                          ><i class="fa fa-instagram"></i
                        ></a>
                      </li>
                      <li class="list-inline-item m-0">
                        <a href="#" class="social-link"
                          ><i class="fa fa-linkedin"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </h6>

        <div class="row pb-5 mb-4">
          <!-- <div
            class="col-lg-3 col-md-6 mb-4 mb-lg-0"
            v-for="(item, index) in teams"
            :key="index"
          >
            <div class="card shadow-sm border-0 rounded">
              <div class="card-body p-0">
                <img
                  :src="item.file_team.url"
                  :alt="item.file_team.filename"
                  class="w-100 card-img-top img-fluid"
                />
                <div class="p-4">
                  <h5 class="mb-0">{{ item.name }}</h5>
                  <p class="small text-muted">
                    {{ item.rel_category_team_id }} - {{ item.job }}
                  </p>
                  <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item m-0">
                      <a href="#" class="social-link"
                        ><i class="fa fa-facebook-f"></i
                      ></a>
                    </li>
                    <li class="list-inline-item m-0">
                      <a href="#" class="social-link"
                        ><i class="fa fa-twitter"></i
                      ></a>
                    </li>
                    <li class="list-inline-item m-0">
                      <a href="#" class="social-link"
                        ><i class="fa fa-instagram"></i
                      ></a>
                    </li>
                    <li class="list-inline-item m-0">
                      <a href="#" class="social-link"
                        ><i class="fa fa-linkedin"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
import _config from "@/config.js";

export default {
  components: {
    Navbar,
    Footer
  },
  name: "About-LocationCapacity",
  data() {
        return {
            year : new Date().getFullYear(),
            yearOptions: [],
            provinces: [],
            selectProvince: "",
            unitManagements: [],
            selectUnitManagement: "",
            villages: [],
            selectVillage: "",
            trees: [],
            cardData: [
        {
          label: 'Pati Nursery',
          color: '#218AEC',
          icon: 'ri-collage-line',
          value: '350.000',
          background: '#DEEDFC'
        },

        {
          label: 'Kebumen Nursery',
          color: '#218AEC',
          icon: 'ri-seedling-line',
          value: '210.000',
          background: '#DEEDFC'
        },
        {
          label: 'Arjasari Nursery',
          color: '#218AEC',
          icon: 'ri-seedling-line',
          value: '2.300.000',
          background: '#DEEDFC'
        },
        {
          label: 'Ciminyak Nursery',
          color: '#6E9A34',
          icon: 'ri-empathize-line',
          value: '2.300.000',
          background: '#ebffe7'
        }
      ],
      teams : [],
      categoryTeams : []
      }
    },
    methods: {
        // generate year options
       generateYearOptions() {
            let currentYear = 2019;
            for (let i = 0; i < 10; i++) {
                this.yearOptions.push(currentYear + i);
            }
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
        async getDataTeam(){
            await this.$_api.get("/public/team").then(response => {
                this.teams = response;
                console.log("this.teams", this.teams);
            });
        },
        // leaflet init
        async initMap() {
          document.getElementById("containerMap").innerHTML =
          " <div id='map-leaflet' style='height: 400px'></div>";
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

          var map = L.map("map-leaflet", {
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

      // mapbox init
      async initMapbox() {
        mapboxgl.accessToken = _config.mapbox.token;
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v12",
          center: [110.424604, -7.02034],
          zoom: 7
        });

        // marker with popup
        const marker = new mapboxgl.Marker()
          .setLngLat([110.424604, -7.02034])
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>Popup</h3><p>This is a popup.</p>"
            );
        marker.setPopup(popup);


      },

      async getDataCategoryTeams(){
        await this.$_api.get("/public/category-team").then(response => {
            this.categoryTeams = response.data;
            console.log("this.categoryTeams", this.categoryTeams);
        });
      }

    },
    mounted() {
        this.generateYearOptions();
        this.getDataProvince();
        this.initMap();
        this.initMapbox();
        this.getDataTeam();
        this.getDataCategoryTeams();
    },
};
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
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
