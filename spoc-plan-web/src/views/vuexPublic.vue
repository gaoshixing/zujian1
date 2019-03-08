<style>
</style>

<template>
</template>

<script>
export default {
    methods:{
		registerModule(){
			let _this = this;
			this.$store.registerModule('plan',{
				namespaced:true,
				state:{
					menus:[
					],
					pid:0,
					leftclosed:false, // left panel status
				},
				getters:{
					tagId() { // 任务标签列表id
						return '4001';
					},
					pid(){
						return _this.pId;
					},
					roleId(state,getters,rootState){
						return rootState.userInfo.roleMap?rootState.userInfo.roleMap[_this.pId]!=undefined?rootState.userInfo.roleMap[_this.pId]:rootState.userInfo.roleMap[0]:0;
					},
					isSaler(state, getters, rootState){ // 销售顾问
						return getters.roleId==703;
					},
					isBranchOfficeLeader(state, getters, rootState){ // 分总
						return getters.roleId==702;
					},
					isPlanLeaser(state, getters, rootState){ // 规划主管
						return getters.roleId==704;
					},
					isPlanConsultant(state, getters, rootState){ // 规划顾问
						return getters.roleId==705;
					},
					isEssayLeaser(state, getters, rootState){ // 文书主管
						return getters.roleId==706;
					},
					isApplyLeaser(state, getters, rootState){ // 流程主管
						return getters.roleId==707;
					},
					isCeo(state, getters, rootState){ // 总裁 
						return getters.roleId==701;
					},
					isAdmin(state, getters, rootState){ // 超级管理员
						return rootState.userInfo.admin;
					},	
					isServer(state, getters, rootState){ // 后期
						return getters.roleId==12;
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
		}
    }
}
</script>