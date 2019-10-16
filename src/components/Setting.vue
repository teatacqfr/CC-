<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">意向设置</span>
		</mu-appbar>
		<div class="show_top setting">
			<h3>兼职</h3>
			<ul class="clear">
				<li :class="value.has?'active':''" v-for="(value,index) in arrA" :key="index" @click="makeChange('job',index)">{{value.name}}</li>
			</ul>
			<h3>技能任务</h3>
			<ul class="clear">
				<li v-for="(value,index) in arrB" :class="value.has?'active':''" :key="index" @click="makeChange('mission',index)">{{value.name}}</li>
			</ul>
		</div>
		<div class="choose_box">
			<div class="btn_box">
		  		<mu-button full-width color="primary" @click="update">确认</mu-button>
		  	</div>
		</div>
	</div>
</template>
<style scoped>
	.choose_box {margin-top:0.533333rem;}
</style>
<script>
	export default {
		data (){
			return {
				arrB:[
					{name:"创意/设计",id:0,has:false},
					{name:"技术/开发",id:1,has:false},
					{name:"市场/营销",id:2,has:false},
					{name:"综合",id:3,has:false},
				],
				arrA:[
					{name:"设计/美工",id:0,has:false},
					{name:"文员/行政/秘书",id:1,has:false},
					{name:"工作人员/活动控场",id:2,has:false},
					{name:"计算机/编程/网络",id:3,has:false},
					{name:"市场推广/网络推广",id:4,has:false},
					{name:"校园大使/校园代理",id:5,has:false},
					{name:"充场人员",id:6,has:false},
					{name:"模特/礼仪",id:7,has:false},
					{name:"演出",id:8,has:false},
					{name:"翻译",id:9,has:false},
					{name:"编辑",id:10,has:false},
					{name:"家教",id:11,has:false},
					{name:"促销",id:12,has:false},
					{name:"派单",id:13,has:false},
					{name:"客服",id:14,has:false},
					{name:"安保",id:15,has:false},
					{name:"服务员",id:16,has:false},
					{name:"志愿者",id:17,has:false},
					{name:"寒暑假工",id:18,has:false},
				]
			}
		},
		mounted(){
			this.getList();
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			makeChange(type,index){
				if(type=='job'){
					this.arrA[index].has=!this.arrA[index].has;
				}else if(type=='mission'){
					this.arrB[index].has=!this.arrB[index].has;
				}
			},
			getList(){
				let data=localStorage.getItem('setData')
				if(data!='' && data!=null){
					data=JSON.parse(data);
					this.arrA=data.arrA;
					this.arrB=data.arrB;
				}
			},
			update(){
				let data={arrA:this.arrA,arrB:this.arrB};
				data=JSON.stringify(data);

				localStorage.setItem('setData',data)
				this.$alert('','设置成功！', {
	 				okLabel: '确定',
	 			}).then((result, value)=>{
	 				this.$router.go(-1);
	 			})
			},
		}
	}
</script>