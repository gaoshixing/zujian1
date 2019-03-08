// 院校库
<style lang="less">
	
.v-transfer-dom{
	.ivu-modal-confirm-footer{
		overflow: hidden;
		.ivu-btn-large{
			float:right;
		}
	}
}
.library_container{
	height: 100%;
	display: flex;
	.ivu-modal-footer{
		overflow: hidden;
	}
	.content{
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
	<div class="library_container">
		<left-menu types="spoc-library"></left-menu>
		<div class="content">
			<nav-title></nav-title>
			<router-view class="main_content">
			</router-view>
		</div>

	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import valid,{errors,listGrantMenu} from '../libs/request.js';
import leftMenu from "@public/modules/leftMenu";
import navTitle from "@public/modules/navTitle";
import { MENUIDS, } from '@public/libs/config';
let regist = false;
let route ='library.index';

export default {
	name:'library',
	components: {
		leftMenu,
		navTitle
	},
	data () {
		return {
			ready:false,
			pId: null,
		}
	},
	computed:{
		...mapState(['userInfo','appMenuList']),
	},
	created(){
		if(!regist){
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.LIBRARY;
		this.getMenuData(this.pId);
		this.$store.commit('updatePid',{pid:this.pId});
	},
	methods:{
		isReady(id){
			if(id && !this.ready){
				this.getMenuData(id);
			}
		},
		getMenuData(id){
			if(!id){
				debugger;
			}
			listGrantMenu({id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$store.commit('library/updateMenu',{menu:res.data.data});
					this.ready = true;
				}
			}).catch(errors.call(this));
		},
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
				let menus = this.$store.state.library.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
		},
		registerModule(){
			let _this = this;
			this.$store.registerModule('library',{
				namespaced:true,
				state:{
					menus:[]
				},
				getters:{

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

