<style lang="less">
.approvalList {
    .allPrice {
      float: right;
       position: relative;
       font-size: 16px;
       top: -50px;
       right: 80px;
       i,b{
           font-style: normal;
           font-weight: normal;
           color: #44bcb7;
           margin: 0 5px;
           font-size: 20px;
       }
       b {
          color: #ff0000;
       }
    }
    .acrossText , .season {
        margin-top: 25px;
    }
    .season {
        color: red;
    }
}
</style>
<template>
    <div class="approvalList">
    <approval-bar
    :stateList="stateList"
    :show='show'
    :activeIndex = "activeIndex"
    @addActive="addActive"
    >
    </approval-bar>
    <span class="allPrice">共<i>{{allPrice}}</i>份审核{{isAgreeContent[activeIndex]}}合同,总金额<b>{{shares}}</b>万元</span>
    <div v-for=" (all, index) in data":key= "index">
      <module-approval
       :all = "all"
       :agreeDialog= "agreeDialog"
       :show="isShow"
        >
        <p class="acrossText" v-if="activeIndex==0"> 审核时间 :{{data[index].time}} </p>
        <div class="season" v-if="activeIndex==1">
            <p>审核时间 :{{data[index].time}} </p>
            <p>驳回理由 : {{data[index].htName}}</p>
        </div>
        </module-approval>
    </div>
     <Modal v-model="modal2" width="798">
        <p slot="header" style="font-size:20px;font-weight:400">
            <span>审查记录</span>
        </p>
         <Table :columns="columns1" :data="data3"></Table>
        <div slot="footer">
        </div>
    </Modal>

    </div>
  
  
</template>
<script>
import approvalBar from './approvalBar'
import moduleApproval from './moduleApproval'
export default {
    data(){
        return {
            modal2:false,
            shares: 4,
            allPrice: 20,
            activeIndex:0,
            show: true,
            isShow: false,
            isAgreeContent:['通过', '驳回'],
            stateList:['审核通过','已驳回'],
             columns1: [
        {
          title: "促销项目",
          key: "name",
          align: "center"
        },
//      {
//        title: "权限级别",
//        key: "level",
//        align: "center"
//      },
        {
          title: "优惠条款",
          key: "address"
        },
        {
          title: "对外报价",
          key: "price"
        },
        {
          title: "实际成本",
          key: "originPrice"
        }
      ],
      data3: [],
     data: [],
       data1: []
        }
    },
  components: {
      approvalBar,
      moduleApproval
  },
  methods: {
      addActive(index) {
          this.activeIndex = index
         
      },
      agreeDialog() {
          this.modal2 = true;
      }
  }
}
</script>


