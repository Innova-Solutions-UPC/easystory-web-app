import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import StyleClass from "primevue/styleclass";
import "./assets/styles/layout.css";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.directive("styleclass", StyleClass);
app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.component("Dialog", Dialog);

app.mount("#app");
