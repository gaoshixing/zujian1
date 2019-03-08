<style lang="less">
	@green: #3cb4ae;
	.m-yunpan {
		.fitem {
			border-bottom: 1px solid #eee;
			padding-left: 10px;
			>.clearfix {
				padding: 3px 0;
			}
			&:hover,
			&.active {
				background: rgba(210, 241, 238, 0.4);
				cursor: pointer;
			}
			.ivu-icon {
				font-size: 34px;
				float: left;
			}
			.name {
				float: left;
				display: block;
				line-height: 34px;
				text-indent: 8px;
				font-size: 14px;
				max-width: 500px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.nav-pan {
			margin: 5px 0 10px 10px;
			.seg {
				display: inline-block;
				font-size: 14px;
			}
			.nav-item {
				margin-left: 3px;
				cursor: pointer;
				&:hover {
					color: @green;
				}
			}
		}
		.items-list {
			max-height: 70vh;
			overflow: auto;
		}
		.nofiles {
			padding: 15px;
			font-size: 14px;
		}
		.f-meta {
			float: right;
			height: 34px;
			line-height: 34px;
			font-size: 14px;
			color: #bbb;
			.fmeta-size,
			.fmeta-date {
				width: 80px;
				display: inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.fmeta-date {
				color: #888;
			}
		}
	}
</style>

<template>
	<Modal v-model="isvisible" class-name="m-yunpan vertical-center-modal" title="云盘添加文件" :mask-closable="false" @on-visible-change="visibleChange" width="730px">
		<div>
			<div class="nav-pan">
				<ul>
					<li class="seg" v-for="(nav,index) in ['根目录'].concat(navs)" :key="index" @click="cd(index)">
						<span class="nav-item">{{nav}}</span>
						<Icon type="ios-arrow-forward"></Icon>
					</li>
				</ul>
			</div>
			<ul class="items-list" v-if="files.files.length">
				<li class="fitem" v-for="item in files.files" :key="item.id" :class="{active:activeFile.id==item.id}">
					<div class="clearfix" v-if="item.type=='dir'" @click="chooseDir(item)">
						<Icon type="folder" color="#3cb4ae"></Icon>
						<span class="name">
                            {{item.name}}
                        </span>
						<div class="f-meta">
							<span class="fmeta-size">{{byteFormat(item.size)}}</span>
							<span class="fmeta-date">{{showDate(item.mtime)}}</span>
						</div>
					</div>
					<div class="clearfix" v-else @click="chooseFile(item)">
						<Icon type="document" color="#aaa"></Icon>
						<span class="name">
                            {{item.name}}
                        </span>
						<div class="f-meta">
							<span class="fmeta-size">{{byteFormat(item.size)}}</span>
							<span class="fmeta-date">{{showDate(item.mtime)}}</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-else class="nofiles">
				<span>无文件</span>
			</div>
		</div>
		<div slot="footer">
			<Button @click="doCancel">取消</Button>
			<Button type="primary" :loading="loading" @click="doSendFile">确定</Button>
		</div>
	</Modal>
</template>
<script>
	import valid, {
		other,
		sys,
		errors
	} from '../libs/request'
	import { util } from '../libs/util'
	import { mapMutations, mapState, mapGetters } from 'vuex';

	export default {
		props: {
			visible: {
				type: Boolean,
				required: true
			},
			detector: {
				type: Object,
				default: () => {
					return {
						type: '',
						content: ''
					};
				}
			}
		},
		data() {
			return {
				activeFile: {},
				files: {
					directory: '',
					files: []
				},
				isvisible: this.visible,
				loading: false
			}
		},
		computed: {
			...mapState(['userInfo']),
			navs() {
				return this.files.directory.split('/').filter(item => item);
			},
		},
		created() {
			this.chooseDir();
		},
		methods: {
			chooseFile(item) {
				this.activeFile = item;
			},
			chooseDir(item) {
				let params = {};
				if(item) {
					if(item.abs) {
						params = {
							dir: item.name
						}
					} else {
						params = {
							dir: this.navs.concat([item.name]).join('/')
						}
					}
				}
				other.panListDir(params).then(res => {
					if(res.data.status == 'success') {
						this.files = res.data.data;
					}
				}).catch(e => {
					console.error(e);
				});
			},
			cd(index) {
				const dir = {
					name: this.navs.splice(0, index).join('/'),
					abs: true,
				}
				this.chooseDir(dir);
			},
			byteFormat(s) {
				return util.byteFormat(s)
			},
			showDate(t) {
				return util.timeBefore((+new Date() - t) / 1000);
			},
			verifyDetector() {
				if(this.detector.content) {
					let flag = true;
					if(this.detector.condition == 'alike') {
						this.detector.content.split(',').forEach((v,k)=>{
							if(v!=this.activeFile[this.detector.type]) {
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
								this.loading = false;
								return false;
							}
						})
					} else {
						this.detector.content.split(',').forEach((v,k)=>{
						if(v==this.activeFile[this.detector.type]) {
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
								this.loading = false;
								return false;
							}
						})
					}
					if(!flag) {
						flag = true;
						return false;
					}
				}
			},
			doSendFile() {
				this.loading = true;
				if(this.verifyDetector()===false) {return false};
				if(this.activeFile) {
					const item = this.activeFile;
					item.dir = this.files.directory.replace(/\/$/, '');
					this.$emit('on-confirm', item);
					this.loading = false;
				}
			},
			uploadPanFileToPan(params) {
				const data = Object.assign({
					isCover: 1,
				}, params);
				return sys.uploadPanFileToPan(data).then(valid.call(this)).catch(errors.call(this));
			},
			doCancel() {
				this.$emit('on-cancel');
			},
			visibleChange(val) {
				if(!val) {
					this.doCancel();
				}
			}
		},
		watch: {
			visible(v) {
				this.isvisible = v;
			}
		}
	}
</script>