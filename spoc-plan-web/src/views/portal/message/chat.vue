<style lang="less">
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.chat-wrapper{
    padding: 0;
    width: 74%;
    height: 100%;
    /*height: ~"calc(100vh - 120px)";*/
    .frame-wrapper{
		height: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>

<template>
    <div class="chat-wrapper" :rel="'_'+pid">
        <div class="frame-wrapper">
            <msglist :user-info="userInfo" :group-info="groupInfo" ref="msglist"></msglist>
            <sendbox @onsend="onSend" :group="group" @on-history="$emit('on-history');"></sendbox>
        </div>
    </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';

import conn, { config } from './connection/socket.js';

import msglist from './template/msglist.vue';
import sendbox from './template/sendbox.vue';
import './iconfont.js';
import { waitUntil } from '../../../libs/util.js';
import valid,{ errors , sys } from '../../../libs/request.js'

let ws,opts={onopen:()=>{},onmessage:()=>{}};

export default {
    props:{
        groupInfo:{
            type:Object,
            required:true,
        },
        group:{
            type:Object,
            required:true,
        },
        users:{
            type:Object,
            required:true
        },
        pid:{
            type:[String,Number],
            required:true
        }
    },
    data(){
        return {
            isread:false,
            ws:'',
            timer:0,
        };
    },
    computed:{
        ...mapState(['userInfo']),
        login(){
            return {
                act:'init',
                username:this.userInfo.id,
                password:this.userInfo.password
            }
        },
        
    },
    components:{
        msglist,
        sendbox
    },
    mounted(){
        waitUntil(()=>{
            if(this.login.username){
                return true
            }
        },this.start,()=>{
            console.warn('timeout');
        },1000);
    },
    beforeDestory(){
        clearInterval(this.timer);
    },
    methods:{
        start(){
            const self = this;
            let options = {
                onopen(e){
                    ws.send(self.login);
                    self.startTimer();
                },
                onmessage(data){
                    if(data.act){
                        if(typeof self[data.act]=='function'){
                            self[data.act](data);
                        } else{
                            console.warn('act not found',data.act);
                        }
                    } else {
                        console.warn('error param act missing');
                    }
                }
            }
            if(ws){
                this.ws=ws;
                opts.onopen = options.onopen;
                opts.onmessage = options.onmessage;
                this.getHistory(0);
            } else {
                opts.onopen = options.onopen;
                opts.onmessage = options.onmessage;
                ws=new conn(config.url,opts)
                this.ws=ws;
            }
            this.$root.onLogout=()=>{
                ws = null;
            }
        },
        // event
        init(data){ // 登录返回
            if(data.code===0){
                this.getHistory(0);
            }else{
                console.warn('login failed');
            }
        },
        say(data){ // 有群组消息到达
            if(data.to==this.group.id){ // 是发送到当前组才显示到页面。
                const parsedData = this.parseMsg(data);
                this.$refs.msglist.newMsg(parsedData);
            } else { // 否则提交上级，未读数+1
                this.$emit('on-other-msg',data);
            }
        },
        pong(){ // no action , but need

        },
        history(res){
            if(!this.isread){
                this.doRead();
                this.isread = true;
            }
            res.data.forEach(item=>{
                item = this.parseMsg(item);
            });
            this.$refs.msglist&&this.$refs.msglist.appendHistory(res.data);
        },
        read(){
            this.$emit('on-read');
        },
        del(data){
            if(data.to==this.group.id){
                this.$refs.msglist.delOneById(data.data);
            } else {
                this.$emit('on-read'); // 尝试更新一下未读数
            }
        },
        // event end

        startTimer(){
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.ws.send({act:'ping'})
            },1000*60)
        },
        onSend(data){
            const payload={...data,act:'say',to:this.group.id};
            if(!payload.content){
                return this.$Message.error("不能发送空消息");
            }
            this.ws.send(payload);
        },
        getHistory(fid){
            this.ws.send({act:'history',gid:this.group.id,fid});
        },
        parseMsg(item){
            const info = this.users[item.from];
            if(info){
                const data = Object.assign(item,{title:info.roleName,uid:item.from,from:info.name});
                data.me = data.uid == this.userInfo.id;
                return data;
            } else {
                console.warn('not exits user',item);
                return item;
            }
        },
        doRead(){
            this.ws.send({act:'read',gid:this.group.id});
        },
        toDel(item){
            let params = {
                'fileId': item.ext1
            }
            sys.delete(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.ws.send({act:'del',gid:this.group.id,id:item.id});
                }
            }).catch(errors.call(this));
        }

    }
}
</script>
