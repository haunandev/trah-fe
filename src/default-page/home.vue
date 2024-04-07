<template>
  <div class="bg-white">
    <Navbar />
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
              class="img-fluid img-slider slider-custom-img"
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
    <section class="benefit home-section ">
      <b-container fluid="lg">
        <b-row>
          <b-col md="6" lg="6" sm="12" class="text-left">
            <div class="d-inline flex p-2">
              <h1 class="benefit-title">Plant a Tree! It's Easy...</h1>
              <h3 class="benefit-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h3>
              <div class="vertical-line">
                <p class="benefit-description">
                  Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                  sem. Pellentesque in ipsum id orci porta dapibus. Vivamus
                  magna justo, lacinia eget consectetur sed, convallis at
                  tellus. Nulla porttitor accumsan tincidunt. Nulla quis lorem
                  ut libero malesuada feugiat. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div>
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
          </b-col>
          <b-col md="6" lg="6" sm="12" class="text-center benefit-image">
            <img
              src="@/assets/images/lamp-t4t.jpg"
              class="img-fluid"
              alt="benefit-image"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="why-should-plant-wiht-us">
      <div class="section-header">
        <h2>Why Should Plant With Us?</h2>
        <p class="why-should-plant-description">
          Trees4Trees™ is a non-profit foundation focused on renewing the
          environment and empowering local communities through reforestation and
          education. We are an organization engaged in "Tree Planting"
          activities, therefore you can "Donate Trees". We also join in
          "Community Forestry | Reforestation" to keep the earth together so
          that it remains sustainable.
        </p>
      </div>

      <b-container fluid="lg">
        <b-row>
          <b-col md="3" lg="3" sm="12">
            <div class="working-items">
              <div class="working-icon">
                <i class="flaticon-businesswoman"></i>
              </div>
              <div class="working-content">
                <h4><a href="#">Community Forestry</a></h4>
                <p>
                  Credibly utcost efective an expertise and web enabled proces
                  that improvements Completely seamless channels
                </p>
                <a href="#"
                  >read more<i
                    class="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i
                ></a>
              </div>
            </div>
          </b-col>
          <b-col md="3" lg="3" sm="12">
            <div class="working-items">
              <div class="working-icon">
                <i class="flaticon-customer"></i>
              </div>
              <div class="working-content">
                <h4><a href="#">Individuals</a></h4>
                <p>
                  Credibly utcost efective an expertise and web enabled proces
                  that improvements Completely seamless channels
                </p>
                <a href="#"
                  >read more<i
                    class="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i
                ></a>
              </div>
            </div>
          </b-col>
          <b-col md="3" lg="3" sm="12">
            <div class="working-items">
              <div class="working-icon">
                <i class="flaticon-business"></i>
              </div>
              <div class="working-content">
                <h4><a href="#">Companies</a></h4>
                <p>
                  Credibly utcost efective an expertise and web enabled proces
                  that improvements Completely seamless channels
                </p>
                <a href="#"
                  >read more<i
                    class="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i
                ></a>
              </div>
            </div>
          </b-col>
          <b-col md="3" lg="3" sm="12">
            <div class="working-items">
              <div class="working-icon">
                <i class="flaticon-layer"></i>
              </div>
              <div class="working-content">
                <h4><a href="#">Education</a></h4>
                <p>
                  Credibly utcost efective an expertise and web enabled proces
                  that improvements Completely seamless channels
                </p>
                <a href="#"
                  >read more<i
                    class="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i
                ></a>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <!-- description -->
    </section>
    <section class="why-trees">
      <b-container fluid="lg">
        <b-row>
          <b-col md="6" lg="6" sm="12" class="text-center">
            <img
              src="@/assets/images/trees.jpg"
              class="img-fluid w-100 why-trees-image"
              alt="why-trees-image"
            />
          </b-col>
          <b-col md="6" lg="6" sm="12" class="text-left">
            <div class="d-inline flex p-2">
              <h1 class="benefit-title">Why Trees ??</h1>
              <h3 class="benefit-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h3>
              <div>
                <p class="benefit-description">
                  Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                  sem. Pellentesque in ipsum id orci porta dapibus. Vivamus
                  magna justo, lacinia eget consectetur sed, convallis at
                  tellus. Nulla porttitor accumsan tincidunt. Nulla quis lorem
                  ut libero malesuada feugiat. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="sdgs-what-we-do mt-2 mt-lg-10">
      <div class="text-center section-header-sdgs">
        <h1 class="font-weight-bold mb-0">
          <strong>Sustainable Development Goals (SDGs) </strong>
        </h1>
        <p class="font-italic text-muted mb-4">
          T4T applies 9 UN Sustainable Development Goals (SDGs) in the green
          activities for future forest restoration projects:
        </p>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs settings">
              <div class="icon">
                <img src="https://i.imgur.com/6NKPrhO.png" />
              </div>
              <h4>No Poverty</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs speedup">
              <div class="icon">
                <img src="https://i.imgur.com/KMbnpFF.png" />
              </div>
              <h4>Zero Hunger</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs privacy">
              <div class="icon">
                <img src="https://i.imgur.com/AgyneKA.png" />
              </div>
              <h4>Clean Water and Sanitation</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs backups">
              <div class="icon">
                <img src="https://i.imgur.com/vdH9LKi.png" />
              </div>
              <h4>Decent work and economic growth</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs ssl">
              <div class="icon">
                <img src="https://i.imgur.com/v6OnUqu.png" />
              </div>
              <h4>Reduced inequalities</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs database">
              <div class="icon">
                <img src="https://i.imgur.com/VzjZw9M.png" />
              </div>
              <h4>Responsible consumption and production</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs backups">
              <div class="icon">
                <img src="https://i.imgur.com/vdH9LKi.png" />
              </div>
              <h4>Climate Action</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs ssl">
              <div class="icon">
                <img src="https://i.imgur.com/v6OnUqu.png" />
              </div>
              <h4>Life on land</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="sdgs database">
              <div class="icon">
                <img src="https://i.imgur.com/VzjZw9M.png" />
              </div>
              <h4>Partnerships (for the goals)</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-divider-img mt-5">
      <div class="overlay-bg-divider">
        <div class="quotes-tree">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="quotes-tree-content">
                  <div class="quotes-tree-text">
                    <h2>
                      “We are the first generation to feel the impact of climate
                      change and the last generation that can do something about
                      it.”
                      <br />
                      <span class="quotes-tree-author"> Barack Obama</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="see-our-tree mt-5">
      <div class="section-header">
        <h2>See Our Tree</h2>
        <p>
          Professionally mesh enterprise wide imperatives without world class
          paradigms.Dynamically deliver ubiquitous leadership awesome skills.
        </p>
      </div>
      <b-container fluid="lg">
        <div class="year">
          <b-form-group label="Select Year:" v-slot="{ ariaDescribedby }">
            <b-form-select
              id="select-1"
              v-model="yearTreeMaps"
              :options="year"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            ></b-form-select>
          </b-form-group>
        </div>

        <div id="map" style="width:100%;height: 500px;"></div>
      </b-container>
    </section>
    <section class="our-growers mt-5">
      <b-container>
        <div class="section-header">
          <h2>Photo Our Growers</h2>
          <p>
            Professionally mesh enterprise wide imperatives without world class
            paradigms.Dynamically deliver ubiquitous leadership awesome skills.
          </p>
        </div>
        <div class="image-gallery">
          <div class="column" v-for="(item, index) in itemGrowers" :key="index">
            <div
              class="image-item"
              v-for="(itemChild, indexChild) in item"
              :key="indexChild"
            >
              <img :src="itemChild.img" alt="" />
              <div class="overlay-gallery">
                <span>{{ itemChild.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="navigate">
          <router-link :to="{ name: 'About-OurGrowers' }"
            >See All Our Growers</router-link
          >
        </div>
      </b-container>
    </section>
    <section class="partners mt-5">
      <div class="section-header">
        <h2>Our Partners</h2>
        <p>
          Professionally mesh enterprise wide imperatives without world class
          paradigms.Dynamically deliver ubiquitous leadership awesome skills.
        </p>
      </div>
      <b-container fluid="lg">
        <div style="width:100%;margin:20px auto;height:400px">
          <slider ref="slider" :options="options">
            <slideritem
              v-for="(item, index) in partners"
              :key="index"
              :style="item.style"
              >{{ item.html }}</slideritem
            >
            <div slot="loading">loading...</div>
          </slider>
          <div class="navigate">
            <router-link :to="{ name: 'About-Partners' }"
              >See All Our Partners</router-link
            >
          </div>
        </div>
      </b-container>
    </section>
    <section class="stories mt-5">
      <div class="section-header">
        <h2>Stories</h2>
        <p>
          Professionally mesh enterprise wide imperatives without world class
          paradigms.Dynamically deliver ubiquitous leadership awesome skills.
        </p>
      </div>
      <b-container fluid="lg">
        <b-row>
          <b-col md="6" lg="6" sm="12">
            <div class="section-header-stories">
              <h2>Article</h2>
            </div>
            <div class="contain-article-stories">
              <b-row
                v-for="(item, index) in itemLastArticle"
                :key="index"
                class="mb-2"
              >
                <b-col md="4" lg="4" sm="12">
                  <img
                    :src="item.file_article.url"
                    class="img-fluid img-article"
                    alt="Image"
                  />
                </b-col>
                <b-col md="8" lg="8" sm="12" class="description-article">
                  <div class="description-article">
                    <h4>{{ item.title }}</h4>
                    <p class="text-truncate">
                      {{ item.meta_description }}
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col md="6" lg="6" sm="12">
            <div class="section-header-stories">
              <h2>News</h2>
            </div>
            <div class="contain-article-stories">
              <b-row
                v-for="(item, index) in itemLastNews"
                :key="index"
                class="mb-2"
              >
                <b-col md="4" lg="4" sm="12">
                  <img
                    :src="item.file_our_stories.url"
                    class="img-fluid img-news"
                    alt="Image"
                  />
                </b-col>
                <b-col md="8" lg="8" sm="12" class="description-news">
                  <div class="description-article">
                    <h4>{{ item.title }}</h4>
                    <p class="text-truncate">
                      {{ item.description }}
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- modal zoomImg -->
    <b-modal
      id="modal-zoom"
      ref="modal-zoom"
      title="Zoom Image"
      hide-footer
      hide-header
    >
      <div class="modal-zoom">
        <img :src="zoomImg" class="img-fluid" alt="Image" />
      </div>
    </b-modal>

    <Footer />
  </div>
</template>
<script>
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";

import { slider, slideritem } from "vue-concise-slider";
import _config from "@/config.js";

export default {
  components: {
    Navbar,
    Footer,
    slider,
    slideritem
  },
  name: "home",
  data() {
    return {
      slide: 0,
      sliding: null,
      banners: [],
      year: [],
      dataMaps: [],
      yearTreeMaps: [],
      partners: [],
      options: {
        currentPage: 0,
        tracking: false,
        thresholdDistance: 100,
        thresholdTime: 300,
        infinite: 4,
        slidesToScroll: 4,
        loop: true
      },
      zoomImg: false,
      itemGrowers: [
        [
          {
            img: "https://source.unsplash.com/VWcPlbHglYc",
            title: "Image 1"
          },
          {
            img: "https://source.unsplash.com/e6FMMambeO4",
            title: "Image 2"
          },
          {
            img: "https://source.unsplash.com/klCiPmzUw0Y",
            title: "Image 3"
          }
        ],
        [
          {
            img: "https://source.unsplash.com/O0N9MF--hK4",
            title: "Image 4"
          },
          {
            img: "https://source.unsplash.com/FV3GConVSss",
            title: "Image 5"
          },
          {
            img: "https://source.unsplash.com/0ESjL-Nw22Y",
            title: "Image 6"
          },
          {
            img: "https://source.unsplash.com/KTVn62x6fFw",
            title: "Image 7"
          }
        ],
        [
          {
            img: "https://source.unsplash.com/VSeVhmW4_JQ",
            title: "Image 8"
          },
          {
            img: "https://source.unsplash.com/07aFaTf24Kg",
            title: "Image 9"
          },
          {
            img: "https://source.unsplash.com/DqyYTM7pR2o",
            title: "Image 10"
          },
          {
            img: "https://source.unsplash.com/IdNOTjPeHrE",
            title: "Image 11"
          }
        ]
      ],
      itemLastArticle: [],
      itemLastNews: []
    };
  },
  methods: {
    zoomImage(e) {
      // parsing in modal zoom
      // show modal zoom
      this.$refs["modal-zoom"].show();
      this.zoomImg = e;
    },
    goToWin() {
      let route = this.$router.resolve({
        name: "win-apps",
        params: { win_id: "1101101" }
      });
      window.open(route.href, "_blank");
    },
    theFormat(number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    // get data banner
    async getDataBanner() {
      await this.$_api.get("/public/banner").then(response => {
        this.banners = response.data;
      });
    },
    // generate year
    generateYear() {
      let year = new Date().getFullYear();
      for (let i = 0; i < 10; i++) {
        this.year.push(year - i);
      }
    },
    // init map
    initMap() {
      // http://trees4trees.org/old/maps/embed/sot_wincheck_json.php?pid=MF091
      this.$_api.get("/public/sot").then(response => {
        this.tempDataMaps = response.wincheck;
        this.tempDataMaps.forEach(data => {
          let coordinates = [data.longitude, data.latitude];
          let obj = {
            type: "Feature",
            properties: {
              farmer: data.farmer,
              total_trees: data.total_trees,
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
        mapboxgl.accessToken = _config.mapbox.token;
        var map = new mapboxgl.Map({
          container: "map",
          style: _config.mapbox.mapStyle,
          center: [106.816666, -6.2],
          zoom: 6
        });
        map.addControl(new mapboxgl.NavigationControl());

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
    // GET DATA PARTNERS
    async getDataPartners() {
      await this.$_api.get("/public/partners").then(response => {
        response.data.forEach((item, index) => {
          this.partners.push({
            // html: item.company_name,
            style: {
              "background-image": `url(${item.file_logo.url})`,
              "background-repeat": "no-repeat",
              "background-position": "center center",
              width: "500px"
            }
          });
        });
      });
    },
    // GET DATA ARTICLES LAST
    async getDataArticlesLast() {
      await this.$_api
        .get("/public/article", {
          limit: 5
        })
        .then(response => {
          if (response.data.length > 0) {
            this.itemLastArticle = response.data;
          } else {
            this.itemLastArticle = [
              {
                title: "Article Title",
                meta_description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquet, nunc nisl condimentum nunc, ut tincidunt ante nunc sit amet mauris. Sed euismod, nunc ut aliquam aliquet, nunc nisl condimentum nunc, ut tincidunt ante nunc sit amet mauris.",
                file_article: {
                  url:
                    "https://fastly.picsum.photos/id/428/300/200.jpg?hmac=ikKOcamKDMicSZKD7eMbhzgMNNbyCucuLohsjaMt740"
                }
              }
            ];
          }
        });
    },
    // GET DATA OUT STORIES NEWS
    async getDataNewsLast() {
      await this.$_api
        .get("/public/our-stories", {
          our_stories_category_id: 1
        })
        .then(response => {
          if (response.data.length > 0) {
            this.itemLastNews = response.data;
          } else {
            this.itemLastNews = [
              {
                title: "News Title",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquet, nunc nisl condimentum nunc, ut tincidunt ante nunc sit amet mauris. Sed euismod, nunc ut aliquam aliquet, nunc nisl condimentum nunc, ut tincidunt ante nunc sit amet mauris.",
                file_our_stories: {
                  url:
                    "https://fastly.picsum.photos/id/428/300/200.jpg?hmac=ikKOcamKDMicSZKD7eMbhzgMNNbyCucuLohsjaMt740"
                }
              }
            ];
          }
        });
    }
  },
  mounted() {
    this.getDataBanner();
    this.generateYear();
    this.initMap();
    this.getDataPartners();
    this.getDataArticlesLast();
    this.getDataNewsLast();
  }
};
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .bg-count2-section {
    /* background display none */
    background: none !important;
  }
  .count-overlay {
    background: none !important;
  }
  .number-count {
    font-size: 30px !important;
    color: #000 !important;
    font-weight: 700 !important;
    margin-top: 10px !important;
  }
  .description-impact {
    font-size: 20px !important;
    color: #000 !important;
    font-weight: 400 !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  .bg-servicesstyle2-section {
    margin-top: 160px;
  }
  .see-our-tree {
    margin-top: -88px !important;
  }
  .bg-divider-img {
    display: none;
  }
  .img-article {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .description-article {
    font-size: 14px;
    margin-top: 10px;
  }
  .img-news {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .description-news {
    font-size: 14px;
    margin-top: 10px;
  }
  .slider-content {
    display: none;
  }
  .benefit {
    padding: 20px 0px !important;
    margin-top: 20px !important;
  }
  .benefit-title {
    font-size: 30px;
  }
  .benefit-subtitle {
    font-size: 16px;
  }
  .benefit-description {
    font-size: 14px;
  }
  .benefit-image {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .why-should-plant-description {
    font-size: 16px !important;
    font-weight: 400 !important;
    color: #000000 !important;
    margin-bottom: 20px !important;
    line-height: 2 !important;
    text-align: justify;
    padding: 10px;
  }
}
.why-trees-image {
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.why-trees-image:hover {
  transform: scale(1.1);
  transition: all 0.5s ease;
}
.why-should-plant-description {
  font-size: 14px;
  margin-top: 10px;
}
.slider-custom-img {
  object-fit: cover;
  max-height: 700px;
  width: 100% !important;
}
.working-items {
  text-align: center;
  border: 1px solid #f0f0f0;
  padding: 30px 30px 28px 30px;
  margin-bottom: 30px;
}
.working-icon {
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-radius: 100%;
  margin: 0 auto;
}
.working-icon [class^="flaticon-"]:before,
.working-icon [class*=" flaticon-"]:before,
.working-icon [class^="flaticon-"]:after,
.working-icon [class*=" flaticon-"]:after {
  margin-left: 0;
  font-size: 40px;
}
.working-content {
}
.working-content h4 a {
  display: inline-block;
  padding: 30px 0 6px 0;
}
.working-content > a {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  padding-top: 18px;
}
.working-content > a .fa {
  padding-left: 4px;
}

.working-container .swiper-slide {
  padding: 3px;
}
.working-items:hover .working-icon {
  background: #53a92c;
  border: 1px solid #53a92c;
}
.working-items:hover {
  box-shadow: 1px 0px 14px 1px #ebebeb;
}
.working-items:hover .working-icon [class^="flaticon-"]:before,
.working-items:hover .working-icon [class*=" flaticon-"]:before,
.working-items:hover .working-icon [class^="flaticon-"]:after,
.working-items:hover .working-icon [class*=" flaticon-"]:after {
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: scale(1.06, 1.06);
  transform: scale(1.06, 1.06);
  color: #fff;
}
.working-items:hover .working-content h4 a,
.working-items:hover .working-content > a {
  color: #53a92c;
}

/* sdgs */
.section-header-sdgs {
  margin-top: 75px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  padding: 0 60px;
  text-align: center;
  background-color: #f7f7f7;
  transition: all 0.4s ease-in-out;
}
.section-header-sdgs h1 strong {
  font-size: 36px;
  font-weight: 900;
  color: #000;
  margin-bottom: 10px;
}
.section-header-sdgs p {
  font-size: 14px;
  color: #000;
  margin-bottom: 0;
}
.box {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.sdgs {
  margin-top: 75px;
  padding-bottom: 30px;
  padding: 0 60px;
  min-height: 198px;
  text-align: center;
  background-color: #f7f7f7;
  transition: all 0.4s ease-in-out;
}

.sdgs .icon {
  margin-bottom: -21px;
  transform: translateY(-50%);
  text-align: center;
}

.sdgs:hover h4,
.sdgs:hover p {
  color: #000;
}

.speedup:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #fb0054 0%, #f55b2a 100%);
  border-radius: 10px;
}

.settings:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #34b5bf 0%, #210c59 100%);
  border-radius: 10px;
}

.privacy:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%);
  border-radius: 10px;
}

.backups:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #fc6a0e 0%, #fdb642 100%);
  border-radius: 10px;
}

.ssl:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #8d40fb 0%, #5a57fb 100%);
  border-radius: 10px;
}

.database:hover {
  box-shadow: 0 0 25px 0 rgba(20, 27, 201, 0.05);
  cursor: pointer;
  background-image: linear-gradient(-45deg, #27b88d 0%, #22dd73 100%);
  border-radius: 10px;
}

.image-gallery {
  /* Mobile first */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image-gallery .column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image-item img {
  width: 100%;
  border-radius: 5px;
  height: 100%;
  object-fit: cover;
}

@media only screen and (min-width: 768px) {
  .image-gallery {
    flex-direction: row;
  }
}

/* overlay styles */

.image-item {
  position: relative;
  cursor: pointer;
}

.overlay-gallery {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(57, 57, 57, 0.502);
  top: 0;
  left: 0;
  transform: scale(0);
  transition: all 0.2s 0.1s ease-in-out;
  color: #fff;
  /* center overlay content */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* hover */
.image-item:hover .overlay-gallery {
  transform: scale(1);
}

.technology {
  margin-bottom: 60px;
}
.section-technology-right {
  padding: 95px 50px 85px;
}
.technology-btn {
  /* bounce */
  animation: bounce 2s infinite;
}
.section-header-technology h2 {
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
  color: #070707;
  line-height: 48px;
}
.section-description-technology h1 {
  font-size: 18px;
  font-weight: 400;
  color: #070707;
  line-height: 24px;
  margin-bottom: 20px;
}
.navigate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.navigate a {
  color: #000;
  font-size: 20px;
  margin: 0 10px;
  font-weight: 700;
  transform-origin: center;
  transition: all 0.3s ease;
  text-transform: uppercase;
}
.navigate a:hover {
  transform: scale(1.2);
}
.section-header-stories h2 {
  line-height: 48px;
  text-transform: uppercase;
  padding-bottom: 5px;
  font-size: 25px;
  color: #070707;
  font-weight: 700;
}
.bg-divider-img {
  background: url("~@/assets/images/divider.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 300px;
  background-position: center;
  background-attachment: fixed;
}
.overlay-bg-divider {
  background: rgb(36 36 36 / 90%);
  height: 300px;
}
.quotes-tree {
  position: relative;
  z-index: 1;
  padding: 100px 0;
}
.quotes-tree-content {
  position: relative;
  z-index: 1;
}
.quotes-tree-text {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-bottom: 30px;
}
.quotes-tree-text h2 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  line-height: 48px;
  text-transform: uppercase;
}
.quotes-tree-author {
  /* italic */
  font-style: italic;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
}
.icon-service {
  font-size: 50px;
  color: #53a92c;
}
.section-header {
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 110px 0 56px 0;
}
.section-header h3 {
  font-size: 36px;
  font-weight: 700;
  color: #53a92c;
}
.section-header h2 {
  line-height: 48px;
  text-transform: uppercase;
  padding-bottom: 5px;
  font-size: 36px;
  color: #070707;
  font-weight: 700;
}
.section-header p {
  font-size: 16px;
  font-weight: 400;
  color: #696969;
  line-height: 26px;
}

.bg-servicesstyle2-section {
  padding: 0 0 90px 0;
  background-color: #f7f7f7;
}

.our-services-box {
  border: 1px solid #f0f0f0;
  padding: 8px;
  margin-bottom: 30px;
}
.our-services-items {
  text-align: center;
  padding: 8px 22px 18px 22px;
  border: 1px solid transparent;
}
.our-services-content {
  padding-top: 4px;
}
.our-services-content h4 {
  padding-bottom: 8px;
}
.our-services-content > a {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  padding-top: 15px;
}
.our-services-content > a .fa {
  padding-left: 4px;
}
.our-services-box:hover {
  box-shadow: 1px 0px 14px 1px #ebebeb;
}
.our-services-box:hover .our-services-items {
  border: 1px solid #f0f0f0;
}
.our-services-box:hover [class^="flaticon-"]:before,
.our-services-box:hover [class*=" flaticon-"]:before,
.our-services-box:hover [class^="flaticon-"]:after,
.our-services-box:hover [class*=" flaticon-"]:after {
  -webkit-transform: scale(1.08, 1.08);
  transform: scale(1.08, 1.08);
}
.our-services-box:hover .our-services-content h4 a,
.our-services-box:hover .our-services-content > a {
  color: #53a92c;
}

.bg-count2-section {
  background: url("~@/assets/images/bg-counter2-img.jpg") no-repeat fixed;
  background-size: cover;
  background-position: 48% 100%;
  height: 300px;
}
.count-overlay {
  background: rgb(36 36 36 / 90%);
  height: 300px;
}

.benefit {
  padding: 50px 0px;
  margin-top: 50px;
}
.benefit-title {
  font-size: 50px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0px;
}
.benefit-subtitle {
  font-size: 20px;
  font-weight: 600;
  color: #53a92c;
  margin-bottom: 10px;
  margin-top: 6px;
}
.benefit-description {
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 20px;
  line-height: 2;
}
.benefit-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #080d15;
  opacity: -1.3;
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
  color: #fff !important;
  background: #53a92c !important;
  padding: 15px 30px !important;
  border: 0 !important;
  margin: 25px 16px 0 0 !important;
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

.vertical-line {
  border-left: 3px solid #71af34;
  padding-left: 10px;
}

.description-img-right {
  position: absolute;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 50px;
}
.resize-img-partner {
  margin: auto;
  padding: 10px;
  width: 50%;
}
</style>
