<template>
	<div ref="container">
		<mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
	      <mu-list>
	      	<ul class="job_list">
		        <router-link tag="li" :to="'/detail/job,'+value.id" v-for="(value,index) in arrList" :key="index" class="clear mission" v-if="cityId">
              <img :src="value.sellerInfo.companyLogo" class="company_pic fl">
              <div class="fl job_con">
                <div class="clear">
                  <p class="no_break title fl">{{value.title}}</p>
                  <span class="fr"><span class="money">{{(value.salary).toFixed(2)}}</span>元</span>
                </div>
                <p v-if="cityId">
                  <mu-badge :content="value.areaName" color="primary"></mu-badge>
                  <mu-badge :content="value.jobType" color="primary"></mu-badge>
                </p>
                <p v-else>
                  <mu-badge :content="value.jobCateName" color="primary"></mu-badge>
                  <mu-badge :content="value.period" color="primary"></mu-badge>
                </p>
              </div>
            </router-link>
            <router-link tag="li" :to="'/detail/mission,'+value.privateJobId" v-for="(value,index) in arrList" :key="index" class="clear mission" v-if="cityId==undefined">
              <img :src="value.sellerInfo.companyLogo" class="company_pic fl">
              <div class="fl job_con">
                <div class="clear">
                  <p class="no_break title fl">{{value.title}}</p>
                  <span class="fr"><span class="money">{{(value.salary).toFixed(2)}}</span>元</span>
                </div>
                <p v-if="cityId">
                  <mu-badge :content="value.areaName" color="primary"></mu-badge>
                  <mu-badge :content="value.jobType" color="primary"></mu-badge>
                </p>
                <p v-else>
                  <mu-badge :content="value.jobCateName" color="primary"></mu-badge>
                  <mu-badge :content="value.period" color="primary"></mu-badge>
                </p>
              </div>
            </router-link>
	      	</ul>
          <img src="../../../static/images/nodata.png" v-if="arrList.length==0" class="nodata_pic">
	      </mu-list>
	    </mu-load-more>
	</div>
</template>
<script>
export default {
  data () {
    return {
      arrList:[],
      refreshing: false,
      loading: false,
    }
  },
  props:['sort','filter','typeId','cityId'],
  watch:{
    sort(newvalue,oldvalue){
        this.refresh();
    },
    filter(newvalue,oldvalue){
        this.refresh();
    },
    typeId(newvalue,oldvalue){
        this.refresh();
    },
  },
  mounted(){
  	this.refresh();
  },	
  methods: {
    refresh(){
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      if(this.cityId){
        let keyJob='https://api-upc.kdjz.com/v1/jobs/recommend?cityId='+this.cityId+'&page=1&pageSize=8';
        //console.log(1)
        this.getJob(keyJob);
      }else{
        //console.log(2)
        this.getMisson();
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
            _this.arrList=res.data.data.recommendList;
        }
        }).catch(function(err){
          console.log('全部兼职:',err);
        })
    },
    getMisson(){
      let key='https://api-upc.kdjz.com/v1/private-jobs?typeId='+this.typeId+'&sort='+this.sort+'&filter='+this.filter+'&page=1&pageSize=15'
      key=escape(key)
      var _this=this;
      var url='Res/Json?res='
    
      this.$http.get(url+key).then(function(res){
        //console.log(res.data.data.list)
        if(res.status==200){
          _this.refreshing = false;
          _this.arrList=res.data.data.list;
        }
      }).catch(function(err){
        console.log('列表:',err);
      })
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000)
    }
  }
}
</script>