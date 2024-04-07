<template>
  <div class="bg-white">
    <Navbar />
    <b-container>
      <div class="section-header">
        <h2>Photo Our Growers</h2>
      </div>
      <b-row>
        <b-col
          md="4"
          lg="4"
          sm="12"
          class="growers"
          v-for="item in items"
          :key="item.title"
        >
          <b-img
            @click="zoomImage(item.src)"
            :src="item.src"
            class="img-fluid rounded img-growers"
          ></b-img>
          <div class="grower-content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }} <br /></p>
          </div>
        </b-col>
      </b-row>
      <b-modal
        id="modal-zoom"
        ref="modal-zoom"
        title="Zoom Image"
        hide-footer
        hide-header
      >
        <div class="modal-zoom">
          <img :src="zoomImg" class="img-fluid" alt="Image" />
        </div>
      </b-modal>
    </b-container>
    <Footer />
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "About-OurGrowers",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      items : [
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 1',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
        },
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 2',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus."
        },
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 3',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
        },
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 4',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus."
        },
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 5',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
        },
        {
          src: 'https://static.wixstatic.com/media/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg/v1/fill/w_950,h_765,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/88ae06_8ff84f25638c419580cfa41f7dbdd4e8~mv2.jpg',
          title: 'Image 6',
          description : "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus."
        }

      ],
      zoomImg: false
    };
  },
  methods: {
    zoomImage(img) {
      this.zoomImg = img;
      this.$refs["modal-zoom"].show();
    }
  }
};
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.section-header h2 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #000;
}
.growers:hover {
  transform: translateY(-10px);
  transition: all 0.5s ease;
}
.img-growers {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.grower-content {
  padding: 20px;
  background-color: #f5f5f5;
}
.grower-content h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #000;
  text-transform: uppercase;
}
.grower-content p {
  font-size: 14px;
  font-weight: 400;
  color: #666;
}
.grower-content h4:hover {
  color: #00a651;
  transform: translateX(20px);
  transition: all 0.5s ease;
}
@media (max-width: 768px) {
  .img-growers {
    height: 200px;
  }
}
</style>
