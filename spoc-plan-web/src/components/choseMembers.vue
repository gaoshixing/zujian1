<template>
		<Modal
			v-model="modalChose"
			title="选择报账人"
			width="730px"
			@on-ok="ok"
			@on-cancel="cancel"
			class="chose-members-boss"
			ref="refPopupChoseMembers">
				<RadioGroup v-model="chosed" @on-change="onclickChoseThisMember">
					<Radio
						v-for="(item, index) in serviceMenbers"
						:key="index"
						:label="item.name">
					</Radio>
				</RadioGroup>
		</Modal>
</template>

<script>
import { wait } from '../libs//util';
export default {
	name: 'ChoseMembers',
	props: {
		serviceMenbers: {
			default: [],
		},
		saveOrCancleBill: {
			default: null,
		},
	},
	data() {
		return {
			modalChose: false,
			chosed: null,
			serviceMenber: null,
		};
	},
	watch: {
		/*
		* 点击保存或取消添加账单 RadioGroup非选中状态
		*/
		saveOrCancleBill(newVal) {
			console.log('newVal', newVal);
			if(newVal) {
				this.serviceMenber = null;
				this.chosed = null;
			}
		},
	},
	methods: {
		ok () {
			this.$Message.info('选择报账人成功');
			this.modalChose = false;
			this.$emit('fresh', this.serviceMenber);
		},
		cancel () {
			this.modalChose = false;
			this.$Message.warning('取消选择报账人');
		},
		show() {
			this.modalChose = true;
		},
		onclickChoseThisMember(val) {
			this.serviceMenbers.forEach((item, index) => {
				if (item.name === val) {
					this.serviceMenber = {
						name: val,
						userId: item.userId,
					};
				}
			});
		},
	},
};
</script>

<style lang="less">

</style>
