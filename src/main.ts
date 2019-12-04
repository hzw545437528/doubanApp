import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./style/common.scss";
import axios from "axios"
import service from "./service/service"
import BScroll from "better-scroll"


import "./global/components.js"

// Vue.component('Icon', () => import("./components/common/Icon-wrap.vue"))

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$service = service
Vue.prototype.$BScroll = BScroll

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



export default vue