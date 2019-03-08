// 院校库---研究生院
<style lang="less">

</style>
<template>
  <div class="tm_ad_search_grade_school">
        <Form :model="college_lib_academe" :label-width="90" label-position="left"> 
            <!-- 城市类型 -->
            <FormItem label="城市类型：" prop="cityType">
                <CheckboxGroup v-model="college_lib_academe.cityType">
                    <Checkbox v-for="(item,index) in associateDitData.ss_school_setting" :key="index" :label="item.value">{{item.label}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <!-- 学院类型 -->
            <FormItem label="学院类型：" prop="gradeSchoolTypes">
            <CheckboxGroup v-model="college_lib_academe.gradeSchoolTypes">
                <Checkbox v-for="(item,index) in associateDitData.ss_gradeschool_type" :key="index" :label="item.value">{{item.label}}</Checkbox>

            </CheckboxGroup>
            </FormItem>
            <!-- 招生学位  -->
            <FormItem label="招生学位：" prop="gradeSchoolDegree">
            <CheckboxGroup v-model="college_lib_academe.gradeSchoolDegree">
                <Checkbox v-for="(item,index) in associateDitData.ss_school_degree" :key="index" :label="item.value">{{item.label}}</Checkbox>
            </CheckboxGroup>
            </FormItem>
            <!-- U.S.News学院排名-->                
            <FormItem label="U.S.News学院排名：">
                <v-slider :min="1" :groupArr="schoolRankingGroup" :start.sync="college_lib_academe.gradeSchoolRankingStart" :end.sync="college_lib_academe.gradeSchoolRankingStop"></v-slider>
            </FormItem> 
        </Form>
        <div class="btn">
            <Button @click="handleSearch">搜索</Button>
        </div>
  </div>
</template>
<script>
import  vSlider  from "../.../../../../../modules/vSlider";

let  schoolRankingGroup = [
        {k:'不限',v:','},
        {k:'1-10',v:'1,10'},
        {k:'11-30',v:'11,30'},
        {k:'31-50',v:'31,50'},
        {k:'51-100',v:'51,100'},
    ];
export default {
    name:'gradeSchoolQuery',
    props:['mapDict'],
    data () {
        return {
            schoolRankingGroup:schoolRankingGroup,
            college_lib_academe:{
                 country:'140', 
                cityType:[],
                gradeSchoolTypes:[],
                gradeSchoolDegree:[],
                gradeSchoolRankingStart:'',
                gradeSchoolRankingStop:'',
            }
        }
    },
    computed: {
        associateDitData(){
            return this.mapDict
        }
    },
    components: {
        vSlider
    },
    methods: {
        handleSearch(){
            let obj  = Object.assign({},this.college_lib_academe)
            obj.cityType = obj.cityType.join(',') 
            obj.gradeSchoolTypes = obj.gradeSchoolTypes.join(',') 
            obj.gradeSchoolDegree = obj.gradeSchoolDegree.join(',') 
            this.$emit('search',obj)
            this.$emit('input',2);
        }
    }
}
</script>
