<style lang="less">
.work-experience-container{
    padding: 20px 30px;
    .upload-titile{
        margin-right: 8px;
    }
}
</style>
    
<template>
<div class="work-experience-container">
    <div class="clearfix">
        <a @click="showAddCard" class="show-add-card">+ 添加工作经历</a>
    </div>
    <div class="work-item" v-for="(workModal, index) in workLists" :key="workModal.id">
        <div class="btns">
            <a @click="edit(workModal)" v-if="!workModal.isEdit">编辑</a>
            <a v-if="!workModal.isEdit" @click="showDel(workModal.id)" style="margin-left: 16px;color:red;">删除</a>
            <a v-if="workModal.isEdit" @click="hide(workModal, index, 'workItem' + workModal.id)">保存</a>
        </div>
        <Form :ref="'workItem' + workModal.id" :model="workModal" :rules="workRules" :label-width="120">
            <FormItem label="公司名称：" prop="componyName" style="width: 50%">
                <Input v-model="workModal.componyName" v-if="workModal.isEdit" style="width:320px;"/>
                <div v-else>{{ workModal.componyName }}</div>
            </FormItem>
            <FormItem label="入职日期：" prop="entryTime" style="width: 50%">
                <DatePicker v-model="workModal.entryTime" :options="optionsEntry" @on-change="changeEntryTime(workModal)" v-if="workModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择入职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ workModal.entryTime }}</div>
            </FormItem>
            <FormItem label="离职日期：" prop="departureTime" style="width: 50%">
                <DatePicker v-model="workModal.departureTime" :options="workModal.optionsDeparture" v-if="workModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择离职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ workModal.departureTime }}</div>
            </FormItem>
            <FormItem label="任职情况：" prop="position" style="width: 50%">
                <Input v-model="workModal.position" v-if="workModal.isEdit" style="width:320px;"/>
                <div v-else>{{ workModal.position }}</div>
            </FormItem>
            <FormItem label="工作职责：" prop="workDuty" style="width: 100%">
                <Input type="textarea" v-model="workModal.workDuty" v-if="workModal.isEdit" style="width:320px;"/>
                <div v-else>{{ workModal.workDuty }}</div>
            </FormItem>
            <FormItem label="离职证明：" style="width: 100%">
                <div v-if="workModal.isEdit">
                    <span class="upload-titile" v-show="workModal.attachment">{{ workModal.attachment ? workModal.attachment.realName : '' }}</span>
                    <Upload :action="uploadFileUrl" style="display: inline-block"
                        :data="uploadData"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn" @click="uploadAttachment(workModal)">{{ workModal.attachment ? '修改' : '上传'}}</Button>
                    </Upload>
                    
                </div>
                <div v-else>{{ workModal.attachment ? workModal.attachment.realName : '' }}</div>
            </FormItem>
        </Form>
    </div>
    <div class="work-item" v-show="newListsShow">
        <Form ref="workNew" :model="newLists" :rules="workRules" :label-width="120">
            <FormItem label="公司名称：" prop="componyName" style="width: 50%">
                <Input v-model="newLists.componyName" style="width:320px;"/>
            </FormItem>
            <FormItem label="入职日期：" prop="entryTime" style="width: 50%">
                <DatePicker v-model="newLists.entryTime" :options="optionsEntry" @on-change="changeEntryTime(newLists)" format="yyyy年MM月dd日" type="date" placeholder="请选择入职日期" style="width:320px;display: block;"></DatePicker>
            </FormItem>
            <FormItem label="离职日期：" prop="departureTime" style="width: 50%">
                <DatePicker v-model="newLists.departureTime" :options="newLists.optionsDeparture" format="yyyy年MM月dd日" type="date" placeholder="请选择离职日期" style="width:320px;display: block;"></DatePicker>
            </FormItem>
            <FormItem label="任职情况：" prop="position" style="width: 50%">
                <Input v-model="newLists.position" style="width:320px;"/>
            </FormItem>
            <FormItem label="工作职责：" prop="workDuty" style="width: 100%">
                <Input type="textarea" v-model="newLists.workDuty" style="width:320px;"/>
            </FormItem>
            <FormItem label="离职证明：" style="width: 100%">
                <span class="upload-titile" v-show="newLists.attachment">{{ newLists.attachment ? newLists.attachment.realName : '' }}</span>
                <Upload :action="uploadFileUrl" style="display: inline-block"
                    :data="uploadData"
                    name="files"
                    :show-upload-list="false"
                    :before-upload="handleBefore"
                    :on-success="handleSuccessImg"
                    :on-format-error="handleFormatErrorImg"
                    :format="uploadFormat">
                    <Button type="primary" class="btn upload-btn" @click="uploadAttachment(newLists)">{{ newLists.attachment ? '修改' : '上传'}}</Button>
                </Upload>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 10px;">
                <div class="btn-box">
                    <Button type="primary" @click="cancle">取消</Button>
                    <Button type="primary" style="margin-left: 8px" @click="saveNewLists">保存</Button>
                </div>
            </FormItem>
        </Form>
    </div>
    <Modal
        v-model="modal"
        class="set-data"
        title="提示"
        @on-ok="deleteWord">
        确定删除当前工作经历？
    </Modal>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salWorkHistory, salCommon } from '../../../libs/request.js';
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
        const noSpaceRules = (rule, value, callback) => {
            value = value.replace(/(^\s*)|(\s*$)/g, '').toString();
            if (value === '') {
                callback(new Error('公司名称不能为空'));
            } else {
                callback();
            }
        };
        return {
            modal: false,
            delId: '',
            workLists: [],
            workListsReset: [],
            newLists: {
                attachmentId: '', //离职证明文件
                componyName: '', //公司名称
                departureTime: '', //离职时间
                entryTime: '', //入职时间
                userId: this.$route.query.userId,
                position: '', //任职情况
                workDuty: '', //工作职责,
                optionsDeparture: {
                    disabledDate (date) {
                        return date;
                    }
                }
            },
            newListsReset: {},
            newListsShow: false,
            workRules: {
                componyName: { required: true, validator: noSpaceRules, trigger: 'blur' },
                entryTime: { required: true, type: 'date', message: '入职日期不能为空', trigger: 'change' },
                departureTime: { required: true, type: 'date', message: '离职日期不能为空', trigger: 'change' },
            },
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadItem: {},
            uploadFormat: ['png','jpeg','jpg','gif'],
            optionsEntry: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
        };
    },
    mounted(){
        // console.log(this.pid)
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getLists(this.$route.query.userId);
        this.newListsReset = JSON.parse(JSON.stringify(this.newLists));
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getLists(id) {
            let params = {
                userId: id
            }
            salWorkHistory.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.workLists = data;
                    this.workLists.forEach(element => {
                        element.attachmentId = element.attachment ? element.attachment.id : '';
                        element.isEdit = false;
                        let time = new Date(element.entryTime).getTime() + 86400000;
                        element.optionsDeparture = {
                            disabledDate (date) {
                                return date && date.valueOf() < time || date.valueOf() > Date.now() - 86400000;
                            }
                        };
                    });
                    this.workListsReset = JSON.parse(JSON.stringify(this.workLists));
				}
            }).catch(errors.call(this));
        },
        showAddCard() {
            // 添加工作经历
            this.newListsShow = true;
        },
        edit(obj) {
            // 编辑
            obj.isEdit = true;
            this.$forceUpdate();
        },
        hide(obj, index, name) {
            // 保存
            obj.componyName = obj.componyName.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(obj));       
            delete params.isEdit;
            delete params.attachment;
            delete params.certifyUrl;
            delete params.optionsDeparture;
            params.userId = this.$route.query.userId;
            if(params.entryTime) params.entryTime = obj.entryTime.format('yyyy-MM-dd');
            if(params.departureTime) params.departureTime = obj.departureTime.format('yyyy-MM-dd');
            // console.log(params)
            this.$refs[name][0].validate((valid) => {
                if (valid) {
                    this.save(params, 'save', index);
                }
            });
        },
        cancle() {
            // 新增-取消
            this.newLists = JSON.parse(JSON.stringify(this.newListsReset));
            this.newListsShow = false;
        },
        saveNewLists() {
            // 新增-保存
            this.newLists.componyName = this.newLists.componyName.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(this.newLists));
            if(params.entryTime) params.entryTime = this.newLists.entryTime.format('yyyy-MM-dd');
            if(params.departureTime) params.departureTime = this.newLists.departureTime.format('yyyy-MM-dd');
            delete params.attachment;
            delete params.optionsDeparture;
            this.$refs['workNew'].validate((valid) => {
                if (valid) {
                    this.save(params, 'new');
                }
            });
        },
        save(params, str, index) {
            salWorkHistory.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.newLists = JSON.parse(JSON.stringify(this.newListsReset));
                    this.newListsShow = false;
                    this.getLists(this.$route.query.userId);
                    this.salHistoryLog(str, index);
				}
            }).catch(errors.call(this));
        },
        salHistoryLog(str, index) {
            // 处理需要保存的历史纪录
            let keyVal = {
                componyName: '公司名称',
                departureTime: '离职时间',
                entryTime: '入职时间',
                id: '编号',
                position: '任职情况',
                userId: '用户ID',
                workDuty: '工作职责',
            };

            let history = '';
            if(str == 'new') history += '<p>新增工作经历</p>';
            else if(str == 'delete') history += '<p>删除工作经历</p>';
            else {
                let before = '';
                let data = JSON.parse(JSON.stringify(this.workLists[index]));
                if(data.entryTime) data.entryTime = new Date(data.entryTime).format('yyyy-MM-dd');
                if(data.departureTime) data.departureTime = new Date(data.departureTime).format('yyyy-MM-dd');
                let params = comparison(this.workListsReset[index], data);
                // 离职证明
                if(params.attachment) {
                    before += '<p>修改离职证明，由 ' + (this.workListsReset[index].attachment ? this.workListsReset[index].attachment.realName : '') + ' 改为 ' + params.attachment.realName + '</p>';
                }

                before += historyLists(params, this.workListsReset[index], keyVal);
                history += before;
            }
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '2')
        },
        showDel(id) {
            this.delId = id;
            this.modal = true;
        },
        deleteWord() {
            let params = {
                id: this.delId
            }
            salWorkHistory.delete(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$Message.success('删除成功');
                    this.salHistoryLog('delete');
                    this.getLists(this.$route.query.userId);
				}
            }).catch(errors.call(this));
        },
        uploadAttachment(item) {
            this.uploadItem = item;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.uploadItem.attachmentId = res.data.id;
            this.uploadItem.attachment = res.data;
            this.updateLoadingStatus({isLoading:false});
            this.$forceUpdate();
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
        changeEntryTime(item) {
            // 修改入职日期
            item.departureTime = ''; // 离职日期置空
            if(item.entryTime) {
                let time = new Date(item.entryTime).getTime() + 86400000;
                item.optionsDeparture = {
                    disabledDate (date) {
                        return date && date.valueOf() < time || date.valueOf() > Date.now() - 86400000;
                    }
                }
            } else {
                item.optionsDeparture = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
            this.$forceUpdate();
        }
    }
}
</script>


