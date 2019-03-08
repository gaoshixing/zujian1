<template>
    <Form ref="entryRef" :model="entryModal" :rules="personnelRules" :label-width="150">
        <FormItem label="入职日期：" prop="entryTime" style="width: 50%">
            <DatePicker v-model="entryModal.entryTime" :options="options" @on-change="changeEntryTime" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="试用期时长：" prop="probationPeriod" style="width: 50%">
            <InputNumber v-model="entryModal.probationPeriod" :precision="1" :min="0" :step="1" style="width:160px;margin-right:6px;"/>
            <span class="day">月</span>
        </FormItem>
        <FormItem label="转正日期：" prop="correctionDate" style="width: 100%">
            <DatePicker v-model="entryModal.correctionDate" :options="optionsCorrectionDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="保护期：" prop="hasProtectorDate" style="height: 30px;" :style="entryModal.hasProtectorDate == '1' ? 'width: 50%' : 'width: 100%'">
            <RadioGroup v-model="entryModal.hasProtectorDate">
                <Radio label="1">有</Radio>
                <Radio label="0">无</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="保护期时长：" prop="protectorDate" style="width: 50%" v-if="entryModal.hasProtectorDate == '1'">
            <InputNumber v-model="entryModal.protectorDate" style="width:160px;margin-right:6px;"/>
            <span class="day">月</span>
        </FormItem>
        <FormItem label="保护期开始日期：" prop="protectorStartDate" style="width: 50%" v-if="entryModal.hasProtectorDate == '1'">
            <DatePicker v-model="entryModal.protectorStartDate" :options="optionProtectorStartDate" @on-change="changeProtectorStartDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="保护期到期日期：" prop="protectorEndDate" style="width: 50%" v-if="entryModal.hasProtectorDate == '1'">
            <DatePicker v-model="entryModal.protectorEndDate" :options="optionProtectorEndDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="劳动合同情况：" prop="contractInfo" style="width: 100%;">
            <RadioGroup v-model="entryModal.contractInfo">
                <Radio label="1">已签</Radio>
                <Radio label="0">未签</Radio>
            </RadioGroup>
        </FormItem>
        <!-- 首次签订的合同 start -->
        <FormItem label="合同签订日期：" style="width: 50%" v-if="entryModal.contractInfo == 1">
            <DatePicker v-model="firstContract.renewDate" @on-change="changeRenewDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="合同到期日期：" prop="expireDate" style="width: 50%" v-if="entryModal.contractInfo == 1">
            <DatePicker v-model="firstContract.expireDate" :options="optionExpireDate" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="合同附件：" style="width: 100%;" v-if="entryModal.contractInfo == 1">
            <span class="upload-titile" v-show="firstContract.attachment">{{ firstContract.attachment ? firstContract.attachment.fileName : '' }}</span>
            <Upload :action="uploadFileUrl" class="margin-bottom"
                :data="uploadData" style="display: inline-block"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn" @click="uploadAttachment(firstContract, 'attachment', 'attachmentId')">{{ firstContract.attachment ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
        <!-- 首次签订的合同 end -->
        <FormItem label="备注：" prop="content" style="width: 100%;">
            <div style="margin-right: 150px;">
                <Input v-model="entryModal.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            </div>
        </FormItem>
        <FormItem label="开户名：" prop="accountName" style="width: 50%">
            <Input v-model="entryModal.accountName" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="开户行：" prop="openingBank" style="width: 50%">
            <Input v-model="entryModal.openingBank" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="银行卡号：" prop="bankCard" style="width: 50%">
            <Input v-model="entryModal.bankCard" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="银行卡扫描件：" style="width: 50%">
            <span class="upload-titile" v-show="entryModal.bankAttachment">{{ entryModal.bankAttachment ? entryModal.bankAttachment.fileName : '' }}</span>
            <Upload :action="uploadFileUrl" class="margin-bottom"
                :data="uploadData" style="display: inline-block"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn" @click="uploadAttachment(entryModal, 'bankAttachment', 'bankCardUrl')">{{ entryModal.bankAttachment ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
        <FormItem label="备用银行卡开户名：" prop="bakAccountName" style="width: 50%">
            <Input v-model="entryModal.bakAccountName" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="备用银行卡开户行：" prop="bakOpeningBank" style="width: 50%">
            <Input v-model="entryModal.bakOpeningBank" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="备用银行卡号：" prop="bakBankCard" style="width: 50%">
            <Input v-model="entryModal.bakBankCard" style="width:200px;margin-right:6px;"/>
        </FormItem>
        <FormItem label="备用银行卡扫描件：" style="width: 50%">
            <span class="upload-titile" v-show="entryModal.bakBankAttachment">{{ entryModal.bakBankAttachment ? entryModal.bakBankAttachment.fileName : '' }}</span>
            <Upload :action="uploadFileUrl" class="margin-bottom"
                :data="bakUploadData" style="display: inline-block"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn" @click="uploadAttachment(entryModal, 'bakBankAttachment', 'bakBankCardUrl')">{{ entryModal.bakBankAttachment ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
    </Form>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salEntryInfo, salCommon, sys } from '../../../libs/request.js';

export default {
    props: {
        personnelId: {
            type: String,
            required: false
        },
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            entryModal: {
                accountName: '', //开户名
                bakAccountName: '', //备用银行卡开户名
                bakBankCard: '', //备用银行卡号
                bakBankCardUrl: '', //备用银行卡图片附件id
                bakOpeningBank: '', //备用银行卡开户行
                bankCard: '', //银行卡号
                bankCardUrl: '', //银行卡图片附件id
                content: '', //员工备注信息
                contractInfo: '', //劳动合同情况 0未签 1已签
                contractVOList: [],
                correctionDate: '', //转正日期
                effectDate: '', //生效日期
                entryTime: '', //入职日期
                hasProtectorDate: '', //是否有保护期 0 没有保护期 1 有保护期
                isEffect: '1', //是否生效
                isTimeEffect: '0', //是否定时生效
                openingBank: '', //开户行
                probationPeriod: null, //试用期时长 月
                protectorDate: null, //保护期 日
                protectorEndDate: '', //保护期结束时间
                protectorStartDate: '', //保护期开始时间
                isInsert: '1', //新增1，信息更正和保存并生效所有：0
            },
            entryResetModal: {},
            firstContract: {
                attachment: {},
                attachmentId: '',
                contractType: '1',
                renewDate: '',
                expireDate: '',
                isFirstContract: '1',
                remarks: '',
            },
            firstContractReset: {},
            personnelRules: {
                entryTime: { required: true, type: 'date', message: '入职日期不能为空', trigger: 'change' },
            },
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
            uploadFormat: ['png','jpeg','jpg','gif','pdf'],
            uploadItem: {},
            itemId: '',
            itemName: '',
            options: { //入职日期
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            optionsCorrectionDate: { //转正日期
                disabledDate (date) {
                    return date
                }
            },
            optionProtectorStartDate: { //保护期开始日期
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            optionProtectorEndDate: { //保护期到期日期
                disabledDate (date) {
                    return date
                }
            },
            optionExpireDate: { //合同到期日期
                disabledDate (date) {
                    return date
                }
            },
        };
    },
    mounted(){
        this.create();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        create() {
            console.log(this.personnelId);
            if(this.personnelId) this.getId(this.personnelId);
            this.uploadFileUrl = salCommon.getUploadFileUrl();
            this.entryResetModal = JSON.parse(JSON.stringify(this.entryModal));
        },
        getId(id) {
            if(id) {
                let params = {
                    userId: id
                }
                salEntryInfo.form(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let data = res.data.data;
                        if(data.id) {
                            this.entryModal.id = data.id;
                            this.entryModal.isInsert = '0';
                        }
                    }
                }).catch(errors.call(this));
            }
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
        handleSubmit () {
            this.$refs.entryRef.validate((valid) => {
                if (valid) {
                    // console.log(this.entryModal)
                    this.saveEdu();
                }else{
                    this.$emit('onStopLoading');
                }
            })
        },
        saveEdu() {
            // console.log(this.personnelId);
            let params = JSON.parse(JSON.stringify(this.entryModal));
            params.userId = this.personnelId;
            delete params.fileName;
            params.entryTime = this.entryModal.entryTime ? this.entryModal.entryTime.format('yyyy-MM-dd') : '';
            params.correctionDate = this.entryModal.correctionDate ? this.entryModal.correctionDate.format('yyyy-MM-dd') : '';
            params.protectorStartDate = this.entryModal.protectorStartDate ? this.entryModal.protectorStartDate.format('yyyy-MM-dd') : '';
            params.protectorEndDate = this.entryModal.protectorEndDate ? this.entryModal.protectorEndDate.format('yyyy-MM-dd') : '';

            if(params.bankAttachment) delete params.bankAttachment;
            if(params.bakBankAttachment) delete params.bakBankAttachment;

            // 合同

            let data = JSON.parse(JSON.stringify(this.firstContract));
            this.firstContract.renewDate = data.renewDate ? new Date(data.renewDate).format('yyyy-MM-dd') : '';
            this.firstContract.expireDate = data.expireDate ? new Date(data.expireDate).format('yyyy-MM-dd') : '';
            delete data.attachment;
            params.contractVOList.push(data);

            salEntryInfo.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('goNext');
                    this.$emit('onStopLoading');
                }
            }).catch(errors.call(this));
        },
        handleReset () {
            this.entryModal = JSON.parse(JSON.stringify(this.entryResetModal));
            this.$refs.entryRef.resetFields();
        },
        changeEntryTime(item) {
            // 修改入职日期
            this.entryModal.correctionDate = ''; // 转正日期置空
            if(this.entryModal.entryTime) {
                let time = new Date(this.entryModal.entryTime).getTime() + 86400000;
                this.optionsCorrectionDate = {
                    disabledDate (date) {
                        return date && date.valueOf() < time;
                    }
                }
            } else {
                this.optionsCorrectionDate = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
        },
        changeProtectorStartDate() {
            // 修改保护期开始日期
            this.entryModal.protectorEndDate = ''; // 保护期到期日期置空
            if(this.entryModal.protectorStartDate) {
                let time = new Date(this.entryModal.protectorStartDate).getTime() + 86400000;
                this.optionProtectorEndDate = {
                    disabledDate (date) {
                        return date && date.valueOf() < time;
                    }
                }
            } else {
                this.optionProtectorEndDate = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
        },
        changeRenewDate() {
            // 合同签订日期
            this.firstContract.expireDate = ''; // 合同到期日期置空
            if(this.firstContract.renewDate) {
                let time = new Date(this.firstContract.renewDate).getTime() + 86400000;
                this.optionExpireDate = {
                    disabledDate (date) {
                        return date && date.valueOf() < time;
                    }
                }
            } else {
                this.optionExpireDate = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
        },
    },
}
</script>


