<template>
  <div class="bg-white">
    <b-container fluid="md">
      <section class="getInvolved-Form">
        <div class="mt-10 text-center">
          <h1 class="title-form"><b>Form GetInvolved</b></h1>
        </div>

        <b-card class="mt-5 mt-lg-10">
          <b-form @submit="onSubmit" @reset="onReset" v-if="forms">
            <b-form-group
              id="input-group-1"
              label="Category Get Involved :"
              label-for="input-1"
            >
              <b-form-select
                id="input-1"
                v-model="forms.category_get_involved_id"
                required
              >
                <option
                  v-for="item in categoryGetInvolved"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.category_getinvolved_name }}
                </option>
              </b-form-select>
            </b-form-group>
            <b-form-group id="input-group-2" label="Name :" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="forms.get_involved_name"
                required
                placeholder="Enter your name"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Email :"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="forms.email"
                required
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="Phone Number :"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="forms.phone"
                required
                placeholder="Enter your phone number"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label="Country :"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="forms.country"
                required
                placeholder="Enter your country"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label="Question :"
              label-for="input-6"
            >
              <b-form-textarea
                id="input-6"
                v-model="forms.question"
                required
                placeholder="Enter your question"
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">
              Reset
            </b-button>
          </b-form>
        </b-card>
      </section>
    </b-container>

    <div class="mt-20"></div>
  </div>
</template>
<script lang="js">
import Navbar from "@/default-page/navbar.vue";
import Footer from "@/default-page/footer.vue";
export default {
  name: "GetInvolved-Form",
  components: {
    Navbar,
    Footer
  },
  data(){
      return{
          forms : {
              "category_get_involved_id" : "",
              "get_involved_name" : "",
              "email" : "",
              "phone" : "",
              "country" : "",
              "question" : "",
          },
          categoryGetInvolved : []
      }
  },
  methods: {
    // get data category get involved
    async getCategoryGetInvolved() {
        this.$_api.get("/public/get-involved-category").then(res => {
            this.categoryGetInvolved = res.data;
        });
    },
    async onSubmit(evt) {
        evt.preventDefault();
        this.$_api.post("/public/get-involved", this.forms).then(res => {
            if(res.status){
            this.$bvToast.toast("Success", {
                    title: "Success",
                    variant: "success",
                    solid: true
                });
                this.onReset();
            }

        });
    },
    async onReset(evt) {
        evt.preventDefault();
        this.forms = {
            "category_get_involved_id" : "",
            "get_involved_name" : "",
            "email" : "",
            "phone" : "",
            "country" : "",
            "question" : "",
        }
    }
  },
  mounted() {
      this.getCategoryGetInvolved();
  }

};
</script>

<style scoped>
.title-form {
  font-size: 30px;
  font-weight: bold;
  color: #000;
}
</style>
