<style lang="less">
	.record-manage-modal-exception {
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {
			padding-bottom: 50px;
		}
	}
</style>

<template>
		<Modal
			width=730
			v-model="modalExceptions"
			:title=title
			class="record-manage-modal-exception"
			@on-cancel="cancelException"
			@on-visible-change="onVisibleChange">
				<Table
					height="250"
					:columns="columnsException"
					:data="dataException">
				</Table>
		</Modal>
</template>

<script>
export default {
	name: 'LogModal',
	props: {
		title: {
			type: String,
			default: '异常日志',
		},
		modalException: {
			type: Boolean,
			default: false,
		},
		columnsException: {
			type: Array,
			default: () => {
				return [];
			},
		},
		dataException: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			modalExceptions: false,
		};
	},
	methods: {
		onVisibleChange(val) {
			if (val) this.modalExceptions = val;
		},
		checkException() {
			this.modalExceptions = true;
		},
		cancelException() {
			this.modalExceptions = false;
			this.$emit('cancleModalLog');
		},
	},
};
</script>