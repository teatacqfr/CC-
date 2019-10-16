import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import transition from './modules/transition';
import city from './modules/city';


const store = new Vuex.Store({
  modules:{
  	city,
    transition
  }
})

export default store;