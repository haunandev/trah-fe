<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="about-what-we-do">
        <div class="mt-10 text-center">
          <h1><b>Video Gallery</b></h1>
          <p class="text-center">
            Nunc luctus in metus eget fringilla. Aliquam sed justo ligula.
            Vestibulum nibh erat, pellentesque ut laoreet vitae.
          </p>
        </div>

        <b-row class="mt-5 mt-lg-10">
          <b-col md="4" v-for="item in items" :key="item.id">
            <div class="card">
              <iframe
                width="380"
                height="220"
                :src="item.url_video_gallery"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="p-3 content">
                <p>
                  {{ item.description }}
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "OurStories-Video",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      items : []
    };
  },
  methods: {
    async getVideo() {
      await this.$_api.get("/public/video-gallery").then(res => {
        this.items = res.data;
      })
    }
  },
  mounted() {
    this.getVideo();
  }
};
</script>

<style scoped>
.card {
  width: 380px;
  /* border: none; */
  border-radius: 0px;
  /* box shadow  */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
/* card hover animation */
.card:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}
/* card content */
.content {
  padding: 0px 10px;
}

.content span {
  color: green;
  font-weight: 500;
}
.content p {
  font-size: 13px;
}
</style>
