<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">常见问题</span>
		</mu-appbar>
		<div class="show_top">
			<div class="introduce" v-for="(value,index) in arrList" :key="index">
				<h3>{{index+1}}. {{value.question}}</h3>
				<p>{{value.answer}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				arrList:[
					{question:"报名兼职是否收费？",answer:"本兼职平台对于报名用户是不收取任何费用的，建议您报名时尽量完善资料更容易被录取。"},
					{question:"兼职可靠吗？",answer:"本兼职平台所有兼职都是经过严格审核后上架，如果遇到个别收费情况，请果断拒绝并联系客服举报。"},
					{question:"报名兼职后该怎么做？",answer:"投递简历后商家会收到您的报名信息，如果您符合商家的招聘要求，商家会主动与您联系。"},
					{question:"报名后如何查看兼职动态？",answer:"报名后可以在 我的-历史接单 中查看兼职状态"},
					{question:"兼职工资如何结算？",answer:"兼职都是由商家发布的，具体结算方式是由发布兼职的商家决定。"},
				]
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			}
		}
	}
</script>