// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/reset.css'
import '@/assets/css/border.css'
import '@/assets/css/iconfont/iconfont.js'
import 'element-ui/lib/theme-chalk/index.css';


import qs from 'qs'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
