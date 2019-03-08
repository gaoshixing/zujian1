<style lang="less">
	.btn-and-time-boss {
		position: relative;
		height: 32px;
		line-height: 24px;
		padding: 0 0 0 79px;
		margin-top: 10px;
		.btn-and-time-title {
			position: absolute;
			left: 0;
			top: 4px;
			width: 60px;
			text-align: right;
			user-select: none;
			color: rgb(184, 184, 184);
		}
		.btn-and-time-span {
			cursor: pointer;
			display: inline-block;
			padding: 0 12px;
			margin:4px 10px 0 0;
			float: left;
		}
		.btn-and-time-span-active {
			color: #fff;
			background-color: #44bcb7;
		}
		.btn-and-time-timing {
			height: 28px;
			width: 270px;
			padding-left: 15px;
			line-height: 28px;
			display: inline-block;
			>div {
				display: flex;
				display: -webkit-flex;
				width: 246px;
				float: left;			
				justify-content: space-between;
			}
			.btn-and-time-timing-through {
				width: 14px;
				height: 4px;
				margin-top: 14px;				
				background-color: #44bcb7;
			}
		}
		.ivu-input-number-input-wrap {
			position: relative;
			&::after {
				content: 'S';
				position: absolute;
				right: 5px;
				top: 0;
			}
		}
		.btn-and-time-div {
			background-color: #fff;
			color: #333;
		}
	}
</style>

<template>
	<div class="btn-and-time-boss">
		<span class="btn-and-time-title">{{title}}：</span>
		<span 
			v-for="(item, index) in btnList"
			:key="index"
			class="btn-and-time-span"
			:class="[ (Number(ownIndex) === index) ? 'btn-and-time-span-active' : '', ]"
			@click="onclickChoseTags(index)">
			{{item.title}}
		</span>
		<div class="btn-and-time-timing">
			<div>
				<DatePicker type="date" placeholder="开始时间" :options="optionDate" v-model="beginDate" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
				<div class="btn-and-time-timing-through"></div>
				<DatePicker type="date" placeholder="结束时间" :options="optionDate" v-model="endDates" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
			</div>
		</div>
	</div>
</template>

<script>
import { getTimeInterval, } from '@public/libs/util';
export default {
	name: 'BtnAndTime',
	props: {
		title: {
			type: String,
			default: '通话时间',
		},
		btnList: {
			type: Array,
			default: () => {
				return [];
			},
		},
		acIndex: {
			type: String,
			default: '0',
		},
	},
	data() {
		return {
			isLimit: true,
			ownIndex: '0',
			beginDate: null,
			endDate: null,
			endDates: null,
			optionDate: {
				disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
			},
		};
	},
	watch: {
		endDate(newVal) {
			if (newVal) {
				this.endDates = new Date(new Date(newVal).valueOf() - 86400000);
			} else {
				this.endDates = null;
			}
		},
	},
	created() {
		this.ownIndex = this.acIndex;
		if (this.acIndex !== '0') getTimeInterval(this.btnList[this.acIndex].type, this.btnList[this.acIndex].ms);
	},
	methods: {
		onclickChoseTags(index, item) {
			this.ownIndex = index;
			this.beginDate = null;
			this.endDate = null;
			this.$emit('onclickChoseTags', getTimeInterval(this.btnList[index].type, this.btnList[index].ms));
		},
		// 按照时间范围检索
		onchangeBDate(val) {
			this.beginDate = val ? new Date(val).format('yyyy-MM-dd') + ' 00:00:00' : '';
			const dateLeft =  this.endDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;
			if (dateLeft >= 0) {
				this.$emit('getTargetDate', this.beginDate, this.endDate);
			} else if (!this.endDate || !this.endDate) {
				if (!this.endDate && !this.beginDate) {
					this.$emit('getTargetDate', null, null);
				}
			} else {
				this.endDate = null;
				this.$Message.warning('请选择正确的起止时间');
			}
		},
		onchangeEDate(val) {
			this.endDate = val ? new Date(new Date(val).setDate((new Date(val).getDate() + 1))).format('yyyy-MM-dd') + ' 00:00:00' : '';
			const dateLeft = this.beginDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;
			if (dateLeft >= 0) {
				this.$emit('getTargetDate', this.beginDate, this.endDate);
			} else if (!this.beginDate || !this.endDate) {
				if (!this.endDate && !this.beginDate) {
					this.$emit('getTargetDate', null, null);
				}
			} else {
				this.endDate = null;
				this.$Message.warning('请选择正确的起止时间');
			}
		},
	},
};
</script>