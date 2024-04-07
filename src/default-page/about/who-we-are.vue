<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="lg">
      <section class="about-who-we-are">
        <div class="mt-10 text-center">
          <h1><b>Who We Are</b></h1>
        </div>
        <b-row class="mt-10">
          <b-col md="6" sm="12">
            <img
              src="https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg"
              alt="about"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" sm="12">
            <div class="card-description p-10">
              <h1 class="text-left">
                Trees4Trees is a non-profit foundation.
              </h1>
              <p class="text-left about-description mt-5">
                Trees4Trees is a non-profit foundation. We started planting
                trees in 2007 focusing on environmental renewal and empowering
                local communities through reforestation and education. Together
                with our supporters, we have made positive impacts that is
                self-sustaining into the future.
              </p>
            </div>
          </b-col>
        </b-row>
      </section>

      <section class="about-vision m-10 mt-lg-20 ">
        <div class="text-center row">
          <div class="col-md-6 container">
            <h1><strong>OUR VISION</strong></h1>
            <blockquote class="blockstyle">
              <span class="triangle"></span>Build a program that contributes to
              the health of the environment while improving social well-being,
              which is economically effective, self sustaining and realized by
              direct action in the communities where we work.
            </blockquote>
          </div>
          <div class="col-md-6 container">
            <h1><strong>OUR MISSION</strong></h1>
            <blockquote class="blockstyle">
              Tree4Trees works to improve the environment and the lives of
              people in local communities through planting trees, education, and
              related services and by doing so, create value for all
              stakeholders in the stream of our activities.<span
                class="triangle"
              ></span>
            </blockquote>
          </div>
        </div>
      </section>
      <section class="about-mission m-10 mt-lg-20">
        <!-- <div class="text-center">
          <h1><strong>OUR MISSION</strong></h1>
          <div class="col-md-6 container">
            <blockquote class="blockstyle">
              <span class="triangle"></span>Tree4Trees works to improve the
              environment and the lives of people in local communities through
              planting trees, education, and related services and by doing so,
              create value for all stakeholders in the stream of our activities.
            </blockquote>
          </div>
        </div> -->
        <!-- <div class="text-center">
          <h1><strong>OUR MISSION</strong></h1>
          <hr class="mb-3" />
          <div class="card-group">
            <div class="card card-primary text-center">
              <img
                class="card-img-top"
                src="https://static3.avast.com/10001215/web/i/index2/for-home.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <div class="badge badge-primary badge-sm">FOR HOME</div>
                <div class="card-title">
                  Personal online protection everywhere you go
                </div>
                <p class="card-text">
                  We protect your privacy and keep you safe online with Premium
                  Security and our Virtual Private Network (VPN) that safeguards
                  your personal data.
                </p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-outline-secondary btn-icon-right">
                  <span
                    >HOME SECURITY
                    <img
                      src="https://static3.avast.com/1/web/i/v2/components/arrow-m-right-orange.png"
                      height="24"
                    />
                  </span>
                </a>
              </div>
            </div>
            <div class="card card-primary text-center">
              <img
                class="card-img-top"
                src="https://static3.avast.com/10001215/web/i/index2/for-partners.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <div class="badge badge-primary badge-sm">FOR BUSINESS</div>
                <div class="card-title">
                  Simple solutions for business’s biggest security problems
                </div>
                <p class="card-text">
                  We deliver complete endpoint and network security solutions
                  designed for small and midsize businesses & IT service
                  providers.
                </p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-outline-secondary btn-icon-right">
                  <span
                    >BUSINESS SECURITY
                    <img
                      src="https://static3.avast.com/1/web/i/v2/components/arrow-m-right-orange.png"
                      height="24"
                    />
                  </span>
                </a>
              </div>
            </div>
            <div class="card card-primary text-center">
              <img
                class="card-img-top"
                src="https://static3.avast.com/10001215/web/i/index2/for-business.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <div class="badge badge-primary badge-sm">FOR PARTNERS</div>
                <div class="card-title">
                  Protecting the customers of global operators
                </div>
                <p class="card-text">
                  We partner with the world’s leading mobile and broadband
                  network operators to offer security, privacy, and digital
                  parenting solutions.
                </p>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-outline-secondary btn-icon-right">
                  <span
                    >PARTNER SECURITY
                    <img
                      src="https://static3.avast.com/1/web/i/v2/components/arrow-m-right-orange.png"
                      height="24"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div> -->
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "About-WhoWeAre",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
.card {
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
}
.img-fluid {
  border-radius: 10px;
}
/* VISION  */
blockquote {
  font-size: 1.1em;
  line-height: 1.6em;
  padding: 20px 20px 20px 40px;
  border-left: none;
  position: relative;
  text-indent: -19px;
}

section#block_content {
  min-height: 400px;
  padding-top: 40px;
  text-align: left;
}

blockquote p {
  font-size: 1em;
}

blockquote:before,
blockquote:after {
  font-family: Arial, serif;
  font-size: 2.5em;
  vertical-align: middle;
  line-height: 0;
}

blockquote:before {
  content: open-quote;
  margin-right: 4px;
}

blockquote:after {
  content: close-quote;
  margin-left: 3px;
}

blockquote.blockstyle,
blockquote.style2 {
  background: #fff;
  font-style: italic;
}

blockquote.blockstyle p,
blockquote.style2 p {
  display: inline;
}

blockquote.blockstyle {
  border-left: 3px solid #f0715f;
  position: relative;
}

blockquote.blockstyle > span.triangle:before {
  text-indent: 0;
  content: "\f0da";
  font-family: FontAwesome;
  color: #f0715f;
  position: absolute;
  left: -1px;
  top: 50%;
  margin-top: -11px;
  font-style: normal;
}

blockquote.blockstyle:before,
blockquote.blockstyle:after {
  color: #f0715f;
}

blockquote.blockstyle.border-color-blue {
  border-color: #01b7f2;
}

blockquote.blockstyle.border-color-blue > span.triangle:before {
  color: #01b7f2;
}

blockquote.blockstyle.border-color-yellow {
  border-color: #fdb714;
}

blockquote.blockstyle.border-color-yellow > span.triangle:before {
  color: #fdb714;
}

/* card group aka PRIMARY */
.card-group .card-primary:hover {
  box-shadow: 0 40px 60px -20px rgba(12, 5, 62, 0.15);
  z-index: 50;
}
.card-group .card-primary:hover .card-title {
  color: #6e9a34;
}
.card-group .card-primary .card-img-top {
  /* width: 264px;
  height: 264px; */
  margin: 80px auto 32px;
}
.card-group .card-primary .card-body > .badge {
  margin-bottom: 24px;
}
.card-group .card-primary .card-body {
  padding: 0 32px;
}
.card-group .card-primary .card-title {
  color: #000;
  font-size: 26px;
  line-height: 1.54;
  font-weight: 900;
  margin-bottom: 24px;
}
.card-group .card-primary .card-text {
  color: #261c6a;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}
.card-group .card-primary .card-footer {
  padding: 48px 0 56px;
  background: transparent;
  border: 0;
}
.about-description {
  font-size: 16px;
  line-height: 2;
  font-weight: 400;
  color: #261c6a;
}
</style>
