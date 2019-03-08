<style lang="less">
	.pie-item-boss {
		width: 100%;
		height: 100%;
		display: inline-block;
		.my-chart {
			width: 100%;
			height: 100%;
		}
	}
</style>

<template>
	<div class="pie-item-boss">
		<div class="my-chart"></div>
	</div>
</template>

<script>
import { wait, } from '../libs/util';
import echarts from 'echarts';
const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
export default {
	name: 'PieItem',
	props: {
		type: {
			default: '',
		},
		chart0: null,
		chart1: null,
		chart2: null,
		chart3: null,
		requestEnd: {},
	},
	data() {
		return {
			option1: null,
			option2: null,
		};
	},
	watch: {
		requestEnd(newVal) {
			if(newVal) {
				this.drawCanvas();
			}
		},
	},
	methods: {
		fixOption() {
			// 饼图
			if (this.type) { // 环形图
				this.chart1 && (this.option2 = this.chart1);
				this.chart2 && (this.option2 = this.chart2);
				this.chart3 && (this.option2 = this.chart3);
			}
		},
		drawCanvas() {
			let myCharts = echarts.init(this.$el.querySelector('.my-chart'));
			this.fixOption();
			if (!this.type) {
				myCharts.setOption(this.chart0);
			} else {
				myCharts.setOption(this.option2);
			}
		},
	},
};
</script>
