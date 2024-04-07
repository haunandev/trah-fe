<template>
  <div class="sticky">
    <div class="bg-primary-navbar p-5">
      <b-row>
        <b-col class="col-sm-6 d-flex justify-content-center pt-4">
          <a href="#" class="mr-2 ml-2">
            <i class="ri-facebook-circle-fill text-white"></i>
          </a>
          <a href="#" class="mr-2 ml-2">
            <i class="ri-youtube-fill text-white"></i>
          </a>
          <a href="#" class="mr-2 ml-2">
            <i class="ri-instagram-line text-white"></i>
          </a>
          <a href="#" class="mr-2 ml-2">
            <i class="ri-twitter-line text-white"></i>
          </a>
          <a href="#" class="mr-2 ml-2 mt-1">
            <span class="text-white ">Contact Us</span>
          </a>
          <a href="#" class="mr-2 ml-2 mt-1">
            <span class="text-white">Newsletter</span>
          </a>
        </b-col>
        <!-- <b-col class="col-sm-4 d-flex justify-content-center">
            <b-dropdown text="Lang" variant="light" class="mr-3 mt-1">
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-dropdown>
            <b-form-input
              size="sm"
              class="mr-sm-2 mt-2"
              placeholder="Search"
            ></b-form-input>
          </b-col> -->
      </b-row>
    </div>
    <b-navbar toggleable="lg" class="bg-white p-5 ">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <div class="mr-5 pb-1">
            <img
              src="https://static.wixstatic.com/media/88ae06_0fc88a7f82c54334aedae87e839b5082~mv2.png/v1/fill/w_194,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20WARNAAA.png"
              alt="logo"
              class="img-fluid logo-t4t "
              @click="home"
            />
          </div>
          <b-navbar-nav class="mx-auto">
            <b-nav-item-dropdown
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              right
            >
              <template v-slot:button-content>
                <span class="text-nav-black">About Us</span>
              </template>
              <!-- <b-dropdown-item to="/about-who-we-are"
                  >Who We Are</b-dropdown-item
                >
                <b-dropdown-item to="/about-what-we-do"
                  >What We Do</b-dropdown-item
                >
                <b-dropdown-item to="/about-location-capacity"
                  >Location & Capacity</b-dropdown-item
                > -->
              <b-dropdown-item to="/about-our-growers"
                >Our Growers</b-dropdown-item
              >
              <!-- <b-dropdown-item to="/about-impact">Impacts</b-dropdown-item> -->
              <!-- <b-dropdown-item to="/about-faq">FAQ</b-dropdown-item> -->
              <b-dropdown-item to="/about-anual-report"
                >Annual Report</b-dropdown-item
              >
              <b-dropdown-item to="/about-partners">Partners</b-dropdown-item>
              <b-dropdown-item to="/about-working-t4t"
                >Working in Trees4Trees</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              right
            >
              <template v-slot:button-content>
                <span class="text-nav-black">Why Trees?</span>
              </template>
              <b-dropdown-item to="/why-trees">Why Trees?</b-dropdown-item>
              <b-dropdown-item to="/why-tree-species"
                >Trees Species We Planted</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <b-nav-item
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              to="/win"
              target="_blank"
              >Track Trees
            </b-nav-item>
            <b-nav-item-dropdown
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              right
            >
              <template v-slot:button-content>
                <span class="text-nav-black">Get Involved</span>
              </template>
              <b-dropdown-item to="/trees4everyone">
                <span v-b-tooltip.hover title="Individual Donation"
                  >Trees4Everyone</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/trees4tomorrow">
                <span v-b-tooltip.hover title="CSR Program"
                  >Trees4Tomorrow</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/trees4teams">
                <span v-b-tooltip.hover title="Tree Planting Event"
                  >Trees4Teams</span
                ></b-dropdown-item
              >
              <b-dropdown-item to="/trees4change">
                <span
                  v-b-tooltip.hover
                  title="Tree Replanting Used for
                  Product"
                  >Trees4Change</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/trees4trade">
                <span v-b-tooltip.hover title="One Tree One Product"
                  >Trees4Trade</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/trees4shop">
                <span v-b-tooltip.hover title="Product that Planted a Tree"
                  >Trees4Shop</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/trees4teaching">
                <span v-b-tooltip.hover title="Academic Research"
                  >Trees4Teaching</span
                >
              </b-dropdown-item>
              <b-dropdown-item to="/campaign-event"
                >Campaign & Event</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              right
            >
              <template v-slot:button-content>
                <span class="text-nav-black">Our Stories</span>
              </template>
              <b-dropdown-item to="/blog">Blog </b-dropdown-item>
              <b-dropdown-item to="/our-news">News</b-dropdown-item>
              <b-dropdown-item to="/photo-gallery"
                >Photo Gallery</b-dropdown-item
              >
              <b-dropdown-item to="/our-video-gallery">Video</b-dropdown-item>
              <b-dropdown-item to="/our-publications"
                >Publications
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item
              class="mt-6 mr-4 ml-4"
              exact-active-class="active"
              to="/gifts"
              >Merchandise Info</b-nav-item
            >
            <b-nav-item class="mt-2" to="/donation"
              ><button class="btn btn-primary ">
                Plant A Tree
              </button></b-nav-item
            >
            <b-nav-item class=" mt-6 mr-4 ml-4" to="/login" target="_blank"
              >Log In</b-nav-item
            >

            <!-- COUNT CART ITEM GET DATA FROM LOCAL STORAGE  -->
            <b-nav-item class="mt-4 cart" to="/cart">
              <div class="item">
                <i class="ri-shopping-cart-2-line" style="font-size:22px"></i>
                <span class="badge badge-danger notify-badge">
                  {{ this.$store.state.cart.length }}
                </span>
              </div>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "navbar",
  mounted() {
    // add style white-space normal in dropdown item
    document.getElementsByClassName("dropdown-item").forEach(function(item) {
      // add style white-space normal in dropdown item
      item.style.whiteSpace = "normal";
    });

    // dropdown menu can scroll
    document.getElementsByClassName("dropdown-menu").forEach(function(item) {
      item.style.maxHeight = "900px";
      item.style.width = "200px";
      item.style.overflowY = "auto";
    });
  },
  methods: {
    home() {
      this.$router.push({ name: "home-apps" });
    }
  }
};
</script>
<style scoped>
.bg-primary-navbar {
  background-color: #4ba041 !important;
}
.bg-white {
  background-color: #fff !important;
}
.logo-t4t {
  height: 60px;
}
@media only screen and (max-width: 600px) {
  .logo-t4t {
    height: 40px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .sticky {
    position: relative;
  }
  .nav-link.active {
    text-align: center !important;
  }
  .cart {
    text-align: center;
  }
}
@media only screen and (max-width: 768px) {
  .logo-t4t {
    height: 40px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .sticky {
    position: relative;
  }
  .nav-link.active {
    text-align: center !important;
  }
  .cart {
    text-align: center;
  }
}

.text-nav-black {
  color: #000 !important;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
}
.text-nav-black:hover {
  color: #53a92c !important;
  font-weight: bold;
}
.nav-link {
  color: #000 !important;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
}
.nav-link:hover {
  color: #53a92c !important;
  font-weight: bold;
}

.nav-link.active {
  color: #53a92c !important;
  font-weight: bold;
}

.item {
  position: relative;
  /* padding-top: 20px; */
  display: inline-block;
}
.notify-badge {
  top: -2px;
  position: absolute;
  right: -12px;
  font-size: 8px;
}
.sticky {
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>
