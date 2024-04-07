<template>
  <footer>
    <div class="bg-footer-top">
      <b-container>
        <b-row>
          <b-col md="3" sm="6">
            <h4 class="widgets-title">About Us</h4>
            <b-row class="mt-3">
              <b-col cols="12" md="4" sm="12">
                <b-img
                  src="https://trees4trees.org/wp-content/uploads/2020/07/footer-t4t.png"
                  fluid
                  rounded
                  alt="Footer image"
                ></b-img>
              </b-col>
              <b-col cols="12" md="8" sm="12">
                <p>
                  Trees4trees is a program of the non-profit foundation Yayasan
                  Bumi Hijau Lestari (Sustainable Green Earth). Registered in
                  Indonesia in 2022 by Ministerial Decree KEMENHAM No.
                  AHU-0000890.AH.01.05
                </p>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12" md="4" sm="12">
                <span class="widget-subtitle">Address</span>
              </b-col>
              <b-col cols="12" md="8" sm="12">
                <b-button variant="link" class="p-0" @click="openModalMap"
                  >Click to see address</b-button
                >
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12" md="4" sm="12">
                <span class="widget-subtitle">Phone</span>
              </b-col>
              <b-col cols="12" md="8" sm="12">
                <p>+62 815-5438-4357</p>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12" md="4" sm="12">
                <span class="widget-subtitle">Email</span>
              </b-col>
              <b-col cols="12" md="8" sm="12">
                <p>
                  <a href="mailto:info@trees4trees.org">info@trees4trees.org</a>
                </p>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3" sm="6">
            <h4 class="widgets-title">LATEST NEWS</h4>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3" sm="6">
            <h4 class="widgets-title">Latest Campaign & Event</h4>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col md="4">
                    <img
                      src="https://fastly.picsum.photos/id/694/300/200.jpg?hmac=wpryplBFEyOand7U4tYdSh5UHw5EcvQrNVWF_QRJF3g"
                      alt="Latest News"
                      class="img-fluid img-thumbnail"
                    />
                  </b-col>
                  <b-col md="8">
                    <p class="footer-description">
                      LoCras ultricies ligula sed magna dictum porta. Proin eget
                      tortor risus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Quisque velit nisi, pretium ut lacinia
                      in, elementum id enim. Pellentesque in ipsum id orci porta
                      dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                      porttitor at sem.rem
                    </p>
                    <!-- a href readmore -->
                    <a href="#" class="read-more">Read More</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3" sm="6" class="text-left">
            <!-- Subscribe Today -->
            <h4 class="widgets-title">Subscribe Today</h4>
            <b-row class="mt-3">
              <b-col cols="12">
                <p>
                  Subscribe to our newsletter and get our latest news and
                  updates.
                </p>
              </b-col>
              <b-col cols="12">
                <b-form-input
                  id="input-1"
                  placeholder="Enter your email"
                  v-model="email"
                  class="mb-2"
                ></b-form-input>
                <b-button
                  v-on:click="submitSubscriber"
                  variant="primary"
                  class="mb-2"
                >
                  Subscribe
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row class="mt-5">
        <b-col cols="12">
          <p class="text-center">
            &copy; {{ year }} <a href="#">Tree4Trees</a>. All Rights Reserved.
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="modal-map"
      ref="modal-map"
      title="Our Location"
      size="xl"
      hide-footer
      hide-header-close
      hide-header
      v-model="isDialogMap"
    >
      <b-container fluid="lg">
        <!-- <div id="map" style="width:100%;height: 400px;"></div> -->
        <!-- Google maps  -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d453.9003015986393!2d110.4240081325345!3d-7.026415179739398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bf506f92e9b%3A0x9b7d9d6c7cb368dc!2sTrees4Trees!5e0!3m2!1sid!2sid!4v1675830945151!5m2!1sid!2sid"
          width="100%"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </b-container>
    </b-modal>
    <!-- cookies -->
    <section class="cookies" v-if="isCookies">
      <div class="cookie-banner small js-cookie-banner" role="alert">
        <div class="cookie-banner__text">
          MyApp uses cookies to personalize your experience on our website. By
          continuing to use this site, you agree to our
          <a href="https://myapp.zetwin.com/cookie-policy" class="link"
            >cookie policy</a
          >.
        </div>
        <button
          class="btn btn_secondary btn_sm cookie-banner__button js-accept-cookies"
          @click="setCookies"
        >
          Okay
        </button>
      </div>
    </section>
  </footer>
</template>
<script lang="js">
export default {
  name: "Footer",
  data() {
    return {
      email: "",
      year: new Date().getFullYear(),
      isDialogMap: false,
      isCookies: true
    };
  },
  methods: {
    async submitSubscriber() {
      await this.$_api
        .post("/public/subscriber", {
          email: this.email
        })
        .then(response => {
          if (response.status) {
            this.$swal({
              title: "Success!",
              text: "Thank you for subscribing to our newsletter.",
              icon: "success",
              timer: 3000,
              showConfirmButton: false
            });
            this.email = "";
          }
        });
    },
    openModalMap() {
      this.isDialogMap = true;
    },
    setCookies(){
      console.log('set cookies');
      this.$_api
        .get("https://api.ipregistry.co/?key=tryout")
        .then(response => {
          let location = response.location.country.name;
          document.cookie = `location=${location}`;
          localStorage.setItem('isCookies', false);
        });
      this.isCookies = false;
    }
  },
  beforeMount(){
    let isCookies = localStorage.getItem('isCookies');
    if(isCookies == 'false'){
      this.isCookies = false;
    }
  },
  mounted() {
    // get valaue class footer description
    let footerDescription = document.querySelectorAll(".footer-description");
    // loop footer description
    footerDescription.forEach(element => {
      // get text
      let text = element.innerText;
      // check text length
      if (text.length > 75) {
        // slice text
        let newText = text.slice(0, 75);
        // set text
        element.innerText = newText + "...";
      }
    });
  }
};
</script>
<style scoped>
.img-thumbnail {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.bg-footer-top {
  background: #000000;
  padding: 95px 0 85px;
  margin-top: 100px;
}
.widgets-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 30px;
  text-transform: uppercase;
}
.widget-subtitle {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 10px;
}
p {
  font-size: 14px;
  font-weight: 400;
  color: #bcbcbc;
  line-height: 1.8;
}
.footer-description {
  font-size: 14px;
  font-weight: 400;
  color: #bcbcbc;
  line-height: 1.8;
  margin-bottom: 0;
}

/* cookies */
.cookie-banner {
  align-items: flex-start;
  background: #26262b;
  border-radius: 10px;
  bottom: 12px;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 50%;
  max-width: 500px;
  padding: 12px 16px;
  position: fixed;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  z-index: 10;
}

@media (min-width: 576px) {
  .cookie-banner {
    align-items: center;
  }
}

.cookie-banner__text {
  font-size: 12px;
  line-height: 1.67;
  margin-right: 12px;
}

.policy-header_cookie {
  background-color: #d9ae89;
}

.link {
  color: #e6842e;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
.btn_secondary {
  background-color: #fff;
  border-color: #fff;
  color: #26262b;
}

.btn_secondary:focus:not(:disabled):not(.btn_disabled),
.btn_secondary:hover:not(:disabled):not(.btn_disabled) {
  background-color: #f1f1f2;
  border-color: #fff;
}

.btn_secondary:active:not(:disabled):not(.btn_disabled) {
  background-color: #ebebec;
  border-color: #ebebec;
}

.btn_secondary.btn_disabled,
.btn_secondary:disabled {
  opacity: 0.5;
}

/* cookies */
</style>
