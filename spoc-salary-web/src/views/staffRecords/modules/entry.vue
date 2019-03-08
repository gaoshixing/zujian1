<style lang="less">
.salary-entry-container{
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
    .add-xu-qian{
        .clear();
        .btns{
            text-align: right;margin: 12px 72px 12px 42px;
        }
    }
    .xu-qian-detail{
        position: relative;
        .clear();margin: 19px 42px 30px;
        padding-top: 60px;padding-bottom: 30px;
        box-shadow: 0 2px 10px rgba(0,0,0,.1);
        border: 1px solid #e0e0e0;
    }
    .xu-qian-item{
        @w: 130px;
        @h: 32px;
        position: relative;
        float: left;width: 100%;padding-left: @w;
        margin-bottom: 20px;
        .title{
            position: absolute;left: 0;top: 0;width: @w;
            height: @h;line-height: @h;
            text-align: right;font-size: 14px;color: #999;
            i{
                display: inline-block;
                margin-right: 4px;
                line-height: 1;
                font-family: SimSun;
                font-size: 12px;
                color: #ed3f14;font-style: inherit;
            }
        }
        .ivu-radio-wrapper{
            margin-top: 7px;
        }
    }
}
</style>
    
<template>
<div class="salary-entry-container">
    <div class="brief-top">
        <Select v-model="version" @on-change="changeVersion" style="width:300px;margin-bottom:12px;">
            <Option v-for="(item, index) in versionLists" :value="index" :key="item.id">{{ item.versionName }}</Option>
        </Select>
        <span class="new-date">最后更新时间：{{ updateDate }}</span>
    </div>
    <div class="bottom">
        <Form ref="entryRef" :model="briefModal" :rules="briefRules" :label-width="150">
            <FormItem label="入职日期：" prop="entryTime" style="width: 50%">
                <DatePicker v-model="briefModal.entryTime" :disabled="disable" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ briefModal.entryTime }}</div>
            </FormItem>
            <FormItem label="试用期时长：" prop="probationPeriod" style="width: 50%">
                <div v-if="isEdit">
                    <Input v-model="briefModal.probationPeriod" :disabled="disable" style="width:280px;margin-right:6px;"/>
                    <span class="day">月</span>
                </div>
                <div v-else>{{ briefModal.probationPeriod }}</div>
            </FormItem>
            <FormItem label="转正日期：" prop="correctionDate" style="width: 100%">
                <DatePicker v-model="briefModal.correctionDate" :disabled="disable" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ briefModal.correctionDate }}</div>
            </FormItem>
            <FormItem label="保护期：" prop="hasProtectorDate" :style="briefModal.hasProtectorDate == '1' ? 'width: 50%' : 'width: 100%'">
                <RadioGroup v-model="briefModal.hasProtectorDate" v-if="isEdit">
                    <Radio label="1" :disabled="disable">有</Radio>
                    <Radio label="0" :disabled="disable">无</Radio>
                </RadioGroup>
                <div v-else>{{ briefModal.hasProtectorDate }}</div>
            </FormItem>
            <FormItem label="保护期时长：" prop="protectorDate" style="width: 50%" v-if="briefModal.hasProtectorDate == '1'">
                <div v-if="isEdit">
                    <Input v-model="briefModal.protectorDate" :disabled="disable" style="width:280px;margin-right:6px;"/>
                    <span class="day">月</span>
                </div>
                <div v-else>{{ briefModal.protectorDate }}</div>
            </FormItem>
            <FormItem label="保护期开始日期：" prop="protectorStartDate" style="width: 50%" v-if="briefModal.hasProtectorDate == '1'">
                <DatePicker v-model="briefModal.protectorStartDate" :disabled="disable" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ briefModal.protectorStartDate }}</div>
            </FormItem>
            <FormItem label="保护期到期日期：" prop="protectorEndDate" style="width: 50%" v-if="briefModal.hasProtectorDate == '1'">
                <DatePicker v-model="briefModal.protectorEndDate" :disabled="disable" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ briefModal.protectorEndDate }}</div>
            </FormItem>
            <FormItem label="劳动合同情况：" prop="contractInfo" style="width: 100%;">
                <RadioGroup v-model="briefModal.contractInfo" v-if="isEdit">
                    <Radio label="1" :disabled="disable">已签</Radio>
                    <Radio label="0" :disabled="disable">未签</Radio>
                </RadioGroup>
                <div v-else>{{ briefModal.hasProtectorDate }}</div>
            </FormItem>
            <!-- 首次签订的合同 start -->
            <div v-for="item in contractVOList" v-if="briefModal.contractInfo == 1 && item.isFirstContract == '1'">
                <!-- {{item.isFirstContract}} -->
                <FormItem label="合同签订日期：" style="width: 50%">
                    <DatePicker :disabled="disable" v-model="item.renewDate" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                    <div v-else>{{ item.renewDate }}</div>
                </FormItem>
                <FormItem label="合同到期日期：" prop="expireDate" style="width: 50%">
                    <DatePicker :disabled="disable" v-model="item.expireDate" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                    <div v-else>{{ item.expireDate }}</div>
                </FormItem>
                <FormItem label="合同附件：" style="width: 100%;">
                    <div v-if="isEdit">
                        <span class="upload-titile" v-show="item.attachment">{{ item.attachment ? item.attachment.realName : '' }}</span>
                        <Upload :action="uploadFileUrl" class="margin-bottom"
                            :data="uploadData" style="display: inline-block"
                            name="files"
                            :show-upload-list="false"
                            :before-upload="handleBefore"
                            :on-success="handleSuccessImg"
                            :on-format-error="handleFormatErrorImg"
                            :format="uploadFormat">
                            <Button type="primary" class="btn upload-btn" v-if="!disable" @click="uploadAttachment(item, 'attachment', 'attachmentId')">{{ item.attachment ? '修改' : '上传'}}</Button>
                        </Upload>
                    </div>
                    <div v-else>{{ item.attachment ? item.attachment.realName : '' }}</div>
                </FormItem>
            </div>
            <div v-if="briefModal.contractInfo == 1 && contractVOList.length == 0">
                <!-- 000000 -->
                <FormItem label="合同签订日期：" style="width: 50%">
                    <DatePicker :disabled="disable" v-model="firstContract.renewDate" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                    <div v-else>{{ firstContract.renewDate }}</div>
                </FormItem>
                <FormItem label="合同到期日期：" prop="expireDate" style="width: 50%">
                    <DatePicker :disabled="disable" v-model="firstContract.expireDate" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                    <div v-else>{{ firstContract.expireDate }}</div>
                </FormItem>
                <FormItem label="合同附件：" style="width: 100%;">
                    <div v-if="isEdit">
                        <span class="upload-titile" v-show="firstContract.attachment">{{ firstContract.attachment ? firstContract.attachment.realName : '' }}</span>
                        <Upload :action="uploadFileUrl" class="margin-bottom"
                            :data="uploadData" style="display: inline-block"
                            name="files"
                            :show-upload-list="false"
                            :before-upload="handleBefore"
                            :on-success="handleSuccessImg"
                            :on-format-error="handleFormatErrorImg"
                            :format="uploadFormat">
                            <Button v-if="!disable" type="primary" class="btn upload-btn" @click="uploadAttachment(firstContract, 'attachment', 'attachmentId')">{{ firstContract.attachment ? '修改' : '上传'}}</Button>
                        </Upload>
                    </div>
                    <div v-else>{{ firstContract.attachment ? firstContract.attachment.realName : '' }}</div>
                </FormItem>
            </div>
            <!-- 首次签订的合同 end -->
            <FormItem label="备注：" prop="content" style="width: 100%;">
                <div v-if="isEdit" style="margin-right: 150px;">
                    <Input style="width: 320px;" :disabled="disable" v-model="briefModal.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                </div>
                <div v-else>{{ briefModal.content }}</div>
            </FormItem>
            
            <div class="add-xu-qian">
                <div class="btns">
                    <a @click="addNewContract" class="show-add-card" style="margin-bottom: 30px;" v-if="!disable">+ 添加续签信息</a>
                    <!-- <Button type="primary" @click="addNewContract" v-if="!disable">添加续签信息</Button> -->
                </div>
                <div class="xu-qian-detail" v-for="(item, index) in contractVOList" v-if="item.isFirstContract == '0'" :key="item.id">
                    <a class="ivu-modal-close" @click="deleteContract(index)"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
                    <div class="xu-qian-item" style="width: 50%;"> 
                        <span class="title"><i class="red">*</i>续签合同日期：</span>
                        <div class="detail">
                            <DatePicker v-model="item.renewDate" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                        </div>
                    </div>
                    <div class="xu-qian-item" style="width: 50%;">
                        <span class="title"><i class="red">*</i>无固定期限合同：</span>
                        <div class="detail">
                            <RadioGroup v-model="item.contractType">
                                <Radio v-for="item in conttractTypeLists" :key="item.id" :label="item.value">{{ item.label }}</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="xu-qian-item" v-if="item.contractType == 1">
                        <span class="title">续签合同到期日：</span>
                        <div class="detail">
                            <DatePicker v-model="item.expireDate" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                        </div>
                    </div>
                    <div class="xu-qian-item">
                        <span class="title">续签合同附件：</span>
                        <div class="detail">
                            <span class="upload-titile" v-show="item.attachment">{{ item.attachment ? item.attachment.realName : '' }}</span>
                            <Upload :action="uploadFileUrl" class="margin-bottom"
                                :data="uploadData" style="display: inline-block"
                                name="files"
                                :show-upload-list="false"
                                :before-upload="handleBefore"
                                :on-success="handleSuccessImg"
                                :on-format-error="handleFormatErrorImg"
                                :format="uploadFormat">
                                <Button type="primary" class="btn upload-btn" @click="uploadAttachment(item, 'attachment', 'attachmentId')">{{ item.attachment ? '修改' : '上传'}}</Button>
                            </Upload>
                        </div>
                    </div>
                    <div class="xu-qian-item">
                        <span class="title">备注：</span>
                        <div class="detail" style="margin-right:130px;">
                            <Input v-model="item.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                        </div>
                    </div>
                </div>
            </div>
            <FormItem label="开户名：" prop="accountName" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.accountName" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.accountName }}</div>
            </FormItem>
            <FormItem label="开户行：" prop="openingBank" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.openingBank" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.openingBank }}</div>
            </FormItem>
            <FormItem label="银行卡号：" prop="bankCard" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.bankCard" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.bankCard }}</div>
            </FormItem>
            <FormItem label="银行卡扫描件：" style="width: 50%">
                <div v-if="isEdit">
                    <span class="upload-titile" v-show="briefModal.bankAttachment">{{ briefModal.bankAttachment ? briefModal.bankAttachment.realName : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button v-if="!disable" type="primary" class="btn upload-btn" @click="uploadAttachment(briefModal, 'bankAttachment', 'bankCardUrl')">{{ briefModal.bankAttachment ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <div v-else>{{ briefModal.bankAttachment ? briefModal.bankAttachment.realName : '' }}</div>
            </FormItem>
            <FormItem label="备用银行卡开户名：" prop="bakAccountName" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.bakAccountName" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.bakAccountName }}</div>
            </FormItem>
            <FormItem label="备用银行卡开户行：" prop="bakOpeningBank" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.bakOpeningBank" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.bakOpeningBank }}</div>
            </FormItem>
            <FormItem label="备用银行卡号：" prop="bakBankCard" style="width: 50%">
                <div v-if="isEdit"><Input :disabled="disable" v-model="briefModal.bakBankCard" style="width:320px;margin-right:6px;"/></div>
                <div v-else>{{ briefModal.bakBankCard }}</div>
            </FormItem>
            <FormItem label="备用银行卡扫描件：" style="width: 50%">
                <div v-if="isEdit">
                    <span class="upload-titile" v-show="briefModal.bakBankAttachment">{{ briefModal.bakBankAttachment ? briefModal.bakBankAttachment.realName : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="bakUploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button v-if="!disable" type="primary" class="btn upload-btn" @click="uploadAttachment(briefModal, 'bakBankAttachment', 'bakBankCardUrl')">{{ briefModal.bakBankAttachment ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <div v-else>{{ briefModal.bakBankAttachment ? briefModal.bakBankAttachment.realName : '' }}</div>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 50px;" v-if="!disable">
                <div class="btn-box">
                    <Button type="primary" @click="save(0)">信息更正</Button>
                    <Button type="primary" style="margin-left: 8px" @click="showModal">保存并生效</Button>
                </div>
            </FormItem>
        </Form>
    </div>
    <Modal
        v-model="modal"
        class="set-data"
        title="设置生效时间"
        :loading="loading"
        @on-ok="setEffectiveDate">
        <p>提示：生效时间设置并确认后不支持修改。</p>
        <div class="data-b">
            <span class="title">生效时间：</span>
            <DatePicker :options="options" v-model="effectiveDate" format="yyyy-MM-dd" type="date" style="width:320px;display: block;"></DatePicker>
        </div>
    </Modal>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salEntryInfo, salCommon, sys } from '../../../libs/request.js';
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
            isEdit: true, //编辑状态，显示输入框
            disable: false, //当前版本false，输入框可编辑，按钮可见
            briefModal: {},
            briefModalReset: {},
            historyReset: {},
            briefRules: {
                entryTime: { required: true, type: 'date', message: '入职日期不能为空', trigger: 'change' },
            },
            contractVOList: [], //合同列表
            firstContractReset: {
                attachment: {},
                attachmentId: '',
                contractType: '1',
                renewDate: '',
                expireDate: '',
                isFirstContract: '1',
                remarks: '',
            },
            firstContract: {},
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            bakUploadData: {
                type: '1',
                dirName: 'all',
                meunId: this.pid
            },
            uploadItem: {},
            itemId: '',
            itemName: '',
            uploadFormat: ['png','jpeg','jpg','gif','pdf'],
            modal: false,
            effectiveDate: '',
            loading: true,
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            conttractTypeLists: [],
        };
    },
    mounted(){
        this.firstContract = JSON.parse(JSON.stringify(this.firstContractReset));
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getBatchListData();
        this.getLists();
        this.getVersionList();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getLists() {
            // 获取页面数据
            let params = {
                userId: this.$route.query.userId
            }
            salEntryInfo.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.updateDate = data.updateDate ? new Date(data.updateDate).format('yyyy-MM-dd hh:mm:ss') : '';
                    this.setBriefModal(data);
				}
            }).catch(errors.call(this));
        },
        setBriefModal(data) {
            // 处理数据
            this.briefModal = data;
            this.briefModal.hasProtectorDate  = ''; //#3299 默认不选中选项
            this.contractVOList = this.briefModal.contractVOList;
            this.briefModalReset = JSON.parse(JSON.stringify(data));
            this.briefModalReset.contractVOList.forEach(element => {
                element.attachmentId = element.attachment ? element.attachment.id : '';
                delete element.attachment;
            });
            this.briefModal.contractVOList.forEach(element => {
                element.attachmentId = element.attachment ? element.attachment.id : '';
            });
            delete this.briefModalReset.bankAttachment;
            delete this.briefModalReset.bakBankAttachment;

            this.briefModal.entryTime = this.briefModal.entryTime ? new Date(this.briefModal.entryTime) : '';
            this.briefModal.correctionDate = this.briefModal.correctionDate ? new Date(this.briefModal.correctionDate) : '';
            this.briefModal.protectorStartDate = this.briefModal.protectorStartDate ? new Date(this.briefModal.protectorStartDate) : '';
            this.briefModal.protectorEndDate = this.briefModal.protectorEndDate ? new Date(this.briefModal.protectorEndDate) : '';
            this.historyReset = JSON.parse(JSON.stringify(data));
            this.$forceUpdate();
        },
        edit() {
            // 点击编辑按钮
            this.isEdit = true;
        },
        save(num) {
            // 信息更正：isEffect 1 isTimeEffect 0
            // 保存并生效（当天） isEffect 1 isTimeEffect 1
            // 保存并生效（之后） isEffect 0 isTimeEffect 1
            // console.log(num)

            // console.log(this.briefModal);

            this.$refs.entryRef.validate((valid) => {
                if (valid) {
                    let params = JSON.parse(JSON.stringify(this.briefModal));

                    params.entryTime = params.entryTime ? new Date(params.entryTime).format('yyyy-MM-dd') : '';
                    params.correctionDate = params.correctionDate ? new Date(params.correctionDate).format('yyyy-MM-dd') : '';
                    params.protectorStartDate = params.protectorStartDate ? new Date(params.protectorStartDate).format('yyyy-MM-dd') : '';
                    params.protectorEndDate = params.protectorEndDate ? new Date(params.protectorEndDate).format('yyyy-MM-dd') : '';

                    if(params.bankAttachment) delete params.bankAttachment;
                    if(params.bakBankAttachment) delete params.bakBankAttachment;

                    // 判断主合同
                    let hasFirstContract = true;
                    if(this.briefModal.contractVOList.length == 0) {
                        hasFirstContract = false;
                    }else{
                        let data = this.briefModal.contractVOList.filter(function(item){
                            return item.isFirstContract == "1"; 
                        })[0];
                        if(!data) hasFirstContract = false;
                    }
                    if(!hasFirstContract && this.firstContract.renewDate) {
                        let data = JSON.parse(JSON.stringify(this.firstContract));
                        this.firstContract.renewDate = data.renewDate ? new Date(data.renewDate).format('yyyy-MM-dd') : '';
                        this.firstContract.expireDate = data.expireDate ? new Date(data.expireDate).format('yyyy-MM-dd') : '';
                        delete data.attachment;
                        params.contractVOList.push(data);
                    }
                    params.contractVOList.forEach(element => {
                        delete element.attachment;
                        element.expireDate = element.expireDate ? new Date(element.expireDate).format('yyyy-MM-dd') : '';
                        element.renewDate = element.renewDate ? new Date(element.renewDate).format('yyyy-MM-dd') : '';
                    });
                    // 清掉空的合同
                    let newArr = params.contractVOList;
                    let lastwArr = [];
                    newArr.forEach(newObj => {
                        if(newObj.id) {
                            // 有id，是系统返回
                            lastwArr.push(newObj);
                        }else{
                            let num = 0;
                            for (let key in newObj) {
                                if(key != 'isFirstContract' && newObj[key] == '') num++;
                            }
                            // console.log(num);
                            if(num < 5) lastwArr.push(newObj);
                        }
                    });
                    params.contractVOList = lastwArr;
                    if(!params.userId) params.userId = this.$route.query.userId;
                    params.isTimeEffect = num;

                    if(num == 0) { //信息更正
                        params.isEffect = 1;
                    }else{ //保存并生效
                        let b = new Date(this.effectiveDate).format('yyyy-MM-dd') == new Date().format('yyyy-MM-dd');
                        if(!b) {
                            // 保存并生效（之后）
                            params = comparison(this.briefModalReset, params);
                            delete params.contractVOList;
                            params.id = this.briefModalReset.id;
                            params.userId = this.briefModalReset.userId ? this.briefModalReset.userId : this.$route.query.userId;
                            params.isEffect = 0;
                            params.isTimeEffect = num;
                            params.contractVOList = lastwArr;
                        }else{
                            // 保存并生效（当天）
                            params.isEffect = 1;
                        }
                        params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
                    }
                    // console.log(params);
                    params.isInsert = 0;
                    this.saveAjax(params);
                    // this.historyInit();
                    
                }
            });
        },
        saveAjax(data) {
            // 处理需要保存的对象的格式
            salEntryInfo.save(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info('保存成功');
                    this.firstContractReset = JSON.parse(JSON.stringify(this.firstContract));
                    this.historyInit();
                    this.getLists();
                }
            }).catch(errors.call(this));
        },
        historyInit() {
            // 判断页面修改的内容
            let oldObj = JSON.parse(JSON.stringify(this.historyReset));

            oldObj.entryTime = oldObj.entryTime ? new Date(oldObj.entryTime).format('yyyy-MM-dd') : '';
            oldObj.correctionDate = oldObj.correctionDate ? new Date(oldObj.correctionDate).format('yyyy-MM-dd') : '';
            oldObj.protectorStartDate = oldObj.protectorStartDate ? new Date(oldObj.protectorStartDate).format('yyyy-MM-dd') : '';
            oldObj.protectorEndDate = oldObj.protectorEndDate ? new Date(oldObj.protectorEndDate).format('yyyy-MM-dd') : '';

            let newObj = JSON.parse(JSON.stringify(this.briefModal));

            newObj.entryTime = newObj.entryTime ? new Date(newObj.entryTime).format('yyyy-MM-dd') : '';
            newObj.correctionDate = newObj.correctionDate ? new Date(newObj.correctionDate).format('yyyy-MM-dd') : '';
            newObj.protectorStartDate = newObj.protectorStartDate ? new Date(newObj.protectorStartDate).format('yyyy-MM-dd') : '';
            newObj.protectorEndDate = newObj.protectorEndDate ? new Date(newObj.protectorEndDate).format('yyyy-MM-dd') : '';

            let params = comparison(oldObj, newObj);
            // console.log(params)
            this.salHistoryLog(params);
        },
        salHistoryLog(params) {
            // 处理需要保存的历史纪录
            let keyVal = {
                accountName: '开户名',
                bakAccountName: '备用银行卡开户名',
                bakBankAttachment: '备用银行卡扫描附件对象',
                bakBankCard: '备用银行卡号',
                bakBankCardAttachment: '备用银行卡附件',
                bakBankCardRul: '备用银行卡图片',
                bakOpeningBank: '备用银行卡开户行',
                // bankAttachment :'银行卡扫描件附件对象',
                bankCard: '银行卡号',
                bankCardAttachment: '银行卡附件',
                bankCardUrl: '银行卡图片附件id',
                content: '员工备注信息',
                contractInfo: {
                    content: '劳动合同情况',
                    type: {
                        '0': '未签',
                        '1': '已签',
                    }
                    // '劳动合同情况 0未签 1已签',
                },
                contractVOList: '合同列表',
                correctionDate: '转正日期',
                // createDate: '创建日期',
                entryTime: '入职日期',
                hasProtectorDate: {
                    content: '是否有保护期',
                    type: {
                        '0': '没有保护期',
                        '1': '有保护期',
                    }
                    // '是否有保护期 0 没有保护期 1 有保护期'
                },
                openingBank: '开户行',
                probationPeriod: {
                    content: '试用期时长',
                    unit: '月'
                    // '试用期时长 月'
                },
                protectorDate: {
                    content: '保护期',
                    unit: '日'
                    // '保护期 日'
                },
                protectorEndDate: '保护期结束时间',
                protectorStartDate: '保护期开始时间',
                remarks: '备注',
            }

            let before = '';
            // 判断图片是否修改
            if(params.hasOwnProperty('bankCardUrl')) {
                let oldname = '';
                if(this.historyReset.bankAttachment) {
                    oldname = this.historyReset.bankAttachment.realName ? this.historyReset.bankAttachment.realName : '';
                }
                before += '<p>修改银行卡扫描件，由 ' + oldname + ' 改为 ' + this.briefModal.bankAttachment.realName  + '</p>';
            }
            if(params.hasOwnProperty('bakBankCardUrl')) {
                let oldname = '';
                if(this.historyReset.bakBankAttachment) {
                    oldname = this.historyReset.bakBankAttachment.realName ? this.historyReset.bakBankAttachment.realName : '';
                }
                before += '<p>修改备用银行卡扫描件，由 ' + oldname + ' 改为 ' + this.briefModal.bakBankAttachment.realName  + '</p>';
            }

            // 处理合同
            let contractVOListNew = JSON.parse(JSON.stringify(this.briefModal.contractVOList));
            let contractVOListOld = JSON.parse(JSON.stringify(this.historyReset.contractVOList));
            contractVOListNew.forEach(item => {
                delete item.attachment;
                item.expireDate = item.expireDate ? new Date(item.expireDate).format('yyyy-MM-dd') : '';
                item.renewDate = item.renewDate ? new Date(item.renewDate).format('yyyy-MM-dd') : '';
                if(!item.id) before += '<p>添加新的合同</p>';
            });
            contractVOListOld.forEach(item => {
                delete item.attachment;
                let data = contractVOListNew.filter(function(child){
                    return item.id == child.id; 
                })[0];
                if(data) {
                    let comp = comparison(item, data);
                    // console.log(comp);
                    if(JSON.stringify(comp) != '{}') {
                        before += '<p>修改合同' + item.id + '</p>';
                    }
                }else{
                    before += '<p>删除合同' + item.id + '</p>';
                }
            });

            // console.log(contractVOListOld);
            // console.log(contractVOListNew);

            delete params.contractVOList;
            delete params.bankCardUrl;
            delete params.bankAttachment;
            delete params.bakBankCardUrl;
            delete params.bakBankAttachment;

            let history = historyLists(params, this.briefModalReset, keyVal);
            history += before;

            this.$emit('postSalHistoryLog', history, '4')
        },
        addNewContract() {
            // 添加续签合同
            this.contractVOList.push({
                attachmentId: '',
                contractType: '',
                renewDate: '',
                expireDate: '',
                isFirstContract: '0',
                remarks: '',
            });
        },
        deleteContract(index) {
            // 删除合同
            this.briefModal.contractVOList.splice(index, 1);
        },
        uploadAttachment(item, type, typeId) {
            this.uploadItem = item;
            this.itemName = type;
            this.itemId = typeId;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            // res.data.filePath;
            this.uploadItem[this.itemName] = res.data;
            this.uploadItem[this.itemId] = res.data.id;
            this.$forceUpdate();
            this.updateLoadingStatus({isLoading:false});
            this.$Message.info('上传成功');
        },
        handleBefore () {
            this.updateLoadingStatus({isLoading:true});
            return true
        },
        handleFormatErrorImg(){
            this.updateLoadingStatus({isLoading:false});
            this.$Message.error('请上传' + this.uploadFormat.join('、') + '格式的文件');
        },
        showModal() {
            // 保存并生效
            this.modal = true;
        },
        setEffectiveDate() {
            if(!this.effectiveDate) this.effectiveDate = new Date();
            this.loading = false;
            this.modal = false;
            this.save(1);
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_contract_contract_type', //合同类型
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.conttractTypeLists = data.sal_contract_contract_type;
				}
            }).catch(errors.call(this));
        },
        getVersionList() {
            // 获取版本信息
            let params = {
                userId: this.$route.query.userId
            }
            salEntryInfo.findVersionList(params).then(valid.call(this)).then(res => {
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
                this.getLists();
            } else {
                this.disable = true;
                this.briefModal = this.versionLists[item];
                this.briefModalReset = JSON.parse(JSON.stringify(this.versionLists[item]));
                // this.setBriefModal(this.versionLists[item]);
            }
        },
    },
}
</script>


