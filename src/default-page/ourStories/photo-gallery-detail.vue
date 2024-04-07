<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="ourStories-photo-gallery-detail">
        <div class="mt-10 text-center section-header">
          <h1><b>Photo Gallery Detail</b></h1>
        </div>

        <!-- Portfolio Item Row -->
        <div class="row mt-5 mt-lg-10">
          <div class="col-md-8">
            <img
              class="img-fluid r-800x500"
              v-if="items.file_photo_gallery"
              :src="items.file_photo_gallery.url"
              :alt="items.file_photo_gallery.filename"
            />
          </div>

          <div class="col-md-4 section-description">
            <h3 class="my-3">Description</h3>
            <p>
              {{ items.description }}
            </p>
          </div>
        </div>
        <!-- /.row -->

        <h3 class="my-4 ">Photo</h3>

        <div class="row">
          <gallery
            :images="images"
            :index="index"
            @close="index = null"
          ></gallery>

          <div
            class="col-md-3 col-sm-6 mb-4"
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
          >
            <img
              class="img-fluid r-500x300"
              v-if="image"
              :src="image"
              @click="index = imageIndex"
              :alt="image[index]"
            />
          </div>
        </div>
        <!-- /.row -->
      </section>
    </b-container>

    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";

import VueGallery from "vue-gallery";

export default {
  name: "OurStories-PhotoGalleryDetail",
  components: {
    Navbar,
    Footer,
    gallery : VueGallery
  },
  data(){
    return {
      items : [],
      index : null,
      images : []
    }
  },
  methods: {
    async getDataPhotoGalleryDetail() {
        await this.$_api.get(`public/photo-gallery/${this.$route.params.id}`).then(res => {
          this.items = res.data;
          // modify array then push to images
          this.items.detail_photo_gallery.forEach(item => {
            this.images.push(item.file_detail_photo_gallery.url);
          });
          console.log(this.images);
        }
      );
    }
  },
  mounted() {
    this.getDataPhotoGalleryDetail();
  }
};
</script>

<style scoped>
.r-800x500 {
  width: 800px;
  /* height: 500px; */
  border-radius: 10px;
}
.r-500x300 {
  width: 500px;
  height: 300px;
}
.section-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
}
.section-description h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
}
.section-description p {
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  line-height: 1.5;
}
</style>
