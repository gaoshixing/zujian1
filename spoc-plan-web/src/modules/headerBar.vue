<style lang="less">
@green:#68e2c6;
@darkGreen:#3cb4ae;

.my-header-bar{
    /*height: 80px;*/
    .nav-info{
        font-size: 14px;
        /*padding-left: 15px;
        padding-top: 12px;*/
    }
    .nav-main-sec{
        border-bottom: 1px solid #ddd;
        .nav-item{
            padding: 0 20px;
            display: inline-block;
            font-size: 14px;
            box-sizing: border-box;
            height: 45px;
            line-height: 45px;
            position: relative;
            bottom: -1px;
            margin: 0 10px;
            &.active,&:hover{
                cursor: pointer;
                color: @darkGreen;
                border-bottom: 2px solid @darkGreen;
            }
            &.more{
                font-size: 20px;
                color: #999;
                border-bottom: none;
                position: relative;
                bottom: -4px;
                &:hover{
                    color: #000;
                }
            }
        }

    }
}
</style>
<template>
    <div class="my-header-bar">
        <div class="nav-info">
            <!--<span v-if="!$route.params.gid">个人工作台</span>-->
    		<service-info workbench :pid="$route.params.gid" v-if="$route.params.gid && $route.query.showHead!==false&&groupInfo.studentId"></service-info>
        </div>
        <div class="nav-main-sec" v-if="$route.query.showHead!==false && $route.params.gid">
            <div class="nav-item" :class="{active:$route.name==item.href,more:item.cls}" v-for="(item,index) in navs" :key="index" @click="navClick(item)">
                <Icon :type="item.cls" v-if="item.cls"></Icon>
                <template v-else>{{item.name}}</template>
            </div>
        </div>
    </div>
</template>
<script>
	import serviceInfo from "../views/serviceInfo/serviceInfo.vue"
const base = [
    {
        name:'消息',
        href:'plan.portal.msg',
    },
    {
        name:'任务',
        href:'plan.portal.task',
    },
    {
        name:'文件',
        href:'plan.portal.file',
    },
    {
        name:'日历',
        href:'plan.portal.todolList',
    },
];
export default {
	props:{
		groupInfo:{
			type:Object
		}
	},
    data(){
        return {
            more:true,
        }
    },
    computed:{
        navs(){
            if(this.more){
                return [
                    ...base,
                    {
                        name:'更多',
                        cls:'ios-arrow-forward',
                        more:false,
                    }
                ];
            }
            return [
                ...base,
                {
                    name:'甘特图',
                    href:'plan.portal.gantt',
                },
                {
                    name:'人员',
                    href:'plan.portal.crew',
                },
                {
                    name:'记事本',
                    href:'plan.portal.notepad',
                },
                {
                    name:'总览',
                    href:'plan.portal.pandect',
                },
                {
                    name:'收起',
                    cls:'ios-arrow-back',
                    more:true
                }
            ];
        }
    },
    components:{
    	serviceInfo
    },
    methods:{
        navClick(item){
            if(item.href){
                this.$router.push({name:item.href,params:this.$route.params});
            }
            if(item.more===true || item.more===false){
                this.more = item.more;
            }
        }
    }
}
</script>


