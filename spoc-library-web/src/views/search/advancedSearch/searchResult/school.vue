//院校库---学校

<style lang="less">

</style>
<template>
    <div class="tm_ad_search_school">
        <Form :label-width="90" label-position="left" ref="college_lib_shcool" :model="college_lib_shcool">
                        <!-- 城市类型 -->
                        <FormItem label="城市类型：" prop="cityType">
                        <CheckboxGroup v-model="college_lib_shcool.cityType">
                            <Checkbox v-for="(item,index) in associateDitData.ss_school_setting" :key="index" :label="item.value">{{item.label}}</Checkbox>
                        </CheckboxGroup>
                        </FormItem> 
                        <!-- 地区/州 -->
                        <FormItem label="地区/州：">
                            <!-- <CheckboxGroup  v-model="regionRequire" style="width:70px;display:inline-block">
                                <Checkbox label="0">
                                    不限
                                </Checkbox>
                            </CheckboxGroup> -->
                            <Select v-model="college_lib_shcool.region" @on-change="toState(college_lib_shcool.region)" style="width:200px;margin-right:20px">
                                <Option v-for="item in regionList" :value="item.id" :key="item.id" @click.native="getRegionName(item.name)">{{ item.name }}</Option>
                            </Select>
                            <Select class="state_dropdown" v-model="college_lib_shcool.state" style="width:200px">
                                <Option v-for="item in stateList" :value="item.id" :key="item.id" @click.native="getStateName(item.name)">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <!-- 办学性质 -->
                        <FormItem label="办学性质：" prop="nature">
                        <CheckboxGroup v-model="college_lib_shcool.nature">
                            <Checkbox v-for="(item,index) in associateDitData.ss_school_nature" :key="index" :label="item.value">{{item.label}}</Checkbox>

                        </CheckboxGroup>
                        </FormItem> 
                        <!-- 学校类型 -->
                        <FormItem label="学校类型：" prop="schoolType">
                        <CheckboxGroup v-model="college_lib_shcool.schoolType">
                            <Checkbox v-for="(item,index) in associateDitData.ss_school_school_type" :key="index" :label="item.value">{{item.label}}</Checkbox>
 
                        </CheckboxGroup>
                        </FormItem> 
                        <!-- 排名类型 -->
                        <FormItem label="排名类型：" prop="schoolRankingType">
                        <RadioGroup v-model="college_lib_shcool.schoolRankingType" style="max-width:900px">
                            <Radio v-for="(item,index) in associateDitData.ss_rank_type" :key="index" :label="item.value">{{item.label}}</Radio>
                        </RadioGroup>
                        </FormItem> 
                        <!-- 排名区间 -->
                        <FormItem label="排名区间：">
                            <v-slider :min="1" :max="200" :groupArr="rankingGroup" :start.sync="college_lib_shcool.schoolRankingStart" :end.sync="college_lib_shcool.schoolRankingStop"></v-slider>
                        </FormItem> 
                        <!-- 申请批次 -->
                        <FormItem label="申请批次：" prop="batch">
                        <CheckboxGroup v-model="college_lib_shcool.batch">
                            <Checkbox v-for="(item,index) in associateDitData.xx_choice_school_batch" :key="index" :label="item.value">{{item.label}}</Checkbox>

                        </CheckboxGroup>
                        </FormItem> 
                        <!-- 考试政策 -->
                        <FormItem label="考试政策：" prop="policy">
                        <CheckboxGroup v-model="college_lib_shcool.policy">
                            <Checkbox label="" style="display:none;">不限</Checkbox>
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
                            <v-slider :groupArr="toeflScoreGroup" :start.sync="college_lib_shcool.toeflScoreStart" :end.sync="college_lib_shcool.toeflScoreStop" :max="120"></v-slider>
                        </FormItem> 
                        <!-- 雅思最低分 -->
                        <FormItem label="雅思最低分：">
                            <v-slider :groupArr="ieltsScoreGroup" :start.sync="college_lib_shcool.ieltsScoreStart" :end.sync="college_lib_shcool.ieltsScoreStop" :max="9"></v-slider>
                        </FormItem> 
                        <!-- 学费/年($) -->
                        <FormItem label="学费/年（$）：">
                             <v-slider :groupArr="tuitionGroup" :start.sync="college_lib_shcool.tuitionStart" :end.sync="college_lib_shcool.tuitionStop" :max="10"></v-slider>
                        </FormItem> 
                        <!-- 是否有本科商学院 -->
                        <FormItem label="是否有本科商学院：" prop="isBusiness">
                        <RadioGroup v-model="college_lib_shcool.isBusiness">
                            <!-- <Radio label="">不限</Radio> -->
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                        </FormItem> 
                        <!-- 是否有本科工程学院 -->
                        <FormItem label="是否有本科工程学院：" prop="isEngineering">
                        <RadioGroup v-model="college_lib_shcool.isEngineering">
                            <!-- <Radio label="">不限</Radio> -->
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                        </FormItem> 
                        <!-- 国际生是否可申请奖学金 -->
                        <FormItem label="国际生是否可申请奖学金：" prop="isScholarships">
                        <RadioGroup v-model="college_lib_shcool.isScholarships">
                            <!-- <Radio label="">不限</Radio> -->
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                        </FormItem> 
                        <!-- 国际生是否可申请组学金 -->
                        <FormItem label="国际生是否可申请助学金：" prop="isFinancialaid">
                        <RadioGroup v-model="college_lib_shcool.isFinancialaid">
                            <!-- <Radio label="">不限</Radio> -->
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
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
    rankingGroup = [
        {k:'不限',v:','},
        {k:'1-10',v:'1,10'},
        {k:'11-30',v:'11,30'},
        {k:'31-50',v:'31,50'},
        {k:'51-100',v:'51,100'},
        {k:'101-150',v:'101,150'},
        {k:'151-200',v:'151,200'},
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
    ],
    tuitionGroup = [
        {k:'不限',v:','},
        {k:'2万-4万',v:'2,4'},
        {k:'4万-6万',v:'4,6'},
        {k:'6万-10万',v:'6,10'},
    ]

export default {
    name:'schoolQuery',
    props:['mapDict','regionList','stateList'],
    data () {
        return {
            rankingGroup:rankingGroup,
            toeflScoreGroup:toeflScoreGroup,
            ieltsScoreGroup:ieltsScoreGroup,
            tuitionGroup:tuitionGroup,
            regionRequire:[],
            college_lib_shcool:{
                country:'140',
                region:'',
                state:'',
                cityType:[],
                nature:[],
                schoolType:[],
                schoolRankingType:'',
                schoolRankingStart:'',
                schoolRankingStop:'',
                batch:[],
                policy:[],
                toeflScoreStart:'',
                toeflScoreStop:'',
                ieltsScoreStart:'',
                ieltsScoreStop:'',
                tuitionStart:'',
                tuitionStop:'',
                isBusiness:'',
                isEngineering:'',
                isScholarships:'',
                isFinancialaid:'',
            },
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
            let obj  = Object.assign({},this.college_lib_shcool)
            obj.cityType = obj.cityType.join(',');
            obj.batch = obj.batch.join(',');
            obj.policy = obj.policy.join(',');
            obj.nature = obj.nature.join(',');
            obj.schoolType = obj.schoolType.join(',');
            this.$emit('search',obj) 
            this.$emit('input',1);
        },
        toState(val){
            this.$emit('update:state',val)
        },
        getRegionName(regionName){
            this.$emit('update:regionName',regionName)            
        },
        getStateName(stateName){
            this.$emit('update:stateName',stateName)            
        }
    },
    watch: {
        ['college_lib_shcool.schoolType'](val){
            if(val == 'liberalArtsCollege'){
            this.college_lib_shcool.schoolRankingType = 'usnewsLiberalArts';
            }
        },
    }
}
</script>

