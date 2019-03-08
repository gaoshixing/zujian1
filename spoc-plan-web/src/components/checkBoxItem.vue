<template>
	<div class="check-box-item-boss">
			<Checkbox
				v-model="single"
				v-if="manageType && (isAudit == 4 || isAudit == 1)"
				style= "font-size: 14px; font-weight: bold;">
				标记为已付款
			</Checkbox>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	name: 'CheckBoxItem',
	props: {
		singles: {},
		id: {},
		index: {},
		manageType: {
			type: String,
			required: true,
		},
		isAudit: {
			dafault: 0,
		},
	},
	data() {
		return {
			single: null,
			count: 0,
		};
	},
	watch: {
		singles(newVal) {
			this.single = newVal;
		},
		single(newVal) {
			if (this.count < 1) {
				this.count++;
			} else if (!newVal) {
				return this.singles;
			} else {
				this.$emit('onclickCheckBox', newVal, this.id, this.index);
				return this.singles;
			}
		},
	},
	mounted() {
		this.count++;
	},
};
</script>

<style lang="less">
	.check-box-item-boss {
		position: absolute;
		left: 850px;
	}
</style>
