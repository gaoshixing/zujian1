<style lang="less">
	.tag-select-boss {
		line-height: 28px;
		margin-bottom: 5px;
		.tag-select-title {
			display: inline-block;
			width: 60px;
			text-align: right;
			color: #b8b8b8;
			margin-right: 15px;
		}
		.tag-select-tag {
			padding: 5px 11px;
			margin-right: 10px;
			cursor: pointer;
		}
		.tag-select-selected {
			background-color: #44bcb7;
			color: #fff;
		}
	}
</style>

<template>
	<div class="tag-select-boss">
		<div class="tag-select-title">{{title}}：</div>
		<span 
			v-for="(item, index) in tagList"
			:key="index"
			class="tag-select-tag"
			:class="[tagIndex == index ? 'tag-select-selected' : '']"
			@click="onclickChose(item.id, index)">
			{{item.name}}
		</span>
	</div>	
</template>

<script>
export default {
	name: 'TagSelect',
	props: {
		title: {
			type: String,
			default: '标题',
		},
		tagList: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			tagIndex: 0,
		};
	},
	methods: {
		onclickChose(id, index) {
			this.tagIndex = index;
			this.$emit('onclickChoseTags', id);
		},
	},
};
</script>