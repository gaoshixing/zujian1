<style lang="less">
    .applyDetail1{
        margin-bottom: 20px;
        .clear{
            overflow: hidden;
            margin-bottom: 10px;
            .fl{
                float: left;
                .fls{
                    display: inline-block;
                    color: #999;
                    width:155px;
                    height: 40px;
                    line-height: 40px;
                    margin-right: 8px;
                    text-align: right;
                }
            }
            .w100p{
                width: 100%;
            }
            .w50p{
                width: 50%;
            }
        }
    }

</style>
<template>
<div class="applyDetail1">
    <btn-list title="申请摘要" :btnList="btnListVal">
    </btn-list>
    <div class="clear" :style="{display: tableShowStatus? 'block':'none'}">
        <div class="fl w100p"><p><span class="fls">申请状态：</span>已提交</p></div>
        <div class="fl w50p"><p><span class="fls">申请学校：</span>{{userInfo.schoolName}}</p></div>
        <div class="fl w50p"><p><span class="fls">专业项目：</span>{{userInfo.majorName}}</p></div>
        <div class="fl w50p"><p><span class="fls">申请难度：</span>{{userInfo.difficulty}}</p></div>
        <div class="fl w50p"><p><span class="fls">申请批次：</span>{{userInfo.batch}}</p></div>
        <div class="fl w50p"><p><span class="fls">截止时间：</span> <DatePicker v-model="deadline" :disabled="showEditStatus"  :readonly="showEditStatus" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker></p></div>
        <div class="fl w50p"><p><span class="fls">申请系统：</span><span v-if="userInfo.applyBox">{{userInfo.applyBox.sys}}</span></p></div>
    </div>
</div>
</template>
<script>
    import BtnList from '@public/modules/btnlist';
    import valid, { errors, common, sys, aplApplyTask} from "../../libs/request";

    export default {
        props:{
          /*   pId: {
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
        },
        data () {
            return {
                tableShowStatus: true,
                showEditStatus:true,
                btnListVal:[],
                deadline:'',
            }
		},
		components: { 
            BtnList
        },
		methods: {
            showContent(){
                this.tableShowStatus = !this.tableShowStatus
                this.$set(this.btnListVal[this.from == 'myStudent' ? 1: 0],'text',this.tableShowStatus ? '收起':'展开')
            },
            showEdit(){
                this.showEditStatus = !this.showEditStatus
                this.$set(this.btnListVal[0],'text',this.showEditStatus ? '编辑':'保存')
                if(this.showEditStatus) { //修改截止日期
                    if(!this.deadline){
                        return
                    }
                    let obj = {
                        choiceId: this.$route.query.choiceId,
                        deadline: new Date(this.deadline).format('yyyy-MM-dd hh:mm:ss')
                    }
                    aplApplyTask.updateDeadline(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
                }
            }
        },
        watch:{
            'userInfo.deadline': function(){
                this.deadline = this.userInfo.deadline ? this.userInfo.deadline.substring(0,10) : ''
            },
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