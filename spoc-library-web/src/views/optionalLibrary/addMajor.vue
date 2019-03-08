<style lang="less">
.ibrary_addmajor_page{
    .add-major-title{
        margin: 20px 0;
    }
    .library_addmajor_form{
        width: 94%;
        margin: 10px auto;
        padding-right: 20px;
        .save-btn{
            text-align: center;
            margin: 20px 0;
            padding-bottom: 40px;
            .ivu-btn{
                width: 140px;
                height: 40px;
            }
        }
        .major-name{
            font-size: 14px;
        }
        .halfinput{
            width: 320px;
        }
    }
    .ivu-form .ivu-form-item-label{
        font-size: 14px;
    }
}


</style>

<template>
    <div class="ibrary_addmajor_page">
        <v-title class="add-major-title" title="专业-添加专业"></v-title>
        <div class="library_addmajor_form">
            <Form :label-width="140" label-position="right" ref="addMajorForm" :rules="addMajorForm.ruleValidate" :model="addMajorForm.data">
                <FormItem label="专业名称" prop="name">
                    <Input v-if="editMode" class="halfinput major-name" placeholder="中文名称" v-model="addMajorForm.data.name"></Input>
                    <v-select v-else v-model="addMajorForm.data.name" class="halfinput major-name" placeholder="中文名称" :datafunc="majorNameData" k="cnname" @selected="chooseEdit" @blur="validThis('name')"></v-select>
                </FormItem>
                <FormItem label="专业名称" prop="enname">
                    <Input v-if="editMode" class="halfinput major-name" placeholder="英文名称" v-model="addMajorForm.data.enname"></Input>
                    <v-select v-else v-model="addMajorForm.data.enname" class="halfinput major-name" placeholder="英文名称" :datafunc="majorNameData" k="enname" @selected="chooseEdit" @blur="validThis('enname')"></v-select>
                </FormItem>
                <FormItem label="专业介绍" prop="introduce">
                    <Input type="textarea" v-model="addMajorForm.data.introduce"></Input>
                </FormItem>
                <job-manage ref="branch" :isbranch="true" :isjob="false" :padd="140" ></job-manage> 
                <FormItem label="授课/研究方式">
                    <Input type="textarea" v-model="addMajorForm.data.researchMethod"></Input>
                </FormItem>
                <FormItem label="高中有益课程">
                    <Input type="textarea" v-model="addMajorForm.data.beneficialCourse"></Input>
                </FormItem>
                <FormItem label="本科经典课程">
                    <Input type="textarea" v-model="addMajorForm.data.classicsCourse"></Input>
                </FormItem>

                <FormItem label="研究生项目">
                    <Input type="textarea" v-model="addMajorForm.data.researchDirection" placeholder="研究方向（没有则不填）"></Input>
                </FormItem>
                <FormItem label="">
                    <Input type="textarea" v-model="addMajorForm.data.researchDegree" placeholder="主要学位（没有则不填）"></Input>
                </FormItem>

                <FormItem label="专业偏好个人特质">
                    <Input type="textarea" v-model="addMajorForm.data.preference" placeholder="例如，会计专业~ 注意细节，具备优秀的分析能力，会计师大部分时间都在与他人沟通，优秀的沟通技巧是成功必不可少的素质。"></Input>
                </FormItem>
                <FormItem label="职业发展">
                    <Input type="textarea" v-model="addMajorForm.data.jobInfo" placeholder="职业概况"></Input>
                </FormItem>

                <job-manage ref="jobt" :isbranch="false" :isjob="true" :padd="140" ></job-manage>

                <FormItem label="执业资格">
                    <Input type="textarea" v-model="addMajorForm.data.certificate" placeholder="概况说明"></Input>
                </FormItem>
                
                <job-manage ref="examt" :isbranch="false" :isjob="false" :padd="140"></job-manage>

                <FormItem label="相关专业">
                    <Input type="textarea" v-model="addMajorForm.data.relatedMajors"></Input>
                </FormItem>

                <div class="save-btn">
                    <Button size="large" type="success" @click.native="doSave">保存</Button>
                </div>
                

                

            </Form>

        </div>
    </div>
</template>
<script>

import jobManage from './formSection/jobManage.vue';
import vTitle from "@public/modules/vTitle";
import vSelect from '../../modules/vSelect.vue';
import valid, { errors, major } from "../../libs/request.js";
import {mapMutations,mapGetters} from 'vuex';

export default {
    data(){
        return {
            addMajorForm:{
                data:{
                    name:'',
                    enname:''
                },
                ruleValidate:{
                    name:[
                        {required: true, message: '专业中文名称不能为空', trigger: 'blur'},
                        {type: 'string', message: '专业中文名称不能大于40个字符', max:40, trigger: 'blur'}
                    ],
                    enname:[
                        {required: true, message: '专业英文名称不能为空', trigger: 'blur'},
                        {type: 'string', message: '专业英文名称不能大于80个字符', max:80, trigger: 'blur'}
                    ],
                    introduce:[
                        {required: true, message: '专业介绍不能为空', trigger: 'blur'},
                        {type: 'string', message: '专业介绍不能大于500个字符', max:500, trigger: 'blur'}
                    ]
                }
            }
        };
    },
    computed:{
        data(){
            if(this.$route.query.id){
                return this.addMajorForm.data;
            }
            return {};
        },
        editMode(){
            return !!this.$route.query.id;   
        }
    },
    components:{
        jobManage,
        vTitle,
        vSelect
    },
    created(){
        if(this.editMode){
            this.initPage(this.$route.query.id);
        }
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        initPage(id){
            this.getData(id,data=>{
                this.$refs.jobt.setData(data.ssMajorJobList);
                this.$refs.examt.setData(data.ssMajorCertificateList);
                this.$refs.branch.setData(data.ssBranchList);
            });
        },
        majorNameData(text){
            return new Promise((resolve,reject)=>{
                major.listThink(text).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        resolve(res.data.data);
                    } else {
                        reject(res);
                    }
                }).catch(err=>{
                    errors.call(this);
                    reject(err);
                });
            });
        },
        chooseEdit(item){
            console.info(item);
            this.$router.replace({name:this.$route.name,query:{id:item.id} });
        },
        validThis(key){
            this.$refs.addMajorForm.validateField(key);
        },
        doSave(){
            this.$refs.addMajorForm.validate(isok=>{
                if(isok){
                    let data = this.addMajorForm.data;
                    data.ssMajorJobList = this.$refs.jobt.getData();
                    data.ssMajorCertificateList = this.$refs.examt.getData();
                    data.ssBranchList=this.$refs.branch.getData();
                    this.updateLoadingStatus({isLoading:true});
                    major.save(data).then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.$router.push({name:'library.optionalLibrary'});
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            });

        },
        getData(id,cb){
            major.form(id).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.addMajorForm.data = res.data.data;
                    cb&&cb(this.addMajorForm.data);
                }
            }).catch(errors.call(this)).finally(()=>{

            });
        }

    },
    watch:{
        '$route.query.id'(id){
            if(id){
                this.initPage(id);
            }
        }
    }
}
</script>
