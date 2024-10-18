import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import { createPinia } from "pinia";

import "@/assets/style/style.css";
import "@/assets/style/global.css";

const app = createApp(App);
app.use(Notifications);
app.use(createPinia());
app.use(router);
app.mount("#app");
