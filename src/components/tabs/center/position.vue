<template>
  <div>
  	<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			地图
		</header>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" >
      </el-amap>
    </div>
    <div id='container'></div>
		<div id="tip"></div>
		

  </div>
</template>

<style>
  .amap-page-container {
    height: 500px;
  }
</style>


<script>
export default {
  data () {
    return {
      zoom: 12,
      center: [116.383798,39.908315],
    }
  }
}

</script>