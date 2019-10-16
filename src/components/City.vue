<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
		  <span icon slot="left" @click="back">
		    <mu-icon value="chevron_left" class="back_arrow"></mu-icon>
		  </span>
		  <span slot="default">选择城市</span>
		</mu-appbar>
		<div class="show_top findcity">
			<mu-list textline="three-line">
				<mt-index-list>
					<p class="city_title"><img src="../../static/images/city/nowcity.png">当前城市</p>
					<div>
						<span class="city_box" @click="back">{{cityName}}</span>
					</div>
					<p class="city_title"><img src="../../static/images/city/hot.png">当前城市</p>
					<ul class="clear">
						<li class="city_box fl" v-for="(value,index) in hotArr" :key="index" @click="changeCity(value.id,value.name)">
							{{value.name}}
						</li>
					</ul>
				    <mt-index-section v-for="(value,key,index) in cityJson" :key="index" :index="key" class="clear">
				        
				        <li v-for="(value1,index1) in value" class=" fl city_box" :key="index1" @click="changeCity(value1.id,value1.name)">
				          {{value1.name}}
				        </li>
				        
				    </mt-index-section>
			    </mt-index-list>
			</mu-list>
			
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				cityName:'',
				hotArr:[],
				cityJson:{},
			}
		},
		mounted(){
			this.getHot();
			this.getCity();
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getHot(){
				this.cityName=this.$store.state.city.name;
				var time=new Date().getTime();
				var key='https://api-upc.kdjz.com/v1/cities/hot';
				key=escape(key)
				var _this=this;
				var url='Res/Json?res='
				
			 	this.$http.get(url+key).then(function(res){
			 		//console.log(res.data.data.list);
			 		if(res.status==200){
			 			_this.hotArr=res.data.data.list;
			 		}
		        }).catch(function(err){
		          console.log('城市:',err);
		        })
			},
			changeCity(id,name){
				let city={
					id:id,
					name:name
				}
				this.cityName=name;
				//console.log(city)
				this.$store.dispatch('UPDATE_CITY',city);
				this.$router.go(-1);
			},
			getCity(){
				var time=new Date().getTime();
				var key='https://api-upc.kdjz.com/v1/cities';
				key=escape(key)
				var _this=this;
				var url='Res/Json?res='
				
			 	this.$http.get(url+key).then(function(res){
			 		//console.log(res.data.data.list);
			 		if(res.status==200){
			 			_this.cityJson=res.data.data.list;
			 		}
		        }).catch(function(err){
		          console.log('城市:',err);
		        })
			},
		}
	}
</script>