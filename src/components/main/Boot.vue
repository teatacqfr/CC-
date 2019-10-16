<template>
	<div class="boot">
		<mu-bottom-nav :value.sync="value">
		    <mu-bottom-nav-item title="主页" value="0" icon="camera" to="/main/home"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="全部兼职" value="1" icon="work" to="/main/job"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="技能任务" value="2" icon="track_changes" to="/main/mission"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="我的" value="3" icon="account_circle" to="/main/personal"></mu-bottom-nav-item>
		</mu-bottom-nav>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				value:'1'
			}
		},
		watch: {
			$route(to){
		      var path = to.path.substring(1);
		      //console.log(path)
		      this.getValue(path);
		      
		    }
		},
		mounted(){
			var path = this.$route.path.substring(1);
			this.getValue(path);
		},
		methods:{
			getValue(path){
				  if(path=='main/home'){
			      	this.value='0';
			      }else if(path=='main/job'){
			      	this.value='1';
			      }else if(path=='main/mission'){
			      	this.value='2';
			      }else if(path=='main/personal'){
			      	this.value='3';
			      }
			}
		}
	}
</script>