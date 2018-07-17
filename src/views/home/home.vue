<template>
	<div class="home">
		<img class="vue-icon" src="../../assets/img/vue.png" alt="">
    <h1>Vue cli</h1>
	</div>
</template>

<script>
  console.log('Home')
  export default {
  }
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    .vue-icon {
      width: 180px;
      height: 150px;
    }
  }
</style>


