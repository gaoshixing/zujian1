<style lang="less">
@bg:#f4f7f7;
@darkGreen:#3cb4ae;

.chat-bg-wrap{
	height: 100%;
    background-color: @bg;
    .p-title{
        text-indent: 20px;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
    }
    .task-item{
        margin: 12px 8px;
        .t-date{
            color: #ccc;
        }
        .tan{
            color: #dcc674;
            letter-spacing: 2px;
            font-weight: 600;
        }
        .alink{
            cursor: pointer;
            transition: all 0.1s ease;
            &:hover{
                color: @darkGreen;
            }
        }
    }
    .msg-search{
        height: 100%;
    }
    .task-list-wrap{
        max-height: 500px;
        overflow: auto;
    }
    .search-title{
        border: 1px solid #eee;
        margin: 20px;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(200, 200, 200, 0.1);
        background: #fff;
        .search{
            height: 30px;
            color: #999;
            width: ~"calc(100% - 55px)";
            display: inline-block;
            border: none;
            text-align: center;
        }
        .ivu-icon{
            font-size: 24px;
            line-height: 30px;
            height: 30px;
            float: left;
            margin: 0 0 0 10px;
            cursor: pointer;
            &:hover{
                color: #888;
            }
        }
    }
    .res-list{
        max-height: ~'calc(100% - 100px )';
        overflow: auto;
        .res-list-item{
            margin: 15px 10px;
            overflow: hidden;
            padding: 4px 2px;
            .textmsg{
                word-break: break-all;
                word-wrap: break-word;
            }
            .show-date{
                color: #aaa;
                text-align: center;
                margin-bottom: 10px;
            }
            .from-name{
                display: inline-block;
                max-width: 160px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .grey{
                color: #aaa;
                display: inline-block;
                max-width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .f-user-div{
                height: 20px;
            }
            .icon{
                font-size: 40px;
            }
            .filebox{
                background-color: #fff;
                height: 60px;
                box-shadow: 0 0 3px #ddd;
                float: left;
                padding: 10px;
                box-sizing: border-box;
                width: 100%;
                position: relative;
                max-width: 400px;
                .typeicon{
                    display: block;
                    width: 50px;
                    height: 50px;
                    float: left;
                    position: relative;
                    top: -8px;
                    .iconfont{
                        font-size: 40px;
                        color: @darkGreen;
                    }
                }
                .f-info{
                    padding-left: 45px;
                    height: 50px;
                    position: absolute;
                    font-size: 14px;
                    .f-name{
                        font-size: 14px;
                        max-width: 140px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .fsize{
                        display: inline-block;
                        min-width: 50px;
                        max-width: 100px;
                        overflow: hidden;
                        color: #aaa;
                    }
                    .ftype{
                        display: inline-block;
                        width: 65px;
                        overflow: hidden;
                        color: #aaa;
                        padding-left: 20px;
                        text-transform: uppercase;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .f-meta{
                        margin: 2px 0 0;
                    }
                }
            }
        }
        .norecord{
            text-align: center;
        }
    }
   
    
}
</style>
<template>
    <div class="chat-bg-wrap">
        <div v-if="!history">
            <div class="p-title">本周任务</div>
            <div class="task-list-wrap">
                <div class="task-item" v-for="item in tasks" :key="item.id">
                    <span class="tan" v-if="item.priority=='high'">!!!</span>
                    <span class="tan" v-else-if="item.priority=='middle'">!!</span>
                    <span class="tan" v-else-if="item.priority=='low'">!</span>
                    <span class="alink" @click="gotoTask(item)">{{item.name}}</span>
                    <span class="t-date">({{item.endTime}})</span>
                </div>
            </div>
        </div>
        <div v-else class="msg-search">
            <div class="search-title">
                <Icon type="ios-search-strong" color="#ddd" @click.native="onSearch"></Icon>
                <input class="search" v-model="search.text" type="text" placeholder="输入消息记录" @keypress.enter="onSearch">
            </div>
            <div class="res-list">
                <template v-if="search.res.length">
                    <div class="res-list-item" v-for="item in search.res" :key="item.id">
                        <div class="show-date" v-if="needdate(item)">{{item | msgDate}}</div>
                        <div class="f-user-div">
                            <span class="from-name">{{item.from}}</span>
                            <span class="grey">({{item.title}})</span>
                            <span class="grey">{{(new Date(item.createTime*1000).format('hh:ss'))}}</span>
                        </div>
                        <div class="textmsg" v-if="item.type==config.MSG_TYPE_TEXT" v-html="parse(item.content)">
                        </div>
                        <div v-else-if="item.type==config.MSG_TYPE_NOTICE">
                            <span>{{item.content}}</span>
                        </div>
                        <div class="filebox" v-else-if="item.type==config.MSG_TYPE_SHARE">
                            <div class="typeicon">
                                <i class="iconfont icon-wenjian1"></i>
                            </div>
                            <div class="f-info">
                                <p class="f-name">{{item.content}}</p>
                                <p class="f-meta">
                                    <span class="fsize">{{item.ext2 | byteFormat}}</span>
                                    <span class="ftype">{{item.ext3}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
                <div v-else-if="search.text" class="norecord">
                    <span>无记录</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex';

import valid, { errors, plTask ,other, common, } from '../../../libs/request.js';
import { config ,util } from '../message/connection/socket.js';

let last = {
    d:'',
    m:'',
}

export default {
    props:{
        groupInfo:{
            type:Object,
            required:true
        },
        users:{
            type:Object,
            required:true
        },
        history:{
            type:Boolean,
            required:true,
        }
    },
    data(){
        return {
            tasks:[
            ],
            search:{
                text:'',
                res:[]
            },
            config:config
        };
    },
    computed:{
        ...mapState(['userInfo']),
    },
    created(){
        this.loadTaskList();
    },
    methods:{
        init(){
            this.search.text='';
            this.onSearch();
        },
        loadTaskList(){
            const groupId = this.groupInfo.id;
            if(groupId){
	            common.listUserData({groupId}).then(valid.call(this)).then(res=>{
	                if(res.ok){
	                    this.tasks = res.data.data;
	                }
	            }).catch(errors.call(this));
            }
        },
        onSearch(){
            const data = {
                gid:this.groupInfo.id,
                wd:this.search.text
            }
            other.chatSearch(data).then(res=>{
                if(res.data.code==0){
                    this.search.res = res.data.data.map(item=>this.parseMsg(item));
                    this.resetDay();
                }
            }).catch(errors.call(this));
        },
        resetDay(){
            last.d='';
            last.m='';
        },
        parse(s){
            return util.parse(s)
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
        gotoTask(item){
            this.$router.push({name:'plan.portal.task',params:this.$route.params});
        },
        needdate(item){
            const c = last;
            const date = new Date(item.createTime*1e3);
            const m = date.getMonth();
            const d = date.getDate();
            let b = false;
            if(m!=c.m || d!=c.d){
                b = true;
            }
            c.d = d;
            c.m = m;
            console.info(b);
            return b;
        }
    },
    filters:{
        byteFormat(s){
            return util.byteFormat(s)
        },
        msgDate(item){
            return (new Date(item.createTime*1e3)).format('MM-dd');
        }
    }
}
</script>


