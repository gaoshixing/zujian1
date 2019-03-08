<style lang="less">
.apply_container{
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
    <div class="apply_container">
		<left-menu types="spoc-apply"></left-menu>
		<div class="content">
			<nav-title></nav-title>
			
			<router-view class="main_content" :pId="pId" v-if="pId">
			</router-view>
		</div>
	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import valid,{errors,sys} from '../libs/request';
import leftMenu from "@public/modules/leftMenu";
import navTitle from "@public/modules/navTitle";
import { MENUIDS, } from '@public/libs/config';
let regist = false;
let route ='apply.index';

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
        navTitle
    },
    created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.APPLY;
		this.getMenuData(this.pId);
		this.$store.commit('updatePid',{pid:this.pId});
    },
    methods:{
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
				let menus = this.$store.state.apply.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
        },
        getMenuData(id){
            if(!id){
                debugger;
            }
            sys.listGrantMenu({ id, }).then(valid.call(this)).then(res=>{
                this.$store.commit('apply/updateMenu',{menu:res.data.data});
                this.ready = true;
            }).catch(errors.call(this));
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('apply',{
				namespaced:true,
				state:{
					menus:[
					],
					pid:0,
					leftclosed:false, // left panel status
				},
				getters:{
					tagId() { // 任务标签列表id
						return '40101';
					},
					pid(){
						return _this.pId;
					},
					roleId(state,getters,rootState){
						return rootState.userInfo.roleMap?rootState.userInfo.roleMap[_this.pId]:0;
					},
					
					isAdmin(state, getters, rootState){ // 超级管理员
						return rootState.userInfo.admin;
					},
					isAplConsultant(state, getters, rootState) { // 申请顾问
						return getters.roleId==1001;
					},
					isAplLeaser(state, getters, rootState) { // 申请主管
						return getters.roleId==1002;
					},
					isCeo(state, getters, rootState) { // 总裁
						return getters.roleId==1004 || rootState.userInfo.roleMap['0'] == 12;
					},
					isAplManage(state, getters, rootState) { // 申请 分总/后期总监/经理
						return getters.roleId==1003;
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
			this.$store.commit('apply/updateCloseStatus',{status});
		}
    }
}
</script>
