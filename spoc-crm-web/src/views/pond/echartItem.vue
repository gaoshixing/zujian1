<style lang="less">
	.e-chart-section {
		display: inline-block;
	}
</style>
<template>
	<div class="e-chart-section">
		<div class="chart" :style="mstyle">
		</div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	export default {
		props: {
			data: {
				type: Object,
				required: true,
			},
			mstyle: {
				type: Object,
				default: () => {
					return {
						width: '500px',
						height: '400px'
					};
				}
			}
		},
		data() {
			return {
				chart: null
			};
		},
		mounted() {
			let dom = this.$el.querySelector('.chart');
			this.chart = echarts.init(dom);
			this.setOption(this.data);
			this.chart.getZr().on('click', (params)=> {
				var pointInPixel = [params.offsetX, params.offsetY];
				if(this.chart.containPixel('grid', pointInPixel)) {
					/*此处添加具体执行代码*/

					var pointInGrid = this.chart.convertFromPixel({
						seriesIndex: 0
					}, pointInPixel);
					//X轴序号
					var xIndex = pointInGrid[0];
					var yIndex = pointInGrid[1];

					//获取当前图表的option
					var op = this.chart.getOption();
					var month;
					if(op.yAxis[0].type=="value"){
						month = op.xAxis[0].data[xIndex];
					}else{
						month = op.yAxis[0].data[yIndex];
					}
					//获得图表中我们想要的数据
					this.$emit('on-click', xIndex, month, op);
				}
			});

			//将可以响应点击事件的范围内，鼠标样式设为pointer--------------------
			this.chart.getZr().on('mousemove', (params)=>{
				var pointInPixel = [params.offsetX, params.offsetY];
				if(this.chart.containPixel('grid', pointInPixel)) {
					this.chart.getZr().setCursorStyle('pointer');
				};
			});
			this.chart.getZr().on('mouseout', (params)=> {
				var pointInPixel = [params.offsetX, params.offsetY];
				if(!this.chart.containPixel('grid', pointInPixel)) {
					this.chart.getZr().setCursorStyle('default');
				};
			});
			//			this.chart.on('click', this.onClick);
//			this.chart.getZr().on('click', params => {
//				const pointInPixel = [params.offsetX, params.offsetY];   
//				if(this.chart.containPixel('grid', pointInPixel)) {
//					let xIndex = this.chart.convertFromPixel({
//						seriesIndex: 0
//					}, [params.offsetX, params.offsetY])[0];        /*事件处理代码书写位置*/
//				}
//			});
		},
		beforeDestory() {
			this.chart.dispose();
		},
		methods: {
			setOption(option) {
				console.log(this.chart)
				if(this.chart && option) {
					this.chart.setOption(option, true);
				}
			},
			onClick(params) {}
		},
		watch: {
			data: {
				handler(val, oval) {
					console.log(6)
					this.setOption(val);
				},
				deep: true
			}
		}
	}
</script>