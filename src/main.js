import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import veeValidatePlugins from "./plugins/vee-validate";
import VueTheMask from "vue-the-mask";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "../node_modules/nprogress/nprogress.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTheMask);
app.use(ElementPlus);
app.use(VueAwesomePaginate);
app.use(veeValidatePlugins);
app.mount("#app");
