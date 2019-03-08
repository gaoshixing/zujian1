<style lang="less">
.usnews-sc-page{
	.tips{
		color: #e71f1d;
		font-size: 14px;
	}
}
</style>

<template>
	<div class="usnews-sc-page">
		<div>
			<div class="tips">本部分信息来自U.S.News自动抓取！</div>
			<div class="section-wrap">
				<div class="section" v-for="(item,index) in parts" :key="index">
					<usection v-if="typeof usdata[item] == 'object'" :data="usdata[item]" :k="item" :show="showMap[item]" @show="showWhat">
					</usection>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import valid ,{ errors, usnews } from '@/component/spoc-library-web/src/libs/request.js';
import usection from '@/component/spoc-library-web/src/views/schoolManage/schoolDetail/replenish/replenish.vue';
const parts=['overview','ranking','applying','paying','academics','student-life','campus-info','campus-safety','rankings_indicator'];

export default{
	data(){
		let showMap = {};
		parts.forEach(v=>{
			showMap[v] = v=='overview'?true : false;
		})
		return{
			parts:parts,
			usdata:{},
			showMap,
		};
	},
	created(){
		this.loadData('5a3109f590c58d47e84e413b');
		// this.loadData2('');
	},
	components:{
		usection,
	},
	methods:{
		showWhat(k){
			this.showMap[k] = !this.showMap[k];
		},
		loadData(usnewsId){
			usnews.school({usnewsId}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.usdata = res.data.data;
				}
			}).catch(errors.call(this)).finally(()=>{

			});
		},
		loadData2(usnewsId){
			usnews.gradeSchool({usnewsId}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.usdata = res.data.data;
				}
			}).catch(errors.call(this)).finally(()=>{

			});
		}
		
	}
}
</script>