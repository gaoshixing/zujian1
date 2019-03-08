<style lang='less'>
	.dialogCGSXCOM {
		.tagType {
			padding-bottom: 16px;
			border-bottom: 1px solid #e9eaec;
			.clear {
				float: right;
				cursor: pointer;
			}
		}
		.modalContent {
			height: 400px;
			padding-bottom: 30px;
			overflow: auto;
			.customerType {
				margin-top: 20px;
			}
			.customerType p {
				color: #44bcbc;
			}
			.customerType .tag>span {
				padding: 4px;
				width: 110px;
				text-align: center;
				display: inline-block;
				border: 1px solid #ccc;
				margin: 8px 15px 8px 0;
				border-radius: 3px;
				cursor: pointer;
			}
			.customerType .active {
				background-color: #44bcbc;
				color: #fff;
				border: 1px solid transparent;
			}
		}
	}
</style>

<template>
	<div class="tagModuleComm">
		<span :style="style1">{{title}}</span>
		<Button type="primary" @click="limitTagClick" :class="{active: isActive1}">选择标签</Button>
		<Modal :mask-closable="false" v-model="isShowDialog" :transfer='false' title="选择标签" width=568 @on-ok="ok1" @on-cancel="cancel4">
			<div class="dialogCGSXCOM">
				<p class="tagType">
					<RadioGroup v-model="TagKind" @on-change='radioChange'>
						<Radio label="limitTag">
							<span>{{modelName}}</span>
						</Radio>
						<Radio label="userDefine">
							<span>自定义标签</span>
						</Radio>
						<Radio label="allTag">
							<span>全局标签</span>
						</Radio>
					</RadioGroup>
					<span class="clear" @click="clearLimit">清空</span>
				</p>
				<div class="modalContent">
					<div class="customerType" v-for="(item, INDEX) in tagListAll" :key="INDEX">
						<div>
							<p style="display:inline;margin-right:5px">{{item.title}}</p>
							<span @click="showAllTag(item)" style="cursor:pointer">
                                <Icon v-if="!item.checked" type="chevron-down"></Icon>
                                <Icon v-else type="chevron-up"></Icon>
                            </span>
							<Checkbox style="margin-left:15px;" v-if="item.isMultiselect == 1" v-model="isSelectAll[item.id]" @on-change="selectAll(item.id)">全选</Checkbox>
							<Radio style="margin-left:15px;" v-model="radioV" v-else :disabled='true'>单选</Radio>
						</div>
						<div v-if="!item.checked" class="tag">
							<span @click="selectItem(itemChildren,item)" v-for="(itemChildren, index) in item.children" :key="index" :class="{'active':moreCheckList[item.id] && moreCheckList[item.id].indexOf(itemChildren.id)!=-1}">{{itemChildren.title}}</span>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import valid, {
		errors,
		plServiceGroup,
		sys,
		common
	} from "../libs/request";
	export default {
		props: {
			title: {
				type: String,
				default: '分单方向：'
			},
			style1: {
				type: Object,
				default: () => {
					return {
						color: '#b8b8b8',
						display: 'inline-block',
						textAlign: 'right',
						width: '99px'
					}
				}
			},
			modelName: {
				type: String,
				default: '规划模块'
			},
			pid: {
				type: [String, Number],
				default: '401',
			},
			hasSelected: {
				type: Array,
				default: () => {
					return []
				}
			},
			amend: {
				type: Boolean,
				default: false,
			},
			rightType: {
				type: String,
				default: ""
			},
			isPact: {
				type: Boolean,
				default: false
			},
		},

		data() {
			return {
				radioV: true,
				isShow: true,
				isActive: true,
				isActive1: false,
				num: 0,
				isShowDialog: false,
				TagKind: "limitTag",
				menuId: this.pid,
				tagList: [],
				tagListAll: [],
				moreCheckList: {}, //已选中ID集合，组标签ID为KEY，选中ID为数组的Map {'111':[1,2,333],'222':[2,3,66]}
				tagArr: {},
				tagListAllCache1: [], //指定标签备选项缓存，避免切换tab时重复请求标签接口
				tagListAllCache2: [], //全局标签备选项缓存，避免切换tab时重复请求标签接口
				tagListAllCache3: [], //全局标签备选项缓存，避免切换tab时重复请求标签接口
				phaseEditMap: {}, //用于比对编辑时服务阶段是否可修改
				isSelectAll: {}
			}
		},

		mounted() {
			this.getBuildTree(this.pid, '1')
			this.getBuildTree(this.pid, '0')
			this.getBuildTree()
		},

		methods: {
			selectAll(parentId) {
				this.tagListAllCache1.forEach((item) => {
					if(item.id == parentId) {
						this.forSelectAll(parentId, item)
					}
				})
				this.tagListAllCache2.forEach((item) => {
					if(item.id == parentId) {
						this.forSelectAll(parentId, item)
					}
				})
				this.tagListAllCache3.forEach((item) => {
					if(item.id == parentId) {
						this.forSelectAll(parentId, item)
					}
				})
			},
			forSelectAll(parentId, item) {
				let isCheckedAll = this.isSelectAll[parentId]
				let selected = this.moreCheckList[parentId]
				let tagArrSelected = this.tagArr[parentId]
				if(!selected) { //从来没有选中过该组的。则初始一下
					selected = []
				}
				if(!tagArrSelected) { //从来没有选中过该组的。则初始一下
					tagArrSelected = []
				}
				item.children.forEach((itemChild) => {
					itemChild.checked = isCheckedAll
					let index = selected.indexOf(itemChild.id);
					if(index == -1 && isCheckedAll) { //全选
						selected.push(itemChild.id);
						tagArrSelected.push(itemChild.title);
					}
					if(index != -1 && !isCheckedAll) { //取消全选
						selected.splice(index, 1);
						tagArrSelected.splice(index, 1);
					}
				})
				this.$set(this.moreCheckList, parentId, selected)
				this.$set(this.tagArr, parentId, tagArrSelected)
			},

			showAllTag(val) {
				val.checked = !val.checked
			},

			getBuildTree(id = '', isSys = '') {
				let obj = {
					menuId: id,
					isSys: isSys,
					rightType: this.rightType
				};

				common.buildTree(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							let dataList = res.data.data.children
							if (this.amend) {
								dataList.forEach((item, key) => {
									if (item.title = '客户来源')  item.isMultiselect = 1
								})
							}
							this.tagListAll = dataList.map((item, key) => {
								if(!key) item.checked = false
								return item
							});

							if(id != '') { //指定标签
								if(obj.isSys == '1') {
									this.tagListAllCache1 = dataList
									dataList.forEach((item, index) => {
										this.isSelectAll[item.id] = false
									})
								} else {
									this.tagListAllCache3 = dataList
									dataList.forEach((item, index) => {
										this.isSelectAll[item.id] = false
									})
								}
							}
							if(id == '') { //全局标签
								this.tagListAllCache2 = dataList
								dataList.forEach((item, index) => {
									this.isSelectAll[item.id] = false
								})
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			//用于编辑模式，先展示已选标签
			getBuildTreeForEdit(menuId = '', isSys = '', hasSelected1 = []) {
				// console.log(hasSelected1)
				let obj = {
					menuId: menuId,
					isSys: isSys,
					rightType: this.rightType
				};

				common.buildTree(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							let result = res.data.data.children;
							if (this.amend) {
								result.forEach((item, key) => {
									if (item.title = '客户来源')  item.isMultiselect = 1
								})
							}
							result.forEach((item1, key1) => {
								item1.children.forEach((item2, key2) => {
									if(hasSelected1.indexOf(item2.id) > -1) { //已选标签
										if(this.moreCheckList[item1.id]) {
											let myArray = this.moreCheckList[item1.id]
											let myArray2 = this.tagArr[item1.id]
											if(myArray.indexOf(item2.id) < 0) {
												myArray.push(item2.id)
												myArray2.push(item2.title)
											}
											this.$set(this.moreCheckList, item1.id, myArray)
											this.$set(this.tagArr, item1.id, myArray2)
										} else {
											this.$set(this.moreCheckList, item1.id, [item2.id]);
											this.$set(this.tagArr, item1.id, [item2.title]);
										}
										this.tagList.push(item2.title)
									}
								});
							});
							sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
							sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
							let q = []
							this.tagList.forEach((item)=>{
								if(q.indexOf(item)<0) {
									q.push(item)
								}
							})
							console.log('001')
							if(this.isPact){
								return false;
							}
							this.$emit('getTagName', q)
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			//切换标签类别，重新渲染标签备选项
			radioChange(val) {
				this.menuId = val == "allTag" ? "" : this.pid;
				if(val == 'limitTag') { //指定标签
					if(this.tagListAllCache1.length) {
						this.tagListAll = this.tagListAllCache1
					} else {
						this.getBuildTree(this.pid, '1')
					}
				}
				if(val == 'userDefine') { //自定义
					if(this.tagListAllCache3.length) {
						this.tagListAll = this.tagListAllCache3
					} else {
						this.getBuildTree(this.pid, '0')
					}
				}
				if(val == 'allTag') { //全局标签
					if(this.tagListAllCache2.length) {
						this.tagListAll = this.tagListAllCache2
					} else {
						this.getBuildTree();
					}
				}
			},
			//打开选择标签模态框
			limitTagClick() {
				// this.moreCheckList = {}
				if(sessionStorage.getItem("moreCheckListForGroup") && sessionStorage.getItem("tagArrForGroup")) {
					this.moreCheckList = JSON.parse(sessionStorage.getItem("moreCheckListForGroup"));
					this.tagArr = JSON.parse(sessionStorage.getItem("tagArrForGroup"));
				}
				// console.log( this.moreCheckList, 99)
				this.TagKind = "limitTag"
				this.isActive = false;
				this.isActive1 = this.isShowDialog = true;
				this.tagListAll = this.tagListAllCache1
				//this.getBuildTree();

				//如果选择后点击了取消，重新打开页面的时候需要重新渲染全选状态
				for(let i = 0; i < this.tagListAllCache1.length; i++) {
					let isSelectAllResult = true
					let cache1 = this.tagListAllCache1[i]
					if(this.moreCheckList[cache1.id] && this.moreCheckList[cache1.id].length > 0) {
						for(let j = 0; j < cache1.children.length; j++) {
							let index1 = this.moreCheckList[cache1.id].indexOf(cache1.children[j].id)
							if(index1 == -1) {
								isSelectAllResult = false
								break;
							}
						}
						this.isSelectAll[cache1.id] = isSelectAllResult
					} else {
						this.isSelectAll[cache1.id] = false
					}
				}
				for(let i = 0; i < this.tagListAllCache2.length; i++) {
					let isSelectAllResult = true
					let cache2 = this.tagListAllCache2[i]
					if(this.moreCheckList[cache2.id] && this.moreCheckList[cache2.id].length > 0) {
						for(let j = 0; j < cache2.children.length; j++) {
							let index1 = this.moreCheckList[cache2.id].indexOf(cache2.children[j].id)
							if(index1 == -1) {
								isSelectAllResult = false
								break;
							}
						}
						this.isSelectAll[cache2.id] = isSelectAllResult
					} else {
						this.isSelectAll[cache2.id] = false
					}
				}
				for(let i = 0; i < this.tagListAllCache3.length; i++) {
					let isSelectAllResult = true
					let cache2 = this.tagListAllCache3[i]
					if(this.moreCheckList[cache2.id] && this.moreCheckList[cache2.id].length > 0) {
						for(let j = 0; j < cache2.children.length; j++) {
							let index1 = this.moreCheckList[cache2.id].indexOf(cache2.children[j].id)
							if(index1 == -1) {
								isSelectAllResult = false
								break;
							}
						}
						this.isSelectAll[cache2.id] = isSelectAllResult
					} else {
						this.isSelectAll[cache2.id] = false
					}
				}
			},
			//清空当前模态框已选标签
			clearLimit() {
				sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
				sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
				this.moreCheckList = {};
				this.tagArr = {};
				this.isSelectAll = {}
			},
			//点击选择或取消选择一个标签,接收两个参数，所点标签对象以及所点标签所在组对象
			selectItem(item, itemParent) {
				item.checked = !item.checked;

				let selected = this.moreCheckList[itemParent.id]
				let tagArrSelected = this.tagArr[itemParent.id]
				if(!selected) { //从来没有选中过该组的。则初始一下
					selected = []
				}
				if(!tagArrSelected) { //从来没有选中过该组的。则初始一下
					tagArrSelected = []
				}

				if(itemParent.isMultiselect == 1) { //允许多选
					let index = selected.indexOf(item.id);
					if(index == -1) {
						selected.push(item.id);
						tagArrSelected.push(item.title);

						//判断多选显示
						for(let i = 0; i < this.tagListAllCache1.length; i++) {
							if(itemParent.id == this.tagListAllCache1[i].id) {
								let isSelectAllResult = true
								let cache1 = this.tagListAllCache1[i]
								for(let j = 0; j < cache1.children.length; j++) {
									let index1 = selected.indexOf(cache1.children[j].id)
									if(index1 == -1) {
										isSelectAllResult = false
										break;
									}
								}
								this.isSelectAll[cache1.id] = isSelectAllResult
								break;
							}
						}
						for(let i = 0; i < this.tagListAllCache2.length; i++) {
							if(itemParent.id == this.tagListAllCache2[i].id) {
								let isSelectAllResult = true
								let cache2 = this.tagListAllCache2[i]
								for(let j = 0; j < cache2.children.length; j++) {
									let index1 = selected.indexOf(cache2.children[j].id)
									if(index1 == -1) {
										isSelectAllResult = false
										break;
									}
								}
								this.isSelectAll[cache2.id] = isSelectAllResult
								break;
							}
						}
						for(let i = 0; i < this.tagListAllCache3.length; i++) {
							if(itemParent.id == this.tagListAllCache3[i].id) {
								let isSelectAllResult = true
								let cache2 = this.tagListAllCache3[i]
								for(let j = 0; j < cache2.children.length; j++) {
									let index1 = selected.indexOf(cache2.children[j].id)
									if(index1 == -1) {
										isSelectAllResult = false
										break;
									}
								}
								this.isSelectAll[cache2.id] = isSelectAllResult
								break;
							}
						}
					} else {
						selected.splice(index, 1);
						tagArrSelected.splice(index, 1);
						this.isSelectAll[itemParent.id] = false
					}
				} else { //只能单选
					let index = selected.indexOf(item.id);
					if(index == -1) {
						selected = [item.id];
						tagArrSelected = [item.title];
					} else {
						selected = [];
						tagArrSelected = [];
					}
				}

				this.$set(this.moreCheckList, itemParent.id, selected)
				this.$set(this.tagArr, itemParent.id, tagArrSelected)
			},
			//选择标签模态框，确定按钮
			ok1() {
				this.tagList = [];
				sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
				sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));

				if(JSON.stringify(this.moreCheckList) == '{}') { //如果没有选中一个标签。显示不限
					this.isShow = this.isActive = true;
					this.isActive1 = false;
				} else {
					this.isActive1 = this.isShow = false;
					for(let myKey in this.tagArr) {
						this.tagArr[myKey].forEach((item, key) => {
							this.tagList.push(item);
						});
					}
				}
				let tagsArray = [];
				for(let key in this.moreCheckList) {
					this.moreCheckList[key].forEach((item, index) => {
						tagsArray.push(item)
					})
				}
				// console.log(this.moreCheckList)
				let tagStr = tagsArray.join(',')
				if(this.isPact) {
					let arr = [];
					this.tagListAll.forEach((v, k) => {
						v.children.forEach((val, okey) => {
							if(tagsArray.indexOf(val.id) != -1) {
								arr.push({
									id: val.id,
									parentId: v.id,
									name: val.title,
									isDirect: val.isDirect
								})
							}
						})
					})
							console.log('002')
					this.$emit('getTagName', arr)
				} else {
							console.log('003')
					this.$emit('getTagName', this.tagList, tagStr)
				}
				this.moreCheckList = {};
				this.tagArr = {};
			},
			//选择标签模态框，取消按钮
			cancel4() {
				// this.isActive = true;
				// this.isActive1 = false;
				this.moreCheckList = {};
				this.tagArr = {};
			},
			/*标签筛选相关方法end*/
		},

		watch: {
			hasSelected: {
				handler(val, oval) {
					this.tagList=[];
					// this.moreCheckList = this.selected.map(item => item.id);
					// this.tagArr = this.selected.map(item => item.title);
					this.getBuildTreeForEdit(this.menuId, '0', this.hasSelected);
					this.getBuildTreeForEdit(this.menuId, '1', this.hasSelected);
					this.getBuildTreeForEdit('', '', this.hasSelected);
					// if(!this.moreCheckList.length) { //如果没有选中一个标签。显示不限
					//     this.isShow = this.isActive = true;
					//     this.isActive1 = false;
					// } else {
					//     this.isActive1 = this.isShow = false;
					//     this.tagArr.forEach((item, key) => {
					//         this.tagList[key] = item;
					//     });
					// }
				},
				deep: true
			}
		},
	}
</script>