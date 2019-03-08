<style lang="less">
@import "../../../assets/less/config.less";
@url:"../assets/";
@img:"@{url}svg/";


// 左侧导航栏背景颜色
@leftBgColor:@theme-color; 
// 导航栏选中颜色
@navActiveColor:@theme-hover-color;
// 导航栏图标颜色
@navFontColor:#fff;
// 单个导航高度
@navItemHeight:60px;

.aside-menu{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
}

.navImg(@name){
    display: inline-block;
    background-image: url("@{img}/@{name}.svg");
    background-repeat: no-repeat;
    background-size: contain;
}

.main-aside{
    width: 60px;
    height: 100%;
    float: left;
    background-color: @leftBgColor;
    &-inner{
        width: 100%;
        height: 100%;
        .nav{
            height: 100%;
            li{
                position: relative;
                a{
                    display: block;
                    color: @navFontColor;
                    height: @navItemHeight;
                    text-align: center;
                    line-height: 60px;
                    &:hover{
                        background-color: @navActiveColor;

                    }
                    i{
                        width: 26px;
                        height: 26px;
                        vertical-align: middle;
                    }
                    img{
                        width: 26px;
                        height: 26px;
                        vertical-align: middle;
                        display: inline-block;
                    }
                }
                &.nav-logout{
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 60px;
                }
                &.nav-lang-zh,&.nav-lang-en{
                    position: absolute;
                    bottom: 60px;
                    width: 100%;
                    a{
                        height: 40px;
                        line-height: 40px;
                    }
                    &:hover{
                        &:after{
                            display: none;
                        }
                    }
                    i{
                        width: 22px;
                        height: 16px;
                    }
                }
                &:first-child.active:after{
                    border-color: #f2f2f2;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                }
                &.active,&:hover{
                    a{
                        background-color: @navActiveColor;
                        .icon-app{
                            .navImg("app");
                        }
                        .icon-logout{
                            .navImg("logout");
                        }
                        .icon-lang-zh{
                            .navImg("lang-zh");
                        }
                        .icon-lang-en{
                            .navImg("lang-en");
                        }
                    }
                    &:after{
                        content: " ";
                        width: 0;
                        height: 0;
                        display: block;
                        border: 7px solid #f2f2f2;
                        border-left: none;
                        border-top-color: transparent;
                        border-bottom-color: transparent;
                        position: absolute;
                        top: 50%;
                        right: 0;
                        margin-top: -7px;
                    }
                }

            }
            .icon-app{
                .navImg("app");
            }
            .icon-logout{
                .navImg("logout");
            }
            .icon-lang-zh{
                .navImg("lang-zh");
            }
            .icon-lang-en{
                .navImg("lang-en");
            }
        }
    }
}

</style>
<template>
	<div class="aside-menu">
		<div class="main-aside">
		<div class="main-aside-inner">
		<ul class="nav">
			<li v-for="(item,index) in appList" :key="index" :class="{active:currNav.href==item.href,['nav-'+item.icon]:item.buildin}">
				<a href="javascript:void(0)" @click="navClick(item)">
                    <i :class="icon(item)" v-if="item.buildin">
                    </i>
                    <img :src="item.icon" alt="" v-else>
				</a>
			</li>
		</ul>
		</div>

		</div>
	</div>
</template>
<script>
import valid,{errors,sys,} from '../libs/request';
import {mapMutations,mapState} from 'vuex';
import Cookies from 'js-cookie';

export default {
    data(){
        let lang = Cookies.get('lang');
        if(!lang) {
            lang = 'zh';
        }
		return {
            extMenu:[
                {
                    icon:'lang-'+lang,
                    href:'lang',
                    buildin: true,
                },
                {
                    icon:'logout',
                    href:'logout',
                    buildin: true
                }
            ],
            portal:[
                {
                    icon:'app',
                    href:'portal.app',
                    buildin: true,
                }
            ],
		};
    },
    computed:{
        ...mapState(['asideApp']),
        appList(){
            let data = this.portal.concat(this.asideApp);
            return data.concat(this.extMenu);
        },
        currNav(){
            var curr;
            for(let i in this.appList){
                let item = this.appList[i];
                if(item.href==this.$route.name){
                    curr = item;
                    break;
                }
            }
            if(!curr){
                for(let i in this.appList){
                let item = this.appList[i];
                    if(item.routes && item.routes.indexOf(this.$route.name) > -1){
                        curr = item;
                        break;
                    }
                }
            }
            curr = curr?curr:{};
            this.updateCurrentAside({currentAsideApp:curr});
            return curr;
        }
    },
    created(){
    },
    methods:{
        ...mapMutations(['updateLoadingStatus','updateCurrentAside']),
        logout(){
            if(this.$root.onLogout){
                this.$root.onLogout();
            }
            this.$store.dispatch('portal/autoLogout');
        },
        langSet(lang){
            Cookies.set('lang',lang,{ expires: 180 });
            location.reload();
        },
        icon(item){
            return `icon-${item.icon}`;
        },
        navClick(item){
            if(item.icon=='logout'){
                return this.logout();
            }
            if(item.icon.indexOf('lang-')>=0){
                return this.langSet(item.icon.replace('lang-','')=='zh'?'en':'zh');
            }
            if(item.href && this.$route.name != item.href) {
                this.$router.push({name:item.href});
            }
        },
    }
}
</script>


