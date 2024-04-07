import Vue from "vue";
import Vuex from "vuex";
import buildModule from "@/modules/_registration.js";
import global from "@/utils/global.js";
Vue.use(Vuex);

const state = {
  sideNavPrimary: false,
  sideNavSecondary: false,
  sideNavMobile: false,
  cart: []
};

const mutations = {
  toggleState(state, variable) {
    state[variable] = !state[variable];
  },
  setOffSidebar(state) {
    state.sideNavSecondary = false;
  },
  set(state, [variable, value, saveLS = false]) {
    Vue.set(state, variable, value);
    if (saveLS) localStorage.setItem(variable, JSON.stringify(value));
  },
  // cart
  setCart(state, cart) {
    state.cart.push(cart);
  },
  deleteCart(state, index) {
    state.cart.filter((item, i) => {
      if (item === index) state.cart.splice(i, 1);
    });
  }
};
const getters = {
  cartLength: state => {
    return state.cart.length;
  },
  getDataCart: state => {
    return state.cart;
  }
};
const actions = {
  async setModule(context) {
    await buildModule.then(res => {
      var allowedModule = [];
      for (var index = 0; index < res.length; index++) {
        // const elm = res[index]
        const elm = Object.assign({}, res[index]); // remove fkin binding
        var tmpRoute = [];
        for (var i = 0; i < elm.routes.length; i++) {
          const r = Object.assign({}, elm.routes[i]); // remove fkin binding
          if (r.meta.permission) {
            if (global.isAllowed(r.meta.permission.read)) tmpRoute.push(r);
          } else tmpRoute.push(r);
        }
        var data = elm;
        data.routes = tmpRoute;
        if (tmpRoute.length > 0) allowedModule.push(data);
      }
      context.commit("set", ["modules", allowedModule, true]);
    });
  },
  async setCart(context, paramCart) {
    context.commit("setCart", paramCart);
  },
  async deleteCart(context, index) {
    context.commit("deleteCart", index);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
