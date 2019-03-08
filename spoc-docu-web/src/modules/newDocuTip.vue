<template>
	<div class="new-docu-tips-boss"  :class="[(totaleDocu && leftTime >1) ? 'new-docu-tips-active' : '']">
		<p>您收到{{totaleDocu}}份共享文书,请尽快查看 <span>( {{leftTime}}s )</span></p>
	</div>
</template>

<script>
export default {
	name: 'NewDocuTips',
	props: {
		totaleDocu: {
			type: [String, Number],
			required: true,
			default: 0,
		},
	},
	data() {
		return {
			leftTime: 5,
		};
	},
	watch: {
		totaleDocu(newVal) {
			if (newVal) {
				this.timeDown();
			}
		},
	},
	methods: {
		timeDown() {
			let timer = setInterval(() => {
				this.leftTime--;
				if (this.leftTime <= 1) {
					clearInterval(timer);
					timer = null;
				}
			}, 1000);
		},
	},
};
</script>

<style lang="less">
	.new-docu-tips-boss {
		left: 50%;
		top: -130px;
		height: 30px;
		width: 320px;
		color: #fff;
		font-size: 14px;
		position: absolute;
		text-align: center;
		border-radius: 5px;
		letter-spacing: .03em;
		transform: translateX(-50%);
		background-color: rgba(193, 193, 193, .9);
		transition: top 1s ease;
		p {
			display: block;
			line-height: 30px;
		}
		span {
			color: rgb(100, 100, 100);
		}
	}
	.new-docu-tips-active {
		top: 30px;
	}
</style>
