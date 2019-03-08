<style lang="less">
.add-new-personnel-container{
    position: relative;
    .footer-modal{
        text-align: center;
    }
    .clear() {
        zoom: 1;
        &::before, &::after{
            content: "";display: block;height: 0;line-height: 0;
            clear: both;font-size: 0;
        }
    }
    .ivu-form{
        .clear();
    }
    .ivu-form-item{
        float: left;
    }
    .tips{
        @h: 32px;
        height: @h;line-height: @h;overflow: hidden;
        padding-left: 120px;margin-bottom: 6px;
        i{
            font-style: inherit;color: #ed3f14;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
        }
    }
}
</style>
    
<template>
    <Modal v-model="model" title="添加员工" :mask-closable="false" width='750' class="add-new-personnel-container" @on-cancel="cancel">
        <step-bar :steps="steps" :active="over" :over="over" ref="stepBar" @onclick="changStep" style="margin-bottom: 30px;"></step-bar>
        <!-- <div class="tips">带 <i>*</i> 为必填项</div> -->
        <div v-if="model">
            <div v-show="active == 0">
                <new-personnel-brief :pid="pid" :personnelId="personnelId" ref="briefComponent" @goNext="goWork" @onStopLoading="stopLoading"></new-personnel-brief>
            </div>
            <div v-show="active == 1">
                <new-personnel-work :pid="pid" :personnelId="personnelId" ref="wordComponent" @goNext="goEducational" @onStopLoading="stopLoading"></new-personnel-work>
            </div>
            <div v-show="active == 2">
                <new-personnel-educational :pid="pid" :personnelId="personnelId" ref="eduComponent" @goNext="goEntry" @onStopLoading="stopLoading"></new-personnel-educational>
            </div>
            <div v-show="active == 3">
                <new-personnel-entry :pid="pid" :personnelId="personnelId" ref="entryComponent" @goNext="goLsat" @onStopLoading="stopLoading"></new-personnel-entry>
            </div>
            <div v-show="active == 4">
                <Form ref="socialSecurity" :model="socialSecuritylModal" :rules="socialSecurityRules" :label-width="120">
                    <FormItem label="社保城市：" prop="insureCity" style="width: 50%">
                        <cityarea ref="city" :pro.sync="socialSecuritylModal.provinceId" :ci.sync="socialSecuritylModal.insureCity" width="45%"/>
                    </FormItem>
                    <FormItem label="社保基数：" prop="socialBaseNum" style="width: 50%">
                        <InputNumber v-model="socialSecuritylModal.socialBaseNum" style="width:200px;"/>
                    </FormItem>
                    <FormItem label="公积金基数：" prop="fundBase" style="width: 50%">
                        <InputNumber v-model="socialSecuritylModal.fundBase" style="width:200px;"/>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div slot="footer" class="footer-modal">
            <Button type="primary" v-if="active > 0" @click="prev">返回上一步</Button>
            <Button type="primary" v-if="active < 4" @click="saveAndNext">保存并下一步</Button>
            <Button type="primary" v-if="active == 4" @click="validateSocialSecurityl">提交</Button>
            <a v-if="active == 1 || active == 2" @click="next" style="margin-left:10px;">跳过</a>
        </div>
    </Modal>
</template>

<script>

import stepBar from './stepBar';
import newPersonnelBrief from './brief';
import newPersonnelWork from './work';
import newPersonnelEducational from './educational';
import newPersonnelEntry from './entry';
import valid, { errors, salUserBasicInfo, sys, user } from '../../../libs/request.js';
import cityarea from '@public/modules/cityarea';
import { mapMutations } from 'vuex';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            steps:  [
                {
                    "label": "基本信息",
                    "value": "init"
                }, 
                {
                    "label": "工作经历",
                    "value": "firstcall"
                }, 
                {
                    "label": "教育背景",
                    "value": "secondcall"
                }, 
                {
                    "label": "入职信息",
                    "value": "trace"
                }, 
                {
                    "label": "社保信息",
                    "value": "intend"
                }
            ],
            active: 0,
            over: 0, //完成

            model: false,
            socialSecuritylModal: {
                provinceId: '',
                insureCity: '',
                socialBaseNum: null,
                fundBase: null,
            },
            socialSecurityRules: {
                name: {
                    required: true, message: 'The name cannot be empty', trigger: 'blur'
                }
            },
            // personnelId: '5bad42a27cd448b5832065aecfc53cd6',
            personnelId: '',
        };
    },
    components: {
        stepBar, newPersonnelBrief, newPersonnelWork, newPersonnelEducational,
        newPersonnelEntry, cityarea
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        show() {
            this.model = true;
        },
        changStep(obj, index) {
            this.active = index;
            this.getId(index);
        },
        getId(index) {
            if(index == 0) this.$refs.briefComponent.getId(this.personnelId);
            else if(index == 1) this.$refs.wordComponent.getId(this.personnelId);
            else if(index == 2) this.$refs.eduComponent.getId(this.personnelId);
            else if(index == 3) this.$refs.entryComponent.getId(this.personnelId);
        },
        next() {
            this.active += 1;
            if(this.over < this.active) this.over = this.active;
        },
        goWork(id) {
            // 基础信息保存完之后
            // console.log(id);
            if(id) this.personnelId = id;
            this.active = 1;
            if(this.over < 1) this.over = 1;
        },
        goEducational() {
            this.active = 2;
            if(this.over < 2) this.over = 2;
        },
        goEntry() {
            this.active = 3;
            if(this.over < 3) this.over = 3;
        },
        goLsat() {
            this.active = 4;
            if(this.over < 4) this.over = 4;
        },
        prev() {
            this.active -= 1;
            this.getId(this.active);
        },
        saveAndNext() {
            // 保存并下一步
            this.updateLoadingStatus({isLoading:true});
            let num = this.active;
            if(num == 0) this.$refs.briefComponent.handleSubmit();
            else if(num == 1) this.$refs.wordComponent.handleSubmit();
            else if(num == 2) this.$refs.eduComponent.handleSubmit();
            else if(num == 3) this.$refs.entryComponent.handleSubmit();
        },
        stopLoading() {
            this.updateLoadingStatus({isLoading:false});
        },
        validateSocialSecurityl() {
            this.updateLoadingStatus({isLoading:true});
            this.$refs.socialSecurity.validate((valid) => {
                if (valid) {
                    // console.log(this.workModal)
                    this.saveSocialSecurityl();
                }
            })
        },
        saveSocialSecurityl() {
            // 提交
            let params = JSON.parse(JSON.stringify(this.socialSecuritylModal));
            delete params.provinceId;
            params.userId = this.personnelId;
            salUserBasicInfo.saveSocialInfo(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.stopLoading();
                    this.model = false;
                    this.personnelId = ''; //id置空
                    this.active = 0; //回到添加基本信息
                    this.over = 0; //回到添加基本信息
                    this.socialSecuritylModal = {
                        provinceId: '',
                        insureCity: '',
                        socialBaseNum: null,
                        fundBase: null,
                    }
                }
            }).catch(errors.call(this));
        },
        cancel() {
            this.personnelId = ''; //id置空
            this.active = 0; //回到添加基本信息
            this.over = 0; //回到添加基本信息
            this.$refs.briefComponent.handleReset();
            this.$refs.wordComponent.handleReset();
            this.$refs.eduComponent.handleReset();
            this.$refs.entryComponent.handleReset();
        },
    }
}
</script>


