<style>

</style>
<template>
	<div>
		<anslyse-detail-person v-if="$route.query.person">
		</anslyse-detail-person>
		<manage-analyse v-else-if="isManage"></manage-analyse>
		<anslyse-detail-person v-else-if="isCommon">
		</anslyse-detail-person>
		<div v-else>身份错误</div>
	</div>
	
</template>
<script>
// 分别加载超级管理员、总裁、分总、个人的统计分析页面
// 超级管理员、总裁、分总 为一个页面
import manageAnalyse from './manageAnalyse.vue';
import anslyseDetailPerson from './anslyseDetail/anslyseDetailPerson.vue';

import { mapState ,mapGetters } from 'vuex';
export default {
   data (){
		return{
		};
	},
	computed:{
		...mapGetters('sign',['isAdmin','isCeo','isBranchOfficeLeader','isHeaderOfficeLeader','isDeparmentLeader','isAccount', 'isSaler']),
		isManage(){
			console.info(this.isAccount);
			if(this.isAdmin || this.isCeo || this.isBranchOfficeLeader || this.isHeaderOfficeLeader || this.isAccount){  // 财务看到的和总裁一样
				return true;
			}
			return false;
		},
		isCommon(){
			if(this.isDeparmentLeader || this.isSaler){
				return true;
			}
			return false;
		}
	},
	methods:{
		
	},
	components:{
		manageAnalyse,
		anslyseDetailPerson
	}
};
</script>
