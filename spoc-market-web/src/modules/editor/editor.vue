<style>

</style>

<template>
	<div>
		<div id="marketEditor" ></div>
		<input type="hidden" v-model="model"/>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
    import valid, { wpMarketCommon } from "../../libs/request";
	var editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
            	default:'',
			}
		},
		data() {
			return {
				model: this.value,
			}
		},
		created() {
			let _this=this
			require(['./wangEditor.js'], function(E) {
				editor = new E('#marketEditor')
		    	editor.customConfig.uploadImgShowBase64 = false;   // 使用 base64 保存图片
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
					//'justify', // 对齐方式
					'image',  // 插入图片
					/* 'emoticon', // 表情
					'undo', // 撤销
					'redo' // 重复 */
				]
			    editor.customConfig.onchange = function (html) {
			        // html 即变化之后的内容
			        _this.model=html;
				}
				editor.customConfig.showLinkImg = false
				editor.customConfig.uploadImgServer = wpMarketCommon.getUploadFileUrl()
				editor.customConfig.uploadFileName = 'files'
				editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
				editor.customConfig.uploadImgTimeout = 30000
				editor.customConfig.uploadImgParams = {
                    type: 'wp_material_news',
                    dirName: 'all',
                    meunId: '1001'
                }
				editor.customConfig.uploadImgHooks = {
					before: function (xhr, editor, files) {
						// 图片上传之前触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
						
						// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
						// return {
						//     prevent: true,
						//     msg: '放弃上传'
						// }
						_this.updateLoadingStatus({isLoading:true});
					},
					success: function (xhr, editor, result) {
						// 图片上传并返回结果，图片插入成功之后触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
						_this.updateLoadingStatus({isLoading:false});
					},
					fail: function (xhr, editor, result) {
						// 图片上传并返回结果，但图片插入错误时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
					},
					error: function (xhr, editor) {
						// 图片上传出错时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
					},
					timeout: function (xhr, editor) {
						// 图片上传超时时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
					},

					customInsert: function (insertImg, result, editor) {
						var url = result.data.filePath
						insertImg(url)
					}
				}
				editor.create()
			})
		},
		methods:{
			...mapMutations(["updateLoadingStatus"]),
		},
		watch: {
			value(val) {
				this.model = val;
				// console.log(val);
    			editor.txt.html(this.model);
			},
			model(model) {
				// console.log(model);
				this.$emit('input', model);
			}
		}
	}
</script>