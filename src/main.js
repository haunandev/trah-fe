// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// --------------------------------------------------------------
// Register All Modules & Base Component
// --------------------------------------------------------------
import "@/base/_base-component.js";

// --------------------------------------------------------------
// Global Utility
// --------------------------------------------------------------
import alert from "@/utils/alert.js";
import global from "@/utils/global.js";
import service from "@/utils/service.js";
import store from "@/utils/store.js";
import translate from "@/utils/translate.js";
import filter from "@/utils/filter.js";
import ImageFallBack from "@/utils/img-fall-back.js";
import NumericInput from "@/utils/numeric.js";
import excel from "@/utils/export-excel";
import "@/utils/validation.js";
import config from "./config";

// CUSTOM
import cart from "@/utils/cart.js";

// --------------------------------------------------------------
// 3rd Party Plugins
// --------------------------------------------------------------
import VueI18n from "vue-i18n";
import VueCarousel from "vue-carousel";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";
import VueChatScroll from "vue-chat-scroll";
import { TimeAgo } from "vue2-timeago";
import VueApexCharts from "vue-apexcharts";
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap";
import VueClipboard from "vue-clipboard2";
import VueMasonry from "vue-masonry-css";
import infiniteScroll from "vue-infinite-scroll";
import VueNumeric from "vue-numeric";
import Print from "vue-print-nb";
import VueQr from "vue-qr";
import * as VueGoogleMaps from "vue2-google-maps";

import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import highchartsFunnel from "highcharts/modules/funnel";
import HighchartsVue from "highcharts-vue";

import VueKonva from "vue-konva";
import VueNumber from "vue-number-animation";

// import 'bootstrap/scss/bootstrap.scss'
// --------------------------------------------------------------
// Import Bootstrap Vue (order is important)
// --------------------------------------------------------------
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";

// --------------------------------------------------------------
// Import Optional CSS (Icon & Global CSS)
// --------------------------------------------------------------
import "remixicon/fonts/remixicon.css";
import "@/../static/assets/global.css";

// --------------------------------------------------------------
// Import Template CSS
// --------------------------------------------------------------
import "@/../static/assets/sass/style.scss";

// Import Multi Select
import Multiselect from "vue-multiselect";

highchartsMore(Highcharts);
highchartsFunnel(Highcharts);

Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueCarousel);
Vue.use(SequentialEntrance);
Vue.use(VueChatScroll);
Vue.use(VueClipboard);
Vue.use(VueMasonry);
Vue.use(infiniteScroll);
Vue.use(HighchartsVue);
Vue.use(excel);
Vue.use(VueNumeric);
Vue.use(Print);
Vue.use(VueQr);
Vue.use(VueGoogleMaps, {
  load: {
    region: "ID",
    language: "id",
    key: config.apikey.gmap ? config.apikey.gmap : null,
    libraries: "places"
  }
});

Vue.use(VueKonva);
Vue.use(VueNumber);

Vue.component("v-select", vSelect);
Vue.component("date-picker", DatePicker);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("TimeAgo", TimeAgo);
Vue.component("apexchart", VueApexCharts);
Vue.component("vue-typeahead-bootstrap", VueTypeaheadBootstrap);
Vue.component("multiselect", Multiselect);

Vue.prototype.$_alert = alert;
Vue.prototype.$_sys = global;
Vue.prototype.$_api = service;
Vue.prototype.$_config = config;
Vue.directive("img-fb", ImageFallBack);
Vue.directive("number-input", NumericInput);

const i18n = new VueI18n({
  locale: "id", // set locale
  messages: translate // set locale messages
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  cart,
  i18n,
  components: { App },
  template: "<App/>",
  filter: {
    filter
  },
  created() {
    const items = { ...localStorage };
    if (items) {
      Object.keys(items).forEach(e => {
        if (e !== "loglevel:webpack-dev-server" && items[e] !== "undefined")
          this.$store.commit("set", [e, JSON.parse(items[e]), false]);
      });
    }
  }
});
