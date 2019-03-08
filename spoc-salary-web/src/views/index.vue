<style lang="less">
.salary_container{
    height: 100%;
	display: flex;
	.s-content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
}
.model-histroy{
    ul,li{
        list-style: none;
    }
    .histroy-lists{
        margin: 0 20px;
    }
    .histroy-item{
        padding-top: 21px;padding-bottom: 22px;
        border-bottom: 1px solid #dcdcdc;
        .time{
			@h: 33px;
            height: @h;line-height: @h;
            color: #333;
            font-size: 16px;
        }
        .detail{
			line-height: 33px;
			color: #333;font-size: 14px;
            span{
                color: #999;
            }
        }
        .author{
            @h: 30px;
            height: @h;line-height: @h;
            font-size: 14px;color: #666;
        }
	}
	.no-history{
		display: block;width: 50%;margin: auto;
	}
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
}
</style>
<template>
    <div class="salary_container">
		<left-menu types="spoc-salary"></left-menu>
		<div class="s-content">
			<nav-title></nav-title>
			<router-view class="main_content" v-if="pId" :pid="pId">
			</router-view>
		</div>
	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';
import valid,{errors,listGrantMenu} from '../libs/request.js';
import leftMenu from "@public/modules/leftMenu";
import navTitle from "@public/modules/navTitle";

let regist = false;
let route ='salary.index';

export default {
    data(){
        return {
			pId: null,
		};
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
    },
    components:{
        leftMenu,
		navTitle,
    },
    created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.SALARY;
		this.getMenuData(this.pId);
		this.$store.commit('updatePid',{pid:this.pId});
    },
    methods:{
		getMenuData(id){
			if(!id){
				debugger;
			}
			listGrantMenu({id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$store.commit('salary/updateMenu',{menu:res.data.data});
					this.ready = true;
				}
			}).catch(errors.call(this));
		},
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
				let menus = this.$store.state.salary.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('salary',{
				namespaced:true,
				state:{
					menus:[
                    ]
				},
				getters:{
					roleId(state,getters,rootState){
						return rootState.userInfo.roleMap?rootState.userInfo.roleMap[_this.pId]:0;
					},
					isSaler(state, getters, rootState){ // 销售顾问
						return getters.roleId==601;
					},
					isDeparmentLeader(state, getters, rootState){ // 销售总监
						return getters.roleId==602;
					},
					isBranchOfficeLeader(state, getters, rootState){ // 分总
						return getters.roleId==603;
					},
					isHeaderOfficeLeader(state, getters, rootState){ // 营销中心总经理
						return getters.roleId==604;
					},
					isAccount(state, getters, rootState){ // 财务
						return getters.roleId==605;
					},
					isLawer(state, getters, rootState){ // 法务
						return getters.roleId==606;
					},
					isCeo(state, getters, rootState){ // 总裁
						return getters.roleId==607;
					},
					isAdmin(state, getters, rootState){ // 超级管理员
						return rootState.userInfo.admin;
					},
				},
				mutations:{
					updateMenu(state,{menu}){
						state.menus = menu;
						_this.$nextTick(_this.autoFocus);
					}
				},
				actions:{
					getMenuData(){
						_this.getMenuData(_this.pId);
					},
				}
			});
		}
    }
}
</script>

