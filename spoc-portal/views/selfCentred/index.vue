<style lang="less">
.self-center-container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px 50px;
	}
	.news .menu{
		top: 35px;
	}
}
</style>
    
<template>
<div class="self-center-container">
    <left-menu types="spoc-workbrnch"></left-menu>
    <div class="content">
        <nav-title></nav-title>  
        
        <router-view class="main_content">
        </router-view>
    </div>
</div>
</template>

<script>

import {mapMutations,mapState} from 'vuex';
import { MENUIDS, } from '@public/libs/config';
import valid,{errors,sys} from '../../libs/request';
import leftMenu from "../../modules/leftMenu";
import navTitle from "@public/modules/navTitle";

let regist = false
let route ='plan.portal.selfcentred';

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
        this.pId = MENUIDS.WORKBRNCH;
		this.getMenuData(this.pId);
    },
    methods:{
		autoFocus(){
			if(this.$route.name == route) { //未指定具体菜单
             let menus = this.$store.state.workbrnch.menus;
				if(menus[0]){
					this.$router.replace({name:menus[0].href,query:{id:menus[0].id}});
				}
			}
        },
        getMenuData(id){
            const params = {id};
            if(!params.id){
                debugger;
            }
            sys.listGrantMenu(params).then(valid.call(this)).then(res=>{
                console.log(res.data.data)
                this.$store.commit('workbrnch/updateMenu',{menu:res.data.data});
                this.ready = true;
               /*  setTimeout(()=>{
                    this.autoFocus();
                },100); */
            }).catch(errors.call(this));
        },
        registerModule(){
			let _this = this;
			this.$store.registerModule('workbrnch',{
				namespaced:true,
				state:{
					menus:[
					],
					pid:0,
					leftclosed:false, // left panel status
				},
				getters:{
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
    }
}
</script>


