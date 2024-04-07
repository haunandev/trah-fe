<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="ourstories-photo-gallery">
        <div class="mt-10 text-center">
          <h1><b>Photo Gallery</b></h1>
          <p class="text-center">
            Nunc luctus in metus eget fringilla. Aliquam sed justo ligula.
            Vestibulum nibh erat, pellentesque ut laoreet vitae.
          </p>
        </div>
        <b-row>
          <b-col md="4" v-for="(item, index) in items" :key="index">
            <b-img
              class="p-2 mt-4 img-custom-rounded"
              :src="item.file_photo_gallery.url"
              v-if="item.file_photo_gallery"
              fluid
              thumbnail
              v-on:click="getDetailPhotoGallery(item.id)"
            ></b-img>
            <p class="text-center mt-2">
              {{ item.description }}
            </p>
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
  name: "OurStories-Photo-Gallery",
  components: {
    Navbar,
    Footer,
  },
  data()  {
    return {
      items : [],
    }
  },
  methods : {
    async getDataPhotoGallery(){
      await this.$_api.get("public/photo-gallery").then(response => {
        this.items = response.data;
      });
    },
    getDetailPhotoGallery(id){
      this.$router.push({ name: "our-stories-photoGallery-detail", params: { id: id } });
    }
  },
  mounted(){
    this.getDataPhotoGallery();
  }
};
</script>

<style scoped>
.img-custom-rounded {
  border-radius: 100px;
  object-fit: cover;
  max-height: 400px;
  max-width: 500px;
}
</style>
