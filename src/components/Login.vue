<template>
	<div class="login_box">
		<div class="mui-content">
			<div class="head_pic">
				<div class="head_box">咖</div>
			</div>
			<div class="inp_box">
				<img src="../../static/images/login/user.png" class="left"><mu-text-field v-model="username" placeholder="请输入用户名" prop="username"></mu-text-field>
			</div>
			<div class="inp_box">
				<img src="../../static/images/login/psswd.png" class="left">
				<mu-text-field v-model="password" 
				placeholder="请输入密码"
				:actionIcon="visibility ? 'visibility' : 'visibility_off'" :actionClick="change" 
				:type="visibility ? 'text' : 'password'">
				</mu-text-field>
			</div>
			<router-link tag="p" to="/register" class="goRes">新用户注册</router-link>
			<div class="btn_box">
				<mu-button round color="success" @click="login">登录</mu-button>
			</div>
		</div>
		<mu-snackbar :position="normal.position" :open.sync="normal.open">
		    {{normal.message}}
		</mu-snackbar>
	</div>
</template>
<script>
	import { MAIN,app_key,AppLog,AppCheck} from '../api/index.js'
	export default {
		data (){
			return {
				normal: {
			        position: 'bottom',
			        message: '请输入用户名和密码 ！',
			        open: false,
			        timeout: 1500
			    },
				username:'',
				password:'',
				visibility: false,
			}
		},
		mounted(){
			this.checkLogin();	
		},
		methods:{
			change(){
				this.visibility=!this.visibility;
			},
			checkLogin(){
				let uuid=localStorage.getItem('uuid');
				let token=localStorage.getItem('token');
				let key=MAIN+'?s='+AppCheck+'&app_key='+app_key+'&uuid='+uuid+'&token='+token

				key=escape(key)
				var _this=this;
				var url='Res/Json?res='

				this.$http.get(url+key).then(function(res){
			 		if(res.status==200){
			 			if(res.data.data.err_code==0){
			 				_this.$router.push({path:'/main/home'})
			 			}
			 			//console.log(res.data.data)
			 		}
			    }).catch(function(err){
			      console.log('检查登录:',err);
			    })
			},
			login(){
				if(this.username=='' || this.password==''){
					this.normal.open = true;
				    setTimeout(() => {
				      this.normal.open = false;
				    }, this.normal.timeout);
				}else{
					let psd=this.$Crypto.MD5(this.password).toString();
					let key=MAIN+'?s='+AppLog+'&username='+this.username+'&password='+psd+'&app_key='+app_key

					key=escape(key)
					var _this=this;
					var url='Res/Json?res='

					this.$http.get(url+key).then(function(res){
				 		//console.log(res.data.data)
				 		if(res.status==200){
				 			if(res.data.data.err_code==0){
				 				localStorage.setItem("uuid", res.data.data.uuid);
		        				localStorage.setItem("token", res.data.data.token);
					 			_this.$router.push({path:'/main/home'})
				 			}else{
				 				_this.$alert('',res.data.data.err_msg, {
					 				okLabel: '确定',
					 			}).then((result, value)=>{
					 				
					 			})
				 			}	
				 		}
				    }).catch(function(err){
				      console.log('登录:',err);
				    })
				}
			}
		}
	}
</script>