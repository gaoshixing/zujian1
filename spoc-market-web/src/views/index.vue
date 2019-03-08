<style lang="less">
.def_btn {
	padding:7px 37px;
	background:#fff;
	margin-right:20px;
	font-size:14px
}

.primary_btn {
	padding:7px 37px;
	margin-right:20px;
	font-size:14px
}
.def_btn_new1 {
	padding:5px 16px;
	background:#fff;
	margin-right:20px;
	font-size:14px
}
.primary_btn_new1 {
	padding:5px 16px;
	margin-right:20px;
	font-size:14px
}
.def_btn_new {
	padding:5px 38px;
	background: #999;
	font-size:14px;
	color: #fff;
}
.def_btn_new:hover {
	background-color:#888;
	border-color: #999;
	color: #fff;
}
.def_btn_err {
	padding:5px 38px;
	background: #fff;
	font-size:14px;
	margin-right: 20px;
	color: red;
	border: 1px solid rgba(255, 0, 0, 0.562);
}
.def_btn_err:hover {
	border: 1px solid red;
	color: rgba(255, 0, 0, 0.862);
}
.primary_btn_new {
	padding:5px 38px;
	font-size:14px;
}
.market_container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
	.main_content{
		border-top: 1px solid #e0e0e0;
		padding-top: 10px;
	}
}
</style>
<template>
    <div class="market_container">
		<left-menu @status-change="statusChange" types="spoc-market"></left-menu>
		<div class="content" @scroll="scrollFun">
	<!-- 	<div class="content"> -->
			<nav-title></nav-title>
			
			<router-view class="main_content" :pId="pId" v-if="pId" ref="marketContent">
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
let route ='market.publicIndexGsx';
let routePublic = 'market.publicIndex';
let routeIndex = 'market.index';
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
		if (sessionStorage.getItem('publicInfo') == null) {
			this.pId = 1001
		} else {
			this.pId = 1023;
		}
		this.getMenuData(this.pId);
		this.$store.commit('updatePid',{pid:this.pId});
    },
    methods:{
		scrollFun(){
			if(this.$route.name == 'market.resource'){
				let el = document.getElementsByClassName('content')[0];
				let scrollHeight = el.scrollHeight;
				let scrollTop = el.scrollTop;
				let clientHeight = el.clientHeight;
				//console.log(scrollHeight + '  ' +  clientHeight + '  '+ scrollTop )
				if (parseInt(scrollHeight - clientHeight) <= parseInt(scrollTop) + 10) {
					this.$refs.marketContent.addItems()
				}
			}
		},
		autoFocus(val){
			let menus = this.$store.state.market.menus;
			if(this.$route.name == routeIndex) { //未指定具体菜单
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			} else if (val === undefined) {
				return // 刷新
			} else {
				let index ;
				if (val) {
					index = menus.findIndex(item => {
						return	item.href == route
					}) 
				} else {
					index = menus.findIndex(item => {
						return	item.href == routePublic
					}) 
				}
				if (menus[index]){
					this.$router.replace({name:menus[index].href,query:{id:menus[index].id}});
				}
			} 
        },
        getMenuData(id){
            if(!id){
                // debugger;
            }
            sys.listGrantMenu({ id, }).then(valid.call(this)).then(res=>{
				let menus = res.data.data

				menus = menus.map(item1 => {
					if (item1.name == '不能改自动换菜单名字') {
						item1.name = JSON.parse(sessionStorage.getItem('publicInfo')).publicName
					}
					return item1
					})
                this.$store.commit('market/updateMenu',{menu:menus});
                this.ready = true;
            }).catch(errors.call(this));
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('market',{
				namespaced:true,
				state:{
					menus:[
					],
					publicInfo: {
					},
					pid:0,
					leftclosed:false, // left panel status
				},
				getters:{
					tagId() { // 任务标签列表id
						return '1001';
					},
					pid(){
						return _this.pId;
					},
					roleId(state,getters,rootState){
						return rootState.userInfo.roleMap?rootState.userInfo.roleMap[1001]:0;
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
						return getters.roleId==801 || rootState.userInfo.roleMap['0'] == 12;
					},
					isAdmin(state, getters, rootState){ // 超级管理员
						return rootState.userInfo.admin;
					},
					marketLeader(state, getters, rootState) {
						if ((getters.roleId+'').indexOf(',')!=-1) {
							let arr = getters.roleId.split(',')
							if (arr.includes('1102')||arr.includes('1104')) return true
							return false
						} else {
							return getters.roleId==1102?true:getters.roleId==1104?true:false;
						}
					}
				},
				mutations:{
					updateMenu(state,{menu,isPush,name}){
						state.menus = menu;
						_this.$nextTick(_this.autoFocus(isPush));
					},
					updateCloseStatus(state,{status}){
						state.leftclosed = status;
					},
					// updatePublic(state,{status}){
						
					// },
				},
				actions:{
					getMenuData(){
						_this.getMenuData(_this.pId);
					},
				}
			});
		},
		statusChange(status){
			this.$store.commit('market/updateCloseStatus',{status});
		}
    }
}
</script>