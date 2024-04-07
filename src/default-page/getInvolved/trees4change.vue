<template>
  <div class="bg-white">
    <Navbar />
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
              <h1 class="page-title">Trees4Change</h1>
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
            <b-col md="6" sm="12">
              <div class="card-description ">
                <h1 class="text-left">
                  Replanting Trees Used for Products
                </h1>
                <p class="text-left about-description mt-5">
                  It is a simple way for forest products companies like
                  furniture, kitchen wear, home decor, craft, and more to
                  replant the trees used in the manufacture of their products.
                  It is direct, economical, and verifiable. With the
                  Trees4Change program, your company can claim that you are
                  replanting the trees used in your products. Trees4Change
                  program is one of Trees4Trees' business programs focusing on
                  environment renewal and local communities’ empowerment by
                  planting trees. This is a program where your company replants
                  the trees used in your wooden products and is based on a
                  shared tree system. The average cubic meters of wood that goes
                  in a shipped container will be calculated. From this, we will
                  make a calculation of the biomass in trees we need to plant to
                  offset the wood in your container.
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
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
  name: "GetInvolved-Trees4Change",
  components: {
    Navbar,
    Footer,
    GetInvolvedForm,
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
</style>
