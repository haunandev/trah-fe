<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="about-faq">
        <div class="mt-10 text-center">
          <h1><b>FAQ</b></h1>
        </div>
        <div class="accordion-container">
          <!-- LOOPING ITEMS -->
          <div class="accordion" v-for="(item, index) in items" :key="index">
            <div class="card card-accordion">
              <div class="card-header" :id="'heading' + index">
                <span>{{ item.question }}</span>
                <a
                  v-b-toggle="'collapse' + index"
                  class="icon-btn"
                  data-toggle="collapse"
                ></a>
              </div>
              <b-collapse
                visible
                :id="'collapse' + index"
                class="collapse"
                :aria-labelledby="'heading' + index"
                data-parent="#accordion"
              >
                <div class="card-body">
                  {{ item.answer }}
                </div>
              </b-collapse>
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
  name: "About-Faq",
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
    // get data faq
    async getDataFaq () {
        this.$_api.get('public/faq').then((response) => {
          console.log("response",response)
            this.items = response.data
        })
    },
  },
  mounted() {
    this.getDataFaq()
  }
};
</script>

<style scoped>
.accordion-container {
  margin: 50px 0;
}
.accordion {
  margin: 24px 100px;
  box-shadow: 0 40px 60px -20px rgba(12, 5, 62, 0.15);
  border: solid 1px #e9e8f3;
}
.accordion .card {
  border-radius: 0;
  margin: 0;
}

.accordion .card:first-child {
  border-bottom: solid 1px #e9e8f3;
}
.accordion .card:not(:first-of-type):not(:last-of-type) {
  border-bottom: solid 1px #e9e8f3;
}

.accordion .card-header {
  font-weight: 700;
  font-size: 20px;
  line-height: 1.6;
  background-color: #fff;
  border-radius: 0;
  color: #000;
  padding: 36px 32px;
  border-bottom-width: 0;
}
.accordion .card-header:hover {
  color: #4da142;
}
.accordion .card:hover {
  z-index: 0;
  box-shadow: 0 20px 40px -20px rgba(12, 5, 62, 0.4);
}
.accordion .card-header img {
  padding-right: 16px;
}
.accordion .card-header span {
  display: inline-block;
  width: calc(100% - 60px);
}
.accordion .card-header + .list-group .list-group-item:first-child {
  border-top: 1px;
}
.accordion .icon-btn {
  float: right;
  width: 48px;
  height: 48px;
  padding: 0;
  background: #fff
    url("https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/plus-s-plum.png")
    no-repeat 50% 50%;
  box-shadow: 0 12px 15px -4px rgba(12, 5, 62, 0.12);
  border: solid 1.2px #d4d2e6;
  border-radius: 24px;
  /* -webkit-transition: background .3s;
  transition: background .3s; */
}
.accordion .icon-btn:hover {
  background: #3dba2c
    url("https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/plus-s-white.png")
    no-repeat 50% 50%;
  box-shadow: 0 12px 15px -4px rgba(78, 34, 208, 0.3),
    0 12px 15px -4px rgba(12, 5, 62, 0.15);
}
.accordion .icon-btn:active {
  background: #3dba2c
    url("https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/plus-s-white.png")
    no-repeat 50% 50%;
  box-shadow: 0 12px 15px -4px rgba(78, 34, 208, 0.3),
    0 12px 15px -4px rgba(12, 5, 62, 0.15);
}
.accordion .card-body {
  padding: 0 32px 40px;
}
</style>
