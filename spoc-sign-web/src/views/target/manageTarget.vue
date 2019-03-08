<template>
	<div style="border-top: 1px solid #e0e0e0;">
		<manage-target2 v-if="(isAdmin||isHeaderOfficeLeader||isCeo)&&isJump" @jump="jump"></manage-target2>
		<sell-target v-else-if="isBranchOfficeLeader||isDeparmentLeader||((isAdmin||isHeaderOfficeLeader||isCeo)&&!isJump)" :compId="compId"></sell-target>
	</div>
</template>
<script>
import sellTarget from './sellTarget.vue'
import manageTarget2 from './manageTarget2.vue'
import { mapGetters } from 'vuex'
export default {
	data(){
		return {
			isJump:true,
			compId: '',
		};
	},
	
	computed: {
		...mapGetters('sign',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isHeaderOfficeLeader', 'isDeparmentLeader']),
	},

	components:{
		sellTarget,
		manageTarget2
	},
	methods:{
		jump(val){
			this.compId = val;
			this.isJump=false;
		}
	}
	
}
</script>

