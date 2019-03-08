<style lang="less">
.plan-chat-page{
	display: flex;
	flex: 1;
    margin: 20px auto 0;
    box-shadow: 0 0 20px rgba(100, 100, 100, 0.4);
    position: relative;
    .chat-left-m{
        float: left;
    }
    &.fullwidth{
        .chat-left-m{
            width: 100%;
        }
        .chat-toggle-close{
            right: 0;
        }
    }
    .chat-right-d{
        float: right;
        height: 100%;
        /*height: ~"calc(100vh - 120px)";*/
        width:~'26%';
    }
    .chat-toggle-close{
        width: 10px;
        height: 20px;
        position: absolute;
        right: ~'26%';
        top: 10px;
        border-radius: 3px 0 0 3px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
    }
}
</style>
<template>
    <div class="plan-chat-page clearfix" :class="{fullwidth:closed}">
        <div class="chat-toggle-close" :style="bg" @click="doAction" v-if="group.id">
            <div>
                <Icon type="chevron-left" color="#fff" v-if="closed"></Icon>
                <Icon type="chevron-right" color="#fff" v-else></Icon>
            </div>
        </div>
        <chat class="chat-left-m"  v-if="group.id" :group="group" :groupInfo="groupInfo" :users="users" :pid="pid" @on-history="onHistory" @on-read="onRead" @on-other-msg="onOtherMsg" ></chat>
        <rightpane ref="rp" class="chat-right-d" v-show="!closed"  v-if="group.id" :group-info="group" :users="users" :history="history"></rightpane>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex';

import chat from './chat';
import rightpane from './rightpane.vue';
import valid,{ errors,  common, } from '../../../libs/request.js';
export default {
    props:{
        groupInfo:{
            type:Object,
            required:true,
        },
        pid:{
            type:[String,Number],
            required:true
        },
        readMap:{
            type:Object,
            required:true,
        }
    },
    data(){
        return {
            group:{
               id:0,
               members:[]
            },
            closed:false,
            history:false,
        };
    },
    computed:{
        bg(){
            return {
                backgroundColor:this.closed?'#c5c5c5':'#44bcb7'
            }
        },
        users(){ // group users map
            let users={};
            this.group.members.forEach(item=>{
                users[item.userId]=item;
            });
            return users;
        },

    },
    components:{
        chat,
        rightpane,
    },
    created(){
    	this.$nextTick(()=>{
    		setTimeout(()=>{
		        const serviceGroupId = this.$route.params.gid;
		        if(serviceGroupId){
			        common.listUser({serviceGroupId}).then(valid.call(this)).then(res=>{
			            if(res.ok){
			                this.group = res.data.data;
			            }
			        }).catch(errors.call(this));
		        }
    		},500);
    	})
    },
    methods:{
        doAction(){
            this.closed = !this.closed;
        },
        onHistory(){
            this.history=!this.history;
            if(this.history){
                setTimeout(()=>{
                    this.$refs.rp.init();
                },0);
            }
        },
        onRead(){
            const gid = this.groupInfo.id;
            if(this.readMap[gid]){
                this.$emit('fresh-unread');
            }
        },
        onOtherMsg(data){
            this.$emit('on-other-msg',data);
        }
    }
}
</script>


