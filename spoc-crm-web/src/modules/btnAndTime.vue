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
			margin: 4px 10px 0 0;
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
		.btn-and-time-noLimit {
			color: #fff;
			display: inline-block;
			background-color: #44bcb7;
			width: 48px;
			height: 24px;
			text-align: center;
			line-height: 24px;
			cursor: pointer;
		}
		.btn-and-time-div {
			background-color: #fff;
			color: #333;
		}
		.slider-container {
			width:150px;
			position: absolute;
			bottom: 0;
			left: 155px;
			span {
				position: absolute;
				display: block;
				height: 16px;
				line-height: 16px;
			}
			span:nth-of-type(1) {
				left: 5px;
			}
			span:nth-of-type(2) {
				right: 10px;
			}
		}
	}
</style>

<template>
	<div class="btn-and-time-boss" :style="styleAro" >
		<span class="btn-and-time-title" :style="styleTitle">{{title}}：</span>
		<span 
			v-for="(item, index) in btnList"
			:key="index"
			class="btn-and-time-span"
			:class="[ ((Number(ownIndex) === index) && Number(ownIndex) >= 0) ? 'btn-and-time-span-active' : '', ]"
			@click="onclickChoseTags(index, item)">
			{{item.title}}
		</span>
		<div class="btn-and-time-timing" v-if="types !== 'slider' && types !== 'none'">
			<div>
				<DatePicker :type="types" placeholder="开始时间" :options="optionDate" v-model="beginDate" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
				<div class="btn-and-time-timing-through"></div>
				<DatePicker :type="types" placeholder="结束时间" :options="optionDate" v-model="endDates" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
			</div>
		</div>
		<div 
			v-if="types === 'slider'"
			class='btn-and-time-noLimit'
			@click="onclickResetSlider"
			:class="[!isLimit? 'btn-and-time-div' : '']">
			不限
		</div>
		<div v-if="types === 'slider'" class="slider-container">
			<span :name="sliderText">{{sliderText[0]}}</span>
			<span>{{sliderText[1]}}</span>
			<Slider v-model="valueSlider" range :step="1" :max=max show-tip=never @on-change="sliderOnchange"></Slider>
		</div>
	</div>	
</template>

<script>
export default {
	name: 'BtnAndTime',
	props: {
		styleTitle: {
			type: Object,
			default: () => {
			}
		},
		styleAro: {
			type: Object,
			default: () => {
			}
		},
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
		types: {
			type: String,
			default: 'date',
		}
	},
	data() {
		return {
			isLimit: true,
			ownIndex: '0',
			beginDate: null,
			endDate: null,
			endDates: null,
			max: 120,
			valueSlider: [0, 120],
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
	computed: {
		sliderText() {
			if (this.valueSlider[0] === 0 && this.valueSlider[1] === 120) {
				this.isLimit = true;
				return ['', ''];
			} else {
				this.isLimit = false;
				return [`${this.valueSlider[0]}分钟`, `${this.valueSlider[1]}分钟`];
			}
		},
	},
	created() {
		this.ownIndex = this.acIndex;
	},
	methods: {
		onclickChoseTags(index, item) {
			this.ownIndex = index;
			this.beginDate = null;
			this.endDate = null;
			this.$emit('onclickChoseTags', item.type, item.ms, index);
		},
		// 按照时间范围检索
		onchangeBDate(val) {
			this.beginDate = val ? new Date(val).format('yyyy-MM-dd') + ' 00:00:00' : '';

			const dateLeft =  this.endDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;

			if (this.beginDate && this.endDate && dateLeft >= 0) {

				this.$emit('getTargetDate', this.beginDate, this.endDate);

				this.ownIndex = -1;

			} else if (!this.endDate || !this.endDate) {

				if (!this.endDate && !this.beginDate) {

					this.$emit('getTargetDate', null, null);
				}
			} else {

				this.$Message.warning('请选择正确的起止时间');
			}
		},
		onchangeEDate(val) {
			if (new Date(val).getTime() > new Date().getTime()) {

				this.endDate = -1;

				this.$Message.warning('请选择正确的起止时间');

				return;
			} 
			this.endDate = val ? new Date(new Date(val).setDate((new Date(val).getDate() + 1))).format('yyyy-MM-dd') + ' 00:00:00' : '';

			const dateLeft = this.beginDate ? (new Date(this.endDate).getTime() - new Date(this.beginDate).getTime()) : -1;

			if (this.beginDate && this.endDate && dateLeft >= 0) {

				this.$emit('getTargetDate', this.beginDate, this.endDate);

				this.ownIndex = -1;

			} else if (!this.beginDate || !this.endDate) {

				if (!this.endDate && !this.beginDate) {

					this.$emit('getTargetDate', null, null);
				}
			} else {

				this.$Message.warning('请选择正确的起止时间');

				this.endDate = null;
			}
		},
		onclickResetSlider() {
			this.valueSlider = [0, 120];
			this.$emit('sliderOnchange', this.valueSlider[0], this.valueSlider[1]);
		},
		sliderOnchange() {
			this.$emit('sliderOnchange', this.valueSlider[0], this.valueSlider[1]);
		},
	},
};
</script>