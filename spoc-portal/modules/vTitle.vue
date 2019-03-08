<style lang="less">
.v_common_title{ 
  .title_contain {
      width: 100%;
      border: 1px solid #e0e0e0;
      position: relative;
      background: #fafafa;
      height: 40px;
      border-radius: 2px;
      padding-left: 20px;
      // text-indent: 20px;
      display: flex;
      align-items: center;
      padding-right:20px;
      .lineSide {
          position: absolute;
          left: -1px;
          top: -1px;
          height: 40px;
          width: 5px;
          background: #43bbb6;
          border-radius: 2px 0 0 2px;
      }
      .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
  }
}
</style>
<template>
  <div class="v_common_title">
    <div class="title_contain">
      <div class="lineSide"></div>
      <span style="fontSize: 12px">{{title}}</span>
      <slot></slot>
      <div class="right">
        <slot name="right"></slot> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title']
}
</script>

