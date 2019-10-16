<template>
	<div>
		<mu-appbar color="primary">
		  <router-link icon tag="span" slot="left" to="/city">
		    <mu-icon value="place"></mu-icon>
		    <span class="point">{{cityName}}<mu-icon value="expand_more"></mu-icon></span>
		  </router-link>
		  <span slot="default">全部兼职</span>
		</mu-appbar>
		<div class="show_top show_btm">
			<ul class="clear select_list">
				<li :class="active==index?'fl active':'fl'" v-for="(value,index) in arrList" :key="index" @click="selectPro(index)" >
					{{value}}<mu-icon value="arrow_drop_up" v-if="popupVisible&&active==index"></mu-icon><mu-icon value="arrow_drop_down" v-else></mu-icon>
				</li>
			</ul>
			<NorList :cityId="cityId" :sort="sortCN" :filter="filterCN" :typeId="typeIdCN"></NorList>
			<mt-popup
			  v-model="popupVisible"
			  :closeOnClickModal="false"
			  position="top">
			  <div class="choose_box clear">
			  	<div v-for="(value,index) in cosArrA" :key="index" class="fl" v-if="active==0">
			  		<mu-radio  :value="value.label" v-model="sortTypeId" :label="value.name"></mu-radio>
			  	</div>
			  	<div v-for="(value,index) in cosArrB" :key="index" class="fl" v-if="active==1">
			  		<mu-radio  :value="value.label" v-model="filterType" :label="value.name"></mu-radio>
			  	</div>
			  	<div v-for="(value,index) in cosArrC" :key="index" class="fl" v-if="active==2">
			  		<mu-radio  :value="value.id" v-model="jobTypeId" :label="value.name"></mu-radio>
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
				sortTypeId:1,
				sortCN:1,
				radioA:'最近发布',
				cosArrA:[{
					name:'最近发布',
					label:1
				},{
					name:'赏金最高',
					label:2,
				},{
					name:'关注最多',
					label:3
				}],
				filterType:'all',
				filterCN:'all',
				cosArrB:[{
					name:'所有',
					label:'all'
				},{
					name:'认证企业',
					label:'enterprise'
				},{
					name:'周末兼职',
					label:'week'
				}],
				cosArrC:[
					{name:"设计/美工",id:0},
					{name:"文员/行政/秘书",id:1},
					{name:"工作人员/活动控场",id:2},
					{name:"计算机/编程/网络",id:3},
					{name:"市场推广/网络推广",id:4},
					{name:"校园大使/校园代理",id:5},
					{name:"充场人员",id:6,},
					{name:"模特/礼仪",id:7},
					{name:"演出",id:8},
					{name:"翻译",id:9},
					{name:"编辑",id:10},
					{name:"家教",id:11},
					{name:"促销",id:12},
					{name:"派单",id:13},
					{name:"客服",id:14},
					{name:"安保",id:15},
					{name:"服务员",id:16},
					{name:"志愿者",id:17},
					{name:"寒暑假工",id:18},
				],
				jobTypeId:'',
				typeIdCN:'',
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
				this.sortCN=this.sortTypeId;
				this.filterCN=this.filterType;
				this.typeIdCN=this.jobTypeId;
				this.active=-1;
			},
			selectPro(index){
				this.popupVisible=true;
				this.active=index;
			},
			
		}
	}
</script>