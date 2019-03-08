<style lang="less">
.msglist-wrapper{
    padding: 30px 0 0 0;
    overflow-y: auto;
    flex: 1;
    .load-more{
        text-align: center;
        color: #aaa;
        font-size: 14px;
        padding: 10px 0;
        margin: 5px 0;
    }
    .my-scroller{
    	height: 100%;
        /*height: ~"calc(100vh - 290px)";*/
        .ivu-scroll-container{
            height: 100%;
        }
        .show-time{
            text-align: center;
            color: #aaa;
        }
    }
}
</style>
<template>
  <div class="msglist-wrapper">
        <Scroll :on-reach-top="handleReachTop" height="calc(100vh - 290px)" class="my-scroller">
            <div class="load-more" v-if="msg.length">滚动加载更多...</div>
            <div class="msg-list-container">
                <template v-for="item in msg">
                    <div class="show-time" :key="'time'+item.id" v-if="needtime(item)">{{item.createTime | showTime}}</div>
                    <msgitem :data="item" :key="item.id" :user-info="userInfo" @showsend="showSend" ></msgitem>
                </template>
            </div>
        </Scroll>
        <send-pop ref="sendpop" :data="sendpop.data" :group-info="groupInfo" v-if="sendpop.visible" />
        <imgviewer :src="imgsrc" ref="imgviewer"/>
  </div>
</template>
<script>

let last = 0;
let count = 0;
import { sys } from '@public/libs/request.js'
import msgitem from './msgitem.vue';
import sendPop from './sendPop.vue';
import { config } from '../connection/socket.js';
import imgviewer from '../../../../modules/imgviewer'
export default {
    props:{
        groupInfo:{
            type:Object,
            required:true
        },
        userInfo:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
            warpper:null,
            msg:[],
            sendpop:{
                data:{},
                visible:false
            },
            imgsrc:''
        }
    },
    components:{
        msgitem,
        sendPop,
        imgviewer
    },
    created(){
        last=0;
        count=0;
    },
    mounted(){
        this.warpper = this.$el.querySelector('.my-scroller .ivu-scroll-container');
    },
    methods:{
        url(name,path){
            return sys.downloadPan(path,name);
        },
        showImg(url){
            if(url){
                this.imgsrc = url;
            }
            this.$refs.imgviewer.show();
        },
        newMsg(data){
            this.msg.push(data);
            this.goBottom();
        },
        appendHistory(data){ // history msg
            const first = this.msg.length;
            this.msg.unshift(...data);
            if(first===0){
                this.goBottom();
            }
        },
        goBottom(){
            this.$nextTick(()=>{
                this.warpper.scrollTop=this.warpper.scrollHeight;
            });
        },
        handleReachTop(){
            return new Promise((resolve,reject)=>{
                const top = this.msg[0];
                setTimeout(()=>{
                    this.$parent.getHistory(top.id);
                    resolve();
                },1000);
            });
        },
        showSend(data){
            this.sendpop.data = data;
            this.sendpop.visible = true;
        },
        destoryPop(){
            this.sendpop.visible = false;
        },
        needtime(item){
            return false;
			let b = false;
			const t = item.createTime;
			if(t-last>300){
				b = true;
				count=0;
			} else {
				count++;
				if(count>5){
					b=true;
					count=0;
				}
			}
			last = t;
			return b;
        },
        delOneById(id){
            const index = this.msg.findIndex(item=>item.id==id);
            this.msg.splice(index,1);
        }
    },
    filters:{
        showTime(s){
			return (new Date(s*1e3)).format('MM-dd hh:mm')
		}
    }
}
</script>


