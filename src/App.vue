<template>
  <div class="container">
    <router-view></router-view>
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/demo' }">vue文档练习</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/vuexDemo' }">vuex练习</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/eleDemo' }">element-ui组件练习</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
  console.log('App')
  export default {}
</script>

<style lang="less" scoped>
  .container {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav {
      margin: 20px 0;
    }
  }
  
</style>