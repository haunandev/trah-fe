const module = {
  config: {
    name: "pengaturan-pengguna",
    svg: "../static/img/icon/menu/presensi.svg",
    desc: "Berisi modul pengaturan akses pengguna.",
    layout: true
  },
  routes: [
    {
      name: "users",
      icon: "ri-user-line",
      path: "/users",
      component: () => import("./users.vue")
    },
    {
      name: "roles",
      icon: "ri-file-user-line",
      path: "/roles",
      component: () => import("./roles.vue")
    },
    {
      name: "role-groups",
      icon: "ri-folder-user-line",
      path: "/role-groups",
      component: () => import("./role-groups.vue")
    },
    {
      name: "tasks",
      icon: "ri-list-check-3",
      path: "/tasks",
      component: () => import("./tasks.vue")
    },
  ]
};
export default module;
