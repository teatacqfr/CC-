<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">技能任务指南</span>
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
					{question:"什么是技能任务？",answer:"技能任务是针对短频、专业需求而推出的一站式众包服务，您可利用自身专业技能，在平台上完成设计、开发、文案写作等商家需求，赚取高额赏金，并有效提高自身的专业技能。"},
					{question:"参与技能任务流程是什么？",answer:"报名技能任务前，您需要完善个人简历，雇主会根据投递的简历，择优录用进行合作。当雇主选中您后，按照雇主要求完成项目即可获得赏金。"},
					{question:"报名技能任务有什么限制要求？",answer:"技能任务面向所有用户开放，只要您有一技之长，在平台上有感兴趣的技能任务都可以进行报名。在雇主录用您后，需要积极的配合雇主完成项目，如因为自身原因无法完成项目而未于雇主沟通，可能会影响您的信誉值，后续将无法报名其他技能任务。"},
					{question:"怎么完成技能任务？",answer:"当雇主选中录用您以后，将与您进一步沟通项目细节，您根据雇主的要求进行工作，将完成的项目稿件通过平台或者邮件发送给雇主验收。当雇主确认您所做项目符合要求后，会将佣金发放到您的账户中。"},
					{question:"需要注意哪方面问题？",answer:"参与技能任务过程中简历完善度比较高将会提高被录用几率，在被录用后，完成项目过程中，跟雇主沟通交稿过程中，在未确认合格前，请勿轻易将项目原稿件发送给雇主，尽量采用截图形式发送给雇主，以免造成不必要的损失。"},
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