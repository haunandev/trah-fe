<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="about-what-we-do">
        <div class="mt-10 text-center">
          <h1><b>Annual Report</b></h1>
        </div>
        <div class="mt-5 mt-lg-10 ">
          <div class="row">
            <div class="col-md-3" v-for="item in items" :key="item.id">
              <div class="card-sl">
                <div class="card-image">
                  <img :src="item.file_cover_annual_reports" />
                </div>

                <div class="card-heading">
                  {{ item.title }}
                </div>
                <div class="card-text">
                  {{ item.descriptions }}
                </div>
                <a
                  :href="item.file_annual_reports"
                  target="_blank"
                  class="card-button"
                >
                  Download</a
                >
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
  name: "About-Anual-Report",
  components: {
    Navbar,
    Footer
  },
  data(){
    return {
    items : [],
    }
  },
  methods: {
    // get data annual reports
    async getDataAnnualReports(){
      this.$_api.get('public/annual-reports').then((response) => {
        this.items = response.data
      })
    }
  },
  mounted() {
    this.getDataAnnualReports()
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

/* Card Styles */

.card-sl {
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-image img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px 8px 0px 0;
}

.card-action {
  position: relative;
  float: right;
  margin-top: -25px;
  margin-right: 20px;
  z-index: 2;
  color: #e26d5c;
  background: #fff;
  border-radius: 100%;
  padding: 15px;
  font-size: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
}

.card-action:hover {
  color: #fff;
  background: #e26d5c;
  -webkit-animation: pulse 1.5s infinite;
}

.card-heading {
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  padding: 10px 15px;
}

.card-text {
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  color: #636262;
}

.card-button {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  background-color: #1f487e;
  color: #fff;
  border-radius: 0 0 8px 8px;
}

.card-button:hover {
  text-decoration: none;
  background-color: #1d3461;
  color: #fff;
}

@-webkit-keyframes pulse {
  0% {
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  70% {
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
  }

  100% {
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
  }
}
</style>
