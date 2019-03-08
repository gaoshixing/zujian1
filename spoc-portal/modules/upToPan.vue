<style lang="less">
	.up-hidden {
		display: none;
	}
</style>
<template>
	<div class="up-hidden">
		<input type="file" class="uploadfile" @change="doUploadFile">
	</div>
</template>
<script>
	import { mapMutations } from 'vuex';
	import valid, {
		errors,
		other,
		sys
	} from '@public/libs/request.js';

	export default {
		props: {
			dir: {
				type: String,
				required: true
			},
			dirName: {
				type: String,
			},
			studentId: {
				type: String
			},
			serviceGroupId: {
				type: String
			},
			type: { // 关联字典项
				type: String,
				required: true
			},
			fileType: {
				type: String,
				default: 'files'
			},
			objectId: {
				type: String,
				required: true
			},
			maxSize: {
				type: Number,
				default: 0
			},
			menuId: {
				type: [String,Number],
				required: true
			},
			format: {
				type: Array,
				default: () => {
					return [];
				}
			},
			isUpdate: {
				type: Number,
				default: 0
			},
			fileId: {
				type: String,
				default: ''
			},
			detector: {
				type: Object,
				default: () => {
					return {
						type: '',
						condition: '',
						content: ''
					};
				}
			},
			prehook:{
				type:[Function,Boolean],
				default:false,
			},
			remarks: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				extra: {},
				f: ''
			}
		},
		mounted() {
			this.f = this.$el.querySelector('.uploadfile');

		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			doUpload(extra) {
				console.info(this.menuId);
				if(extra && Object.keys(extra).length > 0) {
					this.extra = extra;
				}
				this.f.click();
			},
			verifyFormat(f) {
				const name = f.name;
				if(this.format.length) {
					if(this.format.indexOf(name.split('.').pop()) == -1) {
						this.$Modal.confirm({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, "请上传" + this.format.join(',') + "格式的文件。")
							}
						})
						this.$el.querySelector('.uploadfile').value = '';
						return false;
					}
				}
			},
			verifyDetector(f) {
				const name = f.name;
				if(this.detector.type) {
					let flag = true;
					if(this.detector.condition == 'alike') {
						this.detector.content.split(',').forEach((v, k) => {
							if(v != f[this.detector.type]) {
								this.$Modal.confirm({
									render: (h) => {
										return h('div', {
											style: {
												width: "370px",
												height: "40px",
												textAlign: 'center',
												fontSize: '16px',
												fontWeight: '700'
											},
										}, "请上传名称和类型与原文件相同的文件。")
									}
								})
								flag = false;
								return false;
							}
						})
					} else {
						this.detector.content.split(',').forEach((v, k) => {
							if(v == f[this.detector.type]) {
								this.$Modal.confirm({
									render: (h) => {
										return h('div', {
											style: {
												width: "370px",
												height: "40px",
												textAlign: 'center',
												fontSize: '16px',
												fontWeight: '700'
											},
										}, "重名文件，请重新上传。")
									}
								})
								flag = false;
								return false;
							}
						})
					}
					if(!flag) {
						flag = true;
						this.$el.querySelector('.uploadfile').value = '';
						return false;
					}
				}
			},
			verifyMaxSize(f) {
				const name = f.name;
				if(this.maxSize != 0) {
					if((f.size / 1024) > this.maxSize) {
						this.$Modal.confirm({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, "上传文件不能大于" + this.maxSize / 1024 + "M!")
							}
						});
						this.$el.querySelector('.uploadfile').value = '';
						return false;
					}
				}
			},

			doUploadFile(e) {
				let f , ev = true ;
				if (e instanceof File){
					f = e;
					ev = false;
				} else {
					f = e.target.files[0];
				}
				const name = f.name;
				if(this.verifyFormat(f)==false) return false;
				if(this.verifyDetector(f)==false) return false;
				if(this.verifyMaxSize(f)==false) return false;
				const data = new FormData();
				data.append('files', f);
				data.append('filePath', this.dir);
				data.append('fileType', this.fileType);
				data.append('objectId', this.objectId);
				data.append('type', this.type);
				data.append('menuId', this.menuId);
				data.append('remarks', this.remarks);
				if(this.dirName){
					data.append('dirName', this.dirName);
				}
				if(this.isUpdate) {
					data.append('isUpdate', this.isUpdate)
				};
				if(this.studentId) {
					data.append('studentId', this.studentId)
				};
				if(this.serviceGroupId) {
					data.append('serviceGroupId', this.serviceGroupId)
				};
				if(this.fileId) {
					data.append('fileId', this.fileId)
				};
				for(let i in this.extra) {
					data.append(i, this.extra[i]);
				}
				if(ev){
					if(this.prehook && !this.prehook(f,data)){
						return
					}
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				sys.uploadToPan(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						if(res.data.statusCode == "204") {
							this.$Modal.confirm({
								onOk: () => {
									data.append('isCover', 1);
									sys.uploadToPan(data).then(valid.call(this)).then(res => {
										if(res.ok) {
											this.$emit('uploadok', res.data, f);
										} else {
											this.$emit('uploaderror', res.data, f);
										}
									}).catch(errors.call(this)).finally(() => {
										this.updateLoadingStatus({
											isLoading: false
										});
										this.$el.querySelector('.uploadfile').value = '';
									});
								},
								onCancel: () => {},
								render: (h) => {
									return h('div', {
										style: {
											width: "370px",
											height: "40px",
											textAlign: 'center',
											fontSize: '16px',
											fontWeight: '700'
										},
									}, name + "已存在，是否覆盖。")
								}
							})
						} else {
							this.$emit('uploadok', res.data, f);
						}
					} else {
						this.$emit('uploaderror', res.data, f);
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$el.querySelector('.uploadfile').value = '';
				});

			},
		}
	}
</script>