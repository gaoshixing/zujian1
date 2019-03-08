<template>
    <div class="menuFrame">
        <div class="menuList">
            <div :class="['menuChildNode',{active:currentNav.href==item.href}]" v-for="item in menuList" :key="item.id" @click="onMenuListClick(item)">
                <i class="icon">
                    <img v-if="item.icon" :src="item.icon" class="icon-img" :style="{backgroundColor:item.colour}">
                </i>
                <span class="name" v-text="i18N(item)"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import {mapMutations,mapState} from 'vuex';
    import { MENUIDS, } from '@public/libs/config';
    const route = 'choiceschool.index';

    export default {
        //roleId 1:系统管理员 4：销售  5：分配员 6：中方教师 7：中方组长  8：美方教师  9：美方组长
        data(){
            return {
                ready:false,
                currentMenu:{},
                menuList: [],
                pId: null,
            }
        },
        computed:{
            ...mapState(['userInfo','appMenuList']),
            currentNav(){
                if(this.currentMenu.href){
                    return this.currentMenu;
                }
                return {href:this.$route.name};
            },
        },
        created(){
            this.pId = MENUIDS.CHOICESCHOOL;
            this.getMenuData(this.pId);
    		this.$store.commit('updatePid',{pid:this.pId});
        },
        methods: {
            getMenuData(id){
                util.ajax.get(nozzle.basicData.getMenu,{params:{id}}).then(res=>{
                    util.checkAjaxJson(res).thenSuccess(json=>{
                        this.menuList=json.data;
                        this.ready = true;
                        this.$nextTick(this.autoFocus);
                    });
                }).catch(()=>{});
            },
            autoFocus(){
                if(this.$route.name == route) { //未指定具体菜单
                    let menu = this.menuList;
                    if(menu[0]){
                        this.onMenuListClick(menu[0]);
                    }
                }
            },
            onMenuListClick(item){
                this.$router.push({name:item.href});
                this.currentMenu = item;
            },
            i18N(item){
                let text = this.$t(item.target);
                return text?text:item.name;
            }
        }
    }
</script>
<style scoped lang="less">
.menuFrame{
    .menuList{
        .menuChildNode{
            height: 46px;
            line-height: 46px;
            cursor: pointer;
            overflow: hidden;
            &:hover,
            &.active {
                background-color: #fff;
            }
            .icon {
                display: block;
                float: left;
                width: 50px;
                height: 46px;
                padding-left: 15px;
                &-img {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                    padding: 3px;
                }
            }
            .name {
                display: block;
                float: left;
                font-size: 12px;
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>