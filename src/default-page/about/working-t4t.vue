<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="about-what-we-do">
        <div class="mt-10 text-center">
          <h1><b>Working In Trees4Trees</b></h1>
        </div>

        <div class="mt-5 mt-lg-10">
          <!-- looping items -->
          <div class="row" v-for="(item, index) in items" :key="index">
            <div class="col-lg-4">
              <div class="card card-margin">
                <div class="card-header no-border">
                  <h5 class="card-title">
                    <span class="badge badge-primary m-2">JOB</span>
                  </h5>
                </div>
                <div class="card-body pt-0">
                  <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                      <div class="widget-49-date-primary">
                        <span class="widget-49-date-day">{{ item.day }}</span>
                        <span class="widget-49-date-month">{{
                          item.month
                        }}</span>
                      </div>
                      <div class="widget-49-meeting-info">
                        <span class="widget-49-pro-title">{{
                          item.title
                        }}</span>
                        <span class="widget-49-meeting-time">{{
                          item.time
                        }}</span>
                      </div>
                    </div>
                    <ol class="widget-49-meeting-points">
                      <span
                        class="short-description"
                        v-html="item.description"
                      ></span>
                    </ol>
                    <div class="widget-49-meeting-action">
                      <b-button
                        variant="outline-primary"
                        :to="'/about-working-t4t/' + item.id"
                        >Read More</b-button
                      >
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
import moment from "moment";
import router from "../../router";
export default {
  name: "About-WorkingT4t",
  components: {
    Navbar,
    Footer,
    router
},
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getDataJobVacancy() {
      this.$_api.get("public/job-vacancy").then((response) => {
        this.items = response.data;
        // created at format date
        this.items.forEach((item) => {
          // reamore ... in description
          item.description = item.description.replace(/<p>/g, "");
          item.day = moment(item.created_at).format("DD");
          item.month = moment(item.created_at).format("MMMM").substring(0, 3);
          item.time = moment(item.created_at).format("HH:mm");
        });
      });
    },
  },
  mounted() {
    this.getDataJobVacancy();
  },
};
</script>

<style scoped>
.card-margin {
  margin-bottom: 1.875rem;
}

.card {
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #ffffff;
  background-clip: border-box;
  border: 1px solid #e6e4e9;
  border-radius: 8px;
}

.card .card-header.no-border {
  border: 0;
}
.card .card-header {
  background: none;
  padding: 0 0.9375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  min-height: 50px;
}
.card-header:first-child {
  border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.widget-49 .widget-49-title-wrapper {
  display: flex;
  align-items: center;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #edf1fc;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-primary
  .widget-49-date-day {
  color: #4e73e5;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-primary
  .widget-49-date-month {
  color: #4e73e5;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fcfcfd;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-secondary
  .widget-49-date-day {
  color: #dde1e9;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-secondary
  .widget-49-date-month {
  color: #dde1e9;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8faf8;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-success
  .widget-49-date-day {
  color: #17d1bd;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-success
  .widget-49-date-month {
  color: #17d1bd;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebf7ff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-day {
  color: #36afff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-month {
  color: #36afff;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: floralwhite;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-warning
  .widget-49-date-day {
  color: #ffc868;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-warning
  .widget-49-date-month {
  color: #ffc868;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #feeeef;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-day {
  color: #f95062;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-danger
  .widget-49-date-month {
  color: #f95062;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fefeff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-day {
  color: #f7f9fa;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-light
  .widget-49-date-month {
  color: #f7f9fa;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebedee;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-day {
  color: #394856;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-month {
  color: #394856;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0fafb;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-day {
  color: #68cbd7;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-month {
  color: #68cbd7;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-meeting-info
  .widget-49-pro-title {
  color: #3c4142;
  font-size: 14px;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-meeting-info
  .widget-49-meeting-time {
  color: #b1bac5;
  font-size: 13px;
}

.widget-49 .widget-49-meeting-points {
  font-weight: 400;
  font-size: 13px;
  margin-top: 0.5rem;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item {
  display: list-item;
  color: #727686;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item span {
  margin-left: 0.5rem;
}

.widget-49 .widget-49-meeting-action {
  text-align: right;
}

.widget-49 .widget-49-meeting-action a {
  text-transform: uppercase;
}
.short-description {
  overflow: hidden;
  line-height: 2rem;
  max-height: 8rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
</style>
