<style lang="less">
.plan-send-notice-m{
    .f1,.f2,.f3{
        width: 28%;
        float: left;
        box-sizing: border-box;
        padding-right: 20px;
        line-height: 36px;
        min-height: 36px;
    }
    .f4{
        width: 16%;
        float: left;
        line-height: 36px;
        min-height: 36px;
    }
    .n-text{
        margin: 10px 0;
    }
    .row{
        margin: 10px 0;
        &.black{
            font-weight: 500;
        }
    }
    .main-scroll{
        max-height: 50vh;
        overflow: auto;
    }

}
</style>
<template>
    <div>
        <Modal v-model="isvisible" @on-visible-change="onVChange" class-name="plan-send-notice-m" title="发送通知" width="730px">
            <div>
                <div class="n-text">通知内容：{{data.content}}</div>
                <div class="main-scroll">
                    <div class="row clearfix black">
                        <div class="f1">通知人</div>
                        <div class="f2">通知方式</div>
                        <div class="f3">接收手机号</div>
                        <div class="f4"></div>
                    </div>
                    <div class="row clearfix">
                        <div class="f1">
                            <Select v-model="sendList.choose">
                                <Option v-for="item in usersList" :value="item.phone" :key="item.phone">{{item.name}}</Option>
                            </Select>
                        </div>
                        <div class="f2">
                            <Select v-model="sendList.type" disabled>
                                <Option v-for="item in sendTypes" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </div>
                        <div class="f3" v-text="sendList.choose"></div>
                        <div class="f4">
                            <a @click="doSure">[确认]</a>
                        </div>
                    </div>
                    <div class="row clearfix" v-for="(item,index) in sendList.list" :key="'l'+index">
                        <div class="f1" v-text="item.remarks">
                        </div>
                        <div class="f2">
                            <Select v-model="sendList.type" disabled>
                                <Option v-for="item in sendTypes" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </div>
                        <div class="f3" v-text="item.phone"></div>
                        <div class="f4">
                            <template v-if="item.status=='0'">
                                <a @click="doRemove(item)">[删除]</a>
                            </template>
                        </div>
                    </div>
                </div>
                
            </div>
            <div slot="footer">
                <Button type="ghost" size="large" @click="doCancel">取消</Button>
                <Button type="ghost" size="large" @click="doPreview">预览</Button>
                <Button type="primary" size="large" @click="doSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import valid, { errors , common } from '../../../../libs/request.js'
import { httpChooseSchool } from '@public/libs/request.js'


export default {
    props:{
        data:{
            type:Object,
            required:true
        },
        groupInfo:{
            type:Object,
            required:true
        },
    },
    data(){
        return {
            usersList:[],
            sendList:{
                choose:'',
                type:0,
                list:[],
            },
            sendTypes:[
                {
                    id:0,
                    name:'手机短信'
                }
            ],
            isvisible:true
        };
    },
    computed:{
       notifyId(){
           return this.data.ext1;
       }
    },
    created(){
        if(this.notifyId){
            this.getUser(this.groupInfo.studentId,this.notifyId)
            this.showList(this.notifyId);
        }else{
            console.warn('no notifyId');
        }
    },
    methods:{
        getUser(studentId,notifyId){
            const params={
                studentId,
                notifyId,
            };
            httpChooseSchool.get('/xxStudent/phoneData',{params}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.usersList = res.data.data;
                }
            }).catch(errors.call(this));
        },

        showList(notifyId){
            common.listComPhoneSender(notifyId).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.sendList.list = res.data.data;
                }
            }).catch(errors.call(this));
        },
      
        doPreview(){
            common.notificationPreview(this.notifyId).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.$Modal.info({
                        title: '预览',
                        content: res.data.data.content
                    });
                }
            }).catch(errors.call(this));
        },
        doSave(){
            common.phoneSender(this.sendList.list).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.doCancel();
                }
            }).catch(errors.call(this));
        },
        doCancel(){
            this.isvisible = false;
            setTimeout(()=>{
                this.$parent.destoryPop();
            },300);
        },
        doSure(){
            const item = this.usersList.find(item=>item.phone==this.sendList.choose);
            if(item){
                const has = this.sendList.list.find(it=>it.phone==item.phone);
                if(!has){
                    const i = {
                        remarks:item.name,
                        phone:item.phone,
                        status:'0',
                        method:'phone',
                        objectId:this.notifyId
                    };
                    this.sendList.list.push(i);
                }else{
                    this.$Message.error("已存在列表中");
                }
            }
        },
        doRemove(item){
            const index = this.sendList.list.findIndex(it=>it.phone==item.phone);
            if(index>-1){
                this.sendList.list.splice(index,1);
            }
        },
        onVChange(v){
            if(!v){
                this.doCancel();
            }
        }

    }
}
</script>


