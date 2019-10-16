<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">个人简历</span>
		  <span class="ed_save" @click="checkComp">保存</span>
		</mu-appbar>
		<div class="show_top">
			<div class="resume">
				<mu-expansion-panel v-for="(value,index) in arrList" :key="index" :expand="panel==index" @change="toggle(index)">
				    <div slot="header">
				    	<div class="clear resume_box">
				    		<span class="fl title"><em></em>{{value.name}}</span>
				    		<span class="fr info" @click.stop="edit(index,value.name,value.content)">编辑</span>
				    	</div>
				    </div>
				    <div class="re_con">
				    	{{value.content}}
				    </div>
				</mu-expansion-panel>
			</div>
		</div>
	</div>
</template>
<script>
	import { MAIN,app_key,TableCheckCreate,TableFreeQuery,TableFreeUpdate} from '../api/index.js'
	export default {
		data (){
			return {
				have:false,
				panel:-1,
				arrList:[
					{name:"简历名称",content:""},
					{name:"基本信息",content:""},
					{name:"教育经历",content:""},
					{name:"兼职经验",content:""},
					{name:"兼职时间",content:""},
					{name:"技能",content:""},
					{name:"自我评价",content:""}
				],
			}
		},
		mounted(){
			this.checkHas();
		},
		methods:{
			checkComp(){
				let index=-1;
				for (var i = 0; i < this.arrList.length; i++) {
					if(this.arrList[i].content==''){
						index=i;
					}
				}
				if(index==-1){
					let uuid=localStorage.getItem('uuid');
					let data={"title":this.arrList[0].content,"main":this.arrList[1].content,"education":this.arrList[2].content,"experience":this.arrList[3].content,"jTime":this.arrList[4].content,"skill":this.arrList[5].content,"evaluate":this.arrList[6].content,"userId":uuid}
					data=JSON.stringify(data);
					//console.log(data)
					let key='';
					if(!this.have){
						//console.log(11111)
						key=MAIN+'?s='+TableCheckCreate+'&model_name=resume&check_field=userId&app_key='+app_key+'&uuid='+uuid+'&data='+data
					}else{
						//console.log(22222)
						let arr=[["userId","=",uuid]];
						arr=JSON.stringify(arr);
						key=MAIN+'?s='+TableFreeUpdate+'&model_name=resume&app_key='+app_key+'&uuid='+uuid+'&data='+data+'&where='+arr
					}
					this.create(key);
				}else{
					this.$alert('','请确保简历填写完成再保存！', {
		 				okLabel: '确定',
		 			}).then((result, value)=>{
		 				
		 			})
				}
			},
			edit(index,title,content){
				//console.log(index)
				var _this=this;
				this.$prompt('请您输入编辑内容',title, {
	 				okLabel: '确定',
	 				cancelLabel: '取消',
	 				inputValue:content
	 			}).then((result, value)=>{
	 				if(result.result){
	 					this.arrList[index].content=result.value
	 					//console.log(result.value)
	 				}
	 			})
			},
			back(){
				this.$router.go(-1);
			},
			toggle (panel) {
		      this.panel = panel;
		    },
		    checkHas(){
				let uuid=localStorage.getItem('uuid');
				let arr=[["UUID","=",uuid]];
				arr=JSON.stringify(arr);
				//console.log(arr)
				let key=MAIN+'?s='+TableFreeQuery+'&model_name=resume&app_key='+app_key+'&where='+arr+'&uuid='+uuid

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			let num=res.data.data.total;
			 			if(num==0){
			 				_this.have=false;
			 			}else if(num==1){
			 				_this.have=true;
			 				let obj=res.data.data.list[0]
			 				_this.arrList[0].content=obj.title;
			 				_this.arrList[1].content=obj.main;
			 				_this.arrList[2].content=obj.education;
			 				_this.arrList[3].content=obj.experience;
			 				_this.arrList[4].content=obj.jTime;
			 				_this.arrList[5].content=obj.skill;
			 				_this.arrList[6].content=obj.evaluate;
			 			}
			 			//console.log(res.data)
			 		}
			    }).catch(function(err){
			      console.log('检查简历:',err);
			    })
			},
		    create(key){
				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			_this.have=true;
			 			_this.$alert('','简历保存成功！', {
			 				okLabel: '确定',
			 			}).then((result, value)=>{
			 				
			 			})
			 			//console.log(res.data)
			 		}
			    }).catch(function(err){
			      console.log('保存简历:',err);
			    })
			},
		}
	}
</script>