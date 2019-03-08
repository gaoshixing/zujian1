<style lang="less">
.lib_addAcademe_container{
  // input,
  // textarea,
  // .ivu-select-selection{
  //    background-color: #f1f1f1;
  // }
  .warning{
    color: #e83323;
    padding-left: 49px;
    margin-top: 20px;
  }
  .btnSubmit{
    max-width: 1200px;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    margin-left: -70px;
    .ivu-btn{
      padding-left: 38px;
      padding-right: 38px;
    }
  }
}
</style>
<template>
  <div class="lib_addAcademe_container">
    <hint :stepList="stepList" :num="processStep" :url="urlList" @jump="showNumChange"
    >
    <!-- <div slot="hintTit" v-html="hintTitContent"></div> -->
    <template v-if="hintTitContent==0">
      <div slot="hintTit">
        Please complete this questionnaire as fully and accurately as possible, which should take around <span style="color:red;">30 minutes</span>. The information provided will allow your counselor to provide more personalized, helpful guidance. Responses will be kept strictly confidential and will be regarded as privileged information.
      </div>
      <div slot="stepTips">你需要用<span style="color:red;">30分钟</span>完成以下两个步骤!</div>
    </template>
    <template v-else>
      <div slot="hintTit">
         带<img width="25" style="margin:0 10px" src="../../../assets/images/schoolManage/addSchool/us.svg">标识的项，表示内容来自US.News，由系统自动填写，建议审核填写是否正确！
      </div>
      <div slot="stepTips">你需要用<span style="color:red;">30分钟</span>完成以下三个步骤!</div>
    </template>
    </hint>
    <router-view style="padding-bottom:20px" :currentTitle.sync="currentTitle" v-on="$listeners" ></router-view>
  </div>
</template>
<script>
import hint from "../../../modules/hint";
export default {
  name:'addAcademe',
  data () {
    return {
      stepTips:'两',
      currentTitle:0,
    }
  },
  computed: {
    processStep(){
      return this.$route.params.processStep*1;
    },
    urlList(){
        if(this.$route.params.currentTitle ==0){
            return ['library.academeBasicInfo','library.academeMajorProject'];
        }else{
            return ['library.academeBasicInfo','library.academeMajorProject','library.editAcademeUSNews'];
        }
    },
    stepList(){
      if(this.$route.params.currentTitle ==0){
            return [{label:'基本信息'},{label:'专业项目'}];
        }else{
            return [{label:'基本信息'},{label:'专业项目'},{label:'U.S.News'}];
      }
    },
    hintTitContent(){
      if(this.$route.params.currentTitle ==0){
            return 0;
        }else{
            return 1;
      }
    }
  },
  components: {
    hint
  },
  methods: {
    updateCurrentTitle(val){
      this.currentTitle = val;
    },
  	showNumChange:function(val,url,id,edit){
        if(val==this.processStep){
          return;
        }
        if(!id){
           this.$Message.warning('没有添加学院无法添加专业');
        }else{
          this.$router.push({name:url, query: {showNum:val,'edit':edit,schoolId:id},params:{processStep:val,currentTitle: this.urlList.length==3?1:0}})
        }
  	}
  },
  updated(){
    console.log('=====',this.stepList);
    
  }
}
</script>
