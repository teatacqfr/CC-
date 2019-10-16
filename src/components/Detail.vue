<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">详情</span>
		</mu-appbar>
		<div class="show_top detail show_btm">
			<div class="top" v-if="type=='mission'">
				<h3 class="title"><span class="con no_break">{{data.title}}</span><span class="status">{{data.statusName}}</span></h3>
				<p class="money clear">
					<span class="fl">{{parseFloat(data.salary).toFixed(2)}}元</span>
					<span class="fr">{{data.limitedTime}}</span>
				</p>
				<p class="info clear">
					<span class="small fl">{{data.jobCate}}</span>
					<span class="small fl">{{data.period}}</span>
					<span class="small fl">{{data.views}}次浏览</span>
					<span class="fr">发布：{{data.publishTime}}</span>
				</p>
			</div>
			<div class="top" v-if="type=='job'">
				<h3 class="title"><span class="con job_con no_break">{{job.title}}</span></h3>
				<p class="money clear">
					<span class="fl">{{parseFloat(job.salary).toFixed(2)}}元/{{job.salaryUnitName}}</span>
				</p>
				<p class="info clear">
					<span class="small fl">{{job.hiringNumbers}}人</span>
					<span class="small fl">{{job.sexLimit}}</span>
					<span class="small fl">{{job.views}}次浏览</span>
					<span class="fr">发布：{{job.refreshTime}}</span>
				</p>
			</div>
			<div class="line10"></div>
			<h3 class="mTitle"><em></em><span>描述</span></h3>
			<pre v-html="data.description" class="content" v-if="type=='mission'"></pre>
			<pre v-html="job.description" class="content" v-if="type=='job'"></pre>
			<div v-if="type=='job'">
				<div class="line10"></div>
				<h3 class="mTitle"><em></em><span>工作地址</span></h3>
				<div class="address">
					<p>{{job.address}}</p>
				</div>
			</div>
			<div class="line10"></div>
			<h3 class="mTitle"><em></em><span>企业</span></h3>
			<div class="company clear" v-if="type=='mission'">
				<div class="fl avatar_box">
					<mu-avatar>
				      <img :src="data.sellerInfo.companyLogo">
				    </mu-avatar>
				</div>
				<div class="fl msg_box">
					<p class="title">{{data.sellerInfo.companyName}}</p>
					<p>
					<span>规模：{{data.sellerInfo.companySize}}</span>
					<span>地址：{{data.sellerInfo.companyAddress}}</span>
					</p>
				</div>
			</div>
			<div class="company clear" v-if="type=='job'">
				<div class="fl avatar_box">
					<mu-avatar>
				      <img :src="seller.companyLogo">
				    </mu-avatar>
				</div>
				<div class="fl msg_box">
					<p class="title">{{seller.companyName}}</p>
					<p>
					<span>规模：{{seller.companySize}}</span>
					<span>地址：{{seller.companyAddress}}</span>
					</p>
				</div>
			</div>
			<div class="btn_box clear">
				<div class="four fl">
					<mu-button full-width color="error" @click="confirmJu">举报</mu-button>
				</div>
				<!-- <div class="four fl">
					<mu-button full-width color="primary">收藏</mu-button>
				</div> -->
				<div class="two fl">
					<mu-button full-width color="primary" @click="checkHas">立即报名</mu-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { MAIN,app_key,TableFreeQuery,TableCreate} from '../api/index.js'
	export default {
		data () {
			return {
				data:{title:'',statusName:'',salary:0,limitedTime:'',jobCate:'',period:'',views:'',publishTime:'',description:'',sellerInfo:{companyName:'',companyAddress:'',companySize:'',companyLogo:''}},
				type:'',
				Id:'',
				job:{},
				seller:{},
			}
		},
		mounted(){
			this.getDetail();
		},
		methods:{
			confirmJu(){
				var _this=this;
				this.$prompt('请您输入举报的原因','举报', {
	 				okLabel: '确定',
	 				cancelLabel: '取消',
	 			}).then((result, value)=>{
	 				if(result.result){
	 					//console.log(result.value)
	 					this.jubao(result.value)
	 				}
	 			})
			},
			jubao(msg){
				let uuid=localStorage.getItem('uuid');
				let data={jobId:this.Id,msg:msg}
				data=JSON.stringify(data);
				//console.log(arr)
				let key=MAIN+'?s='+TableCreate+'&model_name=jubao&app_key='+app_key+'&data='+data

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			//console.log(res.data)
			 			if(res.data.data.err_code==0){
			 				_this.$alert('','举报成功，请耐心等待平台处理！', {
				 				okLabel: '确定',
				 			}).then((result, value)=>{
				 				
				 			})
			 			}
			 		}
			    }).catch(function(err){
			      console.log('举报:',err);
			    })
			},
			checkHas(){
				let uuid=localStorage.getItem('uuid');
				let arr=[["UUID","=",uuid],["jobId","=",this.Id]];
				arr=JSON.stringify(arr);
				//console.log(arr)
				let key=MAIN+'?s='+TableFreeQuery+'&model_name=enroll&app_key='+app_key+'&where='+arr+'&uuid='+uuid

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			let num=res.data.data.total;
			 			if(num==0){
			 				_this.enroll();
			 			}else if(num==1){
			 				_this.$alert('','已报名，请不要重复点击', {
				 				okLabel: '确定',
				 			}).then((result, value)=>{
				 				
				 			})
			 			}
			 			
			 		}
			    }).catch(function(err){
			      console.log('检查报名:',err);
			    })
			},
			enroll(){
				let uuid=localStorage.getItem('uuid');
				let title='';
				let jTime='';
				let totType='';
				let salary='';
				let salaryUnitName='';
				let jobId='';

				let areaName='';
				let jobType='';

				if(this.type=='job'){
					totType=this.type;
					jTime=this.job.refreshTime;
					title=this.job.title;
					salaryUnitName=this.job.salaryUnitName;
					salary=this.job.salary;
					areaName=this.job.areaName;
					jobType=this.job.jobType;
					jobId=this.job.id;
				}else if(this.type=='mission'){
					totType=this.type;
					jTime=this.data.publishTime;
					title=this.data.title;
					salary=this.data.salary;
					areaName=this.data.period;
					jobType=this.data.jobCate;
					jobId=this.data.privateJobId
				}
				//console.log(TableCreate)
				let data={
					totType:totType,
					jTime:jTime,
					title:title,
					salary:salary,
					salaryUnitName:salaryUnitName,
					areaName:areaName,
					jobType:jobType,
					jobId:jobId
				}
				data=JSON.stringify(data);
				//console.log(data);
				let key=MAIN+'?s='+TableCreate+'&model_name=enroll&app_key='+app_key+'&uuid='+uuid+'&data='+data

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			let data=res.data.data;
			 			if(data.err_code==0){
			 				_this.$alert('','已报名，请耐心等待商家联系！', {
				 				okLabel: '确定',
				 			}).then((result, value)=>{
				 				if(result){
				 					_this.$router.push({path:'/history'})
				 				}
				 			})
			 			}
			 		}
			    }).catch(function(err){
			      console.log('报名:',err);
			    })
			},
			back(){
				this.$router.go(-1);
			},
			getDetail(){
				let msg=this.$route.params.id;
				let type='';
				let id='';
				let key='';
				if(msg){
					type=msg.split(',')[0];
					id=msg.split(',')[1];
					this.type=type;
					this.Id=id;
				}
				if(type=='job'){
					key='https://api-upc.kdjz.com/v1/jobs/'+id
				}else if(type=='mission'){
					key='https://api-upc.kdjz.com/v1/private-jobs/'+id
				}
				//console.log(id)
				key=escape(key)
				var _this=this;
				var url='Res/Json?res='
				
			 	this.$http.get(url+key).then(function(res){
			 		//console.log(res.data.data)
			 		if(res.status==200){
			 			if(type=='mission'){
			 				_this.data=res.data.data.privateJobInfo;
			 			}else if(type=='job'){
			 				_this.job=res.data.data.job;
			 				_this.seller=res.data.data.seller;
			 			}
			 			
			 		}
			    }).catch(function(err){
			      console.log('详情页:',err);
			    })
			}
		}
	}
</script>