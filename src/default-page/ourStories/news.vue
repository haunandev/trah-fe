<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="our-stories-news">
        <div class="mt-10 text-center">
          <h1><b>News</b></h1>
        </div>

        <!-- LOOPING ITEMS -->
        <div class="card-columns mt-5 mt-lg-10">
          <div class="card" v-for="item in items" :key="item.id">
            <img
              class="card-img-top"
              :src="item.file_our_stories.url"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">
                {{ item.description }}
              </p>
              <p class="card-text">
                <small
                  class="text-muted
                    "
                  >{{ item.created_at }}</small
                >
              </p>
              <!-- button go to news detail -->
              <b-button variant="primary" :to="'/our-news/' + item.id"
                >Read More</b-button
              >
            </div>
          </div>
        </div>
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "OurStories-News",
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      items : [],
    };
  },
  methods: {
   async getNews() {
      let filters = {
        "our_stories_category_id" :1
      };
      await this.$_api.get("/public/our-stories",({
        filters
      })).then(res => {
        this.items = res.data;
      });
    }
  },
  mounted() {
    this.getNews();
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
}
.card-text {
  font-size: 0.9rem;
  color: #000;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: none;
}
/* card hover */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}
</style>
