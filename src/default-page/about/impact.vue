<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="lg">
      <section class="about-impact">
        <div class="mt-10 text-center">
          <h1><b>Impacts</b></h1>
        </div>
        <b-row class="mt-10">
          <b-col md="6" sm="12">
            <img
              src="https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg"
              alt="about"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" sm="12" class="mx-auto p-10 ">
            <div class="card-description mt-2">
              <h3 class="text-left">
                Since the first tree-planting activitiy since 2007, Trees4Trees
                has reached a lot of achievements in the environmental
                improvement and local community empowerement
              </h3>
              <div class="row">
                <div
                  class="col-lg-6 col-md-6 col-sm-12 mt-5"
                  v-for="(cd, i) in cardData"
                  :key="'cd-' + i"
                >
                  <div class="card card-custom pl-5 pr-5 py-4">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex flex-column text-dark">
                        <span class="font-weight-bold font-size-sm">{{
                          cd.label
                        }}</span>
                        <span
                          class="font-weight-bolder"
                          :style="`color: ${cd.color}; font-size: 2.3rem`"
                        >
                          {{ cd.value }}</span
                        >
                      </div>
                      <span
                        class="d-flex flex-column justify-content-center align-items-center "
                        :style="
                          `background-color: ${cd.background}; border-radius: 8px; width: 70px; height: 70px;`
                        "
                      >
                        <i
                          :style="'color: ' + cd.color"
                          class=" icon-3x font-weight-bold"
                          :class="{ [cd.icon]: true }"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </section>
    </b-container>

    <div class="container-fluid px-0 mt-5 mt-lg-10">
      <div class="row">
        <div class="col-md-12">
          <img
            src="https://trees4trees.org/wp-content/uploads/2022/02/Why-plant-trees-min-768x496.jpg"
            alt="trees4trees"
            class="img-responsive  w-100 custom-img "
          />
        </div>
        <div class="col-md-12">
          <div class="card card-custom card-absolute">
            <div class="card-body">
              <div class="text-center mb-5">
                <h1 class="font-weight-bolder custom-program">
                  Program to plant trees and improve the environment
                  <span class="bullet"></span>
                </h1>
              </div>

              <div class="row">
                <div class="col-md-6 ">
                  <h3 class="font-weight-bolder">
                    The tree-planting program generates job opportunities for
                    local communities around the area. We involved more than 900
                    people to work in the reforestation activities with us.
                  </h3>
                </div>
                <div class="col-md-6">
                  <h3 class="font-weight-bolder">
                    The tree-planting program is contributing to prevent erosion
                    in the land and coastal areas, sedimentation, and disasters
                    like floods, landslides, and surges.
                  </h3>
                </div>
              </div>
            </div>
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
export default {
  name: "About-Impact",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      cardData: [
        {
          label: 'Trees planted',
          color: '#6E9A34',
          icon: 'ri-seedling-line',
          value: '3,193,959',
          background: '#ebffe7'
        },

        {
          label: 'Seedlings Produced ',
          color: '#218AEC',
          icon: 'ri-sun-cloudy-line',
          value: '5,000,000',
          background: '#DEEDFC'
        },
        {
          label: 'CO2 Captured  ',
          color: '#B52B65',
          icon: 'ri-blaze-line',
          value: '200 million',
          background: '#FD8A8A'
        },
        {
          label: 'Families Helped',
          color: '#D89216',
          icon: 'ri-user-smile-line',
          value: '23.000',
          background: '#FFFFD0'
        },
        {
          label: 'Companies Participated',
          color: '#0093AB ',
          icon: 'ri-community-line',
          value: '2.300.000',
          background: '#D9D7F1'
        },
        {
          label: 'Countries',
          color: '#C060A1',
          icon: 'ri-price-tag-2-fill',
          value: '2.300.000',
          background: '#F6DFEB'
        },
      ],
    }
  }
};
</script>

<style scoped>
.card-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  width: 80%;
  z-index: 1;
}
.card-custom {
  border: 1px solid #ebedf2;
  border-radius: 0.42rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}
.custom-img {
  height: 500px;
  object-fit: cover;
}
.custom-program {
  color: #6e9a34;
}
.bullet {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #6e9a34;
  margin-left: 10px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
