<template>
	<div>
		<mu-appbar color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">注册</span>
		</mu-appbar>
		<div class="show_top">
			<div class="reg_box">
				<span class="lf_box">用户名</span>
				<mu-text-field v-model="username" placeholder="请输入用户名" prop="username"></mu-text-field>
			</div>
			<div class="reg_box">
				<span class="lf_box">密码</span>
				<mu-text-field v-model="psd1" 
				placeholder="请输入密码"
				:actionIcon="visibility1 ? 'visibility' : 'visibility_off'" :actionClick="change1" 
				:type="visibility1 ? 'text' : 'password'">
				</mu-text-field>
			</div>
			<div class="reg_box">
				<span class="lf_box">确认密码</span>
				<mu-text-field v-model="psd2" 
				placeholder="请再次输入密码"
				:actionIcon="visibility2 ? 'visibility' : 'visibility_off'" :actionClick="change2" 
				:type="visibility2 ? 'text' : 'password'">
				</mu-text-field>
			</div>
			<div class="choose_box">
				<div class="btn_box ">
					<mu-button v-if="username!='' && psd1!='' && psd2!=''" color="primary" full-width @click="register">注册</mu-button>
					<mu-button v-else color="primary" full-width disabled>注册</mu-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { MAIN,app_key,AppReg} from '../api/index.js'
	export default {
		data (){
			return {
				username:'',
				psd1:'',
				psd2:'',
				visibility1:false,
				visibility2:false,
			}
		},
		mounted(){
			
		},
		methods:{
			change1(){
				this.visibility1=!this.visibility1;
			},
			change2(){
				this.visibility2=!this.visibility2;
			},
			back(){
				this.$router.go(-1);
			},
			register(){
				let psd=this.$Crypto.MD5(this.psd2).toString();
				let key=MAIN+'?s='+AppReg+'&username='+this.username+'&password='+psd+'&app_key='+app_key

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		//console.log(res.data)
			 		if(res.status==200){
			 			_this.$alert('','注册成功 ！', {
			 				okLabel: '确定',
			 			}).then((result, value)=>{
			 				if(result){
			 					_this.$router.go(-1);
			 				}
			 			})
			 		}
			    }).catch(function(err){
			      console.log('注册:',err);
			    })
			}
		}
	}
</script>