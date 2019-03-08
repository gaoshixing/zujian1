// 藤门搜索
<style lang="less">
.tm_search{
  .schoolRanking,.shcool,.graduate,.gradeRanking,.belongs_school{
     background-color: #f1f1f1 !important;
  }
  .ivu-tabs-nav .ivu-tabs-tab:hover{
        /*color: #44bcb7;*/
  }
}
</style>

<template>
  <div class="tm_search">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name:'search',
}
</script>
