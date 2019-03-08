<style lang="less">
@pale-grey: #e7ebf1;
.crm-chathistory {
	margin: 20px 0;
	.text {
		white-space: pre-wrap;
		margin: 20px;
		border-radius: 4px;
        border: solid 1px @pale-grey;
        padding: 10px;
	}
}
</style>
<template>
    <div class="crm-chathistory clearfix">
        <h3 class="h3title" @click="tog">
            <span>聊天记录</span>
			<Icon :type="show?'ios-arrow-up':'ios-arrow-down'"></Icon>
        </h3>
        <div v-show="show" v-text="text" class="text">
        </div>
    </div>
</template>
<script>
import valid,{errors , crmCustomer} from '../../../libs/request.js'
export default {
	props:{
		uid:{
			type:String,
			required:true
		}
	},
	data() {
		return {
			show: true,
			text: ''
		};
	},
	created(){
		this.getData();
	},
	methods: {
		tog() {
			this.show = !this.show;
		},
		getData(){
			crmCustomer.showMessage({id:this.uid}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.text = res.data.data;
				}
			}).catch(errors.call(this));
		}
	}
};
</script>


