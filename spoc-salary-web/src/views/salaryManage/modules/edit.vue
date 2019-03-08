<style lang="less">
.social-security-eiit-container{
    margin-bottom: 50px;
    .ivu-form{
        zoom: 1;
        // padding-left: 50px;
        &::before, &::after{
            content: "";display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .ivu-form-item{
        margin-bottom: 20px;
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
            margin-left: 25px;
            width: 100px;
        }
    }
    .ivu-modal-wrap {
        box-sizing: border-box;
        padding-bottom: 140px;
    }
}
</style>
    
<template>
    <div v-if="localModel">
        <Modal v-if="model" v-model="localModel" title="调整员工社保信息" width='1000' class="social-security-eiit-container" @on-cancel="onclickCancel">
            <Form ref="editForm" :label-width="150">
                <FormItem label="员工编号" style="width: 33.33%">
                    <div>{{ localEditData.userNo }}&nbsp;</div>
                </FormItem>
                <FormItem label="员工姓名" style="width: 33.33%">
                    <div>{{ localEditData.userName }}&nbsp;</div>
                </FormItem>
                <FormItem label="底薪类型" style="width: 33.33%">
                    <div>{{ localEditData.DXLX_9i1W3aZS }}&nbsp;</div>
                </FormItem>
                <FormItem label="固定底薪" style="width: 33.33%">
                    <div>{{ localEditData.GDDX_MLBgpmqf }}&nbsp;</div>
                </FormItem>
                <FormItem label="固定绩效" style="width: 33.33%">
                    <div>{{ localEditData.GDJX_8XkX7I6U }}&nbsp;</div>
                </FormItem>
                <FormItem label="津贴" style="width: 33.33%">
                    <div>{{ localEditData.JT_ypbfXDgJ }}&nbsp;</div>
                </FormItem>
                <FormItem label="基本工资" style="width: 33.33%">
                    <Input v-model="localEditData.JBGZ_AKwne4Gf" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="月度绩效" style="width: 33.33%">
                    <Input v-model="localEditData.YDJX_fsp74rcC" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="季度绩效" style="width: 33.33%">
                    <Input v-model="localEditData.JDJX_3AD5yN5f" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="半年度绩效" style="width: 33.33%">
                    <Input v-model="localEditData.BNDJX_DDiLjkSM" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="年度绩效" style="width: 33.33%">
                    <Input v-model="localEditData.NDJX_AekWahPo" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="绩效工资合计" style="width: 33.33%">
                    <Input v-model="localEditData.JXGZHJ_s2gKOK25" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="年终奖" style="width: 33.33%">
                    <Input v-model="localEditData.NZJ_BVK80bNe" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="总裁特别奖" style="width: 33.33%">
                    <Input v-model="localEditData.ZCTBJ_JRU9Zk05" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="后期带学生提成" style="width: 33.33%">
                    <Input v-model="localEditData.HQDXSTC_2gac6J2v" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="Elite/Junior提成" style="width: 33.33%">
                    <Input v-model="localEditData[`ELITE/JUNIORTC_VIeKG3rt`]" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="销售/培训提成" style="width: 33.33%">
                    <Input v-model="localEditData[`XS/PXTC_jXQxpDr6`]" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="招聘/推荐人才提成" style="width: 33.33%">
                    <Input v-model="localEditData[`ZP/TJRCTC_O6i2IgCh`]" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="促签" style="width: 33.33%">
                    <Input v-model="localEditData.CQ_WvRLVrlC" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="市场提成" style="width: 33.33%">
                    <Input v-model="localEditData.SCTC_YGtvbi6D" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="提成收入合计" style="width: 33.33%">
                    <Input v-model="localEditData.TCSRHJ_QnDT28pL" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="课时费" style="width: 33.33%">
                    <Input v-model="localEditData.KSF_9B5nYJXY" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="迟到扣款" style="width: 33.33%">
                    <Input v-model="localEditData.CDKK_S2GFL097" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="缺勤扣款" style="width: 33.33%">
                    <Input v-model="localEditData.QQKK_ws7S5BOi" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="旷工扣款" style="width: 33.33%">
                    <Input v-model="localEditData.KGKK_Sw5wv3Tp" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="业务罚款" style="width: 33.33%">
                    <Input v-model="localEditData.YWFK_P1AE866p" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="养老个人缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.YLGRJFE_kStmjxbG" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="五险一金个人缴费合计" style="width: 33.33%">
                    <Input v-model="localEditData.WXYJGRHJ_6LSn2mSB" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="养老企业缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.YLQYJFE_n9sbBwPb" type="text" style="width:150px;"/>
                </FormItem> 
                <FormItem label="医疗企业缴费额" style="width: 33.33%">
                    <div><Input type="text" style="width:150px;" v-model="localEditData.YLQYJFE_SrUcJszM"/></div>
                </FormItem>
                <FormItem label="医疗个人缴费额" style="width: 33.33%">
                    <div><Input type="text" style="width:150px;" v-model="localEditData.YLGRJFE_6uqFPc67"/></div>
                </FormItem>
                <FormItem label="失业企业缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.SYQYJFE_wIPyNfR2" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="工商企业缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.GSQYJFE_NpAlZGSi" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="生育企业缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.SYQYJFE_ZJgAg946" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="公积金企业缴费额" style="width: 33.33%">
                    <Input v-model="localEditData.GJJQYJFE_619EXJ5R" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="五险一金企业缴费合计" style="width: 33.33%">
                    <Input v-model="localEditData.WXYJQYHJ_RDdJC4rQ" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="社保个人合计" style="width: 33.33%">
                    <Input v-model="localEditData.SBGRHJ_Zi6VqztM" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="社保企业合计" style="width: 33.33%">
                    <Input v-model="localEditData.SBQYHJ_1cfAdYFH" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="社保合计" style="width: 33.33%">
                    <div><Input type="text" style="width:150px;" v-model="localEditData.SBHJ_cz69wqf1"/></div>
                </FormItem>
                <FormItem label="公积金合计" style="width: 33.33%">
                    <Input v-model="localEditData.GJJHJ_lqfqPdIx" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="社保公积金差额自付" style="width: 33.33%">
                    <Input v-model="localEditData.SBGJJCEZF_c1YkvtUG" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="对公应发" style="width: 33.33%">
                    <Input v-model="localEditData.DGYF_FsUMGKqV" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="第三方应发" style="width: 33.33%">
                    <Input v-model="localEditData.DSFYF_pzUoazL7" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="工作室应发" style="width: 33.33%">
                    <div><Input type="text" v-model="localEditData.GZSYF_wbTXIJlx" style="width:150px;"/></div>
                </FormItem>
                <FormItem label="应发工资合计" style="width: 33.33%">
                    <Input v-model="localEditData.YFGZHJ_JfyWZEVz" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="对公实发" style="width: 33.33%">
                    <Input v-model="localEditData.DGSF_K1ph6SqD" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="调整后对公实发" style="width: 33.33%">
                    <Input v-model="localEditData.DZHDGSF_sgVMFzCx" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="对私实发" style="width: 33.33%">
                    <Input v-model="localEditData.DSSF_Ogc0EnpS" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="第三方实发" style="width: 33.33%">
                    <Input v-model="localEditData.DSFSF_YEB8D6Dj" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="实发工资合计" style="width: 33.33%">
                    <Input v-model="localEditData.SFGZHJ_0DDgxGD9" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="第三方付款合计" style="width: 33.33%">
                    <Input v-model="localEditData.DSFFKHJ_BVSTPMBI" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="报税基数" style="width: 33.33%">
                    <div><Input type="text" v-model="localEditData.BSJS_I7ovmUuP" style="width:150px;"/></div>
                </FormItem>
                <FormItem label="税前调整" style="width: 33.33%">
                    <Input v-model="localEditData.SQDZ_6QTIW25Y" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="调整后报税基数" style="width: 33.33%">
                    <Input v-model="localEditData.DZHBSJS_RWibUiDp" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="留学落户税前调整" style="width: 33.33%">
                    <Input v-model="localEditData.LXLHSQDZ_RWNL1NGV" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="个人所得税" style="width: 33.33%">
                    <Input v-model="localEditData.GRSDS_dE1OMBxi" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="对公个税" style="width: 33.33%">
                    <Input v-model="localEditData.DGGS_smdAne1V" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="第三方个税" style="width: 33.33%">
                    <Input v-model="localEditData.DSFGS_sC6SZn3n" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="应纳税所得额" style="width: 33.33%">
                    <Input v-model="localEditData.YNSSDE_8fW8hr5T" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="服务费（社保/发薪）" style="width: 33.33%">
                    <div><Input type="text" v-model="localEditData[`FWF（SB/FX）_N91zkilZ`]"/></div>
                </FormItem>
                <FormItem label="离职未休假结算" style="width: 33.33%">
                    <Input v-model="localEditData.LZWXJJS_cH3GebC7" type="text" style="width:150px;"/>
                </FormItem>
                <FormItem label="人力成本合计" style="width: 33.33%">
                    <div><Input type="text" v-model="localEditData.RLCBHJ_qQBfUnhL"/></div>
                </FormItem>
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
            zhengceLists: [],
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
        this.getCityList();
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
        /*
        * 查字典
        */
        getCityList() {
            const data = { type: 'sal_user_basic_info_insure_policy ', };
            sys.dictListData(data).then(valid.call(this)).then(res => {
                if (res.ok) this.zhengceLists = res.data.data
            }).then(errors.call(this)).finally(() => {});
        },
    },
};
</script>