//专业库---研究生院
<style lang="less">

</style>
<template>
  <div class="tm_ad_search_grade_major">
        <Form :model="major_lib_academe" :label-width="90" label-position="left"> 
            <!-- 申请学位 -->
            <FormItem label="申请学位：" prop="applyDegree">
                <RadioGroup v-model="major_lib_academe.applyDegree">
                    <Radio v-show="item.label !='学士'" v-for="(item,index) in applyDegreeList" :key="index" :label="item.value">{{item.label}}</Radio>
                </RadioGroup>
            </FormItem>
            <!-- U.S.News学校排名-->                
            <FormItem label="U.S.News学校排名：">
                <v-slider :min="1" :groupArr="schoolRankingGroup" :start.sync="major_lib_academe.schoolRankingStart" :end.sync="major_lib_academe.schoolRankingStop"></v-slider>
            </FormItem> 
            <!-- U.S.News学院排名-->                
            <FormItem label="U.S.News学院排名：">
                <v-slider :min="1" :groupArr="schoolRankingGroup" :start.sync="major_lib_academe.majorRankingStart" :end.sync="major_lib_academe.majorRankingStop"></v-slider>
            </FormItem> 
            <!-- 考试政策 -->
            <FormItem label="考试政策：" prop="policy">
            <CheckboxGroup v-model="major_lib_academe.policy">
                <Checkbox label="">不限</Checkbox>
                <Checkbox label="toeflRequire">不要求托福</Checkbox>
                <Checkbox label="acceptIelts">接受雅思</Checkbox>
                <Checkbox label="satRequire">不要求SAT</Checkbox>
                <Checkbox label="actRequire">不要求ACT</Checkbox>
                <Checkbox label="greNotRequire">不要求GRE</Checkbox>
                <Checkbox label="gmatNotRequire">不要求GMAT</Checkbox>
            </CheckboxGroup>
            </FormItem> 
            <!-- 托福最低分 -->
            <FormItem label="托福最低分：">
                <v-slider :groupArr="toeflScoreGroup" :start.sync="major_lib_academe.toeflScoreStart" :end.sync="major_lib_academe.toeflScoreStop" :max="120"></v-slider>
            </FormItem> 
            <!-- 雅思最低分 -->
            <FormItem label="雅思最低分：">
                <v-slider :groupArr="ieltsScoreGroup" :start.sync="major_lib_academe.ieltsScoreStart" :end.sync="major_lib_academe.ieltsScoreStop" :max="9"></v-slider>
            </FormItem> 
        </Form>
        <div class="btn">
            <Button @click="handleSearch">搜索</Button>
        </div>
  </div>
</template>
<script>
import  vSlider  from "../.../../../../../modules/vSlider";

let
    schoolRankingGroup = [
        {k:'不限',v:','},
        {k:'1-10',v:'1,10'},
        {k:'11-30',v:'11,30'},
        {k:'31-50',v:'31,50'},
        {k:'51-100',v:'51,100'},
    ],
    toeflScoreGroup = [
        {k:'不限',v:','},
        {k:'低于105分',v:'0,105'},
        {k:'105-110分',v:'105,110'},
        {k:'高于110分',v:'110,120'},
    ],
    ieltsScoreGroup = [
        {k:'不限',v:','},
        {k:'低于7分',v:'0,7'},
        {k:'7分',v:'7,'},
        {k:'高于7分',v:'7,9'},
    ]

export default {
    name:'gradeMajorQuery',
    props:['mapDict'],
    data () {
        return {
            schoolRankingGroup:schoolRankingGroup,
            toeflScoreGroup:toeflScoreGroup,
            ieltsScoreGroup:ieltsScoreGroup,
            major_lib_academe:{
                applyDegree:'',
                country:'140', 
                schoolRankingStart:'',
                schoolRankingStop:'',
                majorRankingStart:'',
                majorRankingStop:'',
                policy:[],
                toeflScoreStart:'',
                toeflScoreStop:'',
                ieltsScoreStart:'',
                ieltsScoreStop:'',
            }
        }
    },
    components:{
       vSlider 
    },
    computed: {
        applyDegreeList(){
            return this.mapDict;
        }
    },
    methods: {
        handleSearch(){
            let obj  = Object.assign({},this.major_lib_academe)
            // obj.applyDegree = obj.applyDegree.join(',');
            obj.policy = obj.policy.join(',');
            this.$emit('search',obj);
            this.$emit('input',4);
        }
    }    
}
</script>
