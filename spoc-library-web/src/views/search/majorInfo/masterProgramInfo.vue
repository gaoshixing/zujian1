//研究生专业详情
<style lang="less">
.tm_search_master_program_info {
  .major {
    padding: 30px 20px;
    display: flex;
    align-items: center;
    div {
      margin-right: 20px;
      font-size: 24px;
      &:nth-of-type(1){
        color: #999999;
      }
      &:nth-of-type(3){
        font-size: 14px;
        padding: 10px 20px;
        background-color: #999999;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .major_info {
    .title {
      margin: 30px 0;
      .close {
        color: #e71f1d;
        cursor: pointer;
      }
    }
    table{
      text-align: center;
    &.case{
      text-align: left;
    }
    }
  }
  .l1-list{
    width: 90%;
    margin: 10px auto 20px;
    .list-item{
        float: left;
        width: 50%;
        font-size: 14px;
        margin: 10px 0;
        .item-name{
          display: inline-block;
          width: 100px;
          color: #999;
        }
        .item-text{
            width: 300px;
            color: #323232;
            display: inline-block;
        }
    }
  }
}
</style>
<template>
  <div class="tm_search_master_program_info">
    <div class="major">
      <div>专业名称</div>
      <div>Accounting</div>
      <div>研究生</div>
    </div>
    <div class="major_info">
      <Tabs value="专业详情">
        <TabPane label="专业详情" name="专业详情">
          <div class="title">
            <v-title title="专业介绍" >
              <div slot="right" class="close" @click="close(0)">
               <span v-text="showList[0].show?'关闭':'显示'" ></span>
              </div>
            </v-title>
          </div>
          <div class="major_intro" v-show="showList[0].show">
           <div class="l1-list">
              <div class="list-item clearfix" v-for="(item,index) in list1" :key="index">
                <div class="item-name" v-html="item.v"></div>
                <div class="item-text" v-text="allData[item.k]"></div>
              </div>
           </div>
          </div>
          <div class="title">
            <v-title title="申请信息" >
              <div slot="right" class="close" @click="close(1)">
               <span v-text="showList[1].show?'关闭':'显示'"></span>
              </div>
            </v-title>
          </div>
          <div class="apply_info" v-show="showList[1].show">
            <Form :label-width="100">
              <div class="l1-list">
                  <div class="list-item clearfix" v-for="(item,index) in list2" :key="index">
                    <div class="item-name" v-html="item.v"></div>
                    <div class="item-text" v-text="allData[item.k]"></div>
                  </div>
              </div>
            </Form>
            <div>
                <table width="100%">
                  <colgroup>
                  <col width="15%"></col>
                  </colgroup>
                  <tr>
                    <td>考试类型</td>
                    <td>考试要求</td>
                  </tr>
                  <tr>
                    <td>TOFEL</td>
                    <td>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                    </td>
                  </tr>
                </table>
            </div>
          </div>
          <div class="title">
            <v-title title="藤门案例" >
              <div slot="right" class="close" @click="close(2)">
               <span v-text="showList[2].show?'关闭':'显示'"></span>
              </div>
            </v-title>
          </div>

          <table v-show="showList[2].show" class="case" width="100%" align="left">
            <tr>
              <td>
                <div><img src="" alt=""></div>
                <div>nsbfgnaashfawyfasfjanqwjgbouhgbsegnakfahbfa</div>
              </td>
              <td>
                <div><img src="" alt=""></div>
                <div>nsbfgnaashfawyfasfjanqwjgbouhgbsegnakfahbfa</div>
              </td>
              <td>
                <div><img src="" alt=""></div>
                <div>nsbfgnaashfawyfasfjanqwjgbouhgbsegnakfahbfa</div>
              </td>
            </tr>
          </table>
             
        </TabPane>
        <TabPane label="标准专业库补充信息" name="标准专业库补充信息"></TabPane>
    </Tabs>
    </div>
  </div>
</template>
<script>


const list1 =[
  {
    k:'name',
    v:'专业名称',
  },
  {
    k:'majorRank',
    v:'专业排名',
  },
  {
    k:'schoolCnname',
    v:'所属学校',
  },
  {
    k:'ssGradeSchoolCnname',
    v:'研究生院',
  },
  {
    k:'levelType',
    v:'招生层次',
  },
  {
    k:'majorLink ',
    v:'项目链接',
  },
   {
    k:'',
    v:'',
  },
  {
    k:'majorBranch ',
    v:'专业分支',
  },
  {
    k:'majorBranchLink',
    v:`专业分支<br>介绍链接`,
  },
  {
    k:'',
    v:' ',
  },
];

const list2 =[
  {
    k:'',
    v:'申请截止<br>日期（春季）',
  },
  {
    k:'',
    v:'申请截止日期（秋季）',
  },
  {
    k:'',
    v:'GPA最低分',
  },
  {
    k:'',
    v:'',
  },
  {
    k:'',
    v:'邮寄地址',
  },
    {
    k:'',
    v:'',
  },
  {
    k:' ',
    v:'Checklist Link',
  },
   {
    k:'',
    v:'',
  },
  {
    k:' ',
    v:'备注',
  },
  {
    k:'',
    v:'',
  },
  {
    k:'',
    v:'标准化考试要求',
  },
];

import vTitle from "@public/modules/vTitle";
import valid,{errors, fillAcademeMajor, SchoolMajor } from "../../../libs/request";
import { mapMutations } from "vuex";
export default {
  name: "masterProgramInfo",
  data() {
    return {
      list1:list1,
      list2:list2,
      showList:[

        {show:true},
        {show:true},
        {show:true},
      ],
      dataList:[],
      allData:[],
    };
  },
  components: {
    vTitle
  },
  created () {
    this.fetchMajorDetail();
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),
    close(index) {
      this.showList[index].show = !this.showList[index].show;
    },
    // 获取学院专业详情
    fetchMajorDetail(){
      this.updateLoadingStatus({ isLoading: false });
      SchoolMajor.fetchMajorDetail(this.$route.query.majorId).then(valid.call(this)).then(res => {
        if (res.ok) {
            console.log(res);
            this.allData = res.data.data;
            
        }
        })
        .catch(errors.call(this))
        .finally(() => {
        this.updateLoadingStatus({ isLoading: false });
      });     
    }
  }
}
</script>
