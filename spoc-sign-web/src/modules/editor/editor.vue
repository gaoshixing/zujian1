<style lang="less">
.market-editor-container{
	@border: 1px solid #ccc;
	table {
		border-top: @border;
		border-left: @border;
		td,th{
			width: 100px;
			border-bottom: @border;
			border-right: @border;
			padding: 3px 10px;
			text-align: center;
		}
	}

	.toolbar {
		border: 1px solid #ccc;
	}
	.text {
		border: 1px solid #ccc;
		border-top: 0; 
	}
}
</style>

<template>
	<div class="market-editor-container">
		<div id="marketEditor" class="toolbar">
		</div>
		<div id="marketEditorText" class="text" :style="{height: heightStyle + 'px'}" v-if="heightStyle">
		</div>
		<input type="hidden" v-model="model"/>
	</div>
</template>

<script>
	var editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
            	default:'',
			},
			heightStyle: {
				type: String,
            	default:'',
			},
		},
		data() {
			return {
				model: this.value,
			}
		},
		created() {
			let _this = this;
			require(['./wangEditor.js'], function(E) {
				if(_this.heightStyle){
					editor = new E('#marketEditor','#marketEditorText')
				} else {
					editor = new E('#marketEditor')
				}
		    	editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
    			editor.customConfig.zIndex = 10;
				editor.customConfig.menus = [
					'head', // 标题
					'bold', // 粗体
					'fontSize', // 字号
					'fontName', // 字体
					'italic', // 斜体
					'underline', // 下划线
					'strikeThrough', // 删除线
					'foreColor', // 文字颜色
					'backColor', // 背景颜色
					'justify', // 对齐方式
					'table',  // 表格
					/* 'emoticon', // 表情
					'undo', // 撤销
					'redo' // 重复 */
				]
				
			    editor.customConfig.onchange = function (html) {
					// html 即变化之后的内容
			        _this.model = html;
			    }
				editor.create();
			})
		},
		watch: {
			value(val) {
				this.model = val;
				editor.txt.html(this.model);
			},
			model(model) {
				this.$emit('input', model);
			},
		}
	}
</script>