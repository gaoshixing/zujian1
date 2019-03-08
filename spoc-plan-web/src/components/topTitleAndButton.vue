<template>
	<div class="top-title-and-button-boss">
		<p>{{title}}</p>
		<div class="top-title-and-button-div">
			<Button 
				type="success"
				class="top-title-and-button-buttons"
				@click="onclickBtnsOne"
				:type="btnList[0].type"
				v-if="btnList[0].btnVal && (typeof btnList[0].btnVal === 'string' && isShow)"
				>{{btnList[0].btnVal}}
			</Button>
			<Button 
				type="success"
				class="top-title-and-button-buttons"
				@click="onclickBtnsTwo"
				:type="btnList[1].type"
				v-if="btnList[1].btnVal && (typeof btnList[1].btnVal === 'string')"
				>{{btnList[1].btnVal}}
			</Button>
			<!-- <Button 
				type="success"
				class="top-title-and-button-buttons"
				@click="onclickBtnsthree"
				:class="btnList[2].class"
				:type="btnList[2].type"
				v-if="btnList[2].btnVal && (typeof btnList[2].btnVal === 'string')"
				>{{btnList[2].btnVal}}
			</Button> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'TopTitleAndButton',
	props: {
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
				return [
					{'btnVal': '批量修改', type: 'success'},
					{'btnVal': '级别设置', type: 'success'},
					// {'btnVal': '删除', type: 'error', class: "btn-val-delete-class"},
				];
			},
		},
	},
	methods: {
		onclickBtnsOne() {
			this.$emit('onclickBtnsOne');
		},
		onclickBtnsTwo() {
			this.$emit('onclickBtnsTwo');
		},
		// onclickBtnsThree() {
		// 	this.$emit('onclickBtnsThree');
		// },
	},
};
</script>

<style lang="less">
	.top-title-and-button-boss {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #e0e0e0;
		position: relative;
		padding: 0px 20px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
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
</style>
