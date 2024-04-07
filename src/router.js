import Vue from "vue";
import _config from "@/config.js";
import Router from "vue-router";
import LoginPage from "@/default-page/login";
import TermPage from "@/default-page/term-condition";
import PrivacyPage from "@/default-page/privacy-policy";
import RegisterPage from "@/default-page/register";
import VerifyPage from "@/default-page/verify";
import WaitingPage from "@/default-page/waiting";
import ResetPass from "@/default-page/reset-password";

// print
import LabelSeed from "@/default-page/print/label-seed";
import LabelArmada from "@/default-page/print/label-armada";
import LabelPOC from "@/default-page/print/label-poc";
import BASTSeed from "@/default-page/print/bast-seed";
import SuratJalanArmada from "@/default-page/print/surat-jalan-armada";
import DistributionReport from "@/default-page/print/distribution-report";
import DistributionReceivedReport from "@/default-page/print/distribution-received-report";
import BASTSeedCD from "@/default-page/print/bast-seed-custom-distribution";

// addendum distribusi
import RequestDistributionAddendum from '@/default-page/forms/request-distribution-addendum'

Vue.use(Router);

var router = new Router({
  routes: [
    // print/label-seed
    {
      path: "/print/label-seed",
      name: "print-label-seed",
      component: LabelSeed
    },
    // print/label-armada
    {
      path: "/print/label-armada",
      name: "print-label-armada",
      component: LabelArmada
    },
    // print/surat-jalan-armada
    {
      path: "/print/surat-jalan-armada",
      name: "print-surat-jalan-armada",
      component: SuratJalanArmada
    },
    // print/label-poc
    {
      path: "/print/label-poc",
      name: "print-label-poc",
      component: LabelPOC
    },
    // print/bast-seed
    {
      path: "/print/bast-seed",
      name: "print-bast-seed",
      component: BASTSeed
    },
    // print/distribution-report
    {
      path: "/print/distribution-report",
      name: "print-distribution-report",
      component: DistributionReport
    },
    // print/distribution-received-report
    {
      path: "/print/distribution-received-report",
      name: "print-distribution-received-report",
      component: DistributionReceivedReport
    },
    // print/bast-seed-custom-distribution
    {
      path: "/print/bast-seed-custom-distribution",
      name: "print-bast-seed-custom-distribution",
      component: BASTSeedCD
    },

    // forms/request-distribution-addendum
    {
      path: '/forms/request-distribution-addendum',
      name: 'form-request-distribution-addendum',
      component: RequestDistributionAddendum
    },

    {
      path: "/term-condition",
      name: "term-condition",
      component: TermPage
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPage
    },
    {
      path: "/login",
      name: "login-apps",
      component: LoginPage
    },
    {
      path: "/register",
      name: "register-apps",
      component: _config.options.allowRegister ? RegisterPage : LoginPage
    },
    {
      path: "/verify-email",
      name: "verify-apps",
      component: _config.options.allowRegister ? VerifyPage : LoginPage
    },
    {
      path: "/waiting-account",
      name: "waiting-apps",
      component: _config.options.allowRegister ? WaitingPage : LoginPage,
      props: true
    },
    {
      path: "/reset-password",
      name: "reset-apps",
      component: _config.options.forgetPassword ? ResetPass : LoginPage,
      props: _config.options.forgetPassword
        ? route => ({ code: route.query.code, ts: Number(route.query.ts) })
        : true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    localStorage.getItem("modules") !== undefined ||
    localStorage.getItem("modules") !== null
  ) {
    let restricted = [
      "login-apps",
      "privacy-policy",
      "term-condition",
      "register-apps",
      "verify-apps",
      "waiting-apps",
      "reset-apps",
      "form-request-distribution-addendum"
    ];
    if (
      !restricted.includes(to.name) &&
      (localStorage.getItem("_token") === undefined ||
        localStorage.getItem("_token") == null)
    ) {
      console.log("masuk");
      next({ name: "login-apps", replace: true });
    } else {
      if (to.name && from.name) {
        if (to.name !== from.name || to.query.view !== from.query.view) {
          next();
        } else {
          return false;
        }
      } else {
        next();
      }
    }
  } else next({ name: "login-apps", replace: true });
});

export default router;
