//本科生专业详情
<style lang="less">
.tm_search_undergraduate_program_info {
  .major {
    padding: 30px 20px;
    display: flex;
    div {
      margin-right: 20px;
      font-size: 32px;
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
}
</style>
<template>
  <div class="tm_search_undergraduate_program_info">
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
            <!-- <Form :label-width="160">
              <Row v-for="item in costList" :key="item.id">
               <Col v-for="val in item.columnList" :key="val.id">
                  <FormItem :label="val.label">
                    {{val.content}}
                  </FormItem>
                </Col>
              </Row>
            </Form> -->
          </div>
          <div class="title">
            <v-title title="滕门案例" >
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
import vTitle from "@public/modules/vTitle";
export default {
  name: "undergraduateProgramInfo",
  data() {
    return {
      showList:[
        {show:true},
        {show:true},
        {show:true},
      ],
      // columns:[
      //   {title:'考试类型',key:'type',align:'center',width:100},
      //   {title:'考试要求',key:'required',align:'center'},
      // ],
      // tableData:[
      //   {type:'TOFEL',required:{}}
      // ],
    };
  },
  components: {
    vTitle
  },
  methods: {
    close(index) {
      this.showList[index].show = !this.showList[index].show;
    }
  }
};
</script>
