// 编辑学院U.S.News 硕博
<style lang="less">
.edit_accademe_usaNews{
  .close{
    color: #e71f1d;
    cursor: pointer;
  }
  .ivu-tabs-nav{
    padding-left: 20px;
    .ivu-tabs-ink-bar{
      margin-left: 20px;
    }
  }
  .ivu-form-item-label{
    color:#b8b8b8;
    letter-spacing: 1px;
  }
  .ivu-form-item-content{
    margin-left: 200px !important;
  }
  form{
     margin-top:20px;
    max-width: 1200px;
  }
  .tabs{
    margin-top: 20px;
  }
  .career{
    margin: 
    30px 0 0  20px;
    .title{
      font-size: 16px;
    }
    .ivu-table-wrapper{
      margin-top: 20px;
      border: 1px solid #dddee1 !important;
      th{
        background-color: #e6e6e6 !important;
      }
      td{
        background-color: #f1f1f1;
      }
    }
    .ivu-table:before{
      height: 0;
    }
  }
  .save{
    text-align: center;
    margin-top: 50px;
    button{
      padding-left: 35px;
      padding-right: 35px;
    }
  }
}
</style>
<template>
  <div class="edit_accademe_usaNews">
    <!-- Admisdions -->
    <v-title title="Admisdions(学院申请信息)">
      <div slot="right" class="close" @click="close(0)" v-html="showList[0].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[0].show">
      <Tabs class="tabs" value="博士">
        <TabPane label="硕士" name="硕士">
            <Form :label-width="160">
              <Row v-for="item in MasterAdmissions" :key="item.id">
                <Col span="12" v-for="val in item.columnList" :key="val.id">
                  <FormItem :label="val.label">
                    {{val.content}}
                  </FormItem>
                </Col>
              </Row>
            </Form>
        </TabPane>
        <TabPane label="博士" name="博士">
          <Form :label-width="160">
              <Row v-for="item in phdAdmissions" :key="item.id">
                <Col span="12" v-for="val in item.columnList" :key="val.id">
                  <FormItem :label="val.label">
                    {{val.content}}
                  </FormItem>
                </Col>
              </Row>
          </Form>
        </TabPane>
      </Tabs>
    </div>

    <!-- academics -->
    <v-title title="academics">
      <div slot="right" class="close" @click="close(1)" v-html="showList[1].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[1].show">
      <Form :label-width="160">
        <Row v-for="item in academicsList" :key="item.id">
          <Col span="12" v-for="val in item.columnList" :key="val.id">
            <FormItem :label="val.label">
              {{val.content}}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <!-- Ranking Scores -->
    <v-title title="Ranking Scores">
      <div slot="right" class="close" @click="close(2)" v-html="showList[2].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[2].show">
      <div style="padding:20px 0 20px 20px; font-size:14px;">
        <div>These data apply only to full-time students.</div>
        <div v-for="item in rankScoresList" :key="item.id">
          <span style="padding-right:15px;">{{item.title}}</span>
          <span>{{item.value}}</span>
        </div>
        <div>Business School Ranking details based on 2016 data</div>
      </div>
    </div>
    <!-- Student Body -->
    <v-title title="Student Body">
      <div slot="right" class="close" @click="close(3)" v-html="showList[3].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[3].show">
      <Form :label-width="160">
        <Row v-for="item in studyBodyList" :key="item.id">
          <Col :span="val.span?val.span:12" v-for="val in item.columnList" :key="val.id">
            <FormItem :label="val.label">
              {{val.content}}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    
    <!-- Cost -->
    <v-title title="Cost">
      <div slot="right" class="close" @click="close(4)" v-html="showList[4].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[4].show">
      <Form :label-width="160">
        <Row v-for="item in costList" :key="item.id">
          <Col v-for="val in item.columnList" :key="val.id">
            <FormItem :label="val.label">
              {{val.content}}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    
    <!-- Library -->
    <v-title title="Library">
      <div slot="right" class="close" @click="close(5)" v-html="showList[5].show?'关闭':'开启'">
      </div>
    </v-title>
    <div  v-show="showList[5].show">
      <Form :label-width="160">
        <Row v-for="item in libraryList" :key="item.id">
          <Col span="12" v-for="val in item.columnList" :key="val.id">
            <FormItem :label="val.label">
              {{val.content}}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    
    <!-- Career -->
    <v-title title="Career">
      <div slot="right" class="close" @click="close(6)" v-html="showList[6].show?'关闭':'开启'">
      </div>
    </v-title>
    <div v-show="showList[6].show">
      <Tabs v-model="tabSelect"  class="tabs">
        <TabPane label="硕士" name="硕士">
        </TabPane>
        <TabPane label="博士" name="博士">
        </TabPane>
      </Tabs>
      <div class="career">
        <div class="title">毕业率及薪资调查</div>
        <Form :label-width="160">
          <Row v-for="item in careerList[tabValue].graduateRate" :key="item.id">
            <Col span="12" v-for="val in item.columnList" :key="val.id">
              <FormItem :label="val.label">
                {{val.content}}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="title">国际生基本薪资</div>
        <Form :label-width="160">
          <Row v-for="item in careerList[tabValue].avgsalary" :key="item.id">
            <Col span="12" v-for="val in item.columnList" :key="val.id">
              <FormItem :label="val.label">
                {{val.content}}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="title">不同职业基本薪资</div>
        <Table border  stripe :columns="jobColumns" :data="jobData"></Table>     
        <div class="title" style="margin-top:20px;">不同行业基本薪资</div>
        <Table border  stripe :columns="tradeColumns" :data="tradeData"></Table>     
      </div>
    </div>
    <div class="save">
      <Button type="primary" @click="save">保存并预览</Button>
    </div>
  </div>
</template>
<script>
import vTitle from "@public/modules/vTitle";
import valid,{ errors, get_usnews } from "../../../libs/request";
export default {
  name:'USNews',
  data () {
    return {
      showList:[
        {id:1,show:true},
        {id:2,show:false},
        {id:3,show:false},
        {id:4,show:false},
        {id:5,show:false},
        {id:6,show:false},
        {id:7,show:false},
      ],
      tabSelect:'硕士',
      tabValue:'master',
      MasterAdmissions:[
       {id:1,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:2,columnList:[{id:1,label:'申请人数',content:'100'},{id:2,label:'录取人数',content:'100'}]}, 
       {id:3,columnList:[{id:1,label:'录取人数',content:'100'},{id:2,label:'录取人数',content:'100%'}]}, 
       {id:4,columnList:[{id:1,label:'本科GPA平均分',content:'80'},{id:2,label:'GRE平均分',content:'85'}]}, 
       {id:5,columnList:[{id:1,label:'GRE写作平均分',content:80},{id:2,label:'国际学生需要托福和/或雅思考试',content:'85'}]}, 
       {id:6,columnList:[{id:1,label:'最低托福成绩要求',content:'80'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:7,columnList:[{id:1,label:'最低雅思成绩要求',content:'80'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:8,columnList:[{id:1,label:'提供本科GPA的学生人数',content:'85'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:9,columnList:[{id:1,label:'提供本科GMAT分数的学生人数',content:'99%'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:10,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:11,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:12,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:13,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'}]}, 
       {id:14,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'}]}, 
       {id:15,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
      ],
      phdAdmissions:[
       {id:1,columnList:[{id:1,label:'申请截止时间(国际学生)',content:'2017年8月30日'},{id:2,label:'申请费用',content:'5万'}]}, 
       {id:2,columnList:[{id:1,label:'申请人数',content:'100'},{id:2,label:'录取人数',content:'100'}]}, 
       {id:3,columnList:[{id:1,label:'录取人数',content:'100'},{id:2,label:'录取人数',content:'100%'}]}, 
       {id:4,columnList:[{id:1,label:'本科GPA平均分',content:'80'},{id:2,label:'GRE平均分',content:'85'}]}, 
       {id:5,columnList:[{id:1,label:'GRE写作平均分',content:'85'},{id:2,label:'国际学生需要托福和/或雅思考试',content:'85'}]}, 
       {id:6,columnList:[{id:1,label:'最低托福成绩要求',content:'80'},{id:2,label:'入学学生的平均托福成绩',content:'85'}]}, 
       {id:7,columnList:[{id:1,label:'最低雅思成绩要求',content:'80'},{id:2,label:'本科GPA（10-90分）的百分比',content:'100%'}]}, 
       {id:8,columnList:[{id:1,label:'提供本科GPA的学生人数',content:'85'},{id:2,label:'GMAT（10-90分）的百分比',content:'100%'}]}, 
       {id:9,columnList:[{id:1,label:'提供本科GMAT分数的学生人数',content:'99%'},{id:2,label:'新生平均年龄',content:'20'}]}, 
       {id:10,columnList:[{id:1,label:'有工作经验的学生人数',content:'88'},{id:2,label:'平均工作经验时间（月）',content:'99%'}]}, 
       {id:11,columnList:[{id:1,label:'招生官',content:'jack'}]}, 
       {id:12,columnList:[{id:1,label:'招生网站',content:'test.ivygate.cn'}]}, 
       {id:13,columnList:[{id:1,label:'招生官联系方式',content:'010-3725-4008'}]}, 
      ],
      academicsList:[
       {id:1,columnList:[{id:1,label:'年度研究经费',content:'20万'},{id:2,label:'从事相关研究的全职教师数',content:'5万'}]}, 
       {id:2,columnList:[{id:1,label:'是否提供联合学位',content:'是'},{id:2,label:'学术日历',content:'7月8日'}]}, 
       {id:3,columnList:[{id:1,label:'研讨会数量',content:'20'},{id:2,label:'研讨会提供的职位数',content:'85'}]}, 
       {id:4,columnList:[{id:1,label:'模拟课程中提供的职位数',content:'80'},{id:2,label:'学校活动数量',content:'99%'}]}, 
       {id:5,columnList:[{id:1,label:'师生比',content:'90%'},{id:2,label:'教师总人数',content:'100'}]}, 
       {id:6,columnList:[{id:1,label:'全职/兼职教师人数分布',content:'全职教师人数  80'},{id:2,label:'兼职教师人数',content:'20'}]}, 
       {id:7,columnList:[{id:1,label:'全职教师性别分布',content:'男性教师人数  20'},{id:2,label:'女性教师人数',content:'60'}]}, 
       {id:8,columnList:[{id:1,label:'兼职教师性别分布',content:'男性教师人数  5'},{id:2,label:'女性教师人数',content:'15'}]}, 
       {id:9,columnList:[{id:1,label:'全职少数民族教师占比',content:'40%'},{id:2,label:'兼职少数民族教师占比',content:'10%'}]}, 
      ],
      rankScoresList:[
        {id:1, title:'Score',value:'100'},
        {id:2, title:'Peer assessment score (out of 5)',value:'4.8'},
        {id:3, title:'Recruiter assessment score (out of 5)',value:'4.5'},
        {id:4, title:'Acceptance rate (full-time)',value:'10.7%'},
        {id:5, title:'Average starting salary and bonus',value:'$153,830'},
        {id:6, title:'Average undergraduate GPA (full-time)',value:'3.67'},
        {id:7, title:'Average GMAT score (full-time)',value:'729'},
        {id:8, title:'Full-time graduates employed at graduation',value:'79.3%'},
        {id:9, title:'Full-time graduates employed three months after graduation',value:'90.6%'},
        {id:10, title:'Enrollment (full-time)',value:'1,871'},
        ],
      studyBodyList:[
       {id:1,columnList:[{id:1,label:'在校学生数',content:'1000'},{id:2,label:'国际学生占比',content:'40.3%'}]}, 
       {id:2,columnList:[{id:1,label:'国际学生代表的国家',content:'中国（26.8％），印度（5.7％），加拿大（3.4％），伊朗开湾/土耳其（2.3％），韩国（2.1％）',span:24}]}, 
       {id:3,columnList:[{id:1,label:'在校学生数（全日制）',content:'400'},{id:2,label:'在校学生数（非全日制）',content:'85'}]}, 
       {id:4,columnList:[{id:1,label:'男性学生占比（全日制）',content:'55%'},{id:2,label:'女性学生占比（全日制）',content:'45%'}]}, 
       {id:5,columnList:[{id:1,label:'少数民族学生占比（全日制）',content:'55%'},{id:2,label:'国际学生占比（全日制）',content:'45%'}]}
      ],
      costList:[
       {id:1,columnList:[{id:1,label:'学费（全日制）',content:'15万'},{id:2,label:'住宿费',content:'1万'}]}, 
       {id:2,columnList:[{id:1,label:'书籍及其他用品费',content:'1万'},{id:2,label:'杂项开支',content:'2万'}]}, 
       {id:3,columnList:[{id:1,label:'每年级学费是否相同？',content:'是'},{id:2,label:'是否单独提供研究生宿舍？',content:'是'}]}, 
       {id:4,columnList:[{id:1,label:'全日制学生获得资助的人数比',content:'40%'},{id:2,label:'获得资助超过全额学费的人数比',content:'99%'}]}, 
       {id:5,columnList:[{id:1,label:'获得学费全额资助的人数比',content:'99%'},{id:2,label:'获得学费半额及以上资助的人数比',content:'是'}]},
       {id:6,columnList:[{id:1,label:'获得不足学费半额资助的人数比',content:'是'},{id:2,label:'国际学生获得资助的人数比',content:'85'}]}
      ],
      libraryList:[
       {id:1,columnList:[{id:1,label:'Total titles',content:'One'}]}, 
       {id:2,columnList:[{id:1,label:'Print titles (excludingnonbook titles)',content:'One'}]}, 
       {id:3,columnList:[{id:1,label:'Microform titles',content:'One'}]}, 
       {id:4,columnList:[{id:1,label:'Electronic titles',content:'One'}]}, 
       {id:5,columnList:[{id:1,label:'Other non-book titles',content:'One'}]},
       {id:6,columnList:[{id:1,label:'Volumes (excludingmicroforms)',content:'One'}]},
       {id:7,columnList:[{id:1,label:'Volume equivalent microforms',content:'One'}]},
       {id:8,columnList:[{id:1,label:'Total volumes and volume equivalents',content:'One'}]},
       {id:9,columnList:[{id:1,label:'关于图书馆的其他信息',content:'Two'}]}
      ],
      careerList:{
        master:
          {
            graduateRate:[
              {id:1,columnList:[{id:1,label:'全日制毕业生人数',content:'1000'},{id:2,label:'正在求职的毕业生数',content:'100'}]}, 
              {id:2,columnList:[{id:1,label:'毕业就业率（全日制）',content:'90%'},{id:2,label:'毕业3个月后就业率（全日制）',content:'100%'}]}, 
              {id:3,columnList:[{id:1,label:'毕业生最低基本薪资',content:'7000'},{id:2,label:'毕业生最高基本薪资',content:'10000'}]}, 
              {id:4,columnList:[{id:1,label:'毕业生平均基本薪资',content:'8000'},{id:2,label:'基本薪资调查样本数',content:'500'}]}, 
            ],
            avgsalary:[
              {id:1,columnList:[{id:1,label:'毕业生最低基本薪资',content:'7000'},{id:2,label:'毕业生最高基本薪资',content:'10000'}]}, 
              {id:2,columnList:[{id:1,label:'毕业生平均基本薪资',content:'8000'}]}, 
            ]
          },
        phd:{
            graduateRate:[
              {id:1,columnList:[{id:1,label:'全日制毕业生人数',content:'100'},{id:2,label:'正在求职的毕业生数',content:'100'}]}, 
              {id:2,columnList:[{id:1,label:'毕业就业率（全日制）',content:'90%'},{id:2,label:'毕业3个月后就业率（全日制）',content:'100%'}]}, 
              {id:3,columnList:[{id:1,label:'毕业生最低基本薪资',content:'7000'},{id:2,label:'毕业生最高基本薪资',content:'10000'}]}, 
              {id:4,columnList:[{id:1,label:'毕业生平均基本薪资',content:'8000'},{id:2,label:'基本薪资调查样本数',content:'500'}]}, 
            ],
            avgsalary:[
              {id:1,columnList:[{id:1,label:'毕业生最低基本薪资',content:'10000'},{id:2,label:'毕业生最高基本薪资',content:'12000'}]}, 
              {id:2,columnList:[{id:1,label:'毕业生平均基本薪资',content:'11000'}]}, 
            ]
        }
      },
      jobColumns:[
        {
          key:'id',
          align:'center'
        },
        {
          title:'职业名称',
          key:'careerName',
          align:'center'
        },
        {
          title:'最低薪资',
          key:'minSalary',
          align:'center'
        },
        {
          title:'平均薪资',
          key:'avgSalary',
          align:'center'
        },
        {
          title:'最高薪资',
          key:'maxSalary',
          align:'center'
        },
      ],
      jobData:[
        {
          id:1,
          careerName:'Management',
          minSalary:'$50,000',
          avgSalary:'$120,054',
          maxSalary:'$154,000'
        }
      ],
      tradeColumns:[
        {
          key:'id',
          align:'center'
        },
        {
          title:'职业名称',
          key:'careerName',
          align:'center'
        },
        {
          title:'最低薪资',
          key:'minSalary',
          align:'center'
        },
        {
          title:'平均薪资',
          key:'avgSalary',
          align:'center'
        },
        {
          title:'最高薪资',
          key:'maxSalary',
          align:'center'
        },
      ],
      tradeData:[
        {
          id:1,
          careerName:'Management',
          minSalary:'$50,000',
          avgSalary:'$120,054',
          maxSalary:'$154,000'
        }
      ],
      curr_data:''
    }
  },
  components: {
    vTitle
  },
  created () {
    // this.updateLoadingStatus({ isLoading: true });
    get_usnews()
      .then(valid.call(this))
      .then(res => {
        if (res.ok) {
          this.curr_data = res.data.data;
          console.log(this.curr_data)
        }
      })
      .catch(errors.call(this))
      .finally(() => {
        // this.updateLoadingStatus({ isLoading: false });
      });
  },
  beforeUpdate () {
    if(this.tabSelect =='硕士'){
      this.tabValue = 'master'
    }else{
      this.tabValue = 'phd'
    }
  },
  methods: {
    close(index){
      this.showList[index].show = !this.showList[index].show;
    },
    save(){
      this.$router.push({name:'library.academeManage'})
    }
  }
}
</script>
