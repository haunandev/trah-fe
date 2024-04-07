<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="lg">
      <div class="mt-5">
        <h3>Article</h3>
      </div>
      <b-row>
        <b-col md="3" v-for="(d, i) in blogs" :key="i">
          <b-card no-body class="mb-3" v-if="blogs.length == 0">
            <b-card-body>
              <b-card-title class="mt-3">Empty Data</b-card-title>
            </b-card-body>
          </b-card>
          <div>
            <b-card
              :title="d.title"
              :img-src="d.file_article.url"
              :img-alt="d.file_article.filename"
              img-top
              tag="article"
            >
              <b-card-text class="long-and-truncated">
                <span v-html="d.description"></span>
              </b-card-text>

              <b-button
                variant="primary"
                :to="'/blog/' + d.id"
                v-on:click="submitArticleVisitor(d.id)"
                >Read More</b-button
              >
            </b-card>
          </div>
        </b-col>
      </b-row>
      <div class="mt-5 ">
        <b-card>
          <!-- PAGINATION -->
          <b-pagination
            class="justify-content-center"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-card>
      </div>
      <div class="mt-5">
        <h3>Instagram</h3>
      </div>
      <b-row class="mt-5">
        <b-col md="4" v-for="(d, i) in instagram" :key="i">
          <b-card no-body class="mb-3" v-if="instagram.length == 0">
            <b-card-body>
              <b-card-title class="mt-3">Data Kosong</b-card-title>
            </b-card-body>
          </b-card>
          <div>
            <b-card
              :title="d.caption"
              :img-src="d.media_url"
              :img-alt="d.id"
              img-top
              tag="article"
              style="max-width: 300px"
            >
              <b-button variant="primary" :to="'/blog/' + d.id"
                >Read More</b-button
              >
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";

export default {
  name: "blog",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      blogs: [],
      instagram: [],
      totalRows: 0,
      perPage: 3,
      currentPage: 1,
      loading: true
    };
  },
  methods: {
    // GET BLOG DATA
    async getBlog() {
      await this.$_api.get("/public/article").then(response => {
        this.loading = false;
        const data = response.data;
        this.blogs = data;
      });
    },
    // GET DATA INSTAGRAM
    async getInstagram() {
      await this.$_api.getInstagram().then(response => {
        const data = response.data;
        console.log(data);
        this.instagram = data;
      });
    },
    // submitArticleVisitor
    async submitArticleVisitor(article_id) {
      console.log(article_id);
      await this.$_api
        .get("https://api.ipregistry.co/?key=tryout")
        .then(response => {
          let location = response.location.country.name;
          let params = {
            article_id: article_id,
            visitor_amount: 1,
            visitor_location: location
          };
          this.$_api
            .post("/public/article-visitor", params)
            .then(response => {});
        });
    }
  },
  mounted() {
    this.getBlog();
    this.getInstagram();
  }
};
</script>
<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}

.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
}
.long-and-truncated {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #6c757d;
}
.card-title {
  font-size: 20px;
  font-weight: 600;
}
</style>
