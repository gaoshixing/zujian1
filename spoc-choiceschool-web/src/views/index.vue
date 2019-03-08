<template>
    <div class="webMainContent" :class="{closed:closed}">
        <div class="nav-toggle-wrap">
            <div class="webMainMenu nav-toggle">
                <userinfo :info="userInfo"></userinfo>
                <sidemenu>
                </sidemenu>
            </div>
            <slide-toggle @status-change="onCloseChange"></slide-toggle>
        </div>
        <div class="webMainBody">
            <router-view  :pid="pid"></router-view>
        </div>
    </div>
</template>
<script>
import userinfo from '@/common/userBanner';
import slideToggle from '@/common/slideToggle';
import sidemenu from "../modules/breadcrumb/sideMenu.vue";
import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';

export default {
    data() {
        return {
            closed:false
        }
    },
    components: {
      sidemenu,
      userinfo,
      slideToggle
    },
    methods: {
        onCloseChange(s){
            this.closed=s;
        }
    },
    created(){
		this.pid = MENUIDS.CHOICESCHOOL;
    },
    computed:{
        ...mapState(['userInfo'])
    }
}
</script>
<style lang="less" scoped>
@primary-color: #44bcb7; //自建变量
@theme-color: #44bcb7;
@theme-hover-color: #36a29e; //iview覆盖样式

.webMainContent {
	display: flex;
    height: 100%;
    .nav-toggle-wrap{
        height: 100%;
	    position: relative;
    }
    .webMainMenu {
        width: 230px;
        height: 100%;
        background-color: #f2f2f2;
        overflow-y: auto;
    }
    .webMainBody {
        flex: 1;
		overflow-y: auto;
        padding: 0 15px 50px;
    }
}
</style>
<style lang="less">
.contentBox{
    .ivu-icon-search{
        color: #999;
        cursor: pointer;
        &:hover{
            color: #333;
        }
    }
}
</style>