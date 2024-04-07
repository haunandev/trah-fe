const module = {
  config: {
    name: "family-tree",
    svg: "../static/img/icon/menu/family-tree.svg",
    desc: "Berisi modul pohon keluarga",
    layout: true
  },
  routes: [
    {
      name: "Daftar",
      icon: "ri-map-pin-line",
      path: "/daftar",
      component: () => import("./index.vue"),
      separator: ""
    },
  ]
};
export default module;
