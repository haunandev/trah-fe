<template>
  <div class="cart">
    <Navbar />
    <div class="mt-20">
      <b-container>
        <b-row>
          <b-col cols="12" class="p-5">
            <h1 class="text-center">Cart</h1>
          </b-col>
        </b-row>

        <div class="row">
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
              <span class="badge badge-secondary badge-pill">{{
                this.$store.state.cart.length
              }}</span>
            </h4>
            <!-- invoice number -->
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div>
                  <h5 class="my-0">Invoice Number</h5>
                  <strong>{{ invoice }}</strong>
                </div>
              </li>
            </ul>
            <ul class="list-group mb-3">
              <!-- looping data -->
              <li
                class="list-group-item d-flex justify-content-between lh-condensed"
                v-for="(d, i) in data"
                :key="i"
              >
                <div>
                  <h6 class="my-0">{{ d.product_name }}</h6>
                  <small class="text-muted">{{ d.description }}</small>
                </div>
                <div class="p-4">
                  <span class="text-muted ">Rp{{ parseInt(d.price) }}</span>
                  <!-- button delete -->
                  <b-button
                    variant="outline-danger"
                    class="btn-block "
                    @click="deleteCart(d.id)"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </b-button>
                </div>
              </li>
              <!-- end looping data -->

              <li
                class="list-group-item d-flex justify-content-between bg-light"
              >
                <div class="text-success">
                  <h6 class="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">-$5</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (Rupiah)</span>
                <strong>Rp {{ totalPrice }}</strong>
              </li>
            </ul>

            <form class="card p-2">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Promo code"
                />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Billing address</h4>
            <b-card>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                    required
                    v-model="form.firstname"
                  />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required
                    v-model="form.lastname"
                  />
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="email"
                  >Email <span class="text-muted">(Optional)</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="you@example.com"
                  v-model="form.email"
                />
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="mb-3">
                <label for="address">Address</label>
                <b-form-textarea
                  id="textarea"
                  placeholder="1234 Main St"
                  rows="3"
                  max-rows="6"
                  v-model="form.address1"
                ></b-form-textarea>
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="mb-3">
                <label for="address2"
                  >Address 2 <span class="text-muted">(Optional)</span></label
                >
                <b-form-textarea
                  id="textarea"
                  placeholder="Apartment or suite"
                  rows="3"
                  max-rows="6"
                  v-model="form.address2"
                ></b-form-textarea>
              </div>

              <!-- phone -->
              <div class="mb-3">
                <label for="phone">Phone</label>
                <input
                  type="number"
                  class="form-control"
                  id="phone"
                  placeholder=""
                  value=""
                  required
                  v-model="form.phone"
                />
                <div class="invalid-feedback">
                  Valid phone is required.
                </div>
              </div>

              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="country">Country</label>
                  <select
                    class="custom-select d-block w-100"
                    id="country"
                    required
                    v-model="form.country"
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="country">City</label>
                  <select
                    class="custom-select d-block w-100"
                    id="citty"
                    required
                    v-model="form.city"
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="state">State</label>
                  <select
                    class="custom-select d-block w-100"
                    id="state"
                    v-model="form.state"
                    required
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="zip">Zip</label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    v-model="form.zipcode"
                    placeholder=""
                    required
                  />
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>
              <hr class="mb-4" />

              <button
                @click="submitCart()"
                class="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </b-card>
          </div>
        </div>
      </b-container>
    </div>
    <Footer />
  </div>
</template>

<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
import moment from "moment";
export default {
  name: "cart",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      data: [],
      form: {
        firstname: "",
        lastname : "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phone : "",
        product_id : "",
        payment_amount : "",
        qty : "1",
      },
      totalPrice : 0,
      invoice : ""
    };
  },
  methods: {
    // getData gifts
    async getData() {
      const id = this.$store.getters["getDataCart"];
      const random = Math.floor(Math.random() * 100000) + 1;
      this.invoice = `INV-${random}`;

      if (id.length === 0) return;
      for (let i = 0; i < id.length; i++) {

        await this.$_api.get(`public/gifts/${id[i]}`).then(res => {
          // push res.data to data
          const data = res.data;
          this.totalPrice += parseInt(data.price);
          this.form.product_id = data.id;
          // modify data created_at to moment
          data.created_at = moment(data.created_at).format("DD MMMM YYYY");
          data.no = i + 1;

          this.data.push(data);
        });
      }
    },
    // delete cart
    deleteCart(id) {
      this.$store.dispatch("deleteCart", id);
      const price = this.data.filter(item => (item.id === id ? item : null));
      this.totalPrice = parseInt(this.totalPrice) - parseInt(price[0].price);
      this.data = this.data.filter(item => (item.id !== id ? item : null));

    },
    async payment(id){
      const updateFormUpdate = {
        order_id : id,
        paid : "1",
      }
      await this.$_api.put("public/biling-payment",updateFormUpdate).then(res => {
        if(res.status){
          this.$swal({
            title: "Success",
            text: "Payment Success",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          this.decreaseProduct();
        }
      });
    },
    async decreaseProduct(){
      const updateFormUpdate = {
        id : this.form.product_id,
        qty : this.form.qty,
      }
      await this.$_api.put("public/decrease-product",updateFormUpdate).then(res => {
        if(res.status){
          this.$swal({
            title: "Success",
            text: "Update Success",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    },
    // submit cart
    async submitCart () {
      window.callbackSuccess = function callbackSuccess(formPayment) {
          this.payment(formPayment);
      }.bind(this);
      this.form.payment_amount = this.totalPrice;
      await this.$_api.post("public/billing",this.form).then(res => {
          if(res.status){
            // const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
            const snapSrcUrl = 'https://app.midtrans.com/snap/snap.js';
            const snapToken = res.data.snapToken;
            const script = document.createElement('script');

            script.src = snapSrcUrl
            script.type = 'text/javascript'
            script.setAttribute('data-client-key', snapToken);
            script.async = true;

            document.body.appendChild(script);

            script.onload = () => {
                window.snap.pay(snapToken, {
                    onSuccess: function(result){
                        callbackSuccess(result.order_id)
                    },
                    onPending: function(result){
                        console.log('pending', result);
                    },
                    onError: function(result){
                        console.log('error', result);
                    }
                });
            }

        }else{
          this.$swal({
            title: "Failed",
            text: "Payment Failed",
            icon: "error",
            button: "OK"
          });
        }
        console.log("res",res)
      })
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
