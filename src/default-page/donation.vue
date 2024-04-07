<template>
  <div class="bg-white">
    <Navbar />
    <b-overlay :show="isLoading">
      <template v-slot:overlay>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle">Loading...</strong>
        </div>
      </template>

      <section class="donation contact-form">
        <b-container fluid="md">
          <b-row class="mt-5">
            <b-col md="6">
              <b-card no-body class="mb-3">
                <b-card-body>
                  <div class="row">
                    <div class="col-md-4 col-lg-4 col-sm-4">
                      <label>
                        <input
                          v-model="tempAmount"
                          value="1"
                          type="radio"
                          name="product"
                          selected
                          checked
                          class="card-input-element"
                        />

                        <div class="card card-default card-input">
                          <div class="card-header text-center"><h3>$1</h3></div>
                          <div class="card-body text-center">
                            You Plant 1 tree
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-4">
                      <label>
                        <input
                          v-model="tempAmount"
                          value="10"
                          type="radio"
                          name="product"
                          class="card-input-element"
                        />

                        <div class="card card-default card-input">
                          <div class="card-header text-center">
                            <h3>$10</h3>
                          </div>
                          <div class="card-body text-center">
                            You Plant 10 tree
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="col-md-4 col-lg-4 col-sm-4">
                      <label>
                        <input
                          v-model="tempAmount"
                          value="100"
                          type="radio"
                          name="product"
                          class="card-input-element"
                        />

                        <div class="card card-default card-input">
                          <div class="card-header text-center">
                            <h3>$100</h3>
                          </div>
                          <div class="card-body text-center">
                            You Plant 100 tree
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <b-form @submit="onSubmit" class="mt-2">
                    <b-form-group
                      id="input-group-0"
                      label="Enter other amounts here:"
                      label-for="input-0"
                    >
                      <b-form-input
                        id="input-0"
                        v-model="tempAmount"
                        required
                        type="number"
                        placeholder="Masukkan jumlah donasi"
                      ></b-form-input>
                    </b-form-group>

                    <h4>
                      <b>Personal Information</b>
                    </h4>
                    <hr />
                    <b-form-group
                      id="input-group-1"
                      label="Nama Lengkap"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="form.name_sponsor"
                        required
                        placeholder="Masukkan nama lengkap"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-2"
                      label="Email"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.email"
                        required
                        type="email"
                        placeholder="Masukkan email"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-3"
                      label="Nomor Telepon"
                      label-for="input-3"
                    >
                      <b-form-input
                        id="input-3"
                        v-model="form.phone"
                        type="number"
                        required
                        placeholder="Masukkan nomor telepon"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-5"
                      label="Pesan"
                      label-for="input-5"
                    >
                      <b-form-textarea
                        id="input-5"
                        rows="5"
                        v-model="form.comment"
                        required
                        placeholder="Masukkan pesan"
                      ></b-form-textarea>
                    </b-form-group>
                    <div class="text-center">
                      <a
                        type="submit"
                        @click="onSubmit"
                        class="w-100 h-25 btn-midtrans "
                      >
                        <img
                          src="@/assets/images/midtrans.png"
                          alt="midtrans"
                          width="100 "
                          height="25"
                          class="custom-image-midtrans"
                        />
                      </a>
                    </div>
                  </b-form>
                  <div ref="paypal" class="mt-3 text-center"></div>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col md="6" style="padding: 20px">
              <h1 style="color:#fff;font-size:55px">Plant a Tree</h1>
              <h3 style="color: #fff; background-color: #7ead3e;font-size:30px">
                COMMUNTY FORESTRY IS THE KEY TO SUSTAINABILITY
              </h3>
              <p style="color: #fff;font-size:30px">
                When you plant a tree with Trees4Trees, it does more than just
                putting a tree in the ground. It also helps a farming family in
                a developing country and by doing so, assures that the farmer
                will continue to plant trees in the future
              </p>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </b-overlay>

    <b-container fluid="lg" class="mt-10">
      <b-row>
        <b-col md="6">
          <h1 style="color:#7ead3e">Visit your trees</h1>
          <p style="color: #000;font-size:large">
            Visit your trees With your donation, we will send you an electronic
            donation certificate along with a WIN number (World Identification
            Number) that will allow you to visit the location of your trees and
            the farmer on whose land they are planted on Google Maps.
          </p>
          <p style="color:#000;font-size:large">
            Make a difference by planting a tree today.
          </p>
        </b-col>
        <b-col md="6">
          <img
            src="https://static.wixstatic.com/media/88ae06_cf58ed7c4aad4b61835ce8a818451a32~mv2.png/v1/fill/w_750,h_508,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/MOBILE%203.png"
            alt="img"
            style="width: 100%"
          />
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col md="6">
          <div>
            <b-carousel
              id="carousel-no-animation"
              style="text-shadow: 0px 0px 2px #000"
              no-animation
              indicators
              img-width="1024"
              img-height="480"
            >
              <b-carousel-slide
                caption="First Slide"
                img-src="https://picsum.photos/1024/480/?image=10"
              ></b-carousel-slide>
              <b-carousel-slide
                caption="Second Slide"
                img-src="https://picsum.photos/1024/480/?image=12"
              ></b-carousel-slide>
              <b-carousel-slide
                caption="Third Slide"
                img-src="https://picsum.photos/1024/480/?image=22"
              ></b-carousel-slide>
              <b-carousel-slide
                caption="Fourth Slide"
                img-src="https://picsum.photos/1024/480/?image=23"
              ></b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>
        <b-col md="6" class="p-5">
          <h1 style="color:#7ead3e">Your trees will help us to....</h1>
          <p style="color: #000;font-size:large">
            🌳 improve soil fertility by increasing biological nitrogen fixation
            in the earth
          </p>
          <p style="color: #000;font-size:large">
            🌳 boost agroecosystem functions by promoting greater water
            infiltration
          </p>
          <p style="color: #000;font-size:large">
            🌳 increase biodiversity by providing shade and attracting
            forest-dependent species and organisms both above and below the
            ground.
          </p>
          <!-- BUTON IMPACT -->
          <b-button
            variant="success"
            style="background-color: #7ead3e;border-color: #7ead3e"
            >Impacts</b-button
          >
        </b-col>
      </b-row>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
// IMPORT NAVBAR AND FOOTER
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
import _config from "@/config.js";
const midtransClient = require("midtrans-client");
import moment from "moment";

export default {
  name: "donation",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        name_sponsor: "",
        email: "",
        company_name: "1",
        phone: "",
        amount: "",
        comment: "",
        payment_method_id: "", // 1 = paypal, 2 = midtrans
        category_event_id: "1",
        paid : "0",
        paid_date : moment().format("YYYY-MM-DD HH:mm:ss"),
        qty_tree : "",
      },
      tempAmount : "",
      payment: [],
      categoryDonation: [],
      amountIdr: "",
      isLoading : false,
      isPaymentModal : false,
      tempOrderId : ""
    };
  },
  watch: {

  },
  methods: {
    async getSettingDonation(){
      await this.$_api
        .get("/public/setting-donation")
        .then(response => {
          this.amountIdr = parseInt(response.data[0].amount_idr);
        })
        .catch(error => {
          console.log(error);
        });
    },

    async updateStatusPaid(id){
      const updateFormUpdate = {
        order_id : id,
        paid : "1",
      }
      await this.$_api
        .put("/public/paid-donation", updateFormUpdate)
        .then(response => {
          if(response.status){
            this.$swal({
              title: "Success",
              text: "Thank you for your donation",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async onSubmit(evt) {
      this.isLoading = true;
      window.callbackSuccess = function callbackSuccess(id) {
          this.updateStatusPaid(id);
      }.bind(this);
      evt.preventDefault();
      this.form.qty_tree = this.tempAmount;
      this.form.payment_method_id = "2";
      const calculate = parseInt(this.tempAmount) * parseInt(this.amountIdr);
      this.form.amount = calculate;
      await this.$_api
        .post("/public/donation", this.form)
        .then(response => {
          if(response.status){
            const snapSrcUrl = _config.midtrans.productionUrl;
            const snapToken = response.data.snapToken;
            const script = document.createElement('script');

            script.src = snapSrcUrl
            script.type = 'text/javascript'
            script.setAttribute('data-client-key', snapToken);
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => {
              window.snap.pay(snapToken, {
                onSuccess: function(result){
                  callbackSuccess(result.order_id);
                  this.isLoading = false;
                },
                onPending: function(result){
                  console.log("result",result);
                },
                onError: function(result){
                  console.log("result",result);
                }
              });
            }
            this.isLoading = false;


          }
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.$bvToast.toast("Something went wrong", {
            title: "Error",
            variant: "danger",
            solid: true
          });

        });
    },

    async getCategoryDonation() {
      await this.$_api
        .get("/public/donation/category")
        .then(response => {
          this.categoryDonation = response.data;
          // mapping data this.categoryDonation to get id and name
          this.categoryDonation = this.categoryDonation.map(item => {
            return {
              value: item.id,
              text: item.category_name
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getMethodPayment() {
      await this.$_api
        .get("/public/donation/payment-method")
        .then(response => {
          this.payment = response.data;
          this.payment = this.payment.map(item => {
            return {
              value: item.id,
              text: item.payment_name
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    setLoaded: function(resp){
      this.isLoading = false;
      window.paypal.Buttons({
        createOrder: function(data, actions) {
          this.form.payment_method_id = "1";
          this.form.amount = this.tempAmount;
          this.$_api
            .post("/public/donation", this.form)
            .then(response => {
              if(response.status){
                this.tempOrderId = response.data.id
                console.log("this.tempOrderId",this.tempOrderId);
              }
            })
            .catch(error => {
              console.log(error);
            });
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.form.amount,
                  currency: 'USD'
                },
                description: `Donation for tree planting`,
                item : {
                  name : "Donation for tree planting",
                  quantity : this.form.amount,
                  unit_amount : {
                    value : this.form.amount,
                    currency_code : "USD"
                  }
                }
              }
            ]
          });
        }.bind(this),
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            console.log("details",details);
            console.log("this.tempOrderId",this.tempOrderId)
            this.updateStatusPaid(this.tempOrderId);
          }.bind(this));
        }.bind(this),
        onCancel: function(data, actions) {
          console.log("cancel");
        },
      }).render(this.$refs.paypal);

    }
  },
  mounted() {
    this.getSettingDonation();
    this.getCategoryDonation();
    this.getMethodPayment();
    const script = document.createElement("script");
    script.src =
      `https://www.paypal.com/sdk/js?client-id=${_config.paypal.sandboxClientId}&currency=USD&disable-funding=credit,card`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  }
};
</script>
<style scoped>
.btn-midtrans {
  background-color: #262b30;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-midtrans:hover {
  background-color: #fff;
  color: #262b30;
  border: 1px solid #262b30;
}
.custom-image-midtrans {
  object-fit: cover;
}
.donation.contact-form {
  padding: 50px 0;
  background: url("https://static.wixstatic.com/media/nsplsh_145bd31c01d545878f5ef5913fbfa050~mv2.jpg/v1/fill/w_1284,h_771,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/nsplsh_145bd31c01d545878f5ef5913fbfa050~mv2.jpg");
}

label {
  width: 100%;
}

.card-input-element {
  display: none;
}

.card-input {
  margin: 10px;
  padding: 0px;
}

.card-input:hover {
  cursor: pointer;
}

.card-input-element:checked + .card-input {
  box-shadow: 0 0 1px 1px #2ecc71;
}
</style>
