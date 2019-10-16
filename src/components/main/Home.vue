<template>
	<div>
		<mu-appbar color="primary">
		  <router-link icon tag="span" slot="left" to="/city">
		    <mu-icon value="place"></mu-icon>
		    <span class="point">{{cityName}}<mu-icon value="expand_more"></mu-icon></span>
		  </router-link>
		  <span slot="default">CC小咖</span>
		</mu-appbar>
		<div class="show_top show_btm">
			<Slide></Slide>
			<div class="line10"></div>
			<ul class="clear zn_list">
				<router-link tag="li" class="fl" to="/question">
					<img src="../../../static/images/wenti.png">
					<p>常见问题</p>
				</router-link>
				<router-link tag="li" class="fl" to='/defeat'>
					<img src="../../../static/images/fangpian.png">
					<p>防骗指南</p>
				</router-link>
				<router-link tag="li" class="fl" to="/mission-intro">
					<img src="../../../static/images/renwu.png">
					<p>技能任务</p>
				</router-link>
				<li class="fl">
					<a href="tel:2687054" class="tel">
						<img src="../../../static/images/kefu.png">
						<p>联系客服</p>
					</a>
				</li>
			</ul>
			<div class="line10"></div>
			<mu-tabs :value.sync="active" color="white" indicator-color="#1AB394">
			    <mu-tab>推荐兼职</mu-tab>
			    <mu-tab>推荐任务</mu-tab>
			    <router-link tag="span" to="/setting" class="yx_set">意向设置</router-link>
			</mu-tabs>
			  <div class="demo-text">
			    <List :type="active"></List>
			  </div>
			
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import Slide from './Slide.vue'
	import List from './ReList.vue'
	export default {
		data (){
			return {
				active:0,
			}
		},
		computed:{
		    ...mapState({
		      cityId: state => state.city.id
		    }),
		    ...mapState({
		      cityName: state => state.city.name
		    }),
		},
		components:{
			Slide,
			List
		},
		methods:{
			
		}
	}
</script>