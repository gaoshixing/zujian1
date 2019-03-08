<style lang="less">
.core_container {
	display: flex;
	height: 100%;
	.mainLeft{
		width: 230px;
		height: 100%;
		background-color: #f2f2f2;
	}
	.nav-toggle-wrap{
		height: 100%;
		position: relative;
	}
	.mainBody{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
	// 重写本模块iview部分样式

	.ivu-table-wrapper{
		margin-top: 5px;
		border: none;
		.ivu-table{
			th{
				background-color: #fff;
			}
			&:after{
				display: none;
			}
		}
	}

}
</style>
<template>
	<div class="core_container">
		<div class="nav-toggle-wrap">
			<div class="mainLeft nav-toggle">
				<left-menu v-if="isOrg" :tab="nav" ref="org"></left-menu>
				<left-remenu v-else ref="res"></left-remenu>
			</div>
			<slide-toggle></slide-toggle>
		</div>
		<div class="mainBody">
			<router-view @update="needUpdate"></router-view>
		</div>
	</div>
	
</template>
<script>
import { MENUIDS, } from '@public/libs/config';
import slideToggle from '@/common/slideToggle';
import leftMenu from "../modules/leftMenu";
import leftRemenu from "../modules/leftRemenu";
import {getKValue,arrInclude} from '../libs/util.js';
import { mapState } from 'vuex';
import valid , { errors, menuRights,sys,listGrantMenu } from '../libs/request.js';

const defnav='core.organization';
let regist = false;
let navMap = {
	[defnav]:1,
	'core.job':2,
	'core.grade':3
};


let hasPermissions = (g,r)=>{
	if (r&&g) {
		return arrInclude(g,r.split(','));
	}
	return false;
};

export default {
	data(){
		return {
			pId: null,
		};
	},
	components:{
		leftMenu,
		leftRemenu,
		slideToggle
	},
	computed:{
		...mapState(['userInfo','appMenuList']),
		isOrg(){
			if(this.$route && Object.keys(navMap).indexOf(this.$route.name)>-1){
				return true;
			}
		},
		nav(){
			return navMap[this.$route.name];
		},
	},
	created() {
		this.loadMenuRights();
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.CORE;
		this.$store.dispatch('core/getMenuData');
		this.$store.commit('updatePid',{pid:this.pId});
	},
	methods:{
		needUpdate(type,payload){
			if(this.$refs[type]){
				this.$refs[type].update(payload);
			}
		},
		loadMenuRights(){
			menuRights().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$store.commit('core/updateRights',{rights:res.data.data});
				}
			}).catch(errors.call(this));
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('core',{
				namespaced:true,
				state:{
					rights:{},
					menus:[]
				},
				getters:{
					org_edit(state, getters, rootState){
						if(rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(state.rights,'core.organization','core.organization','edit');
						return hasPermissions(rootState.userInfo.permissions,r);
					},
					job_edit(state, getters, rootState){
						if(rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(state.rights,'core.organization','core.job','edit');
						return hasPermissions(rootState.userInfo.permissions,r);
					},
					grade_edit(state, getters, rootState){
						if(rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(state.rights,'core.organization','core.grade','edit');
						return hasPermissions(rootState.userInfo.permissions,r);
					},
					resource_edit(state, getters, rootState){
						if(rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(state.rights,'core.organization','core.resource','edit');
						return rootState.userInfo.permissions && rootState.userInfo.permissions.indexOf(r)>-1;
					},
					role_edit(state, getters, rootState){
						if(rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(state.rights,'core.organization','core.role','edit');
						return hasPermissions(rootState.userInfo.permissions,r);
					}
				},
				mutations:{
					updateRights(state,payload){
						state.rights = payload.rights;
					},
					updateMenu(state,{menu}){
						state.menus = menu;
					}
				},
				actions:{
					getMenuData(){
						const params = {id:_this.pId};
						listGrantMenu(params).then(valid.call(_this)).then(res=>{
							this.commit('core/updateMenu',{menu:res.data.data});
							_this.ready = true;
						}).catch(errors.call(_this));
					},
				}
			});
		}
	}
}
</script>