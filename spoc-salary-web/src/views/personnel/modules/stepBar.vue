<style lang="less">
	@green: #a4cb6d;
	@grey: #dce6eb;
	.crm-step-bar {
		margin: 10px auto;
		display: flex;
		padding-left: 12%;padding-bottom: 22px;
		border-bottom: 1px solid #dcdcdc;
		.s-item {
			flex: 1;
		}
		.gh {
			height: 18px;
			position: relative;
			margin-bottom: 8px;
			.bc {
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background-color: @grey;
				text-align: center;
				position: relative;
				z-index: 88;
				cursor: pointer;
				.sc {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: #fff;
					display: inline-block;
					z-index: 100;
					position: relative;
				}
			}
			.line {
				width: 100%;
				height: 4px;
				background-color: @grey;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			&+.s-text {
				color: #acacac;
				display: inline-block;
				width: 60px;
				text-align: center;
				transform: translateX(-21px); // 60/2 -9
			}
		}
		.s-item {
			&:last-child {
				.line {
					display: none;
				}
			}
			&.active {
				.s-text {
					color: @green;
				}
				.line,
				.bc {
					background-color: @green;
				}
			}
		}
		.s-item.active.last {
			.line {
				background-color: @grey;
			}
		}
	}
</style>
<template>
	<div class="crm-step-bar">
		<div class="s-item" :class="{ active: active >= index || index == 0,last: active == index }" v-for="(step,index) in steps" :key="index">
			<div class="gh">
				<div class="bc" @click="onClick(step, index)">
					<div class="sc"></div>
				</div>
				<div class="line"></div>
			</div>
			<div class="s-text" v-text="step.label"></div>
		</div>
	</div>
</template>
<script>

	export default {
		props: {
			steps: {
				type: Array,
				required: true
			},
			active: {
				type: Number,
				required: true
			},
		},
		data() {
			return {

			}
		},
		methods: {
			onClick(step, index) {
				if(this.active < index) {
				// if(this.active == index) {
					return;
				}else{
					this.$emit('onclick', step, index);
				}
			}
		}
	}
</script>