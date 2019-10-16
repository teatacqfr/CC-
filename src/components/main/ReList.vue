<template>
	<div ref="container">
		<mu-load-more @refresh="refresh" :refreshing="refreshing">
	      <mu-list>
	      	<ul class="job_list">
		        <router-link tag="li" :to="'/detail/job,'+value.id" v-for="(value,index) in arrList" :key="index" class="clear" v-if="type==0">
				    <img :src="value.sellerInfo.companyLogo" class="company_pic fl">
				  	<div class="fl job_con">
				  		<div class="clear">
				  			<p class="no_break title fl">{{value.title}}</p>
				  			<span class="fl istop" v-if="value.isTop==1">置顶</span>
				  		</div>
				  		<span><span class="money">{{(value.salary).toFixed(2)}}</span>元/{{value.salaryUnitName}}</span>
				  		<p>
				  			<mu-badge :content="value.areaName" color="primary"></mu-badge>
				  			<mu-badge :content="value.jobType" color="primary"></mu-badge>
				  		</p>
				  	</div>
		          
		        </router-link>
		        <router-link tag="li" :to="'/detail/mission,'+value.privateJobId" v-for="(value,index) in arrList" :key="index" class="clear mission" v-if="type==1">
	              <img :src="value.sellerInfo.companyLogo" class="company_pic fl">
	              <div class="fl job_con">
	                <div class="clear">
	                  <p class="no_break title fl">{{value.title}}</p>
	                  <span class="fr"><span class="money">{{(value.salary).toFixed(2)}}</span>元</span>
	                </div>
	                <p>
	                  <mu-badge :content="value.jobCateName" color="primary"></mu-badge>
	                  <mu-badge :content="value.period" color="primary"></mu-badge>
	                </p>
	              </div>
	                
	            </router-link>
	      	</ul>
	      </mu-list>
	    </mu-load-more>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      arrList:[],
      refreshing: false,
    }
  },
  props:['type'],
  mounted(){
  	this.refresh();
  },
  computed:{
    ...mapState({
      cityId: state => state.city.id
    })
  },
  watch:{
  	type(newvalue,oldvalue){
        this.refresh();
    }
  },	
  methods: {
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      let cityId=this.cityId;
      let keyMisson="https://api-upc.kdjz.com/v1/private-jobs?typeId=&sort=new&filter=all&page=1&pageSize=8"
      let keyJob='https://api-upc.kdjz.com/v1/jobs/recommend?cityId='+cityId+'&page=1&pageSize=8';
      //console.log(this.type)
      if(this.type==0){
      	this.getJob(keyJob);
      }else if(this.type==1){
      	this.getJob(keyMisson);
      }

    },
    getJob(key){
		key=escape(key)
		var _this=this;
		var url='Res/Json?res='
		
	 	this.$http.get(url+key).then(function(res){
	 		//console.log(res.data.data)
	 		if(res.status==200){
	 		  	_this.refreshing = false;
	 		  	if(_this.type==0){
	 		  		_this.arrList=res.data.data.recommendList;
	 		  	}else if(_this.type==1){
	 		  		_this.arrList=res.data.data.list;
	 		  	}
	 			
	 		}
	    }).catch(function(err){
	      console.log('推荐列表:',err);
	    })
    },
  }
}
</script>