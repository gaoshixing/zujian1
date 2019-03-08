<template>
	<div v-if="data.name" class="signDetailGsx1">
		<p class="title">合同名称: {{data.name}}</p>
		<p>合同类型: {{data.tags}}</p>
		<p>合同编号: {{data.code}}</p>
		<p>合同原价: {{data.signPrice}}</p>
		<p>签约价格: {{data.price}}</p>
		<p>折扣金额: {{data.deratePrice}}</p>
		<p>赠送金额: {{data.presentPrice}}</p>
		<p>赠送成本: {{data.presentPriceCost}}</p>
		<div v-if="data.protocolContent" >
			<p >附加条款:</p>
        	<div>
				<p style="text-indent:2em" v-for="item in list">{{item}}</p>
			</div>
		</div>
		<p class="gray">提交人: {{data.sellerUser.name}}</p>
		<p class="gray">提交时间: {{data.commitTime}}</p>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: function () {
				return {
					protocolContent: []
				}
			}
		}
	},

	data () {
		return {	
		}
	},

	components: {
	},

	computed: {
		 list() {
            return this.data.protocolContent.split('\n')
        }
	},

	methods: {
	}
}
</script>

<style lang= "less">
	.signDetailGsx1 {
		padding: 0 30/2px 0;
		font-size: 14px;
		p {
			line-height: 20px;
		}
		.title {
			font-size: 16px;
			font-weight: 700;
		}
		.gray {
			color: #999;
		}
	}
</style>
