<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="about-what-we-do">
        <div class="text-center">
          <h1><b>Partners</b></h1>
        </div>
        <!-- looping itmes -->
        <div class="row mt-5 mt-lg-10">
          <div
            class="col-xs-12 col-sm-6 col-md-4"
            v-for="item in items"
            :key="item.id"
          >
            <div class="image-flip">
              <div class="mainflip flip-0">
                <div class="frontside">
                  <div class="card">
                    <div class="card-body text-center">
                      <p>
                        <img
                          class=" img-fluid"
                          :src="item.file_logo.url"
                          alt="card image"
                        />
                      </p>
                      <h4 class="card-title">{{ item.company_name }}</h4>
                    </div>
                  </div>
                </div>
                <div class="backside">
                  <div class="card">
                    <div class="card-body text-center mt-4">
                      <h4
                        class="card-title
                      "
                      >
                        {{ item.company_name }}
                      </h4>
                      <p class="card-text">
                        {{ item.description }}
                      </p>
                      <ul class="list-inline">
                        <!-- <li class="list-inline-item">
                          <a
                            class="social-icon text-xs-center"
                            :href="item.address"
                            target="_blank"
                          >
                            <i class="ri-map-pin-line"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            class="social-icon text-xs-center"
                            :href="item.email"
                            target="_blank"
                            ><i class="ri-mail-line"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            class="social-icon text-xs-center"
                            :href="item.phone"
                            target="_blank"
                            ><i class="ri-phone-line"></i>
                          </a>
                        </li> -->
                        <li class="list-inline-item">
                          <a
                            class="social-icon text-xs-center"
                            :href="item.website"
                            target="_blank"
                            ><i class="ri-global-line"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            class="social-icon text-xs-center"
                            :href="item.link_blog"
                            target="_blank"
                            ><i class="ri-send-plane-line"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "About-Partners",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      items : [],
    };
  },
  methods: {
    async getPartners() {
      await this.$_api.get("public/partners").then(res => {
        console.log("res", res)
        this.items = res.data;
      });
    }
  },
  mounted() {
    this.getPartners();
  }
};
</script>

<style scoped>
.btn-primary:hover,
.btn-primary:focus {
  background-color: #108d6f;
  border-color: #108d6f;
  box-shadow: none;
  outline: none;
}

.btn-primary {
  color: #fff;
  background-color: #007b5e;
  border-color: #007b5e;
}

section {
  padding: 60px 0;
}

section .section-title {
  text-align: center;
  color: #007b5e;
  margin-bottom: 50px;
  text-transform: uppercase;
}

#team .card {
  border: none;
  background: #ffffff;
}

.image-flip:hover .backside,
.image-flip.hover .backside {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
  border-radius: 0.25rem;
}

.image-flip:hover .frontside,
.image-flip.hover .frontside {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.mainflip {
  -webkit-transition: 1s;
  -webkit-transform-style: preserve-3d;
  -ms-transition: 1s;
  -moz-transition: 1s;
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transition: 1s;
  transform-style: preserve-3d;
  position: relative;
}

.frontside {
  position: relative;
  -webkit-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  z-index: 2;
  margin-bottom: 30px;
}

.backside {
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.frontside,
.backside {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 1s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 1s;
  -moz-transform-style: preserve-3d;
  -o-transition: 1s;
  -o-transform-style: preserve-3d;
  -ms-transition: 1s;
  -ms-transform-style: preserve-3d;
  transition: 1s;
  transform-style: preserve-3d;
}

.frontside .card,
.backside .card {
  min-height: 312px;
}

.backside .card a {
  font-size: 18px;
  color: #007b5e !important;
}

.frontside .card .card-title,
.backside .card .card-title {
  color: #007b5e !important;
}

.frontside .card .card-body img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
/* box shadow card */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}
</style>
