<template>
  <div class="wf-container">
    <div class="wf-column" v-for="(item,index) in columnNum" :key="'column-'+index" :name="index">
      <slot :columnNum="columnNum" :columnIndex="index"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WFColumn',
  props: ['itemW', 'from'],
  data () {
    return {
      columnNum: 0
    }
  },
  created () {
    if (this.from == 'mass') {
      this.columnNum = Math.floor(document.getElementsByClassName('resource-c-w')[0].clientWidth / this.itemW)
      console.log(this.columnNum)
      return
    } else {
      this.columnNum = Math.floor(document.getElementsByClassName('content')[0].clientWidth / this.itemW)
    }
    window.onresize = () => {
      if(this.$route.name == 'market.resource' && document.getElementsByClassName('content')[0]){
        this.columnNum = Math.floor(document.getElementsByClassName('content')[0].clientWidth / this.itemW)
      }
    }
  }
}
</script>

<style scoped lang="less">
.wf-container{
  width: 100%;
  display: flex;
  .wf-column{
    flex: 1;
  }
}
</style>