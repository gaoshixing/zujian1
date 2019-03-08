<style lang="less">
	.xel-form {
		margin: 2px 0;
	}
</style>
<template>
	<div class="xel-form">
		<Tabs v-model="tabNum" v-if="isSetting">
			<TabPane label="字段属性" name="tab1">
				<xel ref="xel" v-for="(el,index) in xdatavis" @on-click="onClick" @willchange="willchange" @input="onChange(el,index)" :groupId="groupId" :data="el" :key="el.id" :pid="pid" :viewmode="viewmode" :paddingx="paddingx" v-if="el.name!='settings_module'&&el.name!='display'"/>
			</TabPane>
			<TabPane label="表单属性" name="tab2">
				<xel ref="xel" v-for="(el,index) in xdatavis" @on-click="onClick" @willchange="willchange" @input="onChange(el,index)" :groupId="groupId" :data="el" :key="el.id" :pid="pid" :viewmode="viewmode" :paddingx="paddingx" v-if="el.model=='5'||el.name=='display'"/>
			</TabPane>
		</Tabs>
		<xel ref="xel" v-for="(el,index) in xdatavis" @on-click="onClick" @willchange="willchange" @input="onChange(el,index)" :groupId="groupId" :data="el" :key="el.id" :pid="pid" :viewmode="viewmode" :paddingx="paddingx" v-else/>
	</div>
</template>
<script>
	import xel from './xel';
	import { formData } from '../libs/form';
	export default {
		props: {
			isSetting:{
				type: Boolean,
				default: false,
			},
			xdata: {
				type: Array,
				required: true,
			},
			groupId: {
				type: [Number, String],
				default: '',
			},
			xsetting: {
				type: Object,
				required: true,
			},
			viewmode: {
				type: Boolean,
				default: false,
			},
			xformdata: {},
			pid: {
				type: String,
				default: ''
			},
			paddingx: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				tabNum:'tab1'
			}
		},
		computed: {
			xdatavis() {
				return this.xdata.filter(item => item.visible !== false);
			}
		},
		components: {
			xel
		},
		created() {},
		methods: {
			onChange(el, index,flag) {
				this.$emit('on-change', el, index,this.tabNum);
			},
			onClick(...args) {
				this.$emit('on-click', ...args);
			},
			willchange(v, item) {
				this.$emit('willchange', v, item);
			},
			valid() {
				const v = this.$refs.xel.map(item => {
					return item.valid();
				}).every(v => v);
				return v;
			},
			getData() {
				try {
					const data = formData(this.xdatavis);
					return data;
				} catch(e) {
					console.error(e);
					return false;
				}
			}
		}
	}
</script>