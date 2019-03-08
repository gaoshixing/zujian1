<style scoped lang="less"> 
.schoolApplyTable { 
	background: url("../../assets/img/login/login_bg.png")  no-repeat; 
	background-size: 150%; 
	.formView{ 
		margin: 0 auto; 
		padding: 50px; 
		width: 1000px; 
		background-color: #fff; 
		.title{ 
			text-align: center; 
			font-weight: bolder; 
			font-size: 18px; 
			line-height: 50px; 
		} 
		.submitButton{ 
			width: 200px; 
			margin: 0 auto; 
			.saveButton{ 
				margin-right: 50px; 
			} 
		} 
	} 
} 
</style> 
<template> 
	<div class="schoolApplyTable"> 
		<div v-show="result.tableId" class="formView"> 
			<div class="title">申请信息采集表</div> 
			<xformview v-if="showXForm" ref="applySchoolTable"  :hasToken="hasToken" :fid="result.tableId" :uid="result.id"/> 
			<div class="submitButton" v-if="!isNoPublish"> 
				<Button type="primary" @click="applySchoolTableSave()" class="saveButton">保存</Button> 
				<Button type="primary" @click="applySchoolTableCommit()">提交</Button> 
			</div> 
		</div> 
		<Modal v-model="showFormModal"  :loading="modalloading" :closable="false"  :mask-closable="false" width=428 title="输入密码"> 
			<Form ref="applytableForm" :rules="applytableValidate" :model="applyTableData" :label-width="120"> 
				<Form-item label="请输入密码：" prop="visitPwd"> 
					<Input v-model="applyTableData.visitPwd" placeholder="请输入密码" style="width:200px" :disabled="applyTableData.status == 2" :readonly="applyTableData.status == 2" ></Input> 
				</Form-item> 
			</Form> 
			<div slot="footer"> 
				<Button type="primary"  @click="verifyUrl">确定</Button> 
			</div> 
		</Modal> 
	</div> 
</template> 
<script>
	import {mapMutations} from 'vuex'; 
 	import xformview from '../../../spoc-plan-web/src/views/xform/xformview.vue' 
	import valid, { errors, common, sys, aplShareUrl} from "../../../spoc-apply-web/src/libs/request"; 
	export default { 
		data() { 
			return { 
				isNoPublish: false,
				showXForm: false, 
				result: {}, 
				hasToken: {},
				modalloading: true, 
				showFormModal: false, 
				applyTableData:{}, 
				applytableValidate: { 
					visitPwd: [{required: true,type: 'string',message: '必填项',trigger: 'change'}], 
				}, 
			} 
		}, 
		mounted() { 
			if(this.$route.query.tableId){  //未发布状态只看表单
				this.isNoPublish = true
				this.result.tableId = this.$route.query.tableId
				this.showXForm = true
				this.updateLoadingStatus({isLoading:true})
				let _this = this
				let q = setInterval(()=>{
					if(_this.$refs.applySchoolTable.$el.innerText != ''){
						clearInterval(q)
						_this.updateLoadingStatus({isLoading:false})
					}
				},1000)
			} else if(this.$route.query.visitPwd){ 
				this.applyTableData.visitPwd = this.$route.query.visitPwd 
				this.verifyUrl() 
			} else { 
				this.showFormModal = true 
			} 
		}, 
		components:{ 
			xformview 
		}, 
		methods: { 
			...mapMutations(['updateLoadingStatus']),
			verifyUrl(){ 
				let obj = { 
					groupId: this.$route.query.groupId, 
					token: this.$route.query.token, 
					visitPwd: this.applyTableData.visitPwd.trim() 
				} 
				this.$refs.applytableForm.validate((validRes) => { 
					if(validRes) { 
						aplShareUrl.verifyUrl(obj).then(valid.call(this)) 
						.then(res => { 
							if(res.ok) { 
								this.result = res.data.data 
								this.hasToken = {
									token: this.$route.query.token,
									redisKey: res.data.data.redisKey
								}
								this.showFormModal = false 
								this.showXForm = true 
							} 
						}) 
						.catch(errors.call(this)) 
						.finally(() => {}); 
					} else { 
						this.showFormModal = true 
						this.modalloading = false 
						let _this = this 
						setTimeout(function(){ 
							_this.modalloading = true 
						},0) 
					} 
				}) 
			}, 
			applySchoolTableSave() { 
				this.$refs.applySchoolTable.save().then((res) => { 
					if(res.ok) {  
						this.$Message.info('保存成功');
					} 
				}); 
			}, 
			applySchoolTableCommit() { 
				let obj = { 
					groupId: this.$route.query.groupId, 
					token: this.$route.query.token, 
					visitPwd: this.applyTableData.visitPwd, 
					status: 1 
				} 
				this.$refs.applySchoolTable.save().then((res) => {
					aplShareUrl.commit(obj).then(valid.call(this)) 
					.then(res => { 
						if(res.ok) { 
							this.$Message.info('提交成功');
						} 
					}) 
					.catch(errors.call(this)) 
					.finally(() => {}); 
				}); 
			}, 
		}, 
		watch: { 
		}, 
	} 
</script> 