<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="lg">
      <div class="name-product-header">
        <h1 class="my-4">
          {{ gifts.product_name }}
        </h1>
        <!-- category -->
        <p v-if="gifts.rel_product_category_id">
          <span class="badge badge-primary">{{
            gifts.rel_product_category_id
          }}</span>
        </p>
      </div>

      <!-- Portfolio Item Row -->
      <div class="row">
        <div class="col-md-8">
          <b-img
            v-if="gifts.file_product"
            :src="gifts.file_product.url"
            :alt="gifts.file_product.filename"
            class="img-fluid w-100 custom-img"
          ></b-img>
        </div>

        <div class="col-md-4 description-product">
          <h3 class="my-3">Product Description</h3>
          <p>
            {{ gifts.description }}
          </p>
        </div>
      </div>
      <!-- /.row -->

      <!-- Related Projects Row -->
      <h3 class="my-4">Photo</h3>
      <gallery :images="images" :index="index" @close="index = null"></gallery>
      <div class="row">
        <div
          class="col-md-3 col-sm-6 mb-4"
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
        >
          <b-img
            class="p-2 mt-1 h-50 "
            :src="image"
            fluid
            thumbnail
            @click="index = imageIndex"
          ></b-img>
        </div>
      </div>
      <!-- /.row -->
      <!-- COMMENT CARD -->
      <b-row>
        <b-col>
          <b-card class="mt-3">
            <b-card-body>
              <b-card-title class="mt-3">Comment</b-card-title>
              <b-form>
                <b-form-group
                  id="input-group-3"
                  label="Comment:"
                  label-for="input-3"
                  description="Please enter your comment"
                >
                  <b-form-textarea
                    id="input-3"
                    v-model="comment"
                    rows="3"
                    max-rows="6"
                    required
                    placeholder="Enter comment"
                  ></b-form-textarea>
                </b-form-group>
                <b-button v-on:click="onSubmit" variant="primary"
                  >Submit</b-button
                >
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col>
          <!-- LIST COMMENT CARD -->
          <b-card class="mt-3">
            <b-card-header>
              <h6>List Comment</h6>
            </b-card-header>
            <b-card-body>
              <div
                class="comment-widgets mb-20"
                v-for="(d, i) in comments"
                :key="i"
              >
                <div class="d-flex flex-row comment-row">
                  <div class="p-2">
                    <span class="round"
                      ><img
                        src="https://i.imgur.com/uIgDDDd.jpg"
                        alt="user"
                        width="50"
                    /></span>
                  </div>
                  <div class="comment-text w-100">
                    <h5>Anonim</h5>
                    <div class="comment-footer">
                      <span class="text-muted">{{ d.created_at }}</span>
                    </div>
                    <p class="mb-5 mt-10">
                      {{ d.comment }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  @click="goPage('first')"
                  :disabled="paramAPI.page == 1"
                  class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1"
                >
                  <i class="ri-skip-back-mini-line"></i>
                </button>
                <button
                  type="button"
                  @click="goPage('prev')"
                  :disabled="paramAPI.page == 1"
                  class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"
                >
                  {{ $t("global.prev") }}
                </button>
                <input
                  @change="goPage('input')"
                  v-model.lazy="paramAPI.page"
                  type="text"
                  name="pagination"
                  autocomplete="off"
                  class="form-control form-control-sm pagination-text mr-1 my-1"
                  :placeholder="$t('global.goto')"
                />
                <button
                  type="button"
                  @click="goPage('next')"
                  :disabled="paramAPI.page == maxPage"
                  class="btn btn-text btn-sm btn-outline-primary mr-1 my-1"
                >
                  {{ $t("global.next") }}
                </button>
                <button
                  type="button"
                  @click="goPage('last')"
                  :disabled="paramAPI.page == maxPage"
                  class="btn btn-text btn-icon btn-sm btn-outline-primary mr-1 my-1"
                >
                  <i class="ri-skip-forward-mini-line"></i>
                </button>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
// IMPORT NAVBAR AND FOOTER
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
import moment from "moment";

// GALERY
import VueGallery from "vue-gallery";
export default {
  name: "gifts-detail",
  components: {
    Navbar,
    Footer,
    gallery: VueGallery
  },
  data() {
    return {
      gifts: [],
      name: "",
      email: "",
      comment: "",
      images: [],
      index: null,
      comments: [],
      paramAPI: {
        page: 1,
        limit: 5
      },
      total: 0,
      totalPage: 0,
      maxPage: 0
    };
  },
  watch: {
    paramAPI: {
      immediate: true,
      handler(to) {
        this.getProductComment(to);
      }
    }
  },
  methods: {
    // GET GIFT DETAIL DATA
    async getGiftDetail() {
      await this.$_api
        .get("/public/gifts/" + this.$route.params.id)
        .then(response => {
          const data = response.data;
          data.product_photo.forEach(d => {
            this.images.push(d.file_product_photo.url);
          });
          data.product_comment.forEach(d => {
            d.created_at = moment(d.created_at).fromNow();
          });
          this.gifts = data;
        });
    },
    // GET DATA Product COMMENT
    async getProductComment(filter) {
      if (!filter) filter = this.paramAPI;
      let filterQuery = Object.keys(filter)
        .map(key => {
          return `${key}=${filter[key]}`;
        })
        .join("&");
      await this.$_api
        .get(
          "/public/comment/" + this.$route.params.id + "/product?" + filterQuery
        )
        .then(response => {
          const data = response.data;
          this.comments = data;
          this.total = data.total;
          this.totalPage = data.totalPage;
          this.maxPage = Math.ceil(response.total / this.paramAPI.limit);
        });
    },
    async onSubmit() {
      await this.$_api
        .post("/public/comment/", {
          id: this.$route.params.id,
          table: "product_comment",
          relation_id: "product_id",
          comment: this.comment
        })
        .then(response => {
          this.getProductComment();
          this.comment = "";
        });
    },
    goPage(e, event = null) {
      if (event) console.log(event);
      switch (e) {
        case "first":
          this.paramAPI.page = 1;
          this.getProductComment(this.paramAPI);
          break;
        case "last":
          this.paramAPI.page = Number(this.maxPage);
          this.getProductComment(this.paramAPI);
          break;
        case "next":
          this.paramAPI.page =
            this.paramAPI.page < this.maxPage
              ? Number(this.paramAPI.page) + 1
              : this.paramAPI.page;
          this.getProductComment(this.paramAPI);
          break;
        case "prev":
          this.paramAPI.page =
            this.paramAPI.page === 1
              ? this.paramAPI.page
              : Number(this.paramAPI.page) - 1;
          this.getProductComment(this.paramAPI);
          break;
        case "input":
          if (!isNaN(this.paramAPI.page)) {
            if (this.paramAPI.page > this.maxPage) {
              this.paramAPI.page = this.maxPage;
            } else if (this.paramAPI.page < 1) this.paramAPI.page = 1;
          }
          this.getProductComment(this.paramAPI);
          break;
      }
    }
  },
  mounted() {
    this.getGiftDetail();
    this.getProductComment();
  }
};
</script>
<style scoped>
.name-product-header h1 {
  font-size: 34px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
}
.custom-img {
  border-radius: 10px;
  max-height: 500px;
  object-fit: cover;
}
.description-product h3 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
}
.description-product p {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  line-height: 1.5;
  text-align: justify;
  word-wrap: break-word;
}
</style>
