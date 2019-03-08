<style lang="less">
.bonus-penalty-container{
    padding: 30px 30px 0;
    .brief-top{
        padding-bottom: 0;
    }
    .btn-title{
        @h: 35px;
        // float: left;
        height: @h;line-height: @h;margin: 0;
        font-size: 16px;color: #333;
    }
    .upload-titile{
        margin-right: 8px;
    }
}
</style>
    
<template>
<div class="bonus-penalty-container">
    <div style="margin-bottom: 30px;">
        <div class="clearfix">
            <h3 class="btn-title">奖惩信息</h3>
            <a @click="showAddCard1" class="show-add-card">+ 添加奖惩信息</a>
            <!-- <Button type="primary" @click="showAddCard1" class="show-add-card">添加奖惩信息</Button> -->
        </div>
        <div class="work-item" v-for="(bounsPenaltyModal, index) in bounsPenaltyLists" :key="bounsPenaltyModal.id">
            <div class="btns">
                <a @click="edit(bounsPenaltyModal)" v-if="!bounsPenaltyModal.isEdit">编辑</a>
                <a v-if="!bounsPenaltyModal.isEdit" @click="showDel(bounsPenaltyModal.id, 'deleteJL')" style="margin-left: 16px;color:red;">删除</a>
                <a v-if="bounsPenaltyModal.isEdit" @click="handleSubmit('bounsPenalty' + bounsPenaltyModal.id, bounsPenaltyModal, index)">保存</a>
            </div>
            <Form :ref="'bounsPenalty' + bounsPenaltyModal.id" :model="bounsPenaltyModal" :rules="workRules" :label-width="120">
                <FormItem label="奖惩内容：" prop="rpContent" style="width: 50%">
                    <Input v-model="bounsPenaltyModal.rpContent" v-if="bounsPenaltyModal.isEdit" style="width:320px;"/>
                    <div v-else>{{ bounsPenaltyModal.rpContent }}</div>
                </FormItem>
                <FormItem label="奖惩时间：" prop="rpDate" style="width: 50%">
                    <DatePicker v-model="bounsPenaltyModal.rpDate" :options="options" v-if="bounsPenaltyModal.isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                    <div v-else>{{ bounsPenaltyModal.rpDate }}</div>
                </FormItem>
                <FormItem label="附件：" style="width: 100%">
                    <div v-if="bounsPenaltyModal.isEdit" class="margin-bottom">
                        <span class="upload-titile" v-show="bounsPenaltyModal.attachement">{{ bounsPenaltyModal.attachement ? bounsPenaltyModal.attachement.filePath.split('/').pop() : '' }}</span>
                        <Upload :action="uploadFileUrl"
                            :data="uploadData" style="display: inline-block"
                            name="files"
                            :show-upload-list="false"
                            :before-upload="handleBefore"
                            :on-success="handleSuccessImg"
                            :on-format-error="handleFormatErrorImg"
                            :format="uploadFormat">
                            <Button type="primary" class="btn upload-btn" @click="uploadAttachment(bounsPenaltyModal)">{{ bounsPenaltyModal.attachement ? '修改' : '上传'}}</Button>
                        </Upload>
                    </div>
                    <div v-else>{{ bounsPenaltyModal.attachement ? bounsPenaltyModal.attachement.filePath.split('/').pop() : '' }}</div>
                </FormItem>
                <FormItem label="备注：" prop="remarks" style="width: 100%">
                    <Input type="textarea" v-model="bounsPenaltyModal.remarks" v-if="bounsPenaltyModal.isEdit" style="width:320px;"/>
                    <div v-else>{{ bounsPenaltyModal.remarks }}</div>
                </FormItem>
            </Form>
        </div>
        <div class="work-item" v-show="newBounsPenaltyShow">
            <Form ref="newBounsPenaltyRef" :model="newBounsPenalty" :rules="workRules" :label-width="120">
                <FormItem label="奖惩内容：" prop="rpContent" style="width: 50%">
                    <Input v-model="newBounsPenalty.rpContent" style="width:320px;"/>
                </FormItem>
                <FormItem label="奖惩时间：" prop="rpDate" style="width: 50%">
                    <DatePicker v-model="newBounsPenalty.rpDate" :options="options" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                </FormItem>
                <FormItem label="附件：" style="width: 100%">
                    <span class="upload-titile" v-show="newBounsPenalty.attachement">{{ newBounsPenalty.attachement ? newBounsPenalty.attachement.filePath.split('/').pop() : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn" @click="uploadAttachment(newBounsPenalty)">{{ newBounsPenalty.attachement ? '修改' : '上传'}}</Button>
                    </Upload>
                </FormItem>
                <FormItem label="备注：" prop="remarks" style="width: 100%">
                    <Input type="textarea" v-model="newBounsPenalty.remarks" style="width:320px;"/>
                </FormItem>
                <FormItem style="width: 100%;margin-top: 10px;">
                    <Button type="primary" @click="cancle('newBounsPenaltyShow')">取消</Button>
                    <Button type="primary" style="margin-left: 8px" @click="handleSubmit('newBounsPenalty')">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
    <div class="clearfix">
        <h3 class="btn-title">升迁信息</h3>
        <a @click="showAddCard2" class="show-add-card">+ 添加升迁信息</a>
        <!-- <Button type="primary" @click="showAddCard2" class="show-add-card">添加升迁信息</Button> -->
    </div>
    <div class="work-item" v-for="(promotionModal, index) in promotionLists" :key="promotionModal.id">
        <div class="btns">
            <a @click="edit(promotionModal)" v-if="!promotionModal.isEdit">编辑</a>
            <a v-if="!promotionModal.isEdit" @click="showDel(promotionModal.id, 'deleteSQ')" style="margin-left: 16px;color:red;">删除</a>
            <a v-if="promotionModal.isEdit" @click="handleSubmit('promotion' + promotionModal.id, promotionModal, index )">保存</a>
        </div>
        <Form :ref="'promotion' + promotionModal.id" :model="promotionModal" :rules="workRules" :label-width="120">
            <FormItem label="升迁内容：" prop="rpContent" style="width: 50%">
                <Input v-model="promotionModal.rpContent" v-if="promotionModal.isEdit" style="width:320px;"/>
                <div v-else>{{ promotionModal.rpContent }}</div>
            </FormItem>
            <FormItem label="升迁时间：" prop="rpDate" style="width: 50%">
                <DatePicker v-model="promotionModal.rpDate" :options="options" v-if="promotionModal.isEdit" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ promotionModal.rpDate }}</div>
            </FormItem>
            <FormItem label="附件：" style="width: 100%">
                <div v-if="promotionModal.isEdit" class="margin-bottom">
                    <span class="upload-titile" v-show="promotionModal.attachement">{{ promotionModal.attachement ? promotionModal.attachement.filePath.split('/').pop() : '' }}</span>
                    <Upload :action="uploadFileUrl"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn" @click="uploadAttachment(promotionModal)">{{ promotionModal.attachement ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <div v-else>{{ promotionModal.attachement ? promotionModal.attachement.filePath.split('/').pop() : '' }}</div>
            </FormItem>
            <FormItem label="备注：" prop="remarks" style="width: 100%">
                <Input type="textarea" v-model="promotionModal.remarks" v-if="promotionModal.isEdit" style="width:320px;"/>
                <div v-else>{{ promotionModal.remarks }}</div>
            </FormItem>
        </Form>
    </div>
    <div class="work-item" v-show="newPromotionShow">
        <Form ref="newPromotionRef" :model="newPromotion" :rules="workRules" :label-width="120">
            <FormItem label="升迁内容：" prop="rpContent" style="width: 50%">
                <Input v-model="newPromotion.rpContent" style="width:320px;"/>
            </FormItem>
            <FormItem label="升迁时间：" prop="rpDate" style="width: 50%">
                <DatePicker v-model="newPromotion.rpDate" :options="options" format="yyyy年MM月dd日" type="date" style="width:320px;display: block;"></DatePicker>
            </FormItem>
            <FormItem label="附件：" style="width: 100%">
                <span class="upload-titile" v-show="newPromotion.attachement">{{ newPromotion.attachement ? newPromotion.attachement.filePath.split('/').pop() : '' }}</span>
                <Upload :action="uploadFileUrl" class="margin-bottom"
                    :data="uploadData" style="display: inline-block"
                    name="files"
                    :show-upload-list="false"
                    :before-upload="handleBefore"
                    :on-success="handleSuccessImg"
                    :on-format-error="handleFormatErrorImg"
                    :format="uploadFormat">
                    <Button type="primary" class="btn upload-btn" @click="uploadAttachment(newPromotion)">{{ newPromotion.attachement ? '修改' : '上传'}}</Button>
                </Upload>
            </FormItem>
            <FormItem label="备注：" prop="remarks" style="width: 100%">
                <Input type="textarea" v-model="newPromotion.remarks" style="width:320px;"/>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 10px;">
                <Button type="primary" @click="cancle('newPromotionShow')">取消</Button>
                <Button type="primary" style="margin-left: 8px" @click="handleSubmit('newPromotionw')">保存</Button>
            </FormItem>
        </Form>
    </div>
    <Modal
        v-model="modal"
        class="set-data"
        title="提示"
        @on-ok="deleteItem">
        确定删除当前{{ modalMessage }}？
    </Modal>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salRewardsPenalties, salEntryInfo, salCommon, sys } from '../../../libs/request.js';
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
                callback(new Error('内容不能为空'));
            } else {
                callback();
            }
        };
        return {
            modal: false,
            bounsPenaltyLists: [], // 奖惩列表
            bounsPenaltyListsReset: [], // 奖惩列表
            newBounsPenalty: { // 新的奖惩
                attachement: null,
                attachementId: '',
                rpContent: '',
                rpDate: '',
                remarks: '',
                userId: this.$route.query.userId,
            },
            newBounsPenaltyReset: {},
            newBounsPenaltyShow: false, // 是否显示添加奖惩
            workRules: {
                rpContent: { required: true, validator: noSpaceRules, trigger: 'blur' }
            },
            newPromotionShow: false,
            promotionLists: [], // 升迁列表
            promotionListsReset: [], // 升迁列表
            newPromotion: {},
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadItem: {},
            uploadFormat: ['png','jpeg','jpg','gif','pdf','word'],
            options: {
                // disabledDate (date) {
                //     return date && date.valueOf() > Date.now();
                // }
            },
            delId: '',
            modalMessage: '奖励信息',
        };
    },
    mounted(){
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getLists(this.$route.query.userId);
        this.newBounsPenaltyReset = JSON.parse(JSON.stringify(this.newBounsPenalty));
        this.newPromotion = JSON.parse(JSON.stringify(this.newBounsPenalty));
        this.getEntryTime();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getLists(id) {
            let params = {
                userId: id
            }
            salRewardsPenalties.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    // 奖惩信息
                    this.bounsPenaltyLists = data.rewardList;
                    this.bounsPenaltyLists.forEach(element => {
                        element.attachementId = element.attachement ? element.attachement.id : '';
                        element.isEdit = false;
                    });
                    this.bounsPenaltyListsReset = JSON.parse(JSON.stringify(this.bounsPenaltyLists));
                    // 升迁信息
                    this.promotionLists = data.performentList;
                    this.promotionLists.forEach(element => {
                        element.attachementId = element.attachement ? element.attachement.id : '';
                        element.isEdit = false;
                    });
                    this.promotionListsReset = JSON.parse(JSON.stringify(this.promotionLists));
				}
            }).catch(errors.call(this));
        },
        showAddCard1() {
            // 添加奖惩信息
            this.newBounsPenaltyShow = true;
        },
        showAddCard2() {
            // 添加升迁信息
            this.newPromotionShow = true;
        },
        cancle(item) {
            if(item == 'newBounsPenaltyShow') {
                this.newBounsPenaltyShow = false;
                this.newBounsPenalty = JSON.parse(JSON.stringify(this.newBounsPenaltyReset));
            } else if(item == 'newPromotionShow') {
                this.newPromotionShow = false;
                this.newPromotion = JSON.parse(JSON.stringify(this.newBounsPenaltyReset));
            }
        },
        handleSubmit (str, obj, index) {
            let objValidate;
            if(str == 'newBounsPenalty') objValidate = this.$refs['newBounsPenaltyRef'];
            else if(str == 'newPromotionw') objValidate = this.$refs['newPromotionRef'];
            else objValidate = this.$refs[str][0];
            objValidate.validate((valid) => {
                if (valid) {
                    if(str == 'newBounsPenalty') this.savenewBounsPenalty();
                    else if(str == 'newPromotionw') this.saveNewPromotionw();
                    else this.hide(obj, index, str);
                }
            })
        },
        savenewBounsPenalty() {
            // 保存奖惩信息 -- 新增
            this.newBounsPenalty.rpContent = this.newBounsPenalty.rpContent.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(this.newBounsPenalty));
            if(params.rpDate) params.rpDate = this.newBounsPenalty.rpDate.format('yyyy-MM-dd');
            delete params.attachement;
            params.rpType = '1';
            this.saveAjax(params, 'newBounsPenalty');
        },
        saveNewPromotionw() {
            // 保存升迁信息 -- 新增
            this.newPromotion.rpContent = this.newPromotion.rpContent.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(this.newPromotion));
            if(params.rpDate) params.rpDate = this.newPromotion.rpDate.format('yyyy-MM-dd');
            delete params.attachement;
            params.rpType = '2';
            this.saveAjax(params, 'newPromotionw');
        },
        edit(obj) {
            // 编辑
            obj.isEdit = true;
            this.$forceUpdate();
        },
        hide(obj, index, str) {
            // 保存 -- 编辑
            obj.rpContent = obj.rpContent.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(obj));       
            delete params.isEdit;
            delete params.attachement;
            if(params.rpDate) params.rpDate = obj.rpDate.format('yyyy-MM-dd');
            this.saveAjax(params, str, index);
        },
        saveAjax(params, str, index) {
            // 保存数据到数据库
            salRewardsPenalties.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.newBounsPenalty = JSON.parse(JSON.stringify(this.newBounsPenaltyReset));
                    this.newPromotion = JSON.parse(JSON.stringify(this.newBounsPenaltyReset));
                    this.newBounsPenaltyShow = false;
                    this.newPromotionShow = false;
                    this.getLists(this.$route.query.userId);
                    this.salHistoryLog(str, index);
				}
            }).catch(errors.call(this));
        },
        salHistoryLog(str, index) {
            // 处理需要保存的历史纪录
            let keyVal = {
                remarks: '备注',
                rpContent: '奖惩内容',
                rpDate: '奖惩时间',
            };
            let history = '';
            if(str == 'newBounsPenalty') history += '<p>新增奖惩信息</p>';
            else if(str == 'newPromotionw') history += '<p>新增升迁信息</p>';
            else if(str == 'deleteJL') history += '<p>删除奖惩信息</p>';
            else if(str == 'deleteSQ') history += '<p>删除升迁信息</p>';
            else {
                // str: promotionModal  bounsPenaltyModal
                let reset = {};
                let newObj = {};
                if(str == 'promotionModal') {
                    reset = this.promotionListsReset[index];
                    newObj = JSON.parse(JSON.stringify(this.promotionLists[index]));
                } else {
                    reset = this.bounsPenaltyListsReset[index];
                    newObj = JSON.parse(JSON.stringify(this.bounsPenaltyLists[index]));
                }
                if(newObj.rpDate) newObj.rpDate = new Date(newObj.rpDate).format('yyyy-MM-dd');
                let params = comparison(reset, newObj);
                // 附件
                if(params.attachement) {
                    history += '<p>修改附件，由 ' + (reset.attachement ? reset.attachement.realName : ' ') + ' 改为 ' + params.attachement.realName + '</p>';
                }
                history += historyLists(params, reset, keyVal);
            }
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '8');
        },
        showDel(id, str) {
            if(str == 'deleteJL') {
                this.modalMessage = '奖励信息';
            } else {
                this.modalMessage = '升迁信息';
            }
            this.delId = id;
            this.modal = true;
        },
        deleteItem() {
            // 删除
            let params = {
                id: this.delId
            }
            salRewardsPenalties.delete(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$Message.success('删除成功');
                    if(this.modalMessage == '奖励信息') this.salHistoryLog('deleteJL');
                    else this.salHistoryLog('deleteSQ');
                    this.getLists(this.$route.query.userId);
				}
            }).catch(errors.call(this));
        },
        // ---上传--- start
        uploadAttachment(item, num) {
            this.uploadItem = item;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.uploadItem.attachementId = res.data.id;
            this.uploadItem.attachement = res.data;
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
        // ---上传--- end
        getEntryTime() {
            // 获取入职时间
            let params = {
                userId: this.$route.query.userId
            }
            salEntryInfo.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    if(data.entryTime) this.options = {
                        disabledDate (date) {
                            return date && date.valueOf() < new Date(data.entryTime) - 86400000;
                        }
                    }
				}
            }).catch(errors.call(this));
        },
    },
}
</script>


