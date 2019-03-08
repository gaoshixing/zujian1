<style lang="less">
	.docu-top-area-boss {
		.docu-top-area-tab {
			margin-bottom: 20px;
		}
		.docu-top-input {
			margin-bottom: 20px;
		}

		.docu-top-area-timing {
			height: 32px;
			width: 380px;
			padding-right: 57px;
			margin-top: 20px;
			line-height: 32px;
			>span {
				color: #b8b8b8;
			}
			>div {
				display: flex;
				display: -webkit-flex;
				width: 246px;
				float: right;			
				justify-content: space-between;
			}
			.docu-top-area-timing-through {
				width: 14px;
				height: 4px;
				margin-top: 14px;				
				background-color: #44bcb7;
			}
		}
	}
</style>
<template>
	<div class="docu-top-area-boss">

		<Tabs value="name1"  v-model="name1" :animated="false" class="docu-top-area-tab">
			<TabPane
				v-for="(item, index) in sliderNav"
				:key="index"
				:label="item.label" 
				:name="item.name">
			</TabPane>
		</Tabs>

		<Input v-model.trim="searchVal" icon="ios-search" :placeholder="placeholder" style="width: 396px" @on-click="onclickSearchBills" @on-enter="onclickSearchBills" class="docu-top-input"></Input>

		<div class="docu-top-area-tag-area">
			<slot></slot>
		</div>

		<div class="docu-top-area-timing">
			<span>更新时间：</span>
			<div>
				<DatePicker type="date" placeholder="开始时间" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
				<div class="docu-top-area-timing-through"></div>
				<DatePicker type="date" placeholder="结束时间" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DocuTopArea',
	props: {
		sliderNav: {
			required: true,
			type: Array,
		},
		placeholder: {
			type: String,
			default: '请输入顾问姓名/学生姓名/申请学校',
		},
	},
	data() {
		return {
			searchVal: null,
			name1: '1',
			beginDate: null,
			endDate: null,
		};
	},
	watch: {
		name1(newVal) {
			this.$emit('slideNavChange', newVal);
		},
	},
	methods: {
		// 点击 或者 enter 进行搜索
		onclickSearchBills() {
			this.$emit('onclickSearchBills', this.searchVal);
		},
		// 按照时间范围检索
		onchangeBDate(val) {
			this.beginDate = val ? new Date(val).format('yyyy-MM-dd') + ' 00:00:00' : '';

			const dateLeft =  this.endDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;

			if (this.beginDate && this.endDate && dateLeft >= 0) {

				this.$emit('getTargetList', this.beginDate, this.endDate);

			} else if (!this.endDate || !this.endDate) {

				if (!this.endDate && !this.beginDate) {

					this.$emit('getTargetList', null, null);
				}
			} else {

				this.$Message.warning('请选择正确的起止时间');
			}
		},
		onchangeEDate(val) {
			this.endDate = val ? new Date(new Date(val).setDate((new Date(val).getDate() + 1))).format('yyyy-MM-dd') + ' 00:00:00' : '';

			const dateLeft = this.beginDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;

			if (this.beginDate && this.endDate && dateLeft >= 0) {

				this.$emit('getTargetList', this.beginDate, this.endDate);

			} else if (!this.beginDate || !this.endDate) {

				if (!this.endDate && !this.beginDate) {

					this.$emit('getTargetList', null, null);
				}
			} else {

				this.$Message.warning('请选择正确的起止时间');
			}
		},
	},
}
</script>