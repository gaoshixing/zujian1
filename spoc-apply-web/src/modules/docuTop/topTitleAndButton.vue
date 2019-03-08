<style lang="less">
	.top-title-and-button-boss {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #e0e0e0;
		position: relative;
		padding: 0px 20px;
		position: relative;
		margin-top: 20px;
		&::before {
			content: '';
			display: block;
			width: 5px;
			height: 100%;
			background-color: #44bcb7;
			position: absolute;
			left: 0;
			top: 0;
		}
		.top-title-and-button-top-content{
			width: 100%;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;		
		}
		.top-title-and-button-div {
			>.top-title-and-button-buttons {
				min-width: 90px;
				height: 30px;
				margin-right: 15px;
				margin-bottom: 4px;
				box-sizing: border-box;
			}
			>button:last-child {
				margin-right: 0;
			}
		}
		.btn-val-delete-class {
			color: red;
			background-color: #fff;
			border: solid 1px red;
			&:hover {
				background-color: #f5f5f5 !important;
			}
		}
	}
	.top-title-and-button-top-titles {
		width: 100%;
		height: 40px;
		font-weight: 500;
		position: absolute;
		left: 0;
		top: -100%;
		span:nth-of-type(1) {
			font-size: 14px;
			color: #333;
		}
		span:nth-of-type(2) {
			font-size: 16px;
			color: red;
			font-weight: bold;
		}
		span:nth-of-type(3) {
			color: #333;
			font-size: 14px;
		}
	}
	.HasTopTitleClass {
		margin-top: 50px;
	}
</style>
<template>
	<div class="top-title-and-button-boss" :class="[titleTop ? 'HasTopTitleClass' : '']">
		<div class="top-title-and-button-top-titles" v-if="titleTop">
			<span>{{titleTop}}</span>
			<span>{{num}}</span>
			<span v-if="titleSubTop">{{titleSubTop}}</span>
		</div>
		<div class="top-title-and-button-top-content">
			<p>{{title}}</p>
			<div class="top-title-and-button-div">
				<Button
					class="top-title-and-button-buttons"
					v-for="(item, index) in btnList"
					:key="index"
					@click="onclickBtns(index)"
					:type="item.type"
					v-if="item.btnVal && (typeof item.btnVal === 'string')"
					>{{item.btnVal}}
				</Button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TopTitleAndButton',
	props: {
		titleTop: {
			type: String,
		},
		titleSubTop: {
			type: String,
			default: '',
		},
		num: {
			default: null,
		},
		title: {
			type: String,
			required: true,
		},
		isShow: {
			default: false,
		},
		btnList: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	data() {
		return {
			nums: null,
		};
	},
	methods: {
		onclickBtns(index) {
			this.$emit('onclickBtns', index);
		},
	},
	mounted() {

	},
};
</script>