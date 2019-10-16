// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import './assets/js/fontSize.js'
import './muse-ui.js'
import axios from 'axios'
import Crypto from 'crypto-js';

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$Crypto = Crypto

const SET_URL = 'http://tease.fancelue.com/';
axios.defaults.baseURL=SET_URL;

require('./assets/style/common.css');
require('./assets/style/index.css');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
