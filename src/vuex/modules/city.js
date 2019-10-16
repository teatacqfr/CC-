import {
  UPDATE_CITY
} from '@/vuex/mutations_types'

const state = {
  id:'bXlpVrn3QJ1srouJwsFSjd3JkzBgQGgFx0i4hdY3DRcdplrISs6SYLzokHRdNUX9ob41lO6FMeUtjYouiBllPw',
  name:'杭州',
}

const actions={
	UPDATE_CITY:({commit},city)=>{
		commit('UPDATE_CITY',city);
	},
}

const mutations = {
  // 更新城市
  [UPDATE_CITY](state,city){
		state.id=city.id;
		state.name=city.name;
	},
  
}

export default {
  state,
  actions,
  mutations
}