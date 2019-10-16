<template>
	<div>
		<mu-appbar color="primary">
		  <span slot="default">我的</span>
		</mu-appbar>
		<div class="show_top">
			<ul class="person_list">
				<router-link tag="li" to="/resume" class="clear">
					<mu-icon value="library_books" class="fl"></mu-icon>
					<span class="fl title">个人简历</span>
					<mu-icon value="chevron_right" class="fr"></mu-icon>
				</router-link>
				<!-- <router-link tag="li" to="/favorite" class="clear">
					<mu-icon value="favorite_border" class="fl"></mu-icon>
					<span class="fl title">历史收藏</span>
					<mu-icon value="chevron_right" class="fr"></mu-icon>
				</router-link> -->
				<router-link tag="li" to="/history" class="clear">
					<mu-icon value="history" class="fl"></mu-icon>
					<span class="fl title">历史接单</span>
					<mu-icon value="chevron_right" class="fr"></mu-icon>
				</router-link>
				<router-link tag="li" to="/setting" class="clear">
					<mu-icon value="settings" class="fl"></mu-icon>
					<span class="fl title">意向设置</span>
					<mu-icon value="chevron_right" class="fr"></mu-icon>
				</router-link>
				<li class="clear" @click="loginout">
					<mu-icon value="power_settings_new" class="fl"></mu-icon>
					<span class="fl title">退出登录</span>
					<mu-icon value="chevron_right" class="fr"></mu-icon>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data (){
			return {

			}
		},
		methods:{
			loginout(){
				this.$confirm('您确定要退出吗？','退出登录', {
	 				okLabel: '确定退出',
	 				cancelLabel: '取消',
	 			}).then((result, value)=>{
	 				if(result.result){
	 					localStorage.setItem("uuid", '');
	        			localStorage.setItem("token", '');
	        			this.$router.push({path:'/login'})
	 				}
	 			})
			}
		}
	}
</script>