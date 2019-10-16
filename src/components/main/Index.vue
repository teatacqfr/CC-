<template>
	<div>
		<router-view></router-view>
		<Boot></Boot>
	</div>
</template>
<script>
	import Boot from './Boot.vue'
	export default {
		components:{
			Boot
		}
	}
</script>