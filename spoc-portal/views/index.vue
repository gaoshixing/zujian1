<style lang="less">
	html,body,.wrapper{
		height: 100%;
		min-width: 960px;
		min-height: 600px;
	}
	.wrapper-main{
		position: fixed;
		left: 60px;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
	}
</style>
<template>
	<div class="wrapper" v-if="hasAside">
		<div class="aside">
			<asidebar></asidebar>
		</div>
		<div class="wrapper-main">
			<router-view></router-view>
		</div>
	</div>
	<router-view v-else></router-view>
</template>
<script>
import asidebar from "../modules/aside";
import { mapMutations, mapState } from 'vuex';
import valid,{errors,sys,} from '../libs/request';

let regist = false;

export default {
	components:{
		asidebar,
	},
	data() {
		return {
		};
	},
	computed:{
		...mapState(['userInfo','noLogin']),
		hasAside(){
			return this.$route.meta.aside!==false;
		}
	},
	created(){
		if(this.noLogin.indexOf(this.$route.name)<0){
			if(!regist){
				this.registerModule();
				regist = true;
			}
			if(!this.userInfo.id){
				this.$store.dispatch('portal/getUserInfo');
				this.$store.dispatch('portal/updateAppMenu');
				this.$store.dispatch('portal/updateAside');
				this.$store.dispatch('portal/autoLogin');
			}
		}
	},
	methods:{
		...mapMutations(['updateLoadingStatus', 'updateUserInfo']),
		registerModule(){
			let _this = this;
			this.$store.registerModule('portal',{
				namespaced:true,
				state:{
					menus:[]
				},
				getters:{
				},
				mutations:{
					updateMenu(state,{menu}){
						state.menus = menu;
					},
				},
				actions:{
					updateAside(context){
						sys.listQuickMenu().then(valid.call(_this)).then(res=>{
							if (res.ok) {
								this.commit('updateAsideApp',{asideApp:res.data.data});
							}
						}).catch(errors.call(_this));
					},
					updateAppMenu(context){
						sys.listGrantMenu({id:0}).then(valid.call(_this)).then(res=>{
							if (res.ok){
								this.commit('appMenuList',{appMenuList:res.data.data});
							}
						}).catch(errors.call(_this));
					},
					getUserInfo(context){
						_this.updateLoadingStatus({isLoading:true,loadingBg:'rgba(255,255,255,0.99)'});
						sys.userInfoData().then(valid.call(_this)).then(res=>{
							if(res.ok){
								localStorage.setItem('roleId', res.data.data.roleId)
								this.commit('updateUserInfo',{userInfo:res.data.data});
							} else {
								_this.$Message.error(res.data.message);
							}
						}).catch((e)=>{
							_this.$Message.error(e.message?e.message:e.toString());
							_this.$router.push({name:this.state.config.loginRouter});
						}).finally(()=>{
							setTimeout(()=>{
								_this.updateLoadingStatus({isLoading:false,loadingBg:false});
							},20);
						});
					},
					autoLogin(){
						sys.autoLogin().then(res=>{
						}).catch(e=>{});
					},
					autoLogout(){
						sys.autoLogin({'logout':1}).then(res=>{
						}).catch(e=>{}).finally(()=>{
							sys.logout().then(res=>{
								// console.log('res', res);
								res.data.status = 'login';
								_this.$store.commit('appMenuList',{appMenuList:[]});
								_this.updateUserInfo({
									userInfo: { 
										roleId: '',
										roleMap:{},
										roleNameMap:{},
									}}
								)
								return res;
							}).then(valid.call(_this));
						});
					},
					
				}
			});
		},
	},
}
</script>
