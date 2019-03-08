<style lang="less">
.employee-files-container{
    @mian: #41b3ae;
    border-top: 1px solid #e0e0e0;
    
    .employee-brief{
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,.1);margin: 15px 0 30px;
        padding-left: 80px;padding-top: 12px;padding-bottom: 20px;
        border: 1px solid #e0e0e0;
        
        h2{
            @h: 56px;
            height: @h;line-height: @h;
            font-size: 16px;
            span{
                @w: 100px;
                float: left;width: @w;text-align: center;height: @h;word-break: keep-all;
            }
        }
        .picture{
            @w: 100px;
            position: absolute;left: 80px;top: 68px;
            width: @w;
            .img{
                position: relative;
                display: block;margin-bottom: 20px;
                width: @w;height: @w;background-color: rgba(0,0,0,.1);
            }
            .img-box, img{
                width: @w;height: @w;
            }
            .ivu-upload{
                position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: 2;opacity: 0;
            }
            span{
                display: block;
                width: 65px;height: 24px;line-height: 24px;
                margin-left: auto;margin-right: auto;
                background-color: @mian;color: #fff;text-align: center;
                border-radius: 24px;
            }
        }
        .employee-brief-middle{
            position: relative;top: -11px;
            margin-left: 180px;overflow: hidden;
        }
        .history{
            text-align: center;
        }
        .lists{
            float: left;width: 50%;
        }
        .item{
            @h: 32px;
            position: relative;padding-left: 80px;
            height: @h;line-height: @h;
            font-size: 14px;
            span{
                position: absolute;left: 0;top: 0;width: 76px;
                text-align: right;
                color: #888;
            }
        }
    }
    .ivu-btn{
        font-size: 14px;
    }
    .ivu-form-item{
        float: left;margin-bottom: 0;
        .ivu-input-wrapper, .ivu-select, .margin-bottom, .ivu-radio-wrapper, .ivu-input-number{
            margin-bottom: 20px;
        }
        .day{
            position: relative;top: -9px;
        }
    }
    .ivu-form .ivu-form-item-label{
        font-size: 14px;color: #999;
    }
    .ivu-form-item-content{
        font-size: 14px;color: #333;
    }
    .brief-top{
        padding: 20px 30px;overflow: hidden;
        .ivu-select{
            float: left;
        }
        .new-date{
            margin-left: 32px;line-height: 32px;
            color: #333;font-size: 14px;
        }
        .edit{
            float: right;width: 100px;padding: 0;
        }
    }

    .show-add-card{
        // @h: 35px;
        margin: 15px 0;padding: 16px 30px;border: 1px #e0e0e0 dashed;
        display: block;
        font-size: 14px;text-align: center;
        // float: right;width: 100px;padding: 0;height: @h;line-height: @h;
        &:hover{
            border-color: #44bcb7;
        }
    }
    .work-item{
        box-shadow: 0 2px 10px rgba(0,0,0,.1);margin: 15px 0 30px;
        padding: 20px 30px;border: 1px solid #e0e0e0;
        zoom: 1;
        &::before, &::after{
            content: '';display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
        .btns{
            margin-bottom: 10px;
            text-align: right;font-size: 14px;
        }
    }
    .ivu-form-item-error-tip{
        top: 29px;font-size: 12px;
    }
    .btn-box{
        margin-right: 120px;text-align: center;
    }
    .ivu-form .ivu-form-item-label{
        height: 34px;
    }
    .upload-btn{
        @h: 32px;
        height: @h;padding-top: 0;padding-bottom: 0;
    }
}
.set-data{
    @w: 90px;
    @h: 32px;
    .data-tips{
        height: @h;line-height: @h;margin-bottom: 12px;font-size: 14px;
        padding-left: 10px;
    }
    .data-b{
        position: relative;padding-left: @w;font-size: 14px;
    }
    .title{
        position: absolute;left: 0;width: @w - 10px;height: @h;line-height: @h;
        text-align: right;
    }
}

</style>
    
<template>
<div class="employee-files-container">
    <div class="employee-brief">
        <h2><span>{{ info.name }}</span></h2>
        <div class="picture">
            <div class="img">
                <div class="img-box">
                    <img :src="info.photo" alt="">
                </div>
                <Upload :action="imgAction"
                    :data="uploadData"
                    name="avatar"
                    :show-upload-list="false"
                    :on-success="uploadSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="3000">
                    <Button type="primary" class="btn">上传头像</Button>
                </Upload>
            </div>
            <span :style="userStatusStyle">{{ userStatus }}</span>
        </div>
        <div class="employee-brief-middle">
            <div class="lists">
                <div class="item"><span>员工编号：</span>{{ info.no }}</div>
                <div class="item"><span>英文名：</span>{{ info.enName }}</div>
                <div class="item"><span>邮箱：</span>{{ info.email }}</div>
                <div class="item"><span>手机号：</span>{{ info.mobile }}</div>
            </div>
            <div class="lists">
                <div class="item"><span>分公司：</span>{{ info.companyName }}</div>
                <div class="item"><span>部门：</span>{{ info.officeName }}</div>
                <div class="item"><span>岗位：</span>{{ info.jobName }}</div>
                <div class="item"><span>职级：</span>{{ info.levelName }}</div>
            </div>
        </div>
        <div class="history"><a @click="showHistry">查看历史纪录</a></div>
    </div>
    <Tabs v-model="type">
        <TabPane label="基本信息" name="1"></TabPane>
        <TabPane label="工作经历" name="2"></TabPane>
        <TabPane label="教育背景" name="3"></TabPane>
        <TabPane label="入职信息" name="4"></TabPane>
        <TabPane label="社保信息" name="5" v-if="isLeader"></TabPane>
        <TabPane label="薪资信息" name="6" v-if="isLeader"></TabPane>
        <TabPane label="绩效信息" name="7" v-if="isLeader"></TabPane>
        <TabPane label="奖惩/升迁" name="8" v-if="isLeader"></TabPane>
        <TabPane label="离职信息" name="9"></TabPane>
        <TabPane label="工资单" name="10" v-if="isLeader"></TabPane>
        <TabPane label="考勤表" name="11"></TabPane>
    </Tabs>

    <!-- <keep-alive> -->
        <brief v-if="type == '1'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></brief>
        <work-experience v-else-if="type == '2'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></work-experience>
        <educational v-else-if="type == '3'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></educational>
        <entry v-else-if="type == '4'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></entry>
        <social-security v-else-if="type == '5'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></social-security>
        <salary v-else-if="type == '6'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></salary>
        <performance v-else-if="type == '7'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></performance>
        <bonus-penalty v-else-if="type == '8'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></bonus-penalty>
        <dimission v-else-if="type == '9'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></dimission>
        <payroll v-else-if="type == '10'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></payroll>
        <attendance-sheet v-else-if="type == '11'" :pid="pid" @postSalHistoryLog="postSalHistoryLog"></attendance-sheet>
    <!-- </keep-alive> -->


    <Modal v-model="histroyModal" title="历史记录" width='728' class="model-histroy">
        <ul class="histroy-lists" v-show="historyLogLists.length > 0">
            <li class="histroy-item" v-for="item in historyLogLists" :key="item.id">
                <div class="time">• {{ item.createDate }}</div>
                <div class="detail" v-if="child" v-for="(child, index) in item.content" :key="item.id + '-' + index"><span>#{{ item.typeLabel }}# </span>{{ child }}</div>
                <div class="author">操作人：{{ item.oprator.name }}</div>
            </li>
        </ul>
        <img src="../../assets/img/no-history@2x.png" class="no-history" v-show="historyLogLists.length == 0" alt="">
        <div class="page-box" v-show="pageCount > 1">
            <div style="margin: auto;display: inline-block;">
                <Page :current="pageNo"
                    :total="count"
                    show-elevator show-total show-sizer
                    :page-size="pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="sizeChange">
                </Page>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>

import brief from './modules/brief.vue';
import educational from './modules/educational.vue';
import entry from './modules/entry.vue';
import socialSecurity from './modules/socialSecurity.vue';
import workExperience from './modules/workExperience.vue';
import salary from './modules/salary.vue';
import performance from './modules/performance.vue';
import bonusPenalty from './modules/bonusPenalty.vue';
import dimission from './modules/dimission.vue';
import payroll from './modules/payroll.vue';
import attendanceSheet from './modules/attendanceSheet.vue';
import valid, { errors, salUserBasicInfo, salHistoryLog, user, sys } from '../../libs/request.js';
import { mapState } from 'vuex';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            type: '1',
            histroyModal: false,
            pageNo: 1,//当前页码
            pageCount: 0,//页码总数
            pageSize: 10,//每页条数
            count: 0,//数据总数
            info: {},
            userStatus: '',
            userStatusLists: [],
            imgAction: '',
            uploadData: {
                objectId: '',
                type:"secretaire", 
                fileType:"all",
                dirName:'images',
            },
            historyLogLists: [],
            isLeader: false,
            userStatusStyle: '',
        };
    },
    computed: {
        ...mapState(['userInfo']),
    },
    components: {
        brief, educational, entry, socialSecurity, workExperience, salary, 
        performance, bonusPenalty, dimission, payroll, attendanceSheet
    },
    created() {
        if(this.userInfo.roleId) {
            let roleLists = this.userInfo.roleId.split(',');
            // console.log(roleLists)
            if(roleLists.indexOf('1203') != -1) {
                this.isLeader = true;
            }
        } else {
            this.getUserInfo();
        }
    },
    mounted(){
        this.imgAction = user.uploadImg();
        this.getInfo(this.$route.query.userId);
        this.getSalHistoryLog();
    },
    methods: {
        getUserInfo() {
            sys.userInfoData().then(valid.call(this)).then(res=>{
                if(res.ok){
                    let data = res.data.data;
                    if(data.roleId) {
                        let roleLists = data.roleId.split(',');
                        // console.log(roleLists)
                        if(roleLists.indexOf('1203') != -1) {
                            this.isLeader = true;
                        }
                    }
                }
            }).catch();
        },
        showHistry() {
            this.getSalHistoryLog();
            this.histroyModal = true;
        },
        pageChange(page) {
            this.pageNo = page;
            this.getSalHistoryLog();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getSalHistoryLog();
        },
        getInfo(id) {
            let params = {
                userId: id
            }
            salUserBasicInfo.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.userStatus = data.userStatus;
                    if(data.userStatus == '试用' || data.userStatus == '入职') this.userStatusStyle = 'background-color: #FAAD14';
                    // else if(data.userStatus == '正常' || data.userStatus == '转正') this.userStatusStyle = 'background-color: #44BCB7';
                    else if(data.userStatus == '离职' || data.userStatus == '当月入离职' || data.userStatus == '停薪留职') this.userStatusStyle = 'background-color: #FF6666';

                    this.info = data.user;
				}
            }).catch(errors.call(this));
        },
        uploadSuccess(response) {
            // console.log(response)
            let data = {
                photo: response.data.filePath,
                userId: this.$route.query.userId
            }
            user.saveAnyUserPhoto(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.getInfo(this.$route.query.userId);
                }
            }).catch(errors.call(this))
        },
        getSalHistoryLog() {
            // 获取历史纪录
            let params = {
                userId: this.$route.query.userId,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            salHistoryLog.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.historyLogLists = data.list;
                    this.historyLogLists.forEach(item => {
                        item.content = item.content ? item.content.split('<p>').join('').split('</p>') : '';
                    });
                    this.count = data.total;
                    this.pageCount = data.pages;
				}
            }).catch(errors.call(this));
        },
        postSalHistoryLog(content, type) {
            // 保存历史纪录
            if(content) {
                let params = {
                    userId: this.$route.query.userId,
                    content: content,
                    type: type
                }
                // console.log(params);
                salHistoryLog.save(params).then(valid.call(this)).then(res => {
                	if(res.ok) {
                        // let data = res.data.data;
                        // console.log(data);
                	}
                }).catch(errors.call(this));
            }
        },
    }
}
</script>


