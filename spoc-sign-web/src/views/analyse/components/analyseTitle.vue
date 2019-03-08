<style lang="less">
.data-title {
        font-size: 16px;
        line-height: 50px;
        label {
             cursor: pointer;
             margin-right: 50px;
        }
        select {
            width: 118px;
            font-size: 18px;
            height: 33px;
            border-radius: 3px;
            margin-right: 20px;
        }
    }
</style>
<template>
  <div class="data-title">
        <input type="radio"  @click="isMonth(true)" id="year" checked name="data"> <label for="year">按月查询</label> <input type="radio" @click="isMonth(false)" id="quarter" name="data"> <label for="quarter">按季度查询</label>
  <select ref="select1" @change="dateTime"  name=""id="">
      <option v-for="item in year"> {{item}}</option>
  </select>
  <select v-model="currentMonth" @change="dateTime" name="" id="">
      <option v-for="item in month">{{item}}</option>
  </select>
    </div>
</template>
<script>
export default {
   props:{
        year: {
            type:Array,
            default:[2017,2018]
        }
    },
    data() {
       return  {
        month: '',
        currentMonth: '1月',
        everyMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        quarter: ['第一季度', '第二季度', '第三季度', '第四季度']
       }
    },
    mounted() {
      this.isMonth(true)
    },
    methods: {
        isMonth(bollean) {
            if(bollean) {
              (this.month = this.everyMonth) && (this.currentMonth = '1月')
            }else {
              (this.month = this.quarter) && (this.currentMonth = '第一季度')
            }
            this.dateTime()
        },
        dateTime() {
            this.$emit('dateTime',[this.$refs.select1.value, this.currentMonth])
        }
    }
}
</script>


