<style lang="less">
.dimission-container{
    .bottom{
        padding-left: 30px;
    }
}
</style>
    
<template>
<div class="dimission-container">
    <div class="bottom" style="margin-top: 30px;">
        <Form ref="dimissionFrom" :model="dimissionModal" :rules="dimissionRules" :label-width="150">
            <FormItem label="离职日期：" prop="departureDate" style="width: 50%">
                <DatePicker v-model="dimissionModal.departureDate" v-if="isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ dimissionModal.departureDate }}</div>
            </FormItem>
            <FormItem label="未休假天数：" prop="noLeaveDays" style="width: 50%">
                <div v-if="isEdit">
                    <InputNumber v-model="dimissionModal.noLeaveDays" style="width:280px;margin-right:6px;"/>
                    <span class="day">天</span>
                </div>
                <div v-else>{{ dimissionModal.noLeaveDays }}</div>
            </FormItem>
            <FormItem label="赔偿金：" prop="damage" style="width: 50%">
                <div v-if="isEdit"><Input v-model="dimissionModal.damage" style="width:320px;margin-bottom:12px"/></div>
                <div v-else>{{ dimissionModal.damage }}</div>
            </FormItem>
            <FormItem label="离职原因：" prop="departureReason" style="width: 50%">
                <Select v-model="dimissionModal.departureReason" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in departureReasonLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ dimissionModal.departureReason }}</div>
            </FormItem>
            <FormItem label="离职原因：" v-if="dimissionModal.departureReason == '9'" prop="yuanyin" style="width: 50%">
                <div v-if="isEdit"><Input v-model="dimissionModal.yuanyin" placeholder="请输入离职原因" style="width:320px;margin-bottom:12px"/></div>
                <div v-else>{{ dimissionModal.yuanyin }}</div>
            </FormItem>
            <FormItem label="离职证明：" style="width: 100%">
                <div v-if="isEdit">
                    <span class="upload-titile" v-show="dimissionModal.attachementObject">{{ dimissionModal.attachementObject ? dimissionModal.attachementObject.realName : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn">{{ dimissionModal.attachementObject ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <div v-else>{{ dimissionModal.attachementObject ? dimissionModal.attachementObject.realName : '' }}</div>
            </FormItem>
            <FormItem label="其他备注：" prop="remarks" style="width: 100%">
                <Input type="textarea" v-model="dimissionModal.remarks" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ dimissionModal.remarks }}</div>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 50px;">
                <Button type="primary" @click="save(0)">信息更正</Button>
                <Button type="primary" style="margin-left: 8px" @click="showModal">保存并生效</Button>
            </FormItem>
        </Form>
    </div>
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
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salDeparture, salCommon, sys } from '../../../libs/request.js';
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
            selectDate: '',
            dateList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                }
            ],
            isEdit: !false, //编辑状态, true显示编辑框, false显示label
            dimissionModal: {},
            dimissionModalReset: {},
            attachementObjectReset: {},
            dimissionRules: {
                departureDate: { required: true, type: 'date', message: '离职日期不能为空', trigger: 'change' },
            },
            departureReasonLists: [],
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadItem: {},
            uploadFormat: ['png','jpeg','jpg','gif'],
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
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getBatchListData();
        this.getForm();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getForm() {
            let params = {
                userId: this.$route.query.userId
            }
            salDeparture.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    
                    this.dimissionModal = data;
                    this.dimissionModalReset = JSON.parse(JSON.stringify(data));

                    this.dimissionModal.departureDate = this.dimissionModal.departureDate ? new Date(this.dimissionModal.departureDate) : '';
                    this.dimissionModalReset.departureDate = this.dimissionModalReset.departureDate ? new Date(this.dimissionModalReset.departureDate).format('yyyy-MM-dd') : '';

                    this.dimissionModal.attachmentId = data.attachementObject ? data.attachementObject.id : '';
                    this.dimissionModalReset.attachmentId = data.attachementObject ? data.attachementObject.id : '';

                    this.attachementObjectReset = JSON.parse(JSON.stringify(this.dimissionModal.attachementObject));

                    delete this.dimissionModalReset.attachement;
                    delete this.dimissionModalReset.attachementObject;
                    // console.log(this.dimissionModalReset);
				}
            }).catch(errors.call(this));
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_departure_departure_reason', //离职原因
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.departureReasonLists = data.sal_departure_departure_reason;
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
            let params = JSON.parse(JSON.stringify(this.dimissionModal));
            params.departureDate = params.departureDate ? new Date(params.departureDate).format('yyyy-MM-dd') : '';
            delete params.attachement;
            delete params.attachementObject;
            params.isTimeEffect = num;
            let b = this.effectiveDate == new Date();
            
            if(!params.userId) params.userId = this.$route.query.userId;
            
            let data = comparison(this.dimissionModalReset, params);

            if(num == 0) { //信息更正
                params.isEffect = 1;
            }else{ //保存并生效
                let b = new Date(this.effectiveDate).format('yyyy-MM-dd') == new Date().format('yyyy-MM-dd');
                if(!b) {
                    // 保存并生效（之后）
                    params = JSON.parse(JSON.stringify(data));
                    params.id = this.dimissionModalReset.id;
                    params.userId = this.dimissionModalReset.userId ? this.dimissionModalReset.userId : this.$route.query.userId;
                    params.isEffect = 0;
                    params.isTimeEffect = num;
                }else{
                    // 保存并生效（当天）
                    params.isEffect = 1;
                }
                params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
                // console.log(params);
            }
            
            this.$refs['dimissionFrom'].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    this.saveAjax(params, data);
                }
            });
        },
        saveAjax(params, data) {
            salDeparture.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getForm();
                    this.salHistoryLog(data);
                    this.$Message.success('保存成功');
				}
            }).catch(errors.call(this));
        },
        salHistoryLog(params) {
            // 处理需要保存的历史纪录
            let keyVal = {
                // attachmentId: '离职证明',
                damage: '赔偿金',
                departureDate: '离职日期',
                // departureReason: '离职原因 关联字典表',
                noLeaveDays: '未休假天数',
                remarks: '备注',

            }
            let history = historyLists(params, this.dimissionModalReset, keyVal);

            // 离职原因
            let before = '';
            if(params.departureReason) {
                before += '<p>修改离职原因，由 ' + this.findValue(this.departureReasonLists, this.dimissionModalReset.departureReason) + ' 改为 ' + this.findValue(this.departureReasonLists, params.departureReason) + '</p>';
            }
            // 离职证明
            if(params.attachmentId) {
                before += '<p>修改离职证明，由 ' + (this.attachementObjectReset ? this.attachementObjectReset.realName : '') + ' 改为 ' + this.dimissionModal.attachementObject.realName + '</p>';
            }

            history += before;
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '9')
        },
        findValue(lists, key, val, lab) {
            // console.log(lists);
            // console.log(key);
            let value = val ? val : 'value';
            let label = lab ? lab : 'label';
            let txt = '';
            if(key) {
                let data = lists.filter(function(item){
                    return item[value] == key; 
                });
                if(data.length > 0) txt = data[0][label];
            }
            return txt;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.dimissionModal.attachmentId = res.data.id;
            this.dimissionModal.attachementObject = res.data;
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
    },
}
</script>


