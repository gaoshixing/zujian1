// 搜索框组件
<style lang="less">
  .v_search {
    margin: 10px 0;
    width: 396px;
  }
</style>

<template>
    <div class="v_search">
      <Input icon="search" @on-change="onSearch" :placeholder="placeholder" @on-click="onSearch" @on-enter="onSearch" v-model="searchText">
      </Input>
    </div>
</template>

<script>
export default {
  name:'search',
  props: ['placeholder'],
  data () {
    return {
      searchText:''
    }
  },
  methods: {
    onSearch(){
        this.$emit('search',this.searchText)
    }
  }
}
</script>
