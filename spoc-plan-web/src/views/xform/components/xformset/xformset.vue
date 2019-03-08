<style lang="less">
	.xform-set {
		.del-btn {
			font-size: 18px;
			color: #f77;
			cursor: pointer;
			vertical-align: middle;
			margin-left: 5px;
			&:hover {
				color: #f22;
			}
		}
		.do-addone {
			color: #0DB3A6;
		}
		.xform-set-item {
			margin: 4px 0;
		}
		.xform-el-name {
			display: inline-block;
			border: 1px solid #eee;
			background-color: #f1f1f1;
			width: 88%;
			height: 28px;
			line-height: 28px;
			text-indent: 5px;
			vertical-align: middle;
			&:hover {
				border-color: #0DB3A6;
				cursor: pointer;
			}
		}
		.formset-wrap {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(240, 240, 240, .8);
			z-index: 800;
			&-center {
				position: fixed;
				width: 600px;
				height: 90vh;
				top: 50%;
				left: 50%;
				margin-top: -45vh;
				margin-left: -300px;
				background-color: #fff;
				box-shadow: 0 2px 3px 0 rgba(146, 146, 146, .5);
				box-sizing: border-box;
				.m-header {
					border-bottom: 1px solid #ddd;
					position: relative;
					.m-title {
						padding: 15px 0 15px 25px;
						font-size: 16px;
					}
					.close-btn {
						position: absolute;
						right: 20px;
						top: 15px;
						color: #888;
						font-size: 28px;
						cursor: pointer;
						&:hover {
							color: #444;
						}
					}
				}
				.m-body {
					padding: 15px;
					height: 90%;
					overflow: auto;
					.two-col {
						display: flex;
						.fl {
							flex: 2;
							padding: 10px;
						}
						.fr {
							flex: 4;
							padding: 10px;
						}
						.f-t {
							font-size: 14px;
							margin: 5px 0;
						}
					}
				}
				.sbox {
					border: 1px solid #ddd;
					height: 400px;
					&.s-left-item {
						.opitem {
							padding: 10px 6px;
							cursor: pointer;
							&:hover,
							&.active {
								background-color: #eee;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="xform-set">
		<div class="x-el-title x-input-title" v-text="title"></div>
		<div class="x-el-description x-input-description" v-text="description"></div>
		<div v-for="item in items" :key="item.id" class="xform-set-item">
			<span class="xform-el-name" @click="onItemClick(item)">{{item.title}}</span>
			<Icon class="del-btn" type="android-remove-circle" @click.native.stop="delOne(item)"></Icon>
		</div>
		<div>
			<xselect :id="coms.id" v-model="coms.value" :settings="coms.settings" :title="coms.title" :description="coms.description" :name="coms.name" :type="coms.type" :validate="coms.validate" :options="coms.options" :icon="coms.icon" />
			<a @click="addOne" class="do-addone">确认添加</a>
		</div>
		<div class="formset-wrap" v-if="formset.item">
			<div class="preview-wrap-center">
				<div class="m-header">
					<div class="m-title">子表单设置</div>
					<Icon class="close-btn" @click.native.stop="formset.item=false" type="android-close"></Icon>
				</div>
				<div class="m-body">
					<itemsetting ref="settings" :inform="true" :xform="xformcomputed" :item="formset.item" @on-click="onSettingsClick" @on-change="onSettingsChange" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import base from '../base'
	import { uuid, clone, deepEqual } from '../../libs/util'
	import { TYPES, SELECTYPE, DISTYPE, LAYTYPE } from '../config';

	const defwidth = '100%';

	const options = [{
			label: 'A',
			value: 1
		},
		{
			label: 'B',
			value: 2
		},
		{
			label: 'C',
			value: 3
		},
		{
			label: 'D',
			value: 4
		}
	];

	const defValues = {
		[TYPES.INPUT]() {
			return {
				model: TYPES.INPUT,
				name: '',
				title: '单行输入框',
				description: '',
				value: '',
				display: DISTYPE.BLOCK,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				width: defwidth,
				settings: {},
				validate: [],
			}
		},
		[TYPES.TEXTAREA]() {
			return {
				model: TYPES.TEXTAREA,
				name: '',
				title: '多行输入框',
				description: '',
				value: '',
				display: DISTYPE.INLINE,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				width: defwidth,
				settings: {},
				validate: [],
			}
		},
		[TYPES.RADIO]() {
			return {
				model: TYPES.RADIO,
				name: '',
				title: '单选框',
				description: '',
				value: '',
				display: DISTYPE.BLOCK,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				type: 'inline',
				options,
				settings: {},
				validate: []
			}
		},
		[TYPES.CHECKBOX]() {
			return {
				model: TYPES.CHECKBOX,
				name: '',
				title: '复选框',
				description: '',
				value: [],
				display: DISTYPE.BLOCK,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				type: 'inline',
				options,
				settings: {},
				validate: []
			}
		},
		[TYPES.SELECT]() {
			return {
				model: TYPES.SELECT,
				name: '',
				title: '下拉框',
				description: '',
				icon: 'android-arrow-dropdown',
				value: '',
				display: DISTYPE.BLOCK,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				options,
				width: defwidth,
				settings: {},
				validate: []
			}
		},
		[TYPES.DATETIME]() {
			return {
				model: TYPES.DATETIME,
				name: '',
				title: '时间选择框',
				description: '',
				value: '',
				display: DISTYPE.BLOCK,
				lay: LAYTYPE.COMM,
				placeholder: '',
				readonly: false,
				width: defwidth,
				dateformat: 'yyyy-MM-dd',
				settings: {},
				validate: []
			}
		}
	}

	export default {
		mixins: [base],
		data() {
			return {
				coms: {
					id: uuid(),
					value: '',
					name: 'formset_com',
					title: '请选择组件',
					icon: 'android-arrow-dropdown',
					options: [{
							label: '单行文本',
							value: TYPES.INPUT
						},
						{
							label: '多行文本',
							value: TYPES.TEXTAREA
						},
						{
							label: '单选框',
							value: TYPES.RADIO,
						},
						{
							label: '多选框',
							value: TYPES.CHECKBOX,
						},
						{
							label: '下拉框',
							value: TYPES.SELECT
						},
						{
							label: '时间控件',
							value: TYPES.DATETIME,
						},
					],
					settings: {
						datasource: SELECTYPE.DATASOURCE_LOCAL
					}
				},
				items: this.value,
				formset: {
					item: null,
				},
				fakesettings: {

				}
			}
		},
		computed: {
			xformcomputed() {
				return {
					layout: this.items,
					settings: this.fakesettings
				}
			}
		},
		components: {
			xselect: () =>
				import('../xselect/xselect.vue'),
			itemsetting: () =>
				import('../../views/itemsetting.vue'),
		},
		methods: {
			addOne() {
				const type = this.coms.value;
				if(!type) {
					return this.$Message.error("请选择一个类型");
				}
				const item = defValues[type]();
				item.id = uuid();
				this.items.push(item);
			},
			delOne(item) {
				const index = this.items.findIndex(i => i.id == item.id);
				this.items.splice(index, 1);
			},
			onItemClick(item) {
				this.formset.item = item;
			},
			onSettingsClick() {
				this.$Message.error('子表单里不能设置关联');
			},
			onSettingsChange(el, index) { // 这里是子表单的配置
				const [id, r, k] = el.id.split('@');
				const item = this.formset.item;
				if(!item) {
					return console.error("error active item");
				}
				const len = Object.keys(el.settings && el.settings.trigger ? el.settings.trigger : {});
				const lvv = Object.keys(el.settings && el.settings.values ? el.settings.values : {});
				let bases = {};
				let values = {};
				if(len.length > 0) { // 包含有触发器
					const v = el.settings.trigger[el.value];
					if(v) { // 所选值对应有触发器值
						bases = clone(v);
					} else { // 所选值对应无触发器值，执行fallback
						bases = el.settings.trigger.$fallback ? clone(el.settings.trigger.$fallback) : {};
					}
				}
				if(lvv.length > 0) { // 包含有同级附加值变动
					const v = el.settings.values[el.value];
					if(v) { // 所选值与附加值变动对应
						values = clone(v);
					} else { // 无对应，使用fallback
						values = el.settings.values.$fallback ? clone(el.settings.values.$fallback) : {};
					}
				}
				if(k) { // 是三级修改，1. 合并触发器值， 2.应用三级修改值。
					const s = Object.assign({}, item[r] || {}, bases); // its order is important
					s[k] = el.value;
					item[r] = s;
				} else { // 二级修改 , 同样需要合并触发器值，修改二级值
					const a = Object.assign({}, item.settings || {}, bases);
					if(!deepEqual(item.settings, a)) { // important to avoid update loop
						item.settings = a;
					}
					if(r.charAt(0) == '^') { // 是一个顶级修改，直接修改全局setting,并修改每一个元素的module
						const mk = r.substr(1);
						this.fakesettings[mk] = el.value;
						this.items.forEach(item => {
							item.settings[mk] = el.value;
						});
					} else { // 普通二级修改
						item[r] = el.value;
					}
				}
				Object.keys(values).forEach(k => { // 应用附加值，附加值权重大
					item[k] = values[k];
				});

			},

		},
		watch: {
			items(v) {
				this.$emit('input', v);
			}
		}
	}
</script>