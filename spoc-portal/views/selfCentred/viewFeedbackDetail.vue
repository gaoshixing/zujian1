<style lang="less">
    .feedbackView{
        .feedbackTitle{
            font-size: 18px;
            font-weight: bold;
            padding-top: 5opx;
            padding-bottom: 20px;
        }
        .feedbackContent{
            .description{
                overflow:hidden;
                margin-bottom:15px;
                .w85{
                    width: 85%;
                }
            }
            .feedbackLabel{
                text-align: right;
                display: inline-block;
                width: 130px;
                color: #999999;
                padding-bottom: 15px;
            }
            .fl{
                float: left;
            }
            .action{
                cursor: pointer;
                color:#44bcb7;
                margin-left: 15px;
            }
            .feedbackImgs{
                margin-right: 10px;
                display: inline-block;
                width: 50px;
                height: 50px;
                background-color: #bbbbbb;
                .feedbackImg{
                    width: 50px;
                    height: 50px;
                    cursor: pointer;
                }
            }
        }
        .feedbackHistroy{
            padding-left: 60px;
            .feedbackHistroyDetail{
                margin-bottom: 20px;
                .feedbackHistroyRemarks{
                    margin-top: 10px;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    background-color: #f7f7f7;
                    .feedbackHistroyRemark{
                        margin-bottom: 10px;
                    }
                    .remarksImg{
                        cursor: pointer;
                        max-width: 500px;
                        max-height: 375px;
                    }
                }   
            }
        }
    }

</style>
<template>
<div class="feedbackView">
    <div class="feedbackTitle">
        反馈内容
    </div>
    <div class="feedbackContent">
        <div>
            <span class="feedbackLabel">编号：</span>
            <span>{{feedbackDetail.no}}</span>
        </div>
        <div>
            <span class="feedbackLabel">优先级：</span>
            <span>{{feedbackDetail.priorityLabel}}</span>
        </div>
        <div>
            <span class="feedbackLabel">问题分类：</span>
            <span>{{feedbackDetail.typeLabel}}</span>
        </div>
        <div>
            <span class="feedbackLabel">状态：</span>
            <span>{{feedbackDetail.statusLabel}}</span>
        </div>
        <div class="description">
            <div class="feedbackLabel fl">问题描述：</div>
            <div class="fl w85"  v-html="feedbackDetail.content"></div>
          <!--   <span>{{feedbackDetail.content}}</span> -->
        </div>
       <!--  <div>
            <span class="feedbackLabel">附件？？：</span>
            <span>{{feedbackDetail.docName}}</span>
            <a class="action" :href="feedbackDetail.docUrl">[ 下载 ]</a>
        </div> -->
    <!--     <div>
            <span class="feedbackLabel"></span>
            <div class="feedbackImgs" @click="showImg(item.imgurl)" v-for="(item,index) in feedbackDetail.fujianImgs" :key="'imgs_' + index">
               <img class="feedbackImg" :src="item.imgurl"/>
            </div>
        </div> -->
        <div v-show="isAdmin">
            <div>
                <span class="feedbackLabel">URL地址：</span>
                <span>{{feedbackDetail.url}}</span>
            </div>
            <div>
                <span class="feedbackLabel">浏览器类型及版本：</span>
                <span>{{feedbackDetail.browser}}</span>
            </div>
            <div>
                <span class="feedbackLabel">操作系统：</span>
                <span>{{feedbackDetail.os}}</span>
            </div>
            <div>
                <span class="feedbackLabel">提交账号：</span>
                <span>{{feedbackDetail.loginName}}</span>
                <span v-show="feedbackDetail.tmpPassword" class="feedbackLabel">临时密码：</span>
                <span v-show="feedbackDetail.tmpPassword">{{feedbackDetail.tmpPassword}}</span>
                <span v-show="!feedbackDetail.tmpPassword" class="action" @click="editPassword">修改密码</span>
                <span v-show="feedbackDetail.tmpPassword" class="action" @click="resetPassword">恢复密码</span>
            </div>
        </div>
        <div>
            <span class="feedbackLabel">提交人：</span>
            <span>{{feedbackDetail.username}}</span>
        </div>
        <div>
            <span class="feedbackLabel">提交时间：</span>
            <span>{{feedbackDetail.createDate}}</span>
        </div>
    </div>
    <div class="feedbackTitle">
        历史记录
    </div>
    <div class="feedbackHistroy">
        <div class="feedbackHistroyDetail" v-for="(item,index) in feedbackDetail.sysWorkorderLogList" :key="'sysWorkorderLogList_' + index">
            <div class="feedbackUserInfo">
                {{index+1}}&nbsp;,&nbsp;&nbsp;{{item.createDate}},&nbsp;&nbsp;由{{item.optUser}}{{item.actionLabel}}
            </div>
            <div class="feedbackHistroyRemarks" v-if="item.content">
                <div v-html="item.content " class="feedbackHistroyRemark"></div>
            </div>
        </div>
    </div>
    <Modal
        v-model="modal"
        title="查看附件图片"
        width="600"
        @on-ok="ok()"
        @on-cancel="cancel()">
        <div style="width:100%; text-align: center;">
            <img :src="fujianImgUrl" style="max-width:550px;max-height:350px;">
        </div>
    </Modal>
    <Modal
        v-model="modal1"
        title="修改密码"
        width="400">
        <div style="padding-left:50px;">
            <div>修改后密码为：<span style="color:#44bcb7;">{{feedbackDetail.tmpPassword}}</span></div>
            <div style="color:red;margin-top:10px;">提示：问题解决后，请恢复密码！</div>
        </div>
        <div slot="footer">
            <Button type="primary" @click="ok(1)">确定</Button>
        </div>
    </Modal>
    <Modal
        v-model="modal2"
        title="恢复密码"
        width="400">
        <div style="padding:20px 50px;">
            恢复密码成功！
        </div>
        <div slot="footer">
            <Button type="primary" @click="ok(2)">确定</Button>
        </div>
    </Modal>
</div>
</template>
<script>
    import util from '../../../spoc-choiceschool-web/src/libs/js/util.js';
    import nozzle from "../../../spoc-choiceschool-web/src/libs/interface.js";
    import { mapState, mapGetters } from 'vuex'
    import valid, { errors, common, sys} from "../../libs/request";
    import {waitUntil} from "../../libs/util";

    export default {
        props:{
            detailId: {
                type: String,
                default: '',
                // required: true
            } 
        },
        mounted(){  
            // console.log(this.$route.query.id)
            this.loadTypes()
        },
        computed:{
            ...mapState(['userInfo']),
            detailId1() {
                if(this.$route.query.detailId) return this.$route.query.detailId
                return this.detailId
            }
        },
        data () {
            return {
                sys_workorder_priority: [],
                sys_workorder_type: [],
                sys_workorder_status: [],
                sys_workorder_log_action:[],
                isAdmin: false,
                fujianImgUrl: '',
                modal:false,
                modal1:false,
                modal2:false,
                feedbackDetail:{},
            }
		},
		components: { 
        },

		methods: {
            loadTypes(){
                let obj = {
                    types: 'sys_workorder_priority,sys_workorder_type,sys_workorder_status,sys_workorder_log_action',
                }
                sys.batchListData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.sys_workorder_priority = res.data.data.sys_workorder_priority
                        this.sys_workorder_type = res.data.data.sys_workorder_type
                        this.sys_workorder_status = res.data.data.sys_workorder_status
                        this.sys_workorder_log_action = res.data.data.sys_workorder_log_action
                        this.loadFeedbackDetail()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            loadFeedbackDetail(){
                console.log(this.detailId1, 88)
                sys.sysWorkorderForm({
					 id: this.detailId1
				}).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.feedbackDetail = res.data.data

                        let priorityLabel = ''
                        this.sys_workorder_priority.forEach((item, index)=>{
                            if(item.value ==  this.feedbackDetail.priority){
                                priorityLabel = item.label
                            }
                        })
                        this.feedbackDetail.priorityLabel = (priorityLabel ? priorityLabel : this.feedbackDetail.priority)
                        
                        let typeLabel = ''
                        this.sys_workorder_type.forEach((item, index)=>{
                            if(item.value ==  this.feedbackDetail.type){
                                typeLabel = item.label
                            }
                        })
                        this.feedbackDetail.typeLabel = (typeLabel ? typeLabel : this.feedbackDetail.type)
                       
                        let statusLabel = ''
                        this.sys_workorder_status.forEach((item, index)=>{
                            if(item.value ==  this.feedbackDetail.status){
                                statusLabel = item.label
                            }
                        })
                        this.feedbackDetail.statusLabel = (statusLabel ? statusLabel : this.feedbackDetail.status)
                        
                        this.feedbackDetail.sysWorkorderLogList.forEach((item, index)=>{
                            for(let i =0; i < this.sys_workorder_log_action.length; i++) {
                                if(this.sys_workorder_log_action[i].value == item.action){
                                    item.actionLabel = this.sys_workorder_log_action[i].label
                                    break;
                                }
                            }
                            if(!item.actionLabel){
                                item.actionLabel = item.action
                            }
                        })

                        this.isAdmin = this.userInfo.roleId.split(',').indexOf('1') >= 0
                    }   
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            ok(type){
                this['modal' + type] = false
            },
            showImg(fujianImgUrl) { 
                this.fujianImgUrl = fujianImgUrl
                this.modal = true
            },
            //生成临时密码
            editPassword() {
                let data = {
                    flag: 1,
                    loginName: this.feedbackDetail.loginName
                }
                let _this = this;
                util.ajax.post(nozzle.basicData.buildTmpPwd,data).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        console.log(res)
                        _this.feedbackDetail.tmpPassword = JSON.parse(res.data).message
                        _this.modal1 = true
                    }).autoRun("login","error");
                }).catch(function(error) {
                    util.checkAjaxError(error);
                });
            },
            //擦除临时密码
            resetPassword() {
                let data = {
                    flag: 0,
                    loginName: this.feedbackDetail.loginName
                }
                let _this = this;
                util.ajax.post(nozzle.basicData.buildTmpPwd,data).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.modal2 = true;
                        _this.feedbackDetail.tmpPassword = ''
                    }).autoRun("login","error");
                }).catch(function(error) {
                    util.checkAjaxError(error);
                });
            },
            openShowImg(fujianImgUrl) {
                window.open(fujianImgUrl)
            }
        },
        filters:{
        },
        watch:{
        }
    }
</script>