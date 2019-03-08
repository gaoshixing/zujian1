<style lang="less">
    .applyDetail5{
        margin-bottom: 40px;
        .clear{
            overflow: hidden;
            margin-top: 10px;
            .fl{
                float: left;
                line-height: 40px;
            }
            .w155{
                color: #999;
                width:155px;
                height: 40px;
                margin-right: 8px;
                text-align: right;
            }
            .w70p{
                width: 70%
            }
            .w200{
                width:200px;
            }
        }
    }

</style>
<template>
<div class="applyDetail5">
    <btn-list title="确认入读信息" :btnList="btnListVal">
    </btn-list>
    <div :style="{display: tableShowStatus? 'block':'none'}">
        <div class="clear">
            <div class="fl w155">入读当前学校/专业：</div>
            <div class="fl w70p">
                <RadioGroup v-model="applyConfirmData.isConfirm">
                    <Radio label="1" :disabled="showEditStatus">是</Radio>
                    <Radio label="0" :disabled="showEditStatus">否</Radio>
                </RadioGroup>
            </div>
        </div>
        <div v-show="applyConfirmData.isConfirm == 1">
            <div class="clear">
                <div class="fl w155">已收到正式Offer：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isOffer">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">120request已到达：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isRequest">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">网上确认入读：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isWebConfirm">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">缴纳入读定金：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isPayDeposit">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">确认入读定金：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isConfirmDeposit">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">确认入读网址：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isConfirmUrl">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                    <Input class="w200" v-show='applyConfirmData.isConfirmUrl == 1' v-model="applyConfirmData.url" :disabled="showEditStatus"></Input>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">确认入读账号/密码：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isConfirmAccountPwd">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                    <Input class="w200" v-show='applyConfirmData.isConfirmAccountPwd == 1' v-model="applyConfirmData.accountPwd" :disabled="showEditStatus"></Input>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">住宿截止时间：</div>
                <div class="fl w70p">
                    <DatePicker type="date" v-model="applyConfirmData.stayDeadline" placeholder="请选择日期" class="w200" :disabled="showEditStatus"></DatePicker>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">预订住宿：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isReserveStay">
                        <Radio label="0" :disabled="showEditStatus">已预订</Radio>
                        <Radio label="1" :disabled="showEditStatus">未预订</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需预订</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">发送签证、材料：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isSendVisa">
                        <Radio label="0" :disabled="showEditStatus">已发送</Radio>
                        <Radio label="1" :disabled="showEditStatus">未发送</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需发送</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">签证时间：</div>
                <div class="fl w70p">
                    <DatePicker type="date" v-model="applyConfirmData.visaTime" placeholder="请选择日期" class="w200" :disabled="showEditStatus"></DatePicker>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">签证结果：</div>
                <div class="fl w70p">
                    <Input class="w200" v-model="applyConfirmData.visaResult" :disabled="showEditStatus"></Input>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">学生ID/邮箱：</div>
                <div class="fl w70p">
                    <Input class="w200" v-model="applyConfirmData.idMail" :disabled="showEditStatus"></Input>
                </div>
            </div>
                <div class="clear">
                <div class="fl w155">密码：</div>
                <div class="fl w70p">
                    <Input class="w200" :disabled="showEditStatus" v-model="applyConfirmData.pwd"></Input>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">体检表格：</div>
                <div class="fl w70p">
                    <RadioGroup v-model="applyConfirmData.isHealthReport">
                        <Radio label="1" :disabled="showEditStatus">是</Radio>
                        <Radio label="0" :disabled="showEditStatus">否</Radio>
                        <Radio label="2" :disabled="showEditStatus">无需</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="clear">
                <div class="fl w155">备注：</div>
                <div class="fl w70p">
                    <Input class="w65p" v-model="applyConfirmData.remarks" :disabled="showEditStatus" type="textarea" placeholder="请输入"></Input>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import BtnList from '@public/modules/btnlist';
    import { mapState, mapGetters } from 'vuex'
    import valid, { errors, common, sys, aplApplyConfirm} from "../../libs/request";

    export default {
        props:{
           /*  pId: {
                required: true
            } */
            from:{
                type:String
            },
            userInfo: {
                type: Object
            },
            showApplyEnd: {
                type: Boolean
            }
        },
        data () {
            return {
                comStatus: '0',
                tableShowStatus: true,
                showEditStatus: true,
                btnListVal: [
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ],
                applyConfirmData: {
                }
            }
		},
		components: { 
            BtnList
        },
        mounted(){
            if(this.from == 'caseManage' || (this.from == 'myStudent' && !this.showApplyEnd)){
                this.btnListVal =  [
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ]
            }
            if(this.from == 'myStudent' && this.showApplyEnd){
                this.btnListVal =  [
                    {
                        text: '编辑',
                        type: 'primary',
                        event: this.showEdit
                    },
                    {
                        text: '收起',
                        type: 'primary',
                        event: this.showContent
                    }
                ]
            }
            this.loadData()
        },
		methods: {
            showContent(){
                this.tableShowStatus = !this.tableShowStatus
                this.$set(this.btnListVal[this.from == 'myStudent' ? 1: 0],'text',this.tableShowStatus ? '收起':'展开')
            },
            showEdit(){
                this.showEditStatus = !this.showEditStatus
                this.$set(this.btnListVal[0],'text',this.showEditStatus ? '编辑':'保存')

                if(this.showEditStatus) {
                    let obj = {
                        groupId: this.$route.query.groupId,//  服务组ID ,
                        choiceId: this.$route.query.choiceId, //选校ID ,
                        isConfirm: this.applyConfirmData.isConfirm, // 入读当前学校/专业 : 0：否，1：是 ,
                    }
                    if(this.applyConfirmData.isConfirm == 1){
                        obj.accountPwd =  this.applyConfirmData.accountPwd // 入读账号/密码 ,
                        obj.idMail =  this.applyConfirmData.idMail// 学生ID/邮箱 ,
                        obj.isConfirmAccountPwd =  this.applyConfirmData.isConfirmAccountPwd//确认入读账号/密码  =  0：否，1：是，2：无需 ,
                        obj.isConfirmDeposit =  this.applyConfirmData.isConfirmDeposit //确认入读定金  =  0：否，1：是，2：无需 ,
                        obj.isConfirmUrl =  this.applyConfirmData.isConfirmUrl//确认入读网址  =  0：否，1：是，2：无需 ,
                        obj.isHealthReport =  this.applyConfirmData.isHealthReport//  体验表格  =  0：否，1：是，2：无需 ,
                        obj.isOffer =  this.applyConfirmData.isOffer // 已收到正式offer  =  0：否，1：是 ,
                        obj.isPayDeposit =  this.applyConfirmData.isPayDeposit//  缴纳入读定金  =  0：否，1：是，2：无需 ,
                        obj.isRequest =  this.applyConfirmData.isRequest// 120request已到达  =  0：否，1：是，2：无需 ,
                        obj.isReserveStay =  this.applyConfirmData.isReserveStay// 是否需预定住宿  =  0：否，1：是，2：无需 ,
                        obj.isSendVisa =  this.applyConfirmData.isSendVisa//发送签证、材料  =  0：否，1：是，2：无需 ,
                        obj.isWebConfirm =  this.applyConfirmData.isWebConfirm// 网上确认入读  =  0：否，1：是，2：无需 ,
                        obj.pwd =  this.applyConfirmData.pwd// 密码 ,
                        obj.remarks =  this.applyConfirmData.remarks// 备注 ,
                        obj.stayDeadline = this.applyConfirmData.stayDeadline ? new Date(this.applyConfirmData.stayDeadline).format('yyyy-MM-dd hh:mm:ss'): '' // 住宿截止时间 ,
                        obj.visaResult = this.applyConfirmData.visaResult // 签证结果,关联字典 ,
                        obj.visaTime = this.applyConfirmData.visaTime? new Date(this.applyConfirmData.visaTime).format('yyyy-MM-dd hh:mm:ss'): '' // 签证时间
                        obj.url = this.applyConfirmData.url  //入读网址
                    }
                    if(this.applyConfirmData.id){
                        obj.id = this.applyConfirmData.id
                    }
                    aplApplyConfirm.save(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.loadData()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            },
            loadData(){
                let obj = {
                    choiceId: this.$route.query.choiceId,
                    groupId: this.$route.query.groupId
                }
                aplApplyConfirm.formData(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.applyConfirmData = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            }
        },
        watch:{
            showApplyEnd: function(newValue, oldVale){
                if(this.from == 'caseManage' || (this.from == 'myStudent' && !this.showApplyEnd)){
                    this.btnListVal =  [
                        {
                            text: '收起',
                            type: 'primary',
                            event: this.showContent
                        }
                    ]
                }
                if(this.from == 'myStudent' && this.showApplyEnd){
                    this.btnListVal =  [
                        {
                            text: '编辑',
                            type: 'primary',
                            event: this.showEdit
                        },
                        {
                            text: '收起',
                            type: 'primary',
                            event: this.showContent
                        }
                    ]
                } 
            },
        }
    }
</script>