<style lang="less">
.library_major_detail_page{
    .view-major-detail{
        margin: 20px 0;
    }
    .library_major_detail{
        .items-list{
            width: 94%;
            margin: 0 auto;
            .info-item{
                margin: 20px 0;
                font-size: 14px;
                .info-title{
                    width: 20%;
                    padding-right: 20px;
                    float: left;
                    color: #999;
                    text-align: right;
                }
                .info-text{
                    width: 80%;
                    float: right;
                    color: #323232;
                }
            }
        }
    }
}

</style>

<template>
    <div class="library_major_detail_page">
        <v-title class="view-major-detail" title="专业-专业详情"></v-title>

        <div class="library_major_detail">
            <div class="items-list">
                <div class="info-item clearfix" v-for="(item,index) in sorted" :key="index">
                    <div class="info-title" v-text="item.v"></div>
                    <template v-if="item.k=='ssMajorBranchList'">
                        <div class="info-text">
                            <job-manage ref="branch" :isjob="false" :isbranch="true" :readonly="true"></job-manage>
                        </div>
                    </template>
                    <template v-else-if="item.k=='ssMajorJobList'">
                        <div class="info-text">
                            <job-manage ref="job" :isjob="true" :isbranch="false" :readonly="true" ></job-manage>
                        </div>
                    </template>
                    <template v-else-if="item.k=='ssMajorCertificateList'">
                        <div class="info-text">
                            <job-manage ref="exam" :isjob="false" :isbranch="false" :readonly="true" ></job-manage>
                        </div>
                    </template>
                    <template v-else>
                        <div class="info-text" v-html="data[item.k]"></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import valid, { errors, major } from "../../libs/request.js";
import {mapMutations,mapGetters} from 'vuex';
import jobManage from './formSection/jobManage.vue';
import vTitle from "@public/modules/vTitle";

let sorted=
[
    {
        k:'name',
        v:'专业名称'
    },
    {
        k:'enname',
        v:'专业名称'
    },
    {
        k:'introduce',
        v:'专业介绍'
    },
    {
        k:'ssMajorBranchList',
        v:'专业分支/分类'
    },
    {
        k:'researchMethod',
        v:'授课/研究方式'
    },
    {
        k:'beneficialCourse',
        v:'高中有益课程'
    },
    {
        k:'classicsCourse',
        v:'本科经典课程'
    },
    {
        k:'researchDirection',
        v:'是否有研究生项目'
    },
    {
        k:'preference',
        v:'专业偏好个人特质'
    },
    {
        k:'jobInfo',
        v:'职业发展'
    },
    {
        k:'ssMajorJobList',
        v:''
    },
    {
        k:'ssMajorCertificateList',
        v:'执业资格'
    },
    {
        k:'relatedMajors',
        v:'职业发展'
    }

];
export default {
    data(){
        return {
            sorted:sorted,
            data:{}
        }
    },
    created(){
        this.getData(this.$route.query.id);
    },
    components:{
        jobManage,
        vTitle

    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        getData(id){
            this.updateLoadingStatus({isLoading:true});
            major.form(id).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.data = res.data.data;
                    this.$nextTick(()=>{
                        this.$refs.job[0].setData(this.data.ssMajorJobList);
                        this.$refs.exam[0].setData(this.data.ssMajorCertificateList);
                        this.$refs.branch[0].setData(this.data.ssMajorBranchList);
                    });
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        }
    },


}
</script>

