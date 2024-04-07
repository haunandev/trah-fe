<template>
  <div class="fluid-container bg-white">
    <Navbar />
    <section gifts product-list class="mt-3">
      <b-container>
        <!-- if products null or product == 0 -->
        <div v-if="!products || products.length == 0">
          <h1 class="text-center">No Products Found</h1>
        </div>
        <b-row>
          <b-col v-for="(d, i) in products" :key="i" class="col-md-4 mb-2">
            <b-card
              :title="d.product_name"
              :img-src="d.file_product.url"
              :img-alt="d.file_product.filename"
              img-top
            >
              <b-card-text class="long-and-truncated">
                <p>{{ d.description }}</p>
                <h3>Rp. {{ d.price }}</h3>
              </b-card-text>
              <b-row>
                <b-col>
                  <b-button
                    variant="primary"
                    @click="goToDetail(d.id)"
                    class="btn-block"
                  >
                    Read More
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    variant="outline-primary"
                    class="btn-block"
                    @click="addToCart(d.id)"
                  >
                    <i class="ri-shopping-cart-line"></i>
                  </b-button>
                </b-col>
              </b-row>
              <template #footer>
                <small class="text-muted">
                  Last updated {{ d.created_at }}
                </small>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
import moment from "moment";

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      products: []
    };
  },
  name: "gifts",
  methods: {
    // GET DATA PRODUCT
    async getProducts() {
      await this.$_api.get("/public/gifts").then(response => {
        // FORMAT DATE
        const data = response.data;
        data.forEach(element => {
          element.created_at = moment(element.created_at).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
        });
        this.products = data;
      });
    },
    async goToDetail(id) {
      await this.$router.push("/gifts/" + id);
      // await this.$router.push({ name: "gifts-detail", params: { id: id } });
    },
    async addToCart(id) {
      //  dispatch id to cart.js
      this.$store.dispatch("setCart", id);
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
<style scoped>
/* card image src  max-height 200px*/
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>
