<template>
  <div class="bg-white">
    <Navbar />
    <b-container fluid="md">
      <section class="getInvolved-campaignEvent">
        <div class="mt-10 text-center">
          <h1><b>Campaign & Event</b></h1>
        </div>
        <div class="main-body p-0 mt-5 mt-lg-10">
          <div class="inner-wrapper">
            <!-- Inner sidebar -->
            <div class="inner-sidebar">
              <!-- Inner sidebar body -->
              <div class="inner-sidebar-body p-0">
                <div class="p-3 h-100" data-simplebar="init">
                  <div class="simplebar-wrapper" style="margin: -16px;">
                    <div class="simplebar-height-auto-observer-wrapper">
                      <div class="simplebar-height-auto-observer"></div>
                    </div>
                    <div class="simplebar-mask">
                      <div
                        class="simplebar-offset"
                        style="right: 0px; bottom: 0px;"
                      >
                        <div
                          class="simplebar-content-wrapper"
                          style="height: 100%; overflow: hidden scroll;"
                        >
                          <div class="simplebar-content" style="padding: 16px;">
                            <nav
                              class="nav nav-pills nav-gap-y-1 flex-column"
                              v-for="(item, index) in categoryEvents"
                              :key="index"
                            >
                              <span
                                v-on:click="getEvents(item.id)"
                                :class="{
                                  'nav-link nav-link-faded has-icon': true,
                                  active: item.id === activeCategoryEvent
                                }"
                                class="nav-link nav-link-faded has-icon"
                                >{{ item.category_event_name }}</span
                              >
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="simplebar-placeholder"
                      style="width: 234px; height: 292px;"
                    ></div>
                  </div>
                  <div
                    class="simplebar-track simplebar-horizontal"
                    style="visibility: hidden;"
                  >
                    <div
                      class="simplebar-scrollbar"
                      style="width: 0px; display: none;"
                    ></div>
                  </div>
                  <div
                    class="simplebar-track simplebar-vertical"
                    style="visibility: visible;"
                  >
                    <div
                      class="simplebar-scrollbar"
                      style="height: 151px; display: block; transform: translate3d(0px, 0px, 0px);"
                    ></div>
                  </div>
                </div>
              </div>
              <!-- /Inner sidebar body -->
            </div>
            <!-- /Inner sidebar -->

            <!-- Inner main -->
            <div class="inner-main">
              <!-- Inner main header -->
              <div class="inner-main-header">
                <a
                  class="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none"
                  href="#"
                  data-toggle="inner-sidebar"
                  ><i class="material-icons">arrow_forward_ios</i></a
                >
                <!-- reset filter -->
                <a
                  href="#"
                  class="text-muted mr-4"
                  v-if="isResetFilter"
                  v-on:click="resetFilter()"
                  >Reset filter</a
                >

                <span class="input-icon input-icon-sm ml-auto w-auto">
                  <input
                    type="text"
                    class="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4"
                    placeholder="Search"
                  />
                </span>
              </div>
              <!-- /Inner main header -->

              <!-- Inner main body -->

              <!-- Forum List -->
              <div
                class="inner-main-body p-2 p-sm-3 collapse forum-content show"
              >
                <div
                  class="card mb-2"
                  v-for="(item, index) in events"
                  :key="index"
                >
                  <div
                    class="card-body p-2 p-sm-3"
                    v-on:click="getEventDetail(item.id)"
                  >
                    <div class="media forum-item">
                      <a
                        :to="'/campaign-event/' + item.id"
                        data-toggle="collapse"
                        data-target=".forum-content"
                        ><img
                          v-if="item.file_event"
                          :src="item.file_event.url"
                          class="mr-3 img-fluid"
                          width="200"
                          :alt="item.file_event.filename"
                      /></a>
                      <div class="media-body">
                        <h6>
                          <a
                            :to="'/campaign-event/' + item.id"
                            data-toggle="collapse"
                            data-target=".forum-content"
                            class="text-body"
                            >{{ item.event_name }}</a
                          >
                        </h6>
                        <p class="text-muted">
                          {{ item.rel_category_event_id }}
                        </p>
                        <p class="text-secondary short-description">
                          {{ item.event_description }}
                        </p>
                        <p class="text-muted">
                          <a href="javascript:void(0)">drewdan</a> replied
                          <span class="text-secondary font-weight-bold"
                            >13 minutes ago</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Forum List -->

              <!-- /Inner main body -->
            </div>
            <!-- /Inner main -->
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
  name: "GetInvolved-Campaign-Event",
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      categoryEvents : [
      ],
      events : [],
      isResetFilter : false,
      isActive : false,
      activeCategoryEvent : ""
    };
  },
  methods: {
      async getEvents(categoryEventId = ""){
      this.isResetFilter = categoryEventId ? true : false;
      this.activeCategoryEvent = categoryEventId;
       let filters = {};
       if(categoryEventId){
          filters = {
            category_event_id : categoryEventId
          }
       }
       await this.$_api.get('public/event',{
          filters
       }).then((response) => {
          this.events = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      async getCategoryEvents(){
        await this.$_api.get('public/category-event').then((response) => {
          this.categoryEvents = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      resetFilter(){
        this.getEvents();
      },
      getEventDetail(id){
        this.$router.push({ name: 'get-involved-campaignEvent-detail', params: { id: id } });
      }
  },
  mounted() {
    this.getEvents();
    this.getCategoryEvents();
  }
};
</script>

<style scoped>
.inner-wrapper {
  position: relative;
  height: calc(100vh - 3.5rem);
  transition: transform 0.3s;
}
@media (min-width: 992px) {
  .sticky-navbar .inner-wrapper {
    height: calc(100vh - 3.5rem - 48px);
  }
}

.inner-main,
.inner-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.inner-sidebar {
  left: 0;
  width: 235px;
  border-right: 1px solid #cbd5e0;
  background-color: #fff;
  z-index: 1;
}
.inner-main {
  right: 0;
  left: 235px;
}
.inner-main-footer,
.inner-main-header,
.inner-sidebar-footer,
.inner-sidebar-header {
  height: 3.5rem;
  border-bottom: 1px solid #cbd5e0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  flex-shrink: 0;
}
.inner-main-body,
.inner-sidebar-body {
  padding: 1rem;
  overflow-y: auto;
  position: relative;
  flex: 1 1 auto;
}
.inner-main-body .sticky-top,
.inner-sidebar-body .sticky-top {
  z-index: 999;
}
.inner-main-footer,
.inner-main-header {
  background-color: #fff;
}
.inner-main-footer,
.inner-sidebar-footer {
  border-top: 1px solid #cbd5e0;
  border-bottom: 0;
  height: auto;
  min-height: 3.5rem;
}
@media (max-width: 767.98px) {
  .inner-sidebar {
    left: -235px;
  }
  .inner-main {
    left: 0;
  }
  .inner-expand .main-body {
    overflow: hidden;
  }
  .inner-expand .inner-wrapper {
    transform: translate3d(235px, 0, 0);
  }
}

.nav .show > .nav-link.nav-link-faded,
.nav-link.nav-link-faded.active,
.nav-link.nav-link-faded:active,
.nav-pills .nav-link.nav-link-faded.active,
.navbar-nav .show > .nav-link.nav-link-faded {
  color: #3367b5;
  background-color: #c9d8f0;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #467bcb;
}
.nav-link.has-icon {
  display: flex;
  align-items: center;
}
.nav-link.active {
  color: #467bcb;
}
.nav-pills .nav-link {
  border-radius: 0.25rem;
}
.nav-link {
  color: #4a5568;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}
.short-description {
  overflow: hidden;
  line-height: 2rem;
  max-height: 8rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
</style>
