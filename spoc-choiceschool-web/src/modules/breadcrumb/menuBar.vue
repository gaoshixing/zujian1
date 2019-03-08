<template>
<div class="header clearfix">
  <div class="menuBox">
      <a href="javascript:void(0)">{{$t("Common.theme")}}</a>
      <span class="arrow">></span>
      <slot name="menu" class="slotContent"></slot>
  </div>
  <div class="settingBox">
      <slot name="operate"></slot>
      <span class="settingBtn" v-if="0"><Icon type="ios-gear-outline"></Icon></span>
  </div>

</div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="less">
.header{
  padding: 10px 0 0 10px;
  border-bottom:1px solid #e5e5e5;
  .menuBox{
      float:left;
      line-height:30px;
      a{
        cursor: default;
        color:#222;
      }
      a.active{
        color:#44bcb7;
      }
      .arrow{
        margin:0px 5px;
      }
  }
  .settingBox{
      float:right;
      line-height:30px;
      .settingBtn{
          font-size:16px;
          cursor: pointer;
          width:25px;
          text-align:right;
          display: inline-block;
          vertical-align: middle;
      }
      .ivu-btn{
          height: 30px;
      }
  }
  .slotContent{
      position:relative;
      top: 1px;
  }
}
</style>
