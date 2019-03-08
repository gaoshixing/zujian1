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
	import { replace, digitUppercase } from '../../../../libs/util.js';
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
					v = replace(text, ['$1$', name], ['$2$', costPrice]);
				})
				this.policy.list.forEach((items, index) => {
					items.protocalText = v;
				});
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
				this.policy.protocalText = v;
			}
		}
	}
</script>