// 待存档
<style lang="less">

</style>
<template>
	<div class="sign-contract-manage-hang-container">

		<div class="search-box">
			<v-select placeholder="输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="search.text" k='cnname' :datafunc="searchDropList" @on-enter="onSearch" @on-click="onSearch" @selected="onSearch">
			</v-select>
		</div>
		<v-search-items @on-search-items="onSearchItems"></v-search-items>
		<v-hang-sign ref="hangSign" v-show="search.signResult==0"></v-hang-sign>
		<v-signed ref="signed" v-show="search.signResult==1"></v-signed>
	</div>
</template>
<script>
import vSelect from "../../../../../modules/vSelect";
import vHangSign from "../hang/component/vHangSign";
import vSigned from "../hang/component/vSigned";
import vSearchItems from "../hang/component/vSearchItems";
import valid,{errors } from "../../../../../libs/request";
export default {
	name:'vHang',
	data () {
		return {
			search:{
				text:'',
				company:'',
				signResult:'',
				signTime:'',
			},
		}
	},
	components: {
		vSelect,
		vHangSign,
		vSigned,
		vSearchItems
	},
	methods: {
		// 联想搜索
		searchDropList(word){
			return new Promise((resolve,reject)=>{
				academeManage.academySearch(word).then(valid.call(this)).then(res=>{
					if(res.ok){
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err=>{
					errors.call(this);
					reject(err);
				});
			});
		},

		onSearch(){
			// this.$nextTick(()=>{
			// 	this.listParams.pageNo = 1;
			// 	this.listParams.cnName = this.search.text;
			// 	this.fetchTableList(this.listParams);
			// });
			console.log('onSearch',this.search);
			// if(this.search.signResult==0){
			// 	alert(111);
			// }else{
			// 	alert(2222)
			// }	


			
		},
		onSearchItems(params){
			this.search = {...this.search,...params};
			console.log('onSearchItems',this.search);
			// if(this.search.signResult==0){
			// 	alert(111);
			// }else{
			// 	alert(2222)
			// }
			
		},
	}
}
</script>
