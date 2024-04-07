<template>
  <div class="aside aside-left d-flex aside-fixed" id="kt_aside">
    <!--begin::Primary-->
    <div
      class="aside-primary d-flex flex-column align-items-center flex-row-auto"
    >
      <!--begin::Brand-->
      <div
        class="
          aside-brand
          d-flex
          flex-column
          align-items-center
          flex-column-auto
          py-5 py-lg-7
        "
      >
        <!--begin::Logo-->
        <router-link :to="{ path: '/' }" class="d-flex flex-column">
          <img :src="$_config.logo.lg" alt="" class="max-h-75px" />
        </router-link>
        <!--end::Logo-->
      </div>
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="
          aside-nav
          d-flex
          flex-column
          align-items-center
          flex-column-fluid
          py-5
          scroll scroll-push
          scrolling-hide
          justify-content-start
        "
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist">
          <!--begin::Item-->
          <li
            v-for="(v, i) in $store.state.modules"
            :key="i"
            class="nav-item mb-5"
            v-b-tooltip.right.viewport
            :title="
              v.name
                .split('-')
                .map(
                  kebab =>
                    kebab
                      .toLowerCase()
                      .charAt(0)
                      .toUpperCase() + kebab.slice(1)
                )
                .join(' ')
            "
          >
            <div
              @click="openSecondary(v.routes, v.name)"
              class="nav-link btn btn-icon btn-clean btn-lg btn-menu"
              :class="{ active: v.name === openedPrimary }"
            >
              <span v-if="v.icon" class="svg-icon svg-icon-xl">
                <i :class="v.icon"></i>
              </span>
              <span
                v-if="v.svgInline"
                class="svg-icon svg-icon-primary svg-icon-xl"
                v-html="v.svg"
              ></span>
              <span v-if="v.svg" class="svg-icon p-1">
                <img
                  :src="v.svg"
                  alt="icon-sidemenu"
                  class="icon-primary-menu"
                />
                <!-- <img :src="syncImage(v.svg, v.name)" v-on:mouseover="hover_handler($event, v.name)"
                  v-on:mouseleave="hover_leave_handler($event, v.name)" alt="icon-sidemenu" class="icon-primary-menu" /> -->
              </span>
              <!-- <span class="d-block"> {{ v.name.split('-').map((kebab) => kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)).join(' ') }}</span> -->
            </div>
          </li>
          <!--end::Item-->
        </ul>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->
      <!--begin::Footer-->
      <div
        class="
          aside-footer
          d-flex
          flex-column
          align-items-center
          flex-column-auto
          py-4 py-lg-10
        "
      >
        <!--begin::Aside Toggle-->
        <span
          v-if="secondaryItems.length > 1"
          @click="togleSecondary(!$store.state.sideNavSecondary)"
          class="
            aside-toggle 
            btn btn-icon btn-primary btn-hover-primary
            shadow-sm
          "
          id="kt_aside_toggle"
        >
          <i class="ri-arrow-drop-left-line"></i>
        </span>
        <!--end::Aside Toggle-->
        <!--begin::Quick Panel-->
        <a
          @click="$store.dispatch('setModule')"
          class="btn btn-icon btn-clean btn-lg mb-1 position-relative"
          id="kt_quick_panel_toggle"
          v-b-tooltip.right
          title="Reload Modules"
        >
          <span class="svg-icon svg-icon-custom svg-icon-danger p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M12,8 L8,8 C5.790861,8 4,9.790861 4,12 L4,13 C4,14.6568542 5.34314575,16 7,16 L7,18 C4.23857625,18 2,15.7614237 2,13 L2,12 C2,8.6862915 4.6862915,6 8,6 L12,6 L12,4.72799742 C12,4.62015048 12.0348702,4.51519416 12.0994077,4.42878885 C12.264656,4.2075478 12.5779675,4.16215674 12.7992086,4.32740507 L15.656242,6.46136716 C15.6951359,6.49041758 15.7295917,6.52497737 15.7585249,6.56395854 C15.9231063,6.78569617 15.876772,7.09886961 15.6550344,7.263451 L12.798001,9.3840407 C12.7118152,9.44801079 12.607332,9.48254921 12.5,9.48254921 C12.2238576,9.48254921 12,9.25869158 12,8.98254921 L12,8 Z"
                  fill="#000000"
                />
                <path
                  d="M12.0583175,16 L16,16 C18.209139,16 20,14.209139 20,12 L20,11 C20,9.34314575 18.6568542,8 17,8 L17,6 C19.7614237,6 22,8.23857625 22,11 L22,12 C22,15.3137085 19.3137085,18 16,18 L12.0583175,18 L12.0583175,18.9825492 C12.0583175,19.2586916 11.8344599,19.4825492 11.5583175,19.4825492 C11.4509855,19.4825492 11.3465023,19.4480108 11.2603165,19.3840407 L8.40328311,17.263451 C8.18154548,17.0988696 8.13521119,16.7856962 8.29979258,16.5639585 C8.32872576,16.5249774 8.36318164,16.4904176 8.40207551,16.4613672 L11.2591089,14.3274051 C11.48035,14.1621567 11.7936615,14.2075478 11.9589099,14.4287888 C12.0234473,14.5151942 12.0583175,14.6201505 12.0583175,14.7279974 L12.0583175,16 Z"
                  fill="#000000"
                  opacity="0.3"
                />
              </g>
            </svg>
          </span>
        </a>
        <!--end::Quick Panel-->
        <!--begin::Action-->
        <a
          v-if="$_config.options.myAction"
          @click="key++"
          v-b-toggle.myaction-module
          class="btn btn-icon btn-clean btn-lg mb-1 position-relative"
          id="kt_quick_user_toggle"
          v-b-tooltip.right
          title="My Actions"
        >
          <span class="svg-icon svg-icon-custom svg-icon-success p-1">
            <img
              :src="icon.action"
              alt="icon-sidemenu-bottom"
              class="icon-primary-menu"
            />
          </span>
          <span
            v-if="$store.state['my-action-count'] > 0"
            class="
              label label-sm label-light-danger label-rounded
              font-weight-bolder
              position-absolute
              top-0
              mt-1
              mr-1
            "
            style="right: -2px"
            >{{ $store.state["my-action-count"] }}</span
          >
        </a>
        <!--end::Action-->
        <!--begin::User-->
        <a
          v-b-toggle.profile-module
          class="btn btn-icon btn-clean btn-lg mb-1 position-relative"
          id="kt_quick_user_toggle"
          v-b-tooltip.right
          title="Profil Pengguna"
        >
          <span class="svg-icon svg-icon-custom p-1">
            <img
              :src="icon.profile"
              alt="icon-sidemenu-bottom"
              class="icon-primary-menu"
            />
          </span>
        </a>
        <!--end::User-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div
      v-if="secondaryItems.length > 1"
      class="aside-secondary d-flex flex-row-fluid"
    >
      <!--begin::Workspace-->
      <div class="aside-workspace scroll scroll-push scrolling-hide my-2">
        <!--begin::Tab Content-->
        <div class="tab-content">
          <!--begin::Tab Pane-->
          <div
            class="tab-pane p-3 px-lg-7 py-lg-5 fade show active"
            id="kt_aside_tab_1"
          >
            <!--begin::Form-->
            <form class="d-none p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px flex-fill">
                  <input
                    type="text"
                    class="
                      form-control form-control-lg form-control-solid
                      h-40px
                    "
                    placeholder="Cari Proyek ..."
                    id="generalSearch"
                  />
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon | path:assets/media/svg/icons/General/Search.svg-->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                            fill="#000000"
                            fill-rule="nonzero"
                            opacity="0.3"
                          />
                          <path
                            d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                            fill="#000000"
                            fill-rule="nonzero"
                          />
                        </g>
                      </svg>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </div>
              </div>
            </form>
            <!--end::Form-->
            <h4 class="p-2 p-lg-3 my-1 my-lg-3 text-capitalize">
              {{ openedPrimary.split("-").join(" ") }}
            </h4>
            <!--begin::List-->
            <div class="list list-hover">
              <p class="text-muted ml-3">{{ desc }}</p>
              <!--begin::Item-->
              <template v-for="(s, i) in secondaryItems">
                <template v-if="!s.hidden">
                  <div
                    v-if="
                      s.meta.separator &&
                        (i > 0
                          ? secondaryItems[i - 1].meta.separator
                            ? secondaryItems[i - 1].meta.separator !==
                              s.meta.separator
                            : true
                          : true)
                    "
                    :key="i + '-separator'"
                    class="d-block px-3 px-lg-3 py-1 mt-3"
                  >
                    <span
                      style="color: #7e8299"
                      class="font-weight-bolder mb-1 font-size-lg"
                      >{{ s.meta.separator }}</span
                    >
                  </div>
                  <!-- <div :key="i" class="d-block list-item hoverable p-2 p-lg-3 mb-2" :class="{ active: $route.name == s.name }" @click="redirectMain(s)">
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-30 symbol-light-primary mr-4">
                        <span class="symbol-label" :class="$route.name == s.name ? 'bg-primary' : 'bg-hover-primary'">
                          <i :class="[$route.name === s.name ? 'text-white': 'text-hover-white', s.meta.icon]"></i>
                        </span>
                      </div>
                      <div class="d-flex flex-column flex-grow-1 mr-2">
                        <span :class="$route.name == s.name ? 'text-primary' : 'text-dark-75'" class="font-size-lg mb-0">{{ s.label || s.meta.title }}</span>
                      </div>
                    </div>
                  </div> -->
                  <router-link
                    :to="createLink(s)"
                    @click.native="hideSideNav($event)"
                    :key="i"
                    class="d-block list-item hoverable p-2 p-lg-3 mb-2"
                    :class="{ active: $route.name == s.name }"
                  >
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-30 symbol-light-primary mr-4">
                        <span
                          class="symbol-label"
                          :class="
                            $route.name == s.name
                              ? 'bg-primary'
                              : 'bg-hover-primary'
                          "
                        >
                          <i
                            :class="[
                              $route.name === s.name
                                ? 'text-white'
                                : 'text-hover-white',
                              s.meta.icon
                            ]"
                          ></i>
                        </span>
                      </div>
                      <div class="d-flex flex-column flex-grow-1 mr-2">
                        <span
                          :class="
                            $route.name == s.name
                              ? 'text-primary'
                              : 'text-dark-75'
                          "
                          class="font-size-lg mb-0"
                          >{{ s.label || s.meta.title }}</span
                        >
                      </div>
                    </div>
                  </router-link>
                </template>
              </template>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->
        </div>
        <!--end::Tab Content-->
      </div>
      <!--end::Workspace-->
    </div>
    <!--end::Secondary-->
    <b-sidebar
      z-index="1030"
      id="sidebar-module"
      no-close-on-route-change
      backdrop
      :backdrop-variant="'light'"
      shadow
      left
      no-header
      body-class="offcanvas offcanvas-left p-10 offcanvas-on"
    >
      <div
        class="
          offcanvas-header
          d-flex
          align-items-center
          justify-content-between
          pb-10
        "
        kt-hidden-height="56"
        style=""
      >
        <h3 class="font-weight-bold m-0">
          Main Menu
          <small class="text-muted font-size-sm ml-2">{{
            $_config.name
          }}</small>
        </h3>
        <a
          v-b-toggle.sidebar-module
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_actions_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <div class="offcanvas-content pr-5 mr-n5 scroll ps">
        <div class="row">
          <!--begin::Item-->
          <div
            v-for="(p, i) in $store.state.modules"
            :key="i + '-main-menu'"
            class="col-6 gutter-b"
          >
            <a
              @click="openSecondary(p.routes, p.name)"
              v-b-toggle.sidebar-module
              class="
                btn btn-block btn-light btn-hover-primary
                text-dark-50 text-center
                py-10
                px-5
              "
            >
              <i
                :class="p.icon"
                class="text-primary"
                style="font-size: 2.5em"
              ></i>
              <span
                style="font-size: 1.1rem"
                class="d-block font-weight-bold mt-5"
                >{{
                  p.name
                    .split("-")
                    .map(
                      kebab =>
                        kebab
                          .toLowerCase()
                          .charAt(0)
                          .toUpperCase() + kebab.slice(1)
                    )
                    .join(" ")
                }}</span
              >
            </a>
          </div>
          <!--end::Item-->
        </div>
      </div>
    </b-sidebar>
    <b-sidebar
      z-index="1030"
      id="profile-module"
      backdrop
      :backdrop-variant="'light'"
      shadow
      left
      no-header
      body-class="offcanvas offcanvas-left p-10 offcanvas-on"
    >
      <div
        class="
          offcanvas-header
          d-flex
          align-items-center
          justify-content-between
          pb-10
        "
        kt-hidden-height="56"
        style=""
      >
        <h3 class="font-weight-bold m-0">Profil Pengguna</h3>
        <a
          v-b-toggle.profile-module
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_actions_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <user-profile />
    </b-sidebar>
    <b-sidebar
      v-if="$_config.options.myAction"
      z-index="1030"
      id="myaction-module"
      backdrop
      :backdrop-variant="'light'"
      shadow
      left
      no-header
      body-class="offcanvas offcanvas-left p-10 offcanvas-on no-overflow d-flex flex-column"
    >
      <div
        class="
          offcanvas-header
          d-flex
          align-items-center
          justify-content-between
          pb-10
        "
        kt-hidden-height="56"
        style=""
      >
        <h3 class="font-weight-bold m-0">
          My Action
          <small class="text-muted font-size-sm ml-2">{{
            $_config.name
          }}</small>
        </h3>
        <a
          v-b-toggle.myaction-module
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_actions_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <my-action :refreshKey="key" />
    </b-sidebar>
  </div>
</template>
<style scoped>
.btn-menu {
  /* padding: 2.1em !important; */
  width: 4.7em !important;
  height: 4.7em !important;
}

.icon-primary-menu {
  display: block;
  text-align: center;
  width: 100%;
}

.scrolling-hide {
  flex: 1 1 auto;
  overflow-y: auto;
  /* min-height: 0px; */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrolling-hide::-webkit-scrollbar {
  display: none;
}
</style>
<style>
.svg-icon.svg-icon-custom svg {
  height: 3rem !important;
  width: 3rem !important;
}

.btn.btn-clean:hover:not(:disabled):not(.disabled),
.btn.btn-clean:not(:disabled):not(.disabled).active {
  background-color: #f3f6f9 !important;
  border-radius: 12px !important;
}

.list.list-hover .list-item:hover,
.list.list-hover .list-item.active {
  background-color: rgba(var(--primary-rgb), 0.1) !important;
}

.list.list-hover .list-item.active .text-primary {
  font-weight: bold !important;
}

.symbol.symbol-40 .symbol-label i {
  font-size: 18px;
}

.bg-icon-primary {
  background-color: #9e85e8;
}
</style>

<script>
import userProfile from "./../default-page/profile-user";
import myAction from "./../default-page/my-action";
export default {
  name: "aside-left",
  components: { userProfile, myAction },
  data() {
    return {
      secondaryItems: [],
      openedPrimary: null,
      key: 1,
      color: ["#a4b6b9", "#0074C8", "#0AAB41", "#D42B21", "#FFAE33"],
      icon: {
        action: "./static/img/icon/myaction.svg",
        profile: "../static/img/icon/menu/account.svg",
        reload: "./static/img/icon/reload-module.svg"
      },
      desc: ""
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: false,
      handler(t, f) {
        if (t.name !== f.name) {
          let openModule = this.$store.state.modules.filter(x =>
            x.routes.some(y => y.name === t.name)
          )[0];
          if (openModule) {
            // this.openSecondary(openModule.routes, openModule.name, false)
            this.$store.commit("set", ["unknownRoute", false, true]);
          } else this.$store.commit("set", ["unknownRoute", true, true]);
        }
      }
    }
  },
  methods: {
    openSecondary(child, name, redirect = true) {
      // find desc in module where module name is name
      let module = this.$store.state.modules.filter(x => x.name === name)[0];
      if (module) this.desc = module.desc;

      this.openedPrimary = name;
      this.secondaryItems = child.filter(x => !x.hidden);
      if (this.secondaryItems.length > 1) this.togleSecondary(true);
      else if (this.secondaryItems.length === 1) {
        this.togleSecondary(false);
        if (redirect && this.$route.name !== this.secondaryItems[0].name) {
          this.$router.push({
            name: this.secondaryItems[0].name,
            query: { view: "list" }
          });
        }
      } else this.togleSecondary(false);
    },
    togleSecondary(val) {
      if (val) {
        this.$_sys.togleClass("kt_body", "aside-minimize", false);
        this.$store.commit("set", ["sideNavSecondary", true]);
      } else {
        this.$_sys.togleClass("kt_body", "aside-minimize", true);
        this.$store.commit("set", ["sideNavSecondary", false]);
      }
    },
    // redirectMain (s) {
    //   if (this.$route.name !== s.name || this.$route.query.view !== 'list') {
    //     this.$router.push({ name: s.name, query: { view: 'list' } })
    //     this.$store.commit('set', ['sideNavMobile', false])
    //     this.$_sys.togleClass('kt_aside', 'aside-on', false)
    //   }
    // },
    createLink(s) {
      if (this.$route.name !== s.name || this.$route.query.view !== "list") {
        return { name: s.name, query: { view: "list" } };
      } else return { query: { view: "list" } };
    },
    hideSideNav() {
      this.$store.commit("set", ["sideNavMobile", false]);
      this.$_sys.togleClass("kt_aside", "aside-on", false);
    },

    syncImage(src, name) {
      var path = src.split("/");
      var imageName = src.split("/").pop();
      var imagePath = path.slice(0, path.length - 1).join("/");
      var a = src;
      if (this.openedPrimary === name) {
        var newImageName = imageName.replace("-inactive", "");
        var newImagePath = imagePath + "/" + newImageName;
        a = newImagePath;
      }
      return a;
    },

    hover_handler: function(event, name) {
      // eslint-disable-next-line camelcase
      var target_image = event.target;
      var source = target_image.src;
      source = source.replace("-inactive", "");
      if (this.openedPrimary !== name) {
        target_image.src = source;
      }
    },
    hover_leave_handler: function(event, name) {
      // eslint-disable-next-line camelcase
      var target_image = event.target;
      var source = target_image.src;
      let file = source.substring(source.lastIndexOf("/") + 1);
      let newSvg =
        file.substr(file.lastIndexOf("\\") + 1).split(".")[0] + "-inactive.svg";
      if (this.openedPrimary !== name) {
        target_image.src =
          source.substring(0, source.lastIndexOf("/") + 1) + newSvg;
      }
    }
  }
};
</script>
