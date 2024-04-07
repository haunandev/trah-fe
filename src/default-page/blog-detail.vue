<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="lg">
      <h1 class="mb-2 mt-3 p-2 title-custom">{{ blogs.title }}</h1>
      <b-card>
        <div class="row">
          <div class="col-md-12">
            <b-img
              v-if="blogs.file_article"
              :src="blogs.file_article.url"
              :alt="blogs.file_article.filename"
              class="img-fluid w-100 custom-img"
            ></b-img>
          </div>
        </div>
        <div class="mt-2 ">
          <gallery
            v-if="images"
            :images="images"
            :index="index"
            @close="index = null"
          ></gallery>
          <b-container fluid class="p-4 bg-dark">
            <b-row>
              <b-col
                md="2"
                v-for="(image, imageIndex) in images"
                :key="imageIndex"
              >
                <b-img
                  class="p-2 mt-1 detail-img-custom"
                  :src="image"
                  fluid
                  @click="index = imageIndex"
                ></b-img>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <!-- <pre>{{ blogs }}</pre> -->
        <b-card-body>
          <b-card-text class="mt-2">
            <!-- tinymce html description -->
            <span v-html="blogs.description"></span>
          </b-card-text>
        </b-card-body>
      </b-card>
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
                <!-- pagination -->
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
      <!-- END COMMENT CARD -->
    </b-container>
    <Footer />
  </div>
</template>

<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";

// GALERY
import VueGallery from "vue-gallery";
export default {
  name: "blog-detail",
  components: {
    Navbar,
    Footer,
    gallery: VueGallery
  },
  data() {
    return {
      blogs: [],
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
        this.getArticleComment(to);
      }
    }
  },
  methods: {
    // GET BLOG DETAIL DATA
    async getBlogDetail() {
      await this.$_api
        .get("/public/article/" + this.$route.params.id)
        .then(response => {
          const data = response.data;
          console.log(data.article_file_photo);
          data.article_file_photo.forEach(d => {
            if (d.file_article_file_photo.url)
            this.images.push(d.file_article_file_photo.url);
          });
          this.blogs = data;
        });
    },
    // GET DATA ARTICLE COMMENT
    async getArticleComment(filter) {
      let filterQuery = "";
      if (filter) {
        filterQuery = Object.keys(filter)
          .map(key => {
            return `${key}=${filter[key]}`;
          })
          .join("&");
      }

      await this.$_api
        .get(
          "/public/comment/" + this.$route.params.id + "/article?" + filterQuery
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
          table: "article_comment",
          relation_id: "article_id",
          comment: this.comment
        })
        .then(response => {
          this.getArticleComment();
          this.comment = "";
        });
    },
    goPage(e, event = null) {
      if (event) console.log(event);
      switch (e) {
        case "first":
          this.paramAPI.page = 1;
          this.getArticleComment(this.paramAPI);
          break;
        case "last":
          this.paramAPI.page = Number(this.maxPage);
          this.getArticleComment(this.paramAPI);
          break;
        case "next":
          this.paramAPI.page =
            this.paramAPI.page < this.maxPage
              ? Number(this.paramAPI.page) + 1
              : this.paramAPI.page;
          this.getArticleComment(this.paramAPI);
          break;
        case "prev":
          this.paramAPI.page =
            this.paramAPI.page === 1
              ? this.paramAPI.page
              : Number(this.paramAPI.page) - 1;
          this.getArticleComment(this.paramAPI);
          break;
        case "input":
          if (!isNaN(this.paramAPI.page)) {
            if (this.paramAPI.page > this.maxPage) {
              this.paramAPI.page = this.maxPage;
            } else if (this.paramAPI.page < 1) this.paramAPI.page = 1;
          }
          this.getArticleComment(this.paramAPI);
          break;
      }
    }
  },
  mounted() {
    this.getBlogDetail();
    this.getArticleComment();
  }
};
</script>
<style scoped>
.custom-img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}
.detail-img-custom {
  max-height: 200px !important;
  object-fit: cover;
  max-width: 200px !important;
}
.title-custom {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
}
</style>
