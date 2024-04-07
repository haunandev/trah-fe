<template>
  <div>
    <div class="bg-header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <ul class="h-contact">
              <li>
                <i class="flaticon-email">
                  <a href="mailto:info@trees4trees.org">
                    info@trees4trees.org
                  </a>
                </i>
              </li>
              <li>
                <i class="flaticon-instagram-logo"></i>
                <a href="https://www.instagram.com/trees4trees/" target="_blank"
                  >Trees4Trees</a
                >
              </li>
              <li>
                <i class="flaticon-facebook-logo-button"></i>
                <a href="https://www.facebook.com/trees4trees" target="_blank"
                  >Trees4Trees</a
                >
              </li>
              <li>
                <i class="flaticon-linkedin-logo"></i>
                <a
                  href="https://id.linkedin.com/company/trees4trees"
                  target="_blank"
                  >Trees4Trees</a
                >
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <b-button class="btn donate-option " to="/donation">
              <span>
                <i class="ri-service-line"> </i>
                Donate Now
              </span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <b-navbar
      toggleable="lg"
      class="navbar navbar-expand-sm navbar-light "
      v-bind:class="{ 'menu-scroll': scrollingDown }"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <div class="mr-5 pb-1">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              class="img-fluid logo-t4t "
              @click="home"
            />
          </div>
        </b-navbar-nav>
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
              <span>Individual</span>
            </b-dropdown-item>
            <b-dropdown-item to="/business">
              <span>Business</span>
            </b-dropdown-item>
            <b-dropdown-item to="/trees4teaching">
              <span>Academic</span>
            </b-dropdown-item>
            <!-- <b-dropdown-item to="/trees4everyone">
              <span v-b-tooltip.hover title="Individual Donation"
                >Trees4Everyone</span
              >
            </b-dropdown-item>
            <b-dropdown-item to="/trees4tomorrow">
              <span v-b-tooltip.hover title="CSR Program">Trees4Tomorrow</span>
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
            </b-dropdown-item> -->
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
            <b-dropdown-item to="/photo-gallery">Photo Gallery</b-dropdown-item>
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
          <b-nav-item class="mt-4 cart" to="/cart">
            <div class="item">
              <i class="ri-shopping-cart-2-line" style="font-size:22px"></i>
              <span class="badge badge-green notify-badge">
                {{ this.$store.state.cart.length }}
              </span>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      scrollingDown: false,
      prevScrollpos: window.pageYOffset
    };
  },
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
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    // scroll event
    handleScroll() {
      let currentScrollPos = window.pageYOffset;
      // scroll down
      if (this.prevScrollpos < currentScrollPos) {
        this.scrollingDown = true;
      } else {
        this.scrollingDown = false;
      }
    }
  }
};
</script>
<style scoped>
.bg-header-top {
  /* gray color */
  background-color: #f5f5f5;
}
.h-contact {
  float: left;
}
.h-contact li {
  display: inline-block;
}
.h-contact li {
  font-size: 14px;
  color: #363636;
  padding: 10px 12px;
}
.h-contact li:first-child {
  padding-left: 0;
}
.h-contact li:last-child {
  padding-right: 0;
}
.h-contact li [class^="flaticon-"]:before,
.h-contact li [class*=" flaticon-"]:before,
.h-contact li [class^="flaticon-"]:after,
.h-contact li [class*=" flaticon-"]:after {
  display: inline-block;
  font-size: 16px;
  padding-right: 6px;
}
.donate-option {
  float: right !important;
  background: #53a92c !important;
  padding: 10px 12px !important;
  border-radius: 5px !important;
  margin-top: 5px !important;
  border-color: #53a92c !important;
}
/* hover */
.donate-option:hover {
  background: #417428 !important;
}

.logo-t4t {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}
.menu-scroll {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  transition: all 1s ease;
}
.notify-badge {
  position: relative;
  top: -17px;
  background: #53a92c;
  color: #fff;
  margin-left: -7px;
  border-radius: 18px;
}
.text-nav-black {
  color: #000 !important;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
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
.text-nav-black:hover {
  color: #53a92c !important;
  font-weight: bold;
}

@media screen and (max-width: 767px) {
  /* header top display none */
  .bg-header-top {
    display: none;
  }
  .cart {
    margin: 10px;
  }
  .logo-t4t {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
    /* img center */
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
