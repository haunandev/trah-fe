<template>
  <div class="bg-white">
    <Navbar />
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
              <h1 class="page-title">Trees4Tommorow</h1>
              <p class="page-subtitle">
                Vivamus suscipit tortor eget felis porttitor volutpat.
              </p>
              <div class="mt-10 text-center">
                <b-button
                  variant="primary"
                  size="lg"
                  class="btn btn-primary btn-lg"
                  >Get the Brochure</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-section">
      <div class="container">
        <div class="card-block bg-white mb30">
          <b-row>
            <b-col md="6" sm="12" class="text-center ">
              <img
                src="https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg"
                alt="about"
                class="img-fluid "
              />
            </b-col>
            <b-col md="6" sm="6">
              <div class="card-description p-10">
                <h1 class="text-left">
                  Corporate Social Responsibility Program
                </h1>
                <p class="text-left about-description mt-5">
                  Corporate Social Responsibility program is the easiest way to
                  help the world and create an impact for your brand at the same
                  time. Through Trees4Tomorrow - a corporate social
                  responsibility program, Trees4Trees helps companies to reduce
                  their impact on the environment and verify to their market
                  that they are acting as good corporate citizens. Trees4Trees
                  business services range from planting community forests and
                  watershed/river restoration to land use optimization, to
                  employee engagement events. Being a good corporate citizen by
                  helping the environment and local communities is a very
                  effective way to promote your social values and increase brand
                  equity. By planting trees as a corporate social responsibility
                  attached to your business, your company helps the world to
                  have a better tomorrow.
                </p>
                <!-- <b-button
                  variant="primary"
                  size="lg"
                  class="btn btn-primary btn-lg"
                  >Get the Brochure</b-button
                > -->
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">
            <GetInvolvedForm />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";

import GetInvolvedForm from "@/default-page/getInvolved/form-getInvolved.vue";
export default {
  name: "GetInvolved-Trees4Tomorrow",
  components: {
    Navbar,
    Footer,
    GetInvolvedForm
  }
};
</script>

<style scoped>
.page-header {
  background: url(https://easetemplate.com/free-website-templates/hike/images/pageheader.jpg)
    no-repeat;
  position: relative;
  background-size: cover;
}

.page-caption {
  padding-top: 170px;
  padding-bottom: 174px;
}

.page-title {
  font-size: 46px;
  line-height: 1;
  color: #fff;
  font-weight: 600;
  text-align: center;
}
.page-subtitle {
  font-size: 20px;
  line-height: 1;
  color: #fff;
  font-weight: 600;
  text-align: center;
}

.card-section {
  position: relative;
  bottom: 60px;
}
.card-block {
  padding: 80px;
}
.about-description {
  font-size: 16px;
  line-height: 2;
  font-weight: 400;
  color: #261c6a;
}
</style>
