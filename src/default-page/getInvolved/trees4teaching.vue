<template>
  <div class="bg-white">
    <Navbar />
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
              <h1 class="page-title">Trees4Teaching</h1>
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
              <div class="card-description p-10">
                <h1 class="text-left">
                  Academic Research
                </h1>
                <p class="text-left about-description mt-5">
                  Collaborations with the academic community to conduct academic
                  research have always been high on the agenda of Trees4Trees.
                  Trees4Trees opens collaboration with universities, schools,
                  associations, and other academic institutions through academic
                  research on forestry field in the Trees4Teaching program. To
                  this day, Trees4Trees has collaborated with various academic
                  institutions and associations in a research partnership.
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
  name: "GetInvolved-Teaching",
  components: {
    Navbar,
    Footer,
    GetInvolvedForm,
  }
};
</script>

<style scoped>
.about-description {
  font-size: 16px;
  line-height: 2;
  font-weight: 400;
  color: #261c6a;
}
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
