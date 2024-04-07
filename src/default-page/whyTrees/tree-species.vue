<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section id="header" class="jumbotron text-center">
        <h1 class="display-3">Trees Species</h1>
        <p class="lead">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
      </section>

      <section id="gallery">
        <div class="container">
          <!-- looping items -->
          <div class="row">
            <div class="col-lg-4 mb-4" v-for="item in items" :key="item.id">
              <div class="card">
                <img
                  src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                  alt=""
                  class="card-img-top"
                />
                <!-- span badge category trees -->

                <div class="card-body">
                  <!-- card title badge -->
                  <span class="badge badge-success mb-2">{{
                    item.tree_category
                  }}</span>
                  <h5 class="card-title">{{ item.tree_name }}</h5>
                  <p class="card-text">
                    {{ item.short_information }}
                  </p>
                  <!-- link to why-tree-species with id -->
                  <router-link
                    :to="{
                      name: 'why-trees-treeSpecies-detail',
                      params: { id: item.id }
                    }"
                    class="btn btn-outline-success btn-sm"
                    >Read More</router-link
                  >
                  <!-- <a href="" class="btn btn-outline-success btn-sm"
                    >Read More</a
                  > -->
                </div>
              </div>
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
  name: "About-Trees-Species",
  components: {
    Navbar,
    Footer
  },
  data(){
    return{
      items: []
    }
  },
  methods: {
    // get data tree species
    async getDataTreeSpecies(){
      this.$_api.get('public/trees-species').then(res => {
        this.items = res.data
        this.items.forEach(item => {
          item.tree_category = item.tree_category.replace(/_/g, ' ')
        })
      })
    }
  },
  mounted(){
    this.getDataTreeSpecies()
  }
};
</script>

<style scoped>
#header {
  background: url(https://images.unsplash.com/photo-1415795854641-f4a487a0fdc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)
    center center / cover no-repeat;
}
</style>
