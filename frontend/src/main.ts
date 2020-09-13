import "es6-promise/auto";
import "vue-material/dist/theme/default.css";
import "vue-material/dist/vue-material.min.css";

import { createApp } from "vue";
import Vuex from "vuex";

import App from "./App.vue";

Vue.use(Vuex);
createApp(App).mount("#app");
