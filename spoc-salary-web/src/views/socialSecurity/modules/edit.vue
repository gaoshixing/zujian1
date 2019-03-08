<style lang="less">
.social-security-eiit-container{
    .ivu-form{
        zoom: 1;
        // padding-left: 50px;
        &::before, &::after{
            content: "";display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .ivu-form-item{
        float: left;position: relative;
        .ivu-form-item-label{
            position: absolute;top: 50%;left: 0;-webkit-transform: translate(0,-50%);-ms-transform: translate(0,-50%);-moz-transform: translate(0,-50%);-o-transform: translate(0,-50%);transform: translate(0,-50%);
        }
    }
    .ivu-form-item-label{
        &::after{
            content: "：";
            position: absolute;right: 0;
            top: 50%;-webkit-transform: translate(0,-50%);-ms-transform: translate(0,-50%);-moz-transform: translate(0,-50%);-o-transform: translate(0,-50%);transform: translate(0,-50%);
        }
    }
    .footer-modal{
        text-align: center;
        .ivu-btn{
            font-size: 14px;
        }
    }
}
.modal-setting-dates {
    .modal-setting-icon {
        position: absolute;
        left: 0;
        top: 3px;
        color: #44bcb7;
        font-size: 14px;
        margin-right: 5px;
    }
    .tips-container {
        position: relative;
        padding-left: 55px;
        height: 50px;
        box-sizing: border-box;
    }
    .modal-setting-tips {
        font-size: 15px;
        position: absolute;
        top: 0;
        left: 15px;
    }
    .modal-setting-content {
        line-height: 20px;
        font-size: 14px;
        float: right;
    }
}
</style>
    
<template>
    <div v-if="localModel">
        <Modal v-if="model" v-model="localModel" title="调整员工社保信息" width='750' class="social-security-eiit-container" @on-cancel="onclickCancel">
            <Form ref="editForm" :model="localEditData" :label-width="120">
                <FormItem label="员工编号" style="width: 50%">
                    <div>{{ localEditData.userNo }}</div>
                </FormItem>
                <FormItem label="员工姓名" style="width: 50%">
                    <div>{{ localEditData.userName }}</div>
                </FormItem>
                <FormItem label="参保城市" prop="chengshi" style="width: 50%">
                    <Select v-model="localEditData.insureCity" style="width:200px;">
                        <Option v-for="item in cityLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="参保政策" prop="zhengce" style="width: 50%">
                    <Select v-model="localEditData.insurePolicy" style="width:200px;">
                        <Option v-for="item in zhengceLists" :value="item.value" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="社保基数" style="width: 50%">
                    <Input v-model="localEditData.SBJS_5RgRaOBe" style="width:200px;"/>
                </FormItem>
                <FormItem label="公积金基数" style="width: 50%">
                    <Input v-model="localEditData.fundBase" style="width:200px;"/>
                </FormItem>
                <!-- ????? -->
                <FormItem label="社保起缴月份" prop="shebaoqijiaoriqi" style="width: 50%">
                    <DatePicker v-model="localEditData.SBQJYF_gdhGW3ss" format="yyyy年MM月" type="month" style="width:200px;display: block;"></DatePicker>
                </FormItem>
                <FormItem label="公积金起缴月份" prop="shebaoqijiaoriqi" style="width: 50%">
                    <DatePicker v-model="localEditData.GJJQJYF_7CdLsmB8" format="yyyy年MM月" type="month" style="width:200px;display: block;"></DatePicker>
                </FormItem>
                <!-- ???? -->
                <FormItem label="养老个人缴费额" style="width: 50%">
                    <Input v-model="localEditData.YLGRJFE_kStmjxbG" style="width:200px;"/>
                </FormItem>
                <FormItem label="医疗个人缴费额" style="width: 50%">
                    <Input v-model="localEditData.YLGRJFE_6uqFPc67" style="width:200px;"/>
                </FormItem>
                <FormItem label="失业个人缴费额" style="width: 50%">
                    <Input v-model="localEditData.SYGRJFE_p560IpBy" style="width:200px;"/>
                </FormItem>
                <FormItem label="公积金个人缴费额" style="width: 50%">
                    <Input v-model="localEditData.GJJGRJFE_cQLqRYm1" style="width:200px;"/>
                </FormItem>
                <!-- ??? -->
                <FormItem label="个人缴费额小计" style="width: 50%">
                    <Input v-model="localEditData.GRJFEXJ_XTa2VjIS" style="width:200px;"/>
                </FormItem>
                <!-- ??? -->
                <FormItem label="养老企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.YLQYJFE_n9sbBwPb" style="width:200px;"/>
                </FormItem>
                <FormItem label="医疗企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.YLQYJFE_SrUcJszM" style="width:200px;"/>
                </FormItem>
                <!-- ??? -->
                <FormItem label="失业企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.SYQYJFE_wIPyNfR2" style="width:200px;"/>
                </FormItem>
                <!-- ??? -->
                <FormItem label="工商企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.GSQYJFE_NpAlZGSi" style="width:200px;"/>
                </FormItem>
                <FormItem label="生育企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.SYQYJFE_ZJgAg946" style="width:200px;"/>
                </FormItem>
                <FormItem label="公积金企业缴费额" style="width: 50%">
                    <Input v-model="localEditData.GJJQYJFE_619EXJ5R" style="width:200px;"/>
                </FormItem>
                <FormItem label="企业缴费额小计" style="width: 50%">
                    <Input v-model="localEditData.QYJFEXJ_EnveoARs" style="width:200px;"/>
                </FormItem>
                
                <FormItem label="服务费" style="width: 50%">
                    <Input v-model="localEditData.FWF_mPc5Ln2E" style="width:200px;"/>
                </FormItem>
                <FormItem label="其他费用" style="width: 50%">
                    <Input v-model="localEditData.QTFY_jHWYDCY3" style="width:200px;"/>
                </FormItem>
                <!-- ??? -->
                <FormItem label="自费差额(税后调整写负数)" style="width: 50%">
                    <Input v-model="localEditData['ZFCE(SHDZXFS)_upBcBAkU']" style="width:200px;"/>
                </FormItem>
                <FormItem label="社保缴费合计" style="width: 50%">
                    <Input v-model="localEditData.SBJFHJ_tnEjY4mb" style="width:200px;"/>
                </FormItem>
                <FormItem label="公积金缴费合计" style="width: 50%">
                    <Input v-model="localEditData.GJJJFHJ_Y3W1r8Xy" style="width:200px;"/>
                </FormItem>
                <FormItem label="合计收费" style="width: 50%">
                    <Input v-model="localEditData.HJSF_OLnGTM0v" style="width:200px;"/>
                </FormItem>
                <FormItem label="补缴月份" prop="shebaoqijiaoriqi" style="width: 100%">
                    <DatePicker v-model="localEditData.BJYF_qFrfYTKj" format="yyyy年MM月" type="month" style="width:200px;display: block;"></DatePicker>
                </FormItem>
                <FormItem label="备注" style="width: 100%">
                    <div style="padding-right:62px;"><Input type="textarea" :rows="4" v-model="localEditData.BZ_ZhUyobI1"/></div>
                </FormItem>
                <!-- ??? -->
            </Form>
            <div slot="footer" class="footer-modal">
                <Button @click="onclickCancel">取消</Button>
                <Button type="primary" @click="onclickSave(false)">信息更正</Button>
                <!-- <Button type="primary" @click="onclickSave(true)">保存并生效</Button> -->
            </div>
        </Modal>
        <Modal
            v-model="modalSetting"
            title="设置生效时间"
            @on-ok="settingOk"
            @on-cancel="settingCancel"
            class="modal-setting-dates">
            <div class="tips-container">
                <Icon type="information-circled" class="modal-setting-icon"></Icon>
                <span class="modal-setting-tips">提示: </span>
                <span class="modal-setting-content">请您设置开始生效月份，确认后，该员工生效月份及之后月的社保数据将以当前修改结果为准。</span>
            </div>
            <span tyle="font-size: 14px;">生效月份：</span><DatePicker type="month" placeholder="请选择生效月份" style="width: 200px" v-model="localDate"></DatePicker>
        </Modal>
    </div>
</template>

<script>
import { waitUntil, } from '@public/libs/util';
import valid, { errors, sys, common, socialSecurityApi, salPerpetualCalenderRest } from '../../../libs/request';
export default {
    props: {
        model: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default: {},
        },
        zhengceLists: {
            type: Array,
        },
        year: {
            default: new Date().getMonth + 1,
        },
        month: {
            default: new Date().getFullYear(),
        },
    },
    data(){
        return {
            localModel: false,
            localEditData: {},
            modalSetting: false, // 设置生效时间 modal
            localDate: null,
            cityLists: [
                { id: '北京', name: '北京' },
                { id: '上海', name: '上海' },
                { id: '深圳', name: '深圳' },
                { id: '广州', name: '广州' },
                { id: '杭州', name: '杭州' },
                { id: '成都', name: '成都' },
                { id: '重庆', name: '重庆' },
                { id: '西安', name: '西安' },
                { id: '青岛', name: '青岛' },
            ],
        };
    },
    watch: {
        model(newVal) {
            this.localModel = newVal;
        },
        editData(newVal) {
            this.localEditData = newVal;
        },
    },
    computed: {

    },
    components: {
        
    },
    mounted(){
        waitUntil(() => {
            return !!this.year;
        }, () => {
            this.localDate = this.year + '-' + this.month;
        });
    },
    methods: {
        onclickSave(boo) { // boo true: save false: fix
            this.localModel = true;
            this.localDate = new Date(this.localDate).format('yyyy-MM');
            this.localEditData.SBQJYF_gdhGW3ss = this.localEditData.SBQJYF_gdhGW3ss ? new Date(this.localEditData.SBQJYF_gdhGW3ss).format('yyyy-MM-dd') : this.localEditData.SBQJYF_gdhGW3ss;
            this.localEditData.GJJQJYF_7CdLsmB8 = this.localEditData.GJJQJYF_7CdLsmB8 ? new Date(this.localEditData.GJJQJYF_7CdLsmB8).format('yyyy-MM-dd') : this.localEditData.GJJQJYF_7CdLsmB8;
            this.localEditData.BJYF_qFrfYTKj = this.localEditData.BJYF_qFrfYTKj ? new Date(this.localEditData.BJYF_qFrfYTKj).format('yyyy-MM-dd') : this.localEditData.BJYF_qFrfYTKj;
            if (boo) {
                this.modalSetting = true;
            } else {
                this.localModel = false;
                this.$emit('editModalChange', 'fix', this.editData);
            }
        },
        onclickCancel() {
            this.localModel = false;
            this.$emit('editModalChange', 'cancel', null);
        },
        /*
        * 设置生效时间 默认当前月
        */
        settingOk() {
            this.modalSetting = false;
            this.$emit('editModalChange', 'save', this.editData);
        },
        settingCancel() {
            this.modalSetting = false;
            this.localDate = this.year + '-' + this.month;
        },
    },
};
</script>


