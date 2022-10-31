import { createApp } from "vue";
// import './assets/main.css'
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

axios.defaults.baseURL = "http://127.0.0.1:8000"


createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(LoadingPlugin)
    .mount("#app")
