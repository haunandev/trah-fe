<template>
  <div class="bg-white">
    <Navbar />
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
              <h1 class="page-title">Trees4Teams</h1>
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
                  Hosting a tree-planting event is a great way to engage
                  employees, customers, or students as great teams.
                </h1>
                <p class="text-left about-description mt-5">
                  Trees4Trees will take care of the tree planting and social
                  events to maximize the impact of your project on the
                  environment and local community empowerment. The event theme
                  can be tailored-made, such as World Rainforest Day, World Tree
                  Day, company celebration, or other ceremonies. The benefits of
                  conducting a Trees4Teams* program (tree-planting event) with
                  us are included
                </p>
                <ul>
                  <li>
                    <i class="fa fa-check"></i> Planting trees in a village with
                    educational activities
                  </li>
                  <li>
                    <i class="fa fa-check"></i> Direct engagement between
                    participants and the local community
                  </li>
                  <li>
                    <i class="fa fa-check"></i> Participants can directly
                    experience planting tree activities
                  </li>
                  <li>
                    <i class="fa fa-check"></i> Your company or organization is
                    a responsible member of the community, helping the
                    environment and local villages
                  </li>
                  <li>
                    <i class="fa fa-check"></i> You can visit your trees online
                    by scanning QR code from your E-Cerfiticate or entering code
                    to Trees4Trees website.
                  </li>
                </ul>
                <span>
                  *) The Trees4Teams program now is only available in Indonesia.
                </span>
                <!-- <b-button
                  variant="primary"
                  size="lg"
                  class="btn btn-primary btn-lg mt-1 w-100"
                  >Get the Brochure</b-button
                > -->
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
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
  name: "GetInvolved-Trees4Teams",
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
