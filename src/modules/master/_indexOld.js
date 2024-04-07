const module = {
  config: {
    name: "master",
    svg: "../static/img/icon/menu/master.svg",
    desc: "Berisi modul master data untuk kebutuhan data transaksi",
    layout: true
  },
  routes: [
    {
      name: "Lokasi Persemaian",
      icon: "ri-map-pin-line",
      path: "/location-nursery",
      component: () => import("./nursery/location-nursery.vue"),
      separator: "Lokasi"
    },
    {
      name: "Blok Persemaian",
      icon: "ri-map-2-fill",
      path: "/block-nursery",
      component: () => import("./nursery/block-nursery.vue"),
      separator: "Lokasi"
    },
    {
      name: "Bedeng Persemaian",
      icon: "ri-barricade-fill",
      path: "/bedeng-nursery",
      component: () => import("./nursery/bedeng-nursery.vue"),
      separator: "Lokasi"
    },
    // {
    //   name: "Pengawas",
    //   icon: "ri-group-line",
    //   path: "/freelance-supervisor",
    //   component: () => import("./vendor/freelance-supervisor.vue"),
    //   separator: "Pekerja"
    // },
    {
      name: "Pekerja Lepas",
      icon: "ri-team-line",
      path: "/vendor-freelance",
      component: () => import("./vendor/freelance.vue"),
      separator: "Pekerja"
    },
    // {
    //   name: "Keahlian",
    //   icon: "ri-open-arm-line",
    //   path: "/vendor-freelance-skill",
    //   component: () => import("./vendor/freelance-skill.vue"),
    //   separator: "Pekerja Lepas"
    // },
    {
      name: "Vendor Transportasi",
      icon: "ri-truck-line",
      path: "/vendor-transportation",
      component: () => import("./vendor/transportation.vue"),
      separator: "Daftar Vendor"
    },
    // {
    //   name: "Sopir",
    //   icon: "ri-steering-line",
    //   path: "/vendor-driver",
    //   component: () => import("./vendor/driver.vue"),
    //   separator: "Transportasi"
    // },
    // {
    //   name: "Kendaraan",
    //   icon: "ri-truck-line",
    //   path: "/vendor-vehicle",
    //   component: () => import("./vendor/vehicle.vue"),
    //   separator: "Transportasi"
    // },
    {
      name: "Vendor Bibit",
      icon: "ri-building-2-line",
      path: "/trees-vendor",
      component: () => import("./trees/vendor/index.vue"),
      separator: "Daftar Vendor"
    },
    // {
    //   name: "Bibit Tersedia",
    //   icon: "ri-building-2-line",
    //   path: "/trees-vendor-seeds",
    //   component: () => import("./trees/vendor/vendor-seeds.vue"),
    //   separator: "Vendor Bibit"
    // },
    // {
    //   name: "Riwayat Rating",
    //   icon: "ri-building-2-line",
    //   path: "/trees-log-rating-vendors",
    //   component: () => import("./trees/vendor/log-rating-vendors.vue"),
    //   separator: "Vendor Bibit"
    // },
    {
      name: "Kendaraan Internal",
      icon: "ri-car-line",
      path: "/master-vehicle-internal",
      component: () => import("./assets/vehicle-internal.vue"),
      separator: "Assets"
    },
    {
      name: "Plant Library",
      icon: "ri-plant-line",
      path: "/trees-main",
      component: () => import("./trees/main.vue"),
      separator: "Tanaman"
    },
    {
      name: "Bagian Tanaman",
      icon: "ri-node-tree",
      path: "/trees-part",
      component: () => import("./trees/part-tree.vue"),
      separator: "Tanaman"
    },
    {
      name: "Tipe Tanaman",
      icon: "ri-leaf-line",
      path: "/trees-type",
      component: () => import("./trees/type.vue"),
      separator: "Tanaman"
    },
    {
      name: "Hama & Penyakit",
      icon: "ri-bug-line",
      path: "/trees-pest",
      component: () => import("./trees/pest.vue"),
      separator: "Tanaman"
    },
    {
      name: "Perlakuan",
      icon: "ri-robot-line",
      path: "/trees/treatment-skill",
      component: () => import("./trees/treatment-skill.vue"),
      separator: "Benih & Bibit"
    },
    {
      name: "Satuan Unit Benih",
      icon: "ri-dropbox-line",
      path: "/trees/unit-seed",
      component: () => import("./trees/unit-seed.vue"),
      separator: "Benih & Bibit"
    },
    {
      name: "Pestisida, Nutrisi & Pupuk",
      icon: "ri-dropbox-line",
      path: "/master-material",
      component: () => import("./material/material.vue"),
      separator: "Material"
    },
    // {
    //   name: "Aktifitas",
    //   icon: "ri-dropbox-line",
    //   path: "/trees/activity",
    //   component: () => import("./trees/activity.vue"),
    //   separator: "Benih & Bibit"
    // },
    // {
    //   name: "Kategori Pengadaan Bibit",
    //   icon: "ri-checkbox-multiple-blank-line",
    //   path: "/trees/category-seed",
    //   component: () => import("./trees/category-seed.vue"),
    //   separator: "Tanaman"
    // },
    {
      name: "Kapasitas Bibit Per Bag",
      icon: "ri-building-3-line",
      path: "/trees-allocation-bag",
      component: () => import("./trees/allocation-bag.vue"),
      separator: "Distribusi"
    },
    {
      name: "Management Unit",
      icon: "ri-road-map-line",
      path: "/working-area-management-unit",
      component: () => import("./working-area/management-unit.vue"),
      separator: "Area Kerja"
    },
    {
      name: "Sponsor",
      icon: "ri-money-dollar-circle-line",
      path: "/master-sponsor",
      component: () => import("./project/sponsor.vue"),
      separator: "Projek Penanaman"
    },
    {
      name: "Project",
      icon: "ri-patreon-line",
      path: "/master-custom-project",
      component: () => import("./project/custom-project.vue"),
      separator: "Projek Penanaman"
    },
    // {
    //   name: "Desa",
    //   icon: "ri-price-tag-2-line",
    //   path: "/working-area-master-villages",
    //   component: () => import("./working-area/master-villages.vue"),
    //   separator: "Area Kerja"
    // }
  ]
};
export default module;
