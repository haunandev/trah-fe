<template>
  <div class="bg-white">
    <Navbar />
    <section class="bg-page-header">
      <div class="page-header-overlay">
        <b-container>
          <div class="section-header">
            <h2>Business</h2>
          </div>
        </b-container>
      </div>
      <!-- .page-header-overlay -->
    </section>

    <b-container class="business-section">
      <div class="business-service">
        <b-row>
          <b-col lg="3" sm="12" md="3">
            <div class="single-left-services-list">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="nav-item">
                  <a
                    href="#"
                    @click="activeTab(1)"
                    :class="{ active: tab === 1 }"
                    ><i class="flaticon-globe"></i> Trees4Tomorrow</a
                  >
                </li>

                <li role="presentation">
                  <a
                    href="#"
                    @click="activeTab(2)"
                    :class="{ active: tab === 2 }"
                    ><i class="flaticon-network"></i> Trees4Teams</a
                  >
                </li>

                <li role="presentation">
                  <a
                    href="#"
                    @click="activeTab(3)"
                    :class="{ active: tab === 3 }"
                    ><i class="flaticon-refresh"></i> Trees4Change</a
                  >
                </li>

                <li role="presentation">
                  <a
                    href="#"
                    @click="activeTab(4)"
                    :class="{ active: tab === 4 }"
                    ><i class="flaticon-diagram"></i> Trees4Trade</a
                  >
                </li>
              </ul>
              <div class="download-service">
                <h4>Brochures download:</h4>
                <b-button variant="success" class="download-option btn-block">
                  <i class="flaticon-download"></i> Download
                </b-button>
              </div>
            </div>
          </b-col>
          <b-col lg="9" sm="12" md="3">
            <div class="tab-content">
              <div role="tabpanel" id="service1">
                <div class="single-services-content">
                  <img
                    src="http://demos.codexcoder.com/labartisan/html/GreenForest/assets/images/services/single-services-img-4.jpg"
                    alt="business-img"
                    class="img-fluid w-100 img-business"
                  />
                  <h3>Solar Panels</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning nterfaces Competently
                    coordinate and effective markets via magnetic core
                    competencies. Competently theme disintermediate are
                    clicks-and-mortar services and plugand-play action items.
                    Quickly brand premium theme are the awesome and creative
                    templat Objectively benchmark alternative best before
                    intermandated users.practices.
                  </p>

                  <ul class="mark-txt">
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Phosfluorescently transform top line collaboration and
                      idea sharing.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Authoritatively facilitate nexta generation niches
                      positioning faces.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently coordinate effective markets magnetic
                      competencies.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently theme disintermedia and innovative an
                      relationshesh.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Quickly brand premium the a scenaros practices.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Objectively benchmark alternative best before
                      intermandated users.
                    </li>
                  </ul>

                  <h3>How Can We Help</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning interfaces. Competently an
                    coordinate effective markets via magnetic core competencies.
                    Competently theme disintermediate are clicks-and-mortar
                    Objectively benchmark alternative best before intermandated
                    users.practices.
                  </p>
                </div>
                <!-- .single-services-content -->
              </div>
              <div role="tabpanel" id="service2">
                <div class="single-services-content">
                  <img
                    src="http://demos.codexcoder.com/labartisan/html/GreenForest/assets/images/services/single-services-img-4.jpg"
                    alt="business-img"
                    class="img-fluid w-100 img-business"
                  />
                  <h3>Solar Panels 2</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning nterfaces Competently
                    coordinate and effective markets via magnetic core
                    competencies. Competently theme disintermediate are
                    clicks-and-mortar services and plugand-play action items.
                    Quickly brand premium theme are the awesome and creative
                    templat Objectively benchmark alternative best before
                    intermandated users.practices.
                  </p>

                  <ul class="mark-txt">
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Phosfluorescently transform top line collaboration and
                      idea sharing.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Authoritatively facilitate nexta generation niches
                      positioning faces.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently coordinate effective markets magnetic
                      competencies.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently theme disintermedia and innovative an
                      relationshesh.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Quickly brand premium the a scenaros practices.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Objectively benchmark alternative best before
                      intermandated users.
                    </li>
                  </ul>

                  <h3>How Can We Help</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning interfaces. Competently an
                    coordinate effective markets via magnetic core competencies.
                    Competently theme disintermediate are clicks-and-mortar
                    Objectively benchmark alternative best before intermandated
                    users.practices.
                  </p>
                </div>
                <!-- .single-services-content -->
              </div>
              <div role="tabpanel" id="service3">
                <div class="single-services-content">
                  <img
                    src="http://demos.codexcoder.com/labartisan/html/GreenForest/assets/images/services/single-services-img-5.jpg"
                    alt="business-img"
                    class="img-fluid w-100 img-business"
                  />
                  <h3>Solar Panels 3</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning nterfaces Competently
                    coordinate and effective markets via magnetic core
                    competencies. Competently theme disintermediate are
                    clicks-and-mortar services and plugand-play action items.
                    Quickly brand premium theme are the awesome and creative
                    templat Objectively benchmark alternative best before
                    intermandated users.practices.
                  </p>

                  <ul class="mark-txt">
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Phosfluorescently transform top line collaboration and
                      idea sharing.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Authoritatively facilitate nexta generation niches
                      positioning faces.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently coordinate effective markets magnetic
                      competencies.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently theme disintermedia and innovative an
                      relationshesh.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Quickly brand premium the a scenaros practices.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Objectively benchmark alternative best before
                      intermandated users.
                    </li>
                  </ul>

                  <h3>How Can We Help</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning interfaces. Competently an
                    coordinate effective markets via magnetic core competencies.
                    Competently theme disintermediate are clicks-and-mortar
                    Objectively benchmark alternative best before intermandated
                    users.practices.
                  </p>
                </div>
              </div>
              <div role="tabpanel" id="service4">
                <div class="single-services-content">
                  <img
                    src="http://demos.codexcoder.com/labartisan/html/GreenForest/assets/images/services/single-services-img-6.jpg"
                    alt="business-img"
                    class="img-fluid w-100 img-business"
                  />
                  <h3>Solar Panels 4</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning nterfaces Competently
                    coordinate and effective markets via magnetic core
                    competencies. Competently theme disintermediate are
                    clicks-and-mortar services and plugand-play action items.
                    Quickly brand premium theme are the awesome and creative
                    templat Objectively benchmark alternative best before
                    intermandated users.practices.
                  </p>

                  <ul class="mark-txt">
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Phosfluorescently transform top line collaboration and
                      idea sharing.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Authoritatively facilitate nexta generation niches
                      positioning faces.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently coordinate effective markets magnetic
                      competencies.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Competently theme disintermedia and innovative an
                      relationshesh.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Quickly brand premium the a scenaros practices.
                    </li>
                    <li>
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                      Objectively benchmark alternative best before
                      intermandated users.
                    </li>
                  </ul>

                  <h3>How Can We Help</h3>
                  <p>
                    Phosfluorescently transform top line collaboration and
                    idea-sharing and innovative Theme are a
                    relatiotnsheshiAuthoritatively facilitate nexta generation
                    niches vivis market positioning interfaces. Competently an
                    coordinate effective markets via magnetic core competencies.
                    Competently theme disintermediate are clicks-and-mortar
                    Objectively benchmark alternative best before intermandated
                    users.practices.
                  </p>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "GetInvolved",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isActive : false,
      tab : ""

    };
  },
  mounted() {


  },
  methods: {
    activeTab(val) {
      if(val == 1){
        document.getElementById('service1').style.display = 'block';
        document.getElementById('service2').style.display = 'none';
        document.getElementById('service3').style.display = 'none';
        document.getElementById('service4').style.display = 'none';
        this.tab = 1;

      }else if(val == 2){
        document.getElementById('service1').style.display = 'none';
        document.getElementById('service2').style.display = 'block';
        document.getElementById('service3').style.display = 'none';
        document.getElementById('service4').style.display = 'none';
        this.tab = 2;


      }else if(val == 3){
        document.getElementById('service1').style.display = 'none';
        document.getElementById('service2').style.display = 'none';
        document.getElementById('service3').style.display = 'block';
        document.getElementById('service4').style.display = 'none';

        this.tab = 3;

      }
      else if(val == 4){
        document.getElementById('service1').style.display = 'none';
        document.getElementById('service2').style.display = 'none';
        document.getElementById('service3').style.display = 'none';
        document.getElementById('service4').style.display = 'block';

        this.tab = 4;

      }else{
        document.getElementById('service1').style.display = 'block';
        document.getElementById('service2').style.display = 'none';
        document.getElementById('service3').style.display = 'none';
        document.getElementById('service4').style.display = 'none';

        this.tab = 1;
      }
    }
  }

};
</script>

<style scoped>
.bg-page-header {
  background: url(http://demos.codexcoder.com/labartisan/html/GreenForest/assets/images/about/bg-page-header.jpg)
    no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.page-header-overlay {
  background: rgba(124, 182, 69, 0.61);
}
.bg-page-header .page-header {
  text-align: center;
  border-bottom: none;
  margin: 0;
  padding: 124px 0 104px 0;
}
.section-header {
  text-align: center;
  margin-bottom: 50px;
  height: 300px;
}
.section-header h2 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.business-service {
  padding: 120px 0 95px 0;
}

.single-left-services-list .nav-tabs {
  border-bottom: none;
}
.single-left-services-list .nav-tabs > li {
  float: none;
  margin-bottom: 0;
  width: 100%;
}
.single-left-services-list .nav-tabs > li > a {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  padding: 12px 15px;
  margin-right: 0;
  border-radius: 0;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  display: block;
}

.single-left-services-list .nav-tabs > li > a.active,
.single-left-services-list .nav-tabs > li > a.active:focus,
.single-left-services-list .nav-tabs > li > a.active:hover {
  color: #fff;
  cursor: default;
  background-color: #53a92c;
  border: 1px solid rgba(235, 235, 235, 0.57);
  /* border-bottom-color: rgba(235, 235, 235, 0.57); */
  border-radius: 0;
  outline: none;
}
.single-left-services-list [class^="flaticon-"]:before,
.single-left-services-list [class*=" flaticon-"]:before,
.single-left-services-list [class^="flaticon-"]:after,
.single-left-services-list [class*=" flaticon-"]:after {
  font-size: 18px;
  margin-left: 0;
  margin-right: 5px;
}
.download-service {
  padding-top: 50px;
}
.download-service a {
  margin: 28px 0 0 0;
}
h3 {
  font-size: 24px;
  color: #fff;
  font-weight: 700;
}
.download-service h4 {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.single-services-content {
  padding-left: 30px;
}
.single-services-content img {
  padding-bottom: 10px;
}
.single-services-content h3 {
  color: #53a92c;
  text-transform: uppercase;
  padding: 26px 0 3px 0;
}
.single-services-content p {
  text-align: justify;
}
.mark-txt {
  padding-top: 14px;
}
.mark-txt li {
  font-size: 15px;
  font-weight: 600;
  color: #000;
  padding: 4px 0;
}
.mark-txt li:first-child {
  padding-top: 0;
}
.mark-txt li:last-child {
  padding-bottom: 0;
}
.mark-txt .fa {
  color: #53a92c;
}
.img-business {
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
