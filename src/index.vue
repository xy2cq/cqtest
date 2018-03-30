<style lang="less">
#app{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: auto;
}
</style>
<template>
	<div id="app">
		<!-- <router-link to="/home">Home</router-link> -->
		<router-view></router-view>
	</div>
</template>
<script>
import cqtest from "cqtest";
export default {
	mounted() {		
		cqtest.printMsg();
	}
}
</script>
