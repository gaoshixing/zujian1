<style lang="less">
.crm_container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
}
li{
	list-style: none;
}
</style>
<template>
    <div class="crm_container">
		<left-menu types="spoc-crm" :scroll="true" @status-change="statusChange"></left-menu>
		<div class="content" :class="{leftclosed:$store.state.crm.leftclosed}">
			<nav-title></nav-title>
			<router-view ref="crm" class="main_content" :pid="pid" ></router-view>
		</div>
	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';
import valid,{errors,sys} from '../libs/request.js';
import leftMenu from "@public/modules/leftMenu";
import navTitle from "@public/modules/navTitle";

let regist = false;
let route ='crm.index';

export default {
    data(){
        return {
			pid:null,
		};
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
    },
    components:{
        leftMenu,
        navTitle
    },
    created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pid = MENUIDS.CRM;
		this.getMenuData(this.pid);
		this.$store.commit('updatePid',{pid:this.pid});
    },
    methods:{
		getMenuData(id){
			sys.listGrantMenu({id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$store.commit('crm/updateMenu',{menu:res.data.data});
					this.ready = true;
				}
			}).catch(errors.call(this));
		},
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
				let menus = this.$store.state.crm.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('crm',{
				namespaced:true,
				state:{
					menus:[
					],
					pid:0,
					leftclosed:false, // left panel status
				},
				getters:{
					pid(){
						return _this.pid;
					},
					roleId(state,getters,rootState){
						if(rootState.userInfo.roleMap){
							return rootState.userInfo.roleMap[_this.pid];
						}
					},
					isAdmin(state, getters, rootState){ // 超级管理员
						return rootState.userInfo.admin;
					},
					isCustomer(state, getters, rootState){ // 客服
						return getters.roleId==901;
					},
					isWorker(state, getters, rootState){ // 分单员
						return getters.roleId==902;
					},
					signHead(state, getters, rootState){ // 分单主管
						return getters.roleId==913;
					},
					singleManager(state, getters, rootState){ // 分单经理
						return getters.roleId==923;
					},
					isSaler(state, getters, rootState){ // 销售顾问
						return getters.roleId==903;
					},
					isSupervisor(state, getters, rootState){ // 开博督导(销总)
						return getters.roleId==917;
					},
					isTMK(state, getters, rootState){ // TMK
						return getters.roleId==904;
					},
					isMarket(state, getters, rootState){ // 市场人员
						return getters.roleId==905;
					},
					isCustomerLeader(state, getters, rootState){ // 客服主管
						return getters.roleId==906;
					},
					isSalerLeader(state, getters, rootState){ // 销售总监
						return getters.roleId==907;
					},
					isTMKLeader(state, getters, rootState){ // TMK主管
						return getters.roleId==908;
					},
					isMarketLeader(state, getters, rootState){ // 市场主管
						return getters.roleId==909;
					},
					isBranchOfficeLeader(state, getters, rootState){ // 分总
						return getters.roleId==910;
					},
					isHeaderOfficeLeader(state, getters, rootState){ // 营销中心Leader
						return getters.roleId==911;
					},
					isHeaderOffice(state, getters, rootState){ // 营销中心
						return getters.roleId==916;
					},
					isCeo(state, getters, rootState){ // 总裁CEO
						return getters.roleId==912;
					},
					isNew(state, getters, rootState){ // 新角色
						return getters.roleId==921;
					},
				},
				mutations:{
					updateMenu(state,{menu}){
						state.menus = menu;
						_this.$nextTick(_this.autoFocus);
					},
					updateCloseStatus(state,{status}){
						state.leftclosed = status;
					},
				},
				actions:{
					getMenuData(){
						_this.getMenuData(_this.pId);
					},
				}
			});
		},
		statusChange(status){
			this.$store.commit('crm/updateCloseStatus',{status});
		}
    }
}
</script>

