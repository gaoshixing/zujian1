<style lang="less">
.plan_container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
}
</style>
<template>
    <div class="plan_container">
		<left-menu @status-change="statusChange" types="spoc-plan"></left-menu>
		<div class="content">
			<nav-title v-if="$route.path!='/serviceInfo' && $route.query.parent!='group' "></nav-title>
			
			<router-view class="main_content" v-if="pId" :pid="pId">
			</router-view>
		</div>
	</div>
</template>
<script>
import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';
import valid,{errors,sys} from '../libs/request.js';
import leftMenu from "@public/modules/leftMenu";
import navTitle from "@public/modules/navTitle";
import vuexPublic from './vuexPublic.vue';
let regist = false;
let route ='plan.index';
export default {
    mixins:[vuexPublic],
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
        navTitle
    },
    created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.PLAN;
		this.getMenuData(this.pId);
		this.$store.commit('updatePid',{pid:this.pId});
    },
    methods:{
		getMenuData(id){
			if(!id){
				debugger;
			}
			sys.listGrantMenu({id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$store.commit('plan/updateMenu',{menu:res.data.data});
					this.ready = true;
				}
			}).catch(errors.call(this));
		},
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
				let menus = this.$store.state.plan.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
		},
//		registerModule(){
//			let _this = this;
//			this.$store.registerModule('plan',{
//				namespaced:true,
//				state:{
//					menus:[
//					],
//					pid:0,
//					leftclosed:false, // left panel status
//				},
//				getters:{
//					tagId() { // 任务标签列表id
//						return '4001';
//					},
//					pid(){
//						return _this.pId;
//					},
//					roleId(state,getters,rootState){
//						return rootState.userInfo.roleMap?rootState.userInfo.roleMap[_this.pId]:0;
//					},
//					isSaler(state, getters, rootState){ // 销售顾问
//						return getters.roleId==703;
//					},
//					isBranchOfficeLeader(state, getters, rootState){ // 分总
//						return getters.roleId==702;
//					},
//					isPlanLeaser(state, getters, rootState){ // 规划主管
//						return getters.roleId==704;
//					},
//					isPlanConsultant(state, getters, rootState){ // 规划顾问
//						return getters.roleId==705;
//					},
//					isEssayLeaser(state, getters, rootState){ // 文书主管
//						return getters.roleId==706;
//					},
//					isApplyLeaser(state, getters, rootState){ // 流程主管
//						return getters.roleId==707;
//					},
//					isCeo(state, getters, rootState){ // 总裁 
//						return getters.roleId==701;
//					},
//					isAdmin(state, getters, rootState){ // 超级管理员
//						return rootState.userInfo.admin;
//					},
//				},
//				mutations:{
//					updateMenu(state,{menu}){
//						state.menus = menu;
//						_this.$nextTick(_this.autoFocus);
//					},
//					updateCloseStatus(state,{status}){
//						state.leftclosed = status;
//					},
//				},
//				actions:{
//					getMenuData(){
//						_this.getMenuData(_this.pId);
//					},
//				}
//			});
//		},
		statusChange(status){
			console.log(status)
			this.$store.commit('plan/updateCloseStatus',{status});
		}
    }
}
</script>