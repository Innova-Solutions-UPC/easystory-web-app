import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";
import "./shared/assets/styles/layout.css";
import router from "./shared/plugins/router";
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import "./shared/assets/main.css";
//PRIME VUE COMPONENTS

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import Chip from 'primevue/chip';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from "primevue/dropdown";



import 'primeicons/primeicons.css';
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './shared/assets/main.css'
import 'animate.css';


import appController from "@/shared/models/Controller";
import Checkbox from "primevue/checkbox";
import Password from "primevue/password";

import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Skeleton from 'primevue/skeleton';
//Highchart library
import HighchartsVue from 'highcharts-vue'

import Chips from "primevue/chips";
import VirtualScroller from "primevue/virtualscroller";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "primevue/breadcrumb";
import ProgressSpinner from "primevue/progressspinner";
import Avatar from "primevue/avatar";
import SpeedDial from "primevue/speeddial";
import {QuillEditor} from "@vueup/vue-quill";
import i18n from './shared/plugins/i18n/i18n';



import firebase from "firebase/compat";
const firebaseConf = {
    apiKey: "AIzaSyDKMM9J-mMiEBaX1-wmPhS27AgA_akTokE",
    authDomain: "easy-story-5040d.firebaseapp.com",
    projectId: "easy-story-5040d",
    storageBucket: "easy-story-5040d.appspot.com",
    messagingSenderId: "454108586040",
    appId: "1:454108586040:web:4151ee0dcea934fac446cd",
    measurementId: "G-0EGZHXZLMX"
}
firebase.initializeApp(firebaseConf);
// @ts-ignore
//const analytics = getAnalytics(firebaseConf);

const app = createApp(App);

app.directive("styleclass", StyleClass);

app.use(PrimeVue, {inputStyle: 'filled'});
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.use(i18n);
// @ts-ignore
app.use(HighchartsVue);
app.use(autoAnimatePlugin);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Editor', Editor);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.component('Chips', Chips);
app.component('Textarea', Textarea);
app.component('Image', Image);
app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload);
app.component('ScrollPanel', ScrollPanel);
app.component("Dialog", Dialog);

app.component('Checkbox', Checkbox);
app.component('Password', Password)
app.component('Toast', Toast)
app.provide('appController', appController )
app.component('Breadcrumb', Breadcrumb)
app.component('Avatar', Avatar);

app.component('Dropdown', Dropdown)
app.component('SpeedDial', SpeedDial)
app.component('QuillEditor', QuillEditor);
app.component('VirtualScroller', VirtualScroller);
app.component('Skeleton', Skeleton);

app.mount("#app");
