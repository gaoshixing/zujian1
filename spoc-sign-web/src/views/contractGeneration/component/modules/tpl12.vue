<style lang="less">

</style>

<template>
	<div class="protocol_content">
		<FormItem label="标准补充协议：">
			<p v-html="tpl">
			</p>
		</FormItem>

	</div>
</template>
<script>
	import { replace, convertCurrency } from '../../../../libs/util.js';
	export default {
		props: {
			data: {
				type: Object,
				required: true,
			},
			info: { // 主合同信息
				type: Object,
				required: true,
			},
			policy: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {

			};
		},
		computed: {
			tpl() {
				let v='';	
				this.policy.list.forEach((items, index) => {
					const item = this.data.htItemList.find(item => item.id == items.itemId);
					if(!item) {
						return this.data.protocal;
					}
					const text = this.data.protocal ? this.data.protocal : items.protocalText;
					let name = item.name;
					let costPrice = items.costPrice;
					let publicPrice = items.publicPrice;
					let cont=(index+1)+ '、' + replace(text, ['$1$', name], ['$2$', publicPrice], ['$3$', convertCurrency(publicPrice)], ['$4$', costPrice], ['$5$', convertCurrency(costPrice)])+'<br/>';
					items.protocalText = cont;
					v +=cont;
				})
				return v;
			}
		},
		methods: {
			setData() {},
			validForm() {
				return Promise.resolve(true);
			}
		},
		watch: {
			tpl(v) {
//				this.policy.protocalText = v;
			}
		}
	}
</script>