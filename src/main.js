import Vue from "vue";
import reactiveStorage from "vue-reactive-storage";
import VueMeta from "vue-meta";
import App from "./App.vue";
import "@/assets/styles/index.css";
import router from "./router";
import {
  GUEST_ROLE_NAME,
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
} from "@/js/constants";

Vue.config.productionTip = false;

Vue.use(VueMeta);

Vue.use(reactiveStorage, {
  userRole: GUEST_ROLE_NAME,
});

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.vueClickOutsideEvent = (event) => {
      if (el !== event.target && !el.contains(event.target)) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.vueClickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.vueClickOutsideEvent);
  },
});

Vue.config.errorHandler = function (err, vm, info) {
  vm.$root.$emit(GLOBAL_TOASTER_ERROR_EVENT_NAME, { err, vm, info });
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
