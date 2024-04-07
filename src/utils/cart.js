import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// CART MODULE
const cart = {
  namespaced: true,
  state: {
    cart: [],
    cartTotal: 0,
    cartTotalQty: 0
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart;
    }
  },
  getters: {
    getCart(state) {
      return state.cart;
    }
  },
  actions: {
    async setCart() {
      //   context.commit("setCart", cart);
      console.log("Action setCart");
    }
  }
};

export default new Vuex.Store({
  modules: {
    cart
  }
});
