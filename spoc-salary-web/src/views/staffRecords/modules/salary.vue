<style lang="less">
.salary-container{
    .clear() {
        zoom: 1;
        &::before, &::after{
            content: '';display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .bottom{
        padding-left: 30px;
        .clear();
    }
    .ivu-radio-wrapper{
        margin-top: 0;
    }
}
</style>
    
<template>
<div class="salary-container">
    <div class="brief-top">
        <Select v-model="version" @on-change="changeVersion" style="width:300px;margin-bottom:12px;">
            <Option v-for="(item, index) in versionLists" :value="index" :key="item.id">{{ item.versionName }}</Option>
        </Select>
        <span class="new-date">最后更新时间：{{ updateDate }}</span>
    </div>
    <div class="bottom">
        <Form ref="briefDetail" :model="briefModal" :rules="briefRules" :label-width="180">
            <FormItem label="薪资类型：" prop="salaryType" style="width: 100%">
                <!-- 年薪：1，非年薪：2 -->
                <RadioGroup v-model="briefModal.salaryType" v-if="isEdit">
                    <Radio :disabled="disable" v-for="item in salaryTypeLists" :label="item.value" :key="item.value">{{ item.label }}</Radio>
                </RadioGroup>
                <div v-else>{{ briefModal.salaryType }}</div>
            </FormItem>
            <FormItem label="薪资状态：" prop="salaryStatus" style="width: 50%">
                <Select :disabled="disable" v-if="isEdit" v-model="briefModal.salaryStatus" style="width:280px;">
                    <Option v-for="item in salaryStatusLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.salaryStatus }}</div>
            </FormItem>
            <FormItem label="底薪类型：" v-if="briefModal.salaryType == '2'" prop="baseSalaryType" style="width: 50%">
                <RadioGroup v-model="briefModal.baseSalaryType" v-if="isEdit">
                    <Radio :disabled="disable" v-for="item in baseSalaryTypeLists" :label="item.value" :key="item.value">{{ item.label }}</Radio>
                </RadioGroup>
                <div v-else>{{ briefModal.baseSalaryType }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '2' && briefModal.baseSalaryType == '1'" label="固定底薪：" prop="fixedBaseSalary" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.fixedBaseSalary" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.fixedBaseSalary }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '2' && briefModal.baseSalaryType == '1'" label="固定绩效：" prop="fixedPerformance" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.fixedPerformance" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.fixedPerformance }}</div>
            </FormItem>
            <!-- 年薪：1 -->
            <FormItem v-if="briefModal.salaryType == '1'" label="年薪总额：" prop="totalSalary" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.totalSalary" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.totalSalary }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '1'" label="固定浮动比例：" prop="royaltyRatio" style="width: 50%">
                <div v-if="isEdit">
                    <!-- royaltyRatio -->
                    <InputNumber :disabled="disable" v-model="briefModal.royaltyRatio" style="width:280px;margin-right:6px;"/>
                    <span class="day">%</span>
                </div>
                <div v-else>{{ briefModal.royaltyRatio }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '1'" label="固定底薪/月：" prop="fixedBaseSalary" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.fixedBaseSalary" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.fixedBaseSalary }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '1'" label="固定绩效/月：" prop="fixedPerformance" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.fixedPerformance" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.fixedPerformance }}</div>
            </FormItem>
            <!-- !年薪：1 -->
            <FormItem label="津贴：" prop="allowance" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.allowance" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.allowance }}</div>
            </FormItem>
            <FormItem v-if="briefModal.salaryType == '2'" label="提成比例：" prop="royaltyRatio" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.royaltyRatio" style="width:280px;margin-right:6px;"/>
                    <span class="day">%</span>
                </div>
                <div v-else>{{ briefModal.royaltyRatio }}</div>
            </FormItem>
            <FormItem label="浮动月度绩效基数：" prop="floatingMonthlyPerformanceBase" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.floatingMonthlyPerformanceBase" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.floatingMonthlyPerformanceBase }}</div>
            </FormItem>
            <FormItem label="浮动季度绩效基数：" prop="floatingQuarterlyPerformanceBase" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.floatingQuarterlyPerformanceBase" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.floatingQuarterlyPerformanceBase }}</div>
            </FormItem>
            <FormItem label="浮动半年度绩效基数：" prop="floatingHalfYearPerformanceBase" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber :disabled="disable" v-model="briefModal.floatingHalfYearPerformanceBase" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.floatingHalfYearPerformanceBase }}</div>
            </FormItem>
            <FormItem label="浮动年底绩效基数：" prop="floatingYearEndPerformanceBase" style="width: 50%">
                <div v-if="isEdit">
                    <!-- :precision="2" -->
                    <InputNumber :disabled="disable" v-model="briefModal.floatingYearEndPerformanceBase" style="width:280px;margin-right:6px;"/>
                    <span class="day">元</span>
                </div>
                <div v-else>{{ briefModal.floatingYearEndPerformanceBase }}</div>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 50px;" v-if="!disable">
                <div class="btn-box">
                    <Button type="primary" @click="save(0)">信息更正</Button>
                    <Button type="primary" style="margin-left: 8px" @click="showModal">保存并生效</Button>
                </div>
            </FormItem>
        </Form>
        <Modal
            v-model="modal"
            class="set-data"
            title="设置生效时间"
            :loading="loading"
            @on-ok="setEffectiveDate">
            <p class="data-tips">提示：生效时间设置并确认后不支持修改。</p>
            <div class="data-b">
                <span class="title">生效时间：</span>
                <DatePicker placeholder="默认当前时间" :options="options" v-model="effectiveDate" format="yyyy-MM-dd" type="date" style="width:320px;display: block;"></DatePicker>
            </div>
        </Modal>
    </div>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salSalaryInfo, sys } from '../../../libs/request.js';
import { comparison } from '../../../libs/comparison.js';
import { historyLists } from '../../../libs/historyLists.js';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            version: 0,
            versionLists: [], //版本列表
            updateDate: '',
            salaryStatusLists: [],
            salaryTypeLists: [],
            baseSalaryTypeLists: [],
            isEdit: !false, //编辑状态, true显示编辑框, false显示label
            disable: false, //当前版本false，输入框可编辑，按钮可见
            briefModal: {},
            briefModalReset: {},
            briefRules: {
                baseSalaryType: { required: true, message: '薪资类型必选', trigger: 'change' },
                salaryStatus: { required: true, message: '薪资状态必选', trigger: 'change' },
            },
            modal: false,
            loading: true,
            effectiveDate: '',
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
        };
    },
    mounted(){
        this.getBatchListData();
        this.getForm();
        this.getVersionList();
    },
    methods: {
        getForm() {
            let params = {
                userId: this.$route.query.userId
            }
            salSalaryInfo.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data
                    this.briefModal = data;
                    this.updateDate = data.updateDate ? new Date(data.updateDate).format('yyyy-MM-dd hh:mm:ss') : '';;
                    this.briefModalReset = JSON.parse(JSON.stringify(data));
				}
            }).catch(errors.call(this));
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_salary_info_salary_status', //薪资状态
                'sal_salary_info_salary_type', //薪资类型
                'sal_salary_info_base_salary_type', //底薪类型
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.salaryStatusLists = data.sal_salary_info_salary_status;
                    this.salaryTypeLists = data.sal_salary_info_salary_type;
                    this.baseSalaryTypeLists = data.sal_salary_info_base_salary_type;
				}
            }).catch(errors.call(this));
        },
        edit() {
            // 点击编辑按钮
            this.isEdit = true;
        },
        save(num) {
            // 信息更正：isEffect 1 isTimeEffect 0
            // 保存并生效（当天） isEffect 1 isTimeEffect 1
            // 保存并生效（之后） isEffect 0 isTimeEffect 1
            let params = JSON.parse(JSON.stringify(this.briefModal));
            params.isTimeEffect = num;
            let b = new Date(this.effectiveDate).format('yyyy-MM-dd') == new Date().format('yyyy-MM-dd');
            if(num === 0) {
                params.isEffect = 1;
            }else{
                if(b) {
                    params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
                    params.isEffect = 1;
                }
            }
            if(!params.userId) params.userId = this.$route.query.userId;
            // 年薪制里叫固定浮动比例，非年薪制里叫提成比例
            if(params.salaryType == '1') {
                params.baseSalaryType = null;
            }else{
                params.totalSalary = null;
                if(params.baseSalaryType == '2') {
                    params.fixedBaseSalary = null;
                    params.fixedPerformance = null;
                }
            }

            let data = comparison(this.briefModalReset, params);
            if(num === 1 && !b) {
                // 保存并生效（之后）需要传修改之后的字段
                params = JSON.parse(JSON.stringify(data));
                params.userId = this.$route.query.userId;
                params.isTimeEffect = 1;
                params.isEffect = 0;
                params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
                if(this.briefModal.id) params.id = this.briefModal.id;
            }
            this.$refs['briefDetail'].validate((valid) => {
                if (valid) {
                    // 把不必要的参数置为null
                    // console.log(params);
                    this.saveAjax(params, data);
                    // this.salHistoryLog(data);
                }
            });
        },
        saveAjax(params, data) {
            salSalaryInfo.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$Message.success('保存成功');
                    this.getForm();
                    this.salHistoryLog(data);
				}
            }).catch(errors.call(this));
        },
        salHistoryLog(params) {
            // 处理需要保存的历史纪录
            let keyVal = {
                allowance: '津贴',
                baseSalaryType: '底薪类型',
                baseSalaryTypeLabel: '底薪类型',
                fixedBaseSalary: '固定底薪',
                fixedPerformance: '固定绩效',
                floatingHalfYearPerformanceBase: '浮动半年度绩效基数',
                floatingMonthlyPerformanceBase: '浮动月度绩效基数',
                floatingQuarterlyPerformanceBase: '浮动季度绩效基数',
                floatingYearEndPerformanceBase: '浮动年底绩效基数',
                royaltyRatio: '提成比例',
                salaryStatus: '薪资状态',
                salaryStatusLabel: '薪资状态',
                salaryType: '薪资类型',
                salaryTypeLable: '薪资类型',
                totalSalary: '年薪总额',
                userId: '用户编号',
            }
            let history = historyLists(params, this.briefModalReset, keyVal);
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '6')
        },
        showModal() {
            // 保存并生效
            this.modal = true;
        },
        setEffectiveDate() {
            if(!this.effectiveDate) this.effectiveDate = new Date().format('yyyy-MM-dd');
            this.loading = false;
            this.modal = false;
            this.save(1);
        },
        getVersionList() {
            // 获取版本信息
            let params = {
                userId: this.$route.query.userId
            }
            salSalaryInfo.findVersionList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.versionLists = res.data.data;
                    this.versionLists.unshift({
                        id: 'new-version-1',
                        versionName: '最新版本'
                    });
				}
            }).catch(errors.call(this));
        },
        changeVersion(item) {
            // 选择历史版本
            if(item === 0) {
                this.disable = false;
                this.getForm();
            } else {
                this.disable = true;
                this.briefModal = this.versionLists[item];
            }
        },
    }
}
</script>


