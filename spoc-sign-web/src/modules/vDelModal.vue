// 删除modal
<style lang="less">
.modal-del{
	.message{
		text-align:center; 
		padding:45px 0 ;
		font-size:18px;
		.warning{
			color:#e8352c;
		}
	}
	.ivu-modal-footer{
		border: none;
		padding:0 0 50px;
		.btns {
			text-align:center;
			button{
				width: 120px;
			}
		}
	}
}
</style>

<template>
	<div>
		<Modal class-name="modal-del" :title="title" v-model="showDelMenu" @on-cancel="cancel">
			<div class="message">
				<slot name="message">
					您确定要删除 <span class="warning">规划</span> 吗？
				</slot>
			</div>	
			<div class="btns" slot="footer">
				<Button type="error"  @click="comfirmDel">确定</Button>
				<Button  @click="comfirmCancel">取消</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	name:'vDelModal',
	props:{
		title:{
			type:String,
			default:'删除'
		},
		value:{
			type:Boolean,
		}
	},
	data () {
		return {
			showDelMenu:this.value,		
		}
	},
	methods: {
		comfirmDel(){
			this.$emit('input',!this.showDelMenu);
			this.$emit('on-comfirm');
		},
		comfirmCancel(){
			this.$emit('input',!this.showDelMenu);
			this.$emit('on-cancel');
		},
		cancel(){
			this.$emit('input',this.showDelMenu);
			this.$emit('on-cancel');
		}
	},
	watch: {
		value(val){
			this.showDelMenu = val;
		}
	}
}
</script>



