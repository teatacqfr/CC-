<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">历史接单</span>
		</mu-appbar>
		<div class="show_top">
			<ul class="job_list history">
				<mu-expansion-panel v-for="(value,index) in arrList" :key="index" :expand="panel==index" @change="toggle(index)">
				    <div slot="header">
				    	<li class="clear">
						  	<div class="fl job_con">
						  		<div class="clear">
						  			<p class="no_break title fl">{{value.title}}</p>
						  		</div>
						  		<span><span class="money">{{parseFloat(value.salary).toFixed(2)}}</span>元<span v-if="value.salaryUnitName!=''">/{{value.salaryUnitName}}</span></span>
						  		
						  	</div>
				        </li>
				    </div>
				    <div>
				    	<p class="clear">
				  			<mu-badge :content="value.areaName" color="primary" class="fl"></mu-badge>
				  			<mu-badge :content="value.jobType" color="primary" class="fl"></mu-badge>
				  			<router-link :to="'/detail/'+value.totType+','+value.jobId" class="fr check">查看详情</router-link>
				  		</p>
				  		<div class="step_box">
				  			<mu-stepper :active-step="parseFloat(value.jobStatus)" orientation="vertical">
							    <mu-step>
							      <mu-step-label>
							        成功报名
							      </mu-step-label>
							    </mu-step>
							    <mu-step>
							      <mu-step-label>
							        等待录用
							      </mu-step-label>
							    </mu-step>
							    <mu-step>
							      <mu-step-label>
							        等待完成
							      </mu-step-label>
							    </mu-step>
							    <mu-step>
							      <mu-step-label>
							        等待结算
							      </mu-step-label>
							    </mu-step>
							</mu-stepper>
				  		</div>
				  		<div class="clear ac_box">
				  			<span class="fl">发布时间：{{value.jTime}}</span>
				  			<mu-button class="fr" color="primary" @click="confirmDe(value.id,index)">取消报名</mu-button>
				  		</div>
				    </div>
				</mu-expansion-panel>
			</ul>
		</div>
	</div>
</template>
<script>
	import { MAIN,app_key,TableDelete,TableFreeQuery} from '../api/index.js'
	export default {
		data(){
			return {
				arrList:[],
				activeStep:1,
				panel:-1,
			}
		},
		mounted(){
			this.getList();
		},	
		methods:{
			back(){
				this.$router.go(-1);
			},
			toggle (panel) {
		      this.panel = panel;
		    },
		    getList(){
				let uuid=localStorage.getItem('uuid');
				let arr=[["uuid","=",uuid]];
				arr=JSON.stringify(arr);
				//console.log(arr)
				let key=MAIN+'?s='+TableFreeQuery+'&model_name=enroll&app_key='+app_key+'&perpage=10&where='+arr+'&uuid='+uuid

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			_this.arrList=res.data.data.list;
			 			//console.log(res.data.data.list)
			 		}
			    }).catch(function(err){
			      console.log('接单列表:',err);
			    })
			},
			confirmDe(dataId,index){
				var _this=this;
				this.$confirm('您确定要取消报名吗？','取消报名', {
	 				okLabel: '确定',
	 				cancelLabel: '取消',
	 			}).then((result, value)=>{
	 				if(result.result){
	 					_this.deleteEn(dataId,index)
	 				}
	 			})
			},
		    deleteEn(dataId,index){
		    	let uuid=localStorage.getItem('uuid');
				let key=MAIN+'?s='+TableDelete+'&model_name=enroll&app_key='+app_key+'&id='+dataId+'&uuid='+uuid;

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			//_this.arrList=res.data.data.list;
			 			//console.log(res.data.data)
			 			_this.arrList.splice(index, 1);
			 			_this.panel=-1;
			 		}
			    }).catch(function(err){
			      console.log('取消报名:',err);
			    })
			},
		}
	}
</script>