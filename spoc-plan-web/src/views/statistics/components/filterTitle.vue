<style lang="less">
.analyseBar {
        .titleBar {
        font-size: 14px;
        p {
            margin-bottom: 5px;
        }
        span {
            font-size: 12px;
            padding: 4px 8px;
            cursor: pointer;
            margin-right: 5px;
        }
        span:first-child {
            cursor: auto;
            color: #b8b8b8;
            padding: 0;
            margin-right: 20px;
        }
        .active {
            background-color: #44bcb6;
            color: white;
            }
   }
}
</style>
<template>
    <div class="analyseBar">
       <div class="titleBar">
            <p><span style="margin-right: 19px">{{title}}：</span><span  v-for="(item, index) in controlledList" :class="{active:num == index}" @click="addAcitve(index,item.value)">{{ item.label }}</span></p>
       </div>
     </div>
</template>
<script>
export default {
  props: {
    title: {
     type: String,
     default: '　分公司'
    },

    controlledList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
        num: 0
    };
  },
  methods: {
    addAcitve(index, id) {
        this.num = index
        this.$emit('getIndex', id)
    }
  }
};
</script>


