const module = {
  config: {
    name: "dashboard",
    svg: "../static/img/icon/menu/dashboard.svg",
    desc: "Dashboard",
    layout: true
  },
  routes: [
    {
      name: "Dashboard",
      icon: "ri-line-chart-fill",
      path: "/information",
      component: () => import("./dashboard-information/index.vue")
    },
    // {
    //   name: "Dashboard Ser",
    //   icon: "ri-bar-chart-box-fill",
    //   path: "/statistic",
    //   component: () => import("./statistic.vue")
    // },
    // {
    //   // hidden: true,
    //   name: 'dashboard-general',
    //   icon: 'ri-organization-chart',
    //   path: '/dashboard-general',
    //   component: () => import('./dashboard-general.vue')
    // },
    // {
    //   // hidden: true,
    //   name: 'dashboard-pertumbuhan',
    //   icon: 'ri-organization-chart',
    //   path: '/dashboard-pertumbuhan',
    //   component: () => import('./dashboard-pertumbuhan.vue')
    // },
    // {
    //   // hidden: true,
    //   name: 'dashboard-klimatologi',
    //   icon: 'ri-organization-chart',
    //   path: '/dashboard-klimatologi',
    //   component: () => import('./dashboard-klimatologi.vue')
    // }
  ]
};
export default module;
