<style lang="less">
  .v_common_btns{
    button{
      margin-left: 10px;
    }
    .bt1 {
          color: #e8352c;
          border: 1px solid #e8352c;
    }
    .bt2 {
          border: 1px solid #999999;
    }
    .bt3 {
          background: #44bcb7;
          color: #fff;
    }
    .bt4 {
          border-color:#73cdc9;
          color: #73cdc9;
    }
  }
</style>
<template>
  <div class="v_common_btns">
     <Button v-for="item in btns" :key="item.id" :class="item.class" type="primary"  v-show="item.id==1||show" @click="item.btnClick()" v-html="item.text"></Button>
  </div>
</template>
<script>
export default {
  name:'vBtns',
  props: {
    show:{
      type:Boolean,
      default:true,
    },
    btns:{
      type: Array,
       default: function () {
        return [
          {class:'bt1',text:'删除'},
          {class:'bt2',text:'导出'},
          {class:'bt2',text:'导入'},
          {class:'bt3',text:'添加'},
          ] 
      }
    }
  },
  created () {
    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i]['id']=i+1;
      if(!this.btns[i]['btnClick']){
        this.btns[i]['btnClick']=this.btnAction;
      }
    }
  },
  methods: {
    btnAction(){
      console.log('some operate');
    }
  }
}
</script>
