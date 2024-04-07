<template>
  <div class="bg-white">
    <Navbar />
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-caption">
              <h1 class="page-title">Trees4Everyone</h1>
              <p class="page-subtitle">
                Vivamus suscipit tortor eget felis porttitor volutpat.
              </p>
              <div class="mt-10 text-center">
                <b-button
                  variant="primary"
                  to="/donation"
                  size="lg"
                  class="btn btn-primary btn-lg"
                  >Plant a Tree</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="how-to-donate">
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
                    Create a green impact with us through reforestation!
                  </h1>
                  <p class="text-left about-description ">
                    Trees4Trees' goal is to plant trees across the planet to
                    improve the environment as well as empower the local
                    communities. By planting trees, we will contribute to
                    slowing the crises of climate change and biodiversity loss,
                    also strengthen the local communities to increase their
                    livelihood. Trees are fundamental for all living creatures
                    on earth. Everyone has a role to play in protecting our
                    planet. Everyone needs to plant trees for a better life in
                    the future. Everyone can take an action to save the earth by
                    helping us to plant more trees! You can get involved through
                    Trees4Everyone, our individual trees donation program.
                    Reforestation at your fingertips. Get started and plant
                    trees with us today!
                  </p>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="row">
            <div
              class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center how-to-donate-title"
            >
              How To Donate Trees
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-12">
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="clearfix mb-0">
                      <a class="btn btn-link" v-b-toggle.collapse-1
                        ><i class="fa fa-chevron-circle-down"></i>
                        <h5 class="header-tittle">
                          What is Bootstrap Framework?
                        </h5>
                      </a>
                    </h2>
                  </div>
                  <b-collapse id="collapse-1" class="collapse" visible>
                    <div class="card-body">
                      <p class="description-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam eu sem tempor, varius quam at, luctus dui. Mauris
                        magna metus, dapibus nec turpis vel, semper malesuada
                        ante. Vestibulum id metus ac nisl bibendum scelerisque
                        non non purus. Suspendisse varius nibh non aliquet
                        sagittis. In tincidunt orci sit amet elementum
                        vestibulum.
                      </p>
                    </div>
                  </b-collapse>
                </div>
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                      <a class="btn btn-link" v-b-toggle.collapse-2
                        ><i class="fa fa-chevron-circle-down"></i>

                        <h5 class="header-tittle">
                          How to Create Responsive Website with Bootstrap?
                        </h5></a
                      >
                    </h2>
                  </div>
                  <b-collapse id="collapse-2" class="collapse">
                    <div class="card-body">
                      <p class="description-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                        wolf moon tempor, sunt aliqua put a bird on it squid
                        single-origin coffee nulla assumenda shoreditch et.
                      </p>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "GetInvolved-Trees4Everyone",
  components: {
    Navbar,
    Footer
  },
  mounted() {
  }

};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .about-description {
    font-size: 14px !important;
    line-height: 1 !important;
    color: #000 !important;
    font-weight: 200 !important;
  }
  .card-description {
    padding: 0px !important;
    margin-top: 10px;
  }
}
.page-header {
  background: url(https://easetemplate.com/free-website-templates/hike/images/pageheader.jpg)
    no-repeat;
  position: relative;
  background-size: cover;
}
.header-tittle {
  font-size: 20px;
  line-height: 1;
  color: #000;
  font-weight: 600;
}
.description-text {
  font-size: 16px;
  line-height: 1;
  color: #000;
  font-weight: 200;
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

.how-to-donate-title {
  font-size: 30px;
  line-height: 1;
  color: #261c6a;
  font-weight: 600;
  text-align: center;
}
.about-description {
  font-size: 16px;
  line-height: 2;
  font-weight: 400;
  color: #261c6a;
}
.accordion .card {
  background: none;
  border: none;
}
.accordion .card .card-header {
  background: none;
  border: none;
  padding: 0.4rem 1rem;
  font-family: "Roboto", sans-serif;
}
.accordion .card-header h2 span {
  float: left;
  margin-top: 10px;
}
.accordion .card-header .btn {
  color: #2f2f31;
  font-size: 1.04rem;
  text-align: left;
  position: relative;
  font-weight: 500;
  padding-left: 2rem;
}
.accordion .card-header i {
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 9px;
}
.accordion .card-header .btn:hover {
  color: #ff8300;
}
.accordion .card-body {
  color: #324353;
  padding: 0.5rem 3rem;
}

.accordion .highlight .btn {
  color: #74bd30;
}
.accordion .highlight i {
  transform: rotate(180deg);
}
</style>
