<template>
  <div>
    <!-- <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4"> -->
    <!--begin::Item-->
    <!-- <li class="nav-item">
        <a class="btn btn-sm btn-icon btn-success" v-b-toggle.planting-report v-b-tooltip.left title="To do list Penggajian">
          <i class="ri-exchange-dollar-line"></i>
        </a>
      </li> -->
    <!-- <li class="nav-item mt-2">
        <a class="btn btn-sm btn-icon btn-bg-light-success btn-icon-success btn-hover-success" @click="key++" v-b-toggle.planting-report v-b-tooltip.left title="To do list Penggajian">
         <i class="ri-exchange-dollar-line"></i>
        </a>
      </li>
      <li class="nav-item mt-2">
        <a style="writing-mode: vertical-rl;text-orientation: upright;line-height: 1;" class="btn btn-sm btn-success text-uppercase font-weight-bolder" @click="key++" v-b-toggle.planting-report v-b-tooltip.left title="To do list Penggajian">
         GAJI
        </a>
      </li>
      <li class="nav-item mt-2">
        <a style="writing-mode: vertical-rl;text-orientation: upright;line-height: 1;" class="btn btn-sm btn-bg-light-success text-success btn-hover-success text-uppercase" @click="key++" v-b-toggle.planting-report v-b-tooltip.left title="To do list Penggajian">
         Penggajian
        </a>
      </li> -->
    <!--end::Item-->
    <!-- </ul> -->
    <!-- <b-sidebar z-index="1030" id="planting-report" ref="plantingReport" backdrop :backdrop-variant="'light'" shadow
      right no-header body-class="offcanvas offcanvas-right p-10 offcanvas-on no-overflow d-flex flex-column">
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5" kt-hidden-height="56"
        style="">
        <h3 class="font-weight-bold m-0">
          Detail Pohon <small class="text-muted font-size-sm ml-2">penanaman</small>
        </h3>
        <a v-b-toggle.planting-report class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_actions_close">
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <planting-report :refreshKey="key"></planting-report>
    </b-sidebar> -->
  </div>
</template>

<script>
export default {
  name: "aside-right-component",
  components: {},
  data() {
    return {
      plantingDetail: null,
      key: 0
    };
  }
};
</script>

<style></style>
