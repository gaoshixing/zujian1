<style lang="less">
.performance-container{
    padding: 0 30px;
    .brief-top{
        padding: 0;padding-top: 20px;
        // padding-bottom: 0;
    }
}
</style>
    
<template>
<div class="performance-container">
    <div class="brief-top">
        <Select v-model="version" @on-change="changeVersion" style="width:300px;margin-bottom:12px;">
            <Option v-for="(item, index) in versionLists" :value="index" :key="item.id">{{ item.versionName }}</Option>
        </Select>
        <span class="new-date">最后更新时间：{{ updateDate }}</span>
    </div>
    <div class="clearfix">
        <a @click="showAddCard" class="show-add-card" v-if="!disable">+ 添加考核信息</a>
        <!-- <Button type="primary" v-if="!disable" @click="showAddCard" class="show-add-card">添加考核信息</Button> -->
    </div>
    <div class="work-item" v-for="(performanceModal, index) in performanceLists" v-if="performanceModal.delFlag != 1" :key="performanceModal.id">
        <div class="btns">
            <div v-if="!disable">
                <a @click="edit(performanceModal)" v-if="!performanceModal.isEdit">编辑</a>
                <a v-if="!performanceModal.isEdit" style="margin-left: 16px;color:red;" @click="del(performanceModal, index)">删除</a>
                <a v-if="!performanceModal.id && performanceModal.isEdit" @click="deleteNewItem(index)">关闭</a>
                <!-- <a v-if="performanceModal.id && performanceModal.isEdit">确定</a> -->
            </div>
        </div>
        <Form ref="performance" :model="performanceModal" :rules="workRules" :label-width="120">
            <FormItem label="考核类型：" prop="checkType" style="width: 50%">
                <Select v-model="performanceModal.checkType" style="width:320px;" v-if="performanceModal.isEdit">
                    <Option v-for="item in checkTypeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ performanceModal.checkTypeLabel }}</div>
            </FormItem>
            <FormItem label="考勤周期：" prop="attendanceCycle" style="width: 50%">
                <div v-if="performanceModal.isEdit">
                    <InputNumber :precision="0" v-model="performanceModal.attendanceCycle" style="width:280px;margin-right:6px;"/>
                    <span class="day">单位/月</span>
                </div>
                <div v-else>{{ performanceModal.attendanceCycle ? performanceModal.attendanceCycle + '个月' : '' }}</div>
            </FormItem>
            <FormItem label="考核初始月：" prop="checkBeginDate" style="width: 50%">
                <DatePicker v-model="performanceModal.checkBeginDate" @on-change="changeCheckBeginDate(performanceModal)" v-if="performanceModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择离职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ performanceModal.checkBeginDate }}</div>
            </FormItem>
            <FormItem label="下次考核月：" prop="nextCheckMonthDate" style="width: 50%">
                <DatePicker :options="performanceModal.optionsNextCheckMonthDate" v-model="performanceModal.nextCheckMonthDate" v-if="performanceModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择离职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ performanceModal.nextCheckMonthDate }}</div>
            </FormItem>
            <FormItem v-if="performanceModal.checkType == '5'" label="其他备注：" prop="remarks" style="width: 50%">
                <Input v-model="performanceModal.remarks" v-if="performanceModal.isEdit" style="width:320px;"/>
                <div v-else>{{ performanceModal.remarks }}</div>
            </FormItem>
            <FormItem label="附件：" style="width: 100%">
                <div v-if="performanceModal.isEdit">
                    <span class="upload-titile" v-show="performanceModal.attachmentInfo && performanceModal.attachmentInfo.realName">{{ performanceModal.attachmentInfo ? performanceModal.attachmentInfo.realName : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn" @click="uploadAttachment(performanceModal)">{{ performanceModal.attachmentInfo ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <div v-else>{{ performanceModal.attachmentInfo ? performanceModal.attachmentInfo.realName : '' }}</div>
            </FormItem>
            <FormItem label="绩效备注：" prop="performanceRemarks" style="width: 100%">
                <Input type="textarea" v-model="performanceModal.performanceRemarks" v-if="performanceModal.isEdit" style="width:320px;"/>
                <div v-else>{{ performanceModal.performanceRemarks }}</div>
            </FormItem>
        </Form>
    </div>
    <div style="text-align: center;" v-if="!disable">
        <Button type="primary" @click="save(0)">信息更正</Button>
        <Button type="primary" style="margin-left: 8px" @click="showModal">保存并生效</Button>
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
import valid, { errors, salPerformanceInfo, salCommon, sys } from '../../../libs/request.js';
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
            disable: false, //当前版本false，输入框可编辑，按钮可见
            performanceLists: [],
            performanceListsReset: [],
            performanceModal: {
                attachmentId: null,
                attendanceCycle: null,
                checkBeginDate: null,
                checkType: null,
                nextCheckMonthDate: null,
                userId: this.$route.query.userId,
                isEdit: true,
            },
            checkTypeLists: [],
            workRules: {
                name: { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            },
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
        this.getLists();
        this.getVersionList();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getLists() {
            let params = {
                userId: this.$route.query.userId
            }
            salPerformanceInfo.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.performanceLists = data ? data : [];
                    let dateLists = [];
                    this.performanceLists.forEach(element => {
                        dateLists.push(new Date(element.updateDate).getTime());
                        element.attachmentId = element.attachmentInfo ? element.attachmentInfo.id : '';
                        element.isEdit = false;
                        element.delFlag = 0;
                        let time = element.checkBeginDate ? new Date(element.checkBeginDate).getTime() + 86400000 : '';
                        if (time) {
                            element.optionsNextCheckMonthDate = {
                                disabledDate (date) {
                                    return date && date.valueOf() < time;
                                }
                            };
                        }else {
                            element.optionsNextCheckMonthDate = {};
                        }
                    });
                    this.updateDate = dateLists.length > 0 ? new Date(Math.max.apply(null,dateLists)).format('yyyy-MM-dd hh:mm:ss') : '';
                    this.performanceListsReset = JSON.parse(JSON.stringify(data));
				}
            }).catch(errors.call(this));
        },
        showAddCard() {
            // 添加一条新的考核信息
            let obj = JSON.parse(JSON.stringify(this.performanceModal));
            obj.optionsNextCheckMonthDate = {
                disabledDate (date) {
                    return date;
                }
            };
            this.performanceLists.push(obj);
        },
        edit(obj) {
            // 编辑
            obj.isEdit = true;
            this.$forceUpdate();
        },
        // close(obj) {
        //     // 关闭
        //     obj.isEdit = false;
        //     this.$forceUpdate();
        // },
        save(num) {
            // 保存
            // 信息更正：isEffect 1 isTimeEffect 0
            // 保存并生效（当天） isEffect 1 isTimeEffect 1
            // 保存并生效（之后） isEffect 0 isTimeEffect 1
            let dtoList = JSON.parse(JSON.stringify(this.performanceLists));
            dtoList.forEach(item => {
                delete item.optionsNextCheckMonthDate;
                if(item.checkBeginDate) item.checkBeginDate = new Date(item.checkBeginDate).format('yyyy-MM-dd');
                if(item.nextCheckMonthDate) item.nextCheckMonthDate = new Date(item.nextCheckMonthDate).format('yyyy-MM-dd');
            });
            let params = {
                isTimeEffect: num, 
                dtoList: dtoList
            };
            let b = new Date(this.effectiveDate).format('yyyy-MM-dd') == new Date().format('yyyy-MM-dd');
            if(!params.userId) params.userId = this.$route.query.userId;
            if(num === 1) {
                params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
                if(!b) {
                    // 保存并生效（之后）需要传修改之后的字段
                    let arr = [];
                    this.performanceListsReset.forEach((item, index) => {
                        let obj = comparison(item, dtoList[index]);
                        if(JSON.stringify(obj) != '{}') {
                            obj.userId = item.userId;
                            obj.id = item.id;
                            delete obj.isEdit;
                            arr.push(obj);
                        }
                    });
                    // 新增的
                    this.performanceLists.forEach(item => {
                        if(!item.hasOwnProperty('id')) {
                            arr.push(item);
                        }
                    });
                    params.dtoList = arr;
                }
            }
            // console.log(params);
            this.saveAjax(params)
        },
        del(obj, index) {
            // 删除
            if(obj.id) obj.delFlag = 1;
            else this.performanceLists.splice(index, 1);
            this.$forceUpdate();
        },
        saveAjax(params) {
            salPerformanceInfo.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getLists();
				}
            }).catch(errors.call(this));
        },
        uploadAttachment(item) {
            this.uploadItem = item;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.uploadItem.attachmentId = res.data.id;
            this.uploadItem.attachmentInfo = res.data;
            this.uploadItem.certificateUrl = res.data.filePath;
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
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_performance_info_check_type', //考核类型
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.checkTypeLists = data.sal_performance_info_check_type;
				}
            }).catch(errors.call(this));
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
        getVersionList() {
            // 获取版本列表
            let params = {
                userId: this.$route.query.userId
            }
            salPerformanceInfo.findVersionNameList(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.versionLists = res.data.data;
                    this.versionLists.unshift({
                        id: 'new-version-1',
                        versionName: '最新版本'
                    });
                    // this.versionLists.forEach(element => {
                    //     element.isEdit = false;
                    //     element.delFlag = 0;
                    // });
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
                this.getVersionDetail(this.versionLists[item].effectDate);
            }
        },
        getVersionDetail(data) {
            // 获取版本信息
            let params = {
                userId: this.$route.query.userId,
                effectDate: data
            }
            salPerformanceInfo.findVersionByEffectDate(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.performanceLists = res.data.data;
                    if(this.performanceLists.length > 0) this.performanceLists.forEach(element => {
                        element.isEdit = false;
                        element.delFlag = 0;
                    });
				}
            }).catch(errors.call(this));
            
        },
        changeCheckBeginDate(item) {
            // 修改考核初始月
            // console.log(item);
            item.nextCheckMonthDate = ''; // 下次考核月置空
            if(item.checkBeginDate) {
                let time = new Date(item.checkBeginDate).getTime() + 86400000;
                item.optionsNextCheckMonthDate = {
                    disabledDate (date) {
                        return date && date.valueOf() < time;
                    }
                }
            } else {
                item.optionsNextCheckMonthDate = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
            this.$forceUpdate();
        },
        deleteNewItem(index) {
            // 关闭
            // console.log(index);
            this.performanceLists.splice(index, 1);
        },
    }
}
</script>


