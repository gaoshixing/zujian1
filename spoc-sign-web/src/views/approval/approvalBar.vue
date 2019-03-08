<style lang="less">
    .approval-bar {
        position: relative;
        .stateList {
            height: 41.5px;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 17px;
                li {
                float: left;
                font-size: 14px;
                width: 80px;
                line-height: 40px;
                text-align: center;
                margin-right: 10px;
            cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #73cdc9;
                color: #73cdc9;
        }
    }
    }
</style>
<template>
  <div class="approval-bar">
        <ul class="stateList">
            <li  v-for="(item,index) in stateList" :key="index" @click="addClass(index)" :class="{active:index==activeIndex}">{{item}}</li>
        </ul>
       <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
      stateList: {
        type: Array,
        default: []
      },
      activeIndex: {
          type: Number,
          default: 0
      }
  },
  data() {
      return {
          compact: ''
      }
  },
  methods: {
      addClass(index){
          this.$emit('addActive',index)
      }
  }
}
</script>


