import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";
import "./shared/assets/styles/layout.css";
import router from "./shared/router";

import "./shared/assets/main.css";
//PRIME VUE COMPONENTS
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import Chip from 'primevue/chip';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from "primevue/dropdown";



import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './shared/assets/main.css'
import 'animate.css';
import Chips from "primevue/chips";
import VirtualScroller from "primevue/virtualscroller";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";

const app = createApp(App);

app.directive("styleclass", StyleClass);

app.use(PrimeVue, {inputStyle: 'filled'});
app.use(createPinia());
app.use(router);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Editor', Editor);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.component('Chips', Chips);
app.component('Image', Image);
app.component('FileUpload', FileUpload);
app.component('ScrollPanel', ScrollPanel);
app.component("Dialog", Dialog);
app.component('Dropdown', Dropdown)
app.component('VirtualScroller', VirtualScroller);


app.mount("#app");
