<template>
	<div>
		<mu-appbar color="primary">
		  <span slot="default">技能任务</span>
		</mu-appbar>
		<div class="show_top show_btm">
			<ul class="clear select_list">
				<li :class="active==index?'fl active':'fl'" v-for="(value,index) in arrList" :key="index" @click="selectPro(index)" >
					{{value}}<mu-icon value="arrow_drop_up" v-if="popupVisible&&active==index"></mu-icon><mu-icon value="arrow_drop_down" v-else></mu-icon>
				</li>
			</ul>
			<NorList :sort="sortCN" :filter="filterCN" :typeId="typeIdCN"></NorList>
			<mt-popup
			  v-model="popupVisible"
			  :closeOnClickModal="false"
			  position="top">
			  <div class="choose_box clear">
			  	<div v-for="(value,index) in cosArrA" :key="index" class="fl" v-if="active==0">
			  		<mu-radio  :value="value.label" v-model="sort" :label="value.name"></mu-radio>
			  	</div>
			  	<div v-for="(value,index) in cosArrB" :key="index" class="fl" v-if="active==1">
			  		<mu-radio  :value="value.label" v-model="filter" :label="value.name"></mu-radio>
			  	</div>
			  	<div v-for="(value,index) in cosArrC" :key="index" class="fl" v-if="active==2">
			  		<mu-radio  :value="value.jobCateId" v-model="typeId" :label="value.jobCateName"></mu-radio>
			  	</div>
			  	<div class="clear"></div>
			  	<div class="btn_box">
			  		<mu-button full-width color="primary" @click="sureCh">确认</mu-button>
			  	</div>
			  </div>
			</mt-popup>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import NorList from './NorList.vue'
	export default {
		data(){
			return {
				sort:'new',
				sortCN:'new',
				cosArrA:[{
					name:'最近发布',
					label:'new'
				},{
					name:'赏金最高',
					label:'salary',
				},{
					name:'关注最多',
					label:'focus'
				}],
				filter:'all',
				filterCN:'all',
				cosArrB:[{
					name:'所有',
					label:'all'
				},{
					name:'认证企业',
					label:'enterprise'
				}],
				typeId:'',
				typeIdCN:'',
				cosArrC:[{jobCateId: '', jobCateName: "所有"},{jobCateId: 1, jobCateName: "设计/创意"}, {jobCateId: 2, jobCateName: "技术/开发"},{jobCateId: 3, jobCateName: "市场/营销"}, {jobCateId: 4, jobCateName: "综合"}],
				active:-1,
				popupVisible:false,
				arrList:['排序','筛选','类别']
			}
		},
		components:{
			NorList
		},
		computed:{
		    ...mapState({
		      cityId: state => state.city.id
		    }),
		    ...mapState({
		      cityName: state => state.city.name
		    }),
		},
		mounted(){
			
		},
		methods:{
			sureCh(){
				this.popupVisible=false;
				this.sortCN=this.sort;
				this.filterCN=this.filter;
				this.typeIdCN=this.typeId;
				this.active=-1;
			},
			selectPro(index){
				this.popupVisible=true;
				this.active=index;
			},
			
		}
	}
</script>