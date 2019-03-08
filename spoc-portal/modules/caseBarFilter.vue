<style lang="less" scoped>
	.analyseBarFilter {
		line-height: 24px;
		.titleBar {
			font-size: 12px;
			span {
				padding: 5px 12px;
				cursor: pointer;
				margin-right: 10px;
				display: inline-block;
				line-height: 14px;
				margin-top: 4px;
			}
			span:first-child {
				cursor: auto;
				color: #b8b8b8;
				display: inline-block;
				padding: 0;
				margin-right: 15px;
				box-sizing: border-box;
			}
			.active {
				background-color: #44bcb6;
				color: white;
			}
		}
	}
	
	.dialogCGSX {
		.tagType {
			line-height: 40px;
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
			.customerType .tags>span {
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
	<div class="analyseBarFilter">
		<div class="titleBar">
			<p>
				<span :style="{marginRight:mgt+'px',width:width+'px',textAlign:align,color:titColor||colrT}">{{title}}</span>
				<span v-if="isShow" :class="{active: isActive}">不限</span>
				<span v-for="(item, index) in tagList" class="active" :key="index">{{item}}</span>
				<span @click="limitTagClick" :class="{active: isActive1}">+筛选</span>
			</p>
		</div>
		<Modal v-model="isShowDialog" class-name="dialog" title="选择标签" width=568 :transfer="false" :mask-closable="false" :closable="false">
			<div class="dialogCGSX">
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
						<div style="line-height:40px">
							<p style="display:inline;color:#44bcbc;margin-right:5px">{{item.title}} <span v-if="(item.id=='2021'||item.id=='2014')&&isLibrary">(必选)</span></p>
							<span @click="showAllTag(item)" style="cursor:pointer">
                                <Icon v-if="!item.checked" type="chevron-down"></Icon>
                                <Icon v-else type="chevron-up"></Icon>
                            </span>
							<Checkbox style="margin-left:15px;" v-model="isSelectAll[item.id]" @on-change="selectAll(item.id)">全选</Checkbox>
						</div>
						<div class='tags' v-if="!item.checked">
							<span @click="selectItem(itemChild,item.id)" v-for="(itemChild, index) in item.children" :key="index" :class="{'active':moreCheckList.indexOf(itemChild.id)!=-1}">{{itemChild.title}}</span>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button @click="cancel">关闭</Button>
				<Button type="primary" @click="ok">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import valid, {
		errors,
		common,
	} from "../libs/request";
	export default {
		props: {
			isLibrary: {
				type: Boolean,
				default: false
			},
			modelName: {
				type: String,
				default: '规划模块'
			},
			isDirect: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: "　　筛选："
			},
			align: {
				type: String,
				default: "center"
			},
			titColor: {
				type: String,
				default: "#b8b8b8"
			},
			from: {
				type: Number, //从哪个组件调用过来的 1交接 2接案
				default: 1
			},
			width: {
				type: [Number, String], //从哪个组件调用过来的 1交接 2接案
				default: 60
			},
			colrT: {
				type: [Number, String], //从哪个组件调用过来的 1交接 2接案
				default: 'b8b8b8'
			},
			mgt: {
				type: [Number, String], //从哪个组件调用过来的 1交接 2接案
				default: 15
			},
			//标签范围， 401为指定标签， 空字符串''为全部标签
			menuId: {
				type: String,
				default: "401"
			},
			rightType: {
				type: String,
				default: ""
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				radioV: true,
				id: this.menuId,
				isShow: true, //是否显示《不限》
				isActive: true, //不限按钮样式标识
				isActive1: false, //筛选按钮样式标识
				isShowDialog: false, //是否显示筛选标签模态框
				TagKind: "limitTag",
				tagList: [], //在页面上显示，确定后已选中的标签名称。['标签Aa','高中','哈哈哈']
				tagListAll: [], //模态框中，渲染页面用的标签全集合，会根据menuId变化而变化
				moreCheckList: [], //已选中ID集合 [1,2,333]
				tagArr: [], //已选中的标签名称集合 
				tagListAllCache1: [], //指定标签备选项缓存，避免切换tab时重复请求标签接口
				tagListAllCache2: [], //全局标签备选项缓存，避免切换tab时重复请求标签接口
				tagListAllCache3: [], //全局标签备选项缓存，避免切换tab时重复请求标签接口
				isSelectAll: {} //是否全选
			};
		},
		created() {
			// let obj = {
			// 	menuId: this.id
			// };
			// common.buildTree(obj)
			// 	.then(valid.call(this))
			// 	.then(res => {
			// 		if(res.ok) {
			// 			this.tagListAll = res.data.data.children;
			// 			if(this.id != '') { //指定标签
			// 				this.tagListAllCache1 = res.data.data.children
			// 				res.data.data.children.forEach((item, index) => {
			// 					this.isSelectAll[item.id] = false
			// 				})
			// 			}
			// 			if(this.id == '') { //全局标签
			// 				this.tagListAllCache2 = res.data.data.children
			// 				res.data.data.children.forEach((item, index) => {
			// 					this.isSelectAll[item.id] = false
			// 				})
			// 			}
			// 			if(this.selected.length) {
			// 				this.tagList = [];
			// 				this.moreCheckList = this.selected.map(item => item.id);
			// 				this.tagArr = this.selected.map(item => item.title);
			// 				sessionStorage.setItem("moreCheckList", this.moreCheckList); //缓存已选标签ID
			// 				sessionStorage.setItem("tagArr", this.tagArr); //缓存已选标签名称
			// 				this.emitCheck();
			// 				if(!this.moreCheckList.length) { //如果没有选中一个标签。显示不限
			// 					this.isShow = this.isActive = true;
			// 					this.isActive1 = false;
			// 				} else {
			// 					this.isActive1 = this.isShow = false;
			// 					this.tagArr.forEach((item, key) => {
			// 						this.tagList[key] = item;
			// 					});
			// 				}
			// 			}
			// 		}
			// 	})
			// 	.catch(errors.call(this))
			// 	.finally(() => {});
		},
		mounted() {
			sessionStorage.setItem("moreCheckList", []); //清空缓存
			sessionStorage.setItem("tagArr", []); //清空缓存
		},
		methods: {
			showAllTag(val) {
				val.checked = !val.checked
			},
			//全选
			selectAll(parentId) {
				let isCheckedAll = this.isSelectAll[parentId]
				this.tagListAllCache1.forEach((item) => {
					if(item.id == parentId) {
						item.children.forEach((itemChild) => {
							itemChild.checked = isCheckedAll
							let index = this.moreCheckList.indexOf(itemChild.id);
							if(index == -1 && isCheckedAll) { //全选
								this.moreCheckList.push(itemChild.id);
								this.tagArr.push(itemChild.title);
							}
							if(index != -1 && !isCheckedAll) { //取消全选
								this.moreCheckList.splice(index, 1);
								this.tagArr.splice(index, 1);
							}
						})
					}
				})
				this.tagListAllCache2.forEach((item) => {
					if(item.id == parentId) {
						item.children.forEach((itemChild) => {
							itemChild.checked = isCheckedAll
							let index = this.moreCheckList.indexOf(itemChild.id);
							if(index == -1 && isCheckedAll) { //全选
								this.moreCheckList.push(itemChild.id);
								this.tagArr.push(itemChild.title);
							}
							if(index != -1 && !isCheckedAll) { //取消全选
								this.moreCheckList.splice(index, 1);
								this.tagArr.splice(index, 1);
							}
						})
					}
				})
				this.tagListAllCache3.forEach((item) => {
					if(item.id == parentId) {
						item.children.forEach((itemChild) => {
							itemChild.checked = isCheckedAll
							let index = this.moreCheckList.indexOf(itemChild.id);
							if(index == -1 && isCheckedAll) { //全选
								this.moreCheckList.push(itemChild.id);
								this.tagArr.push(itemChild.title);
							}
							if(index != -1 && !isCheckedAll) { //取消全选
								this.moreCheckList.splice(index, 1);
								this.tagArr.splice(index, 1);
							}
						})
					}
				})
			},
			//为tagListAll赋值，渲染标签选择页面。ID不同，渲染的内容不同
			getBuildTree(param = {}) {
				let obj = {
					menuId: this.id,
					rightType: this.rightType
				};
				obj = Object.assign(obj, param)
				common.buildTree(obj)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.tagListAll = res.data.data.children.map((item, key) => {
								if(!key) item.checked = false
								return item
							});
							if(this.id != '') { //指定标签
								if(obj.isSys == 1) {
									if(!this.tagListAllCache1.length) {
										this.tagListAllCache1 = res.data.data.children
										res.data.data.children.forEach((item, index) => {
											this.isSelectAll[item.id] = false
										})
									}
								} else {
									if(!this.tagListAllCache3.length) {
										this.tagListAllCache3 = res.data.data.children
										res.data.data.children.forEach((item, index) => {
											this.isSelectAll[item.id] = false
										})
									}
								}

							}
							if(this.id == '') { //全局标签
								if(!this.tagListAllCache2.length) {
									this.tagListAllCache2 = res.data.data.children
									res.data.data.children.forEach((item, index) => {
										this.isSelectAll[item.id] = false
									})
								}
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			//切换标签类别，重新渲染备选项
			radioChange(val) {
				this.id = val == "allTag" ? "" : this.menuId;
				if(val == 'limitTag') { //指定标签
					if(this.tagListAllCache1.length) {
						this.tagListAll = this.tagListAllCache1
					} else {
						let obj = {
							isSys: 1,
						}
						this.getBuildTree(obj)
					}
				}
				if(val == 'userDefine') { //自定义
					if(this.tagListAllCache3.length) {
						this.tagListAll = this.tagListAllCache3
					} else {
						let obj = {
							isSys: 0,
						}
						this.getBuildTree(obj)
					}
				}

				if(val == 'allTag') { //全局标签
					// console.log(this.tagListAllCache2)
					if(this.tagListAllCache2.length) {
						this.tagListAll = this.tagListAllCache2
					} else {
						this.getBuildTree();
					}
				}
			},
			//打开选择标签模态框
			limitTagClick() {
				this.id = this.menuId
				if(this.id) this.TagKind = 'limitTag'
				let obj = {
					isSys: 1,
				}
				this.getBuildTree(obj);
				if(sessionStorage.getItem("moreCheckList") && sessionStorage.getItem("tagArr")) {
					this.moreCheckList = sessionStorage.getItem("moreCheckList").split(",");
					this.tagArr = sessionStorage.getItem("tagArr").split(",");
				}
				this.isActive = false;
				this.isActive1 = this.isShowDialog = true;
				//如果选择后点击了取消，重新打开页面的时候需要重新渲染全选状态
				for(let i = 0; i < this.tagListAllCache1.length; i++) {
					let isSelectAllResult = true
					for(let j = 0; j < this.tagListAllCache1[i].children.length; j++) {
						let index1 = this.moreCheckList.indexOf(this.tagListAllCache1[i].children[j].id)
						if(index1 == -1) {
							isSelectAllResult = false
							break;
						}
					}
					this.isSelectAll[this.tagListAllCache1[i].id] = isSelectAllResult
				}
				for(let i = 0; i < this.tagListAllCache2.length; i++) {
					let isSelectAllResult = true
					for(let j = 0; j < this.tagListAllCache2[i].children.length; j++) {
						let index2 = this.moreCheckList.indexOf(this.tagListAllCache2[i].children[j].id)
						if(index2 == -1) {
							isSelectAllResult = false
							break;
						}
					}
					this.isSelectAll[this.tagListAllCache2[i].id] = isSelectAllResult
				}
				for(let i = 0; i < this.tagListAllCache3.length; i++) {
					let isSelectAllResult = true
					for(let j = 0; j < this.tagListAllCache3[i].children.length; j++) {
						let index2 = this.moreCheckList.indexOf(this.tagListAllCache3[i].children[j].id)
						if(index2 == -1) {
							isSelectAllResult = false
							break;
						}
					}
					this.isSelectAll[this.tagListAllCache3[i].id] = isSelectAllResult
				}
			},
			//清空已选项，但未提交
			clearLimit() {
				sessionStorage.setItem("moreCheckList", this.moreCheckList); //缓存已选标签ID
				sessionStorage.setItem("tagArr", this.tagArr); //缓存已选标签名称
				this.moreCheckList = [];
				this.tagArr = [];
				this.isSelectAll = {}
			},
			//点击选择或取消选择一个标签
			selectItem(item, parentId) {
				item.checked = !item.checked;
				let index = this.moreCheckList.indexOf(item.id);
				if(index == -1) {
					this.moreCheckList.push(item.id);
					this.tagArr.push(item.title);
					//判断是否全选
					let isSelectAllResult = true
					for(let i = 0; i < this.tagListAllCache1.length; i++) {
						if(this.tagListAllCache1[i].id == parentId) {
							for(let j = 0; j < this.tagListAllCache1[i].children.length; j++) {
								let index1 = this.moreCheckList.indexOf(this.tagListAllCache1[i].children[j].id)
								if(index1 == -1) {
									isSelectAllResult = false;
									break;
								}
							}
							break;
						}
					}
					for(let i = 0; i < this.tagListAllCache2.length; i++) {
						if(this.tagListAllCache2[i].id == parentId) {
							for(let j = 0; j < this.tagListAllCache2[i].children.length; j++) {
								let index2 = this.moreCheckList.indexOf(this.tagListAllCache2[i].children[j].id)
								if(index2 == -1) {
									isSelectAllResult = false;
									break;
								}
							}
							break;
						}
					}
					for(let i = 0; i < this.tagListAllCache3.length; i++) {
						if(this.tagListAllCache3[i].id == parentId) {
							for(let j = 0; j < this.tagListAllCache3[i].children.length; j++) {
								let index2 = this.moreCheckList.indexOf(this.tagListAllCache3[i].children[j].id)
								if(index2 == -1) {
									isSelectAllResult = false;
									break;
								}
							}
							break;
						}
					}
					this.isSelectAll[parentId] = isSelectAllResult
				} else {
					this.isSelectAll[parentId] = false //取消全选
					this.moreCheckList.splice(index, 1);
					this.tagArr.splice(index, 1);
				}
			},
			ok() {
				sessionStorage.setItem("moreCheckList", this.moreCheckList); //缓存已选标签ID
				sessionStorage.setItem("tagArr", this.tagArr); //缓存已选标签名称
				/*  
				    resultObj start
				    接案标签筛选需要一个map，key为父标签ID，value为选中子标签ID集合数组.
				    一个子标签都没选中的父标签不要传递
				     [{"id": "1", "childTags": [{"id": "102"},{"id": "103"}]},{"id": "2", "childTags": [{"id": "104"},{"id": "105"}]}],
				*/
				let resultArr = [];
				if(this.from == 3) {
					this.tagListAllCache1.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache2.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache3.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
				} else {
					this.tagListAllCache1.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache2.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache3.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
				}
				/*resultObj END*/
				this.tagList = [];
				if(!this.moreCheckList.length) { //如果没有选中一个标签。显示不限
					this.isShow = this.isActive = true;
					this.isActive1 = false;
				} else {
					this.isActive1 = this.isShow = false;
					this.tagArr.forEach((item, key) => {
						this.tagList[key] = item;
					});
				}
				if(this.isLibrary){
					let arr1 = ['2022', '2023', '2024', '2025'];
					let arr2 = ['2015', '2016', '2017', '2018', '2019', '2020'];
					let flag1 = false;
					let flag2 = false;
					this.moreCheckList.forEach((v, k) => {
						if(arr1.indexOf(v) > -1) {
							flag1 = true;
						}
						if(arr2.indexOf(v) > -1) {
							flag2 = true;
						}
						console.log(v)
					})
					console.log((flag1 && flag2))
					if(!(flag1 && flag2)) {
						this.$Modal.confirm({
							onOk: function() {
								return false;
							},
							onCancel: function() {
								return false;
							},
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, '服务等级、服务类型不能为空， 请继续添加。 ')
							}
						});
						return false;
					}
				}
				if(this.from == 1) { //交接列表
					this.$emit("tagListChange", this.moreCheckList)
				}
				if(this.from == 2) { //接案管理
					this.$emit("tagListChange", resultArr)
				}
				if(this.from == 3) { //接案管理
					this.$emit("tagListChange", resultArr)
				}
				this.moreCheckList = [];
				this.tagArr = [];
				this.isShowDialog=false;
			},
			emitCheck() {
				let resultArr = [];
				if(this.from == 3) {
					this.tagListAllCache1.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache2.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache3.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id,
									parentId: item1.id,
									name: item2.title,
									isDirect: item2.isDirect
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
				} else {
					this.tagListAllCache1.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache2.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
					this.tagListAllCache3.forEach((item1, key1) => {
						let resultObj = {}
						resultObj.id = item1.id;
						resultObj.childTags = [];
						item1.children.forEach((item2, key2) => {
							if(this.moreCheckList.indexOf(item2.id) > -1) {
								resultObj.childTags.push({
									id: item2.id
								})
							}
						});
						if(resultObj.childTags.length != 0) {
							resultArr.push(resultObj)
						}
					});
				}
				if(this.from == 1) { //交接列表
					this.$emit("tagListChange", this.moreCheckList)
				}
				if(this.from == 2) { //接案管理
					this.$emit("tagListChange", resultArr)
				}
				if(this.from == 3) { //接案管理
					this.$emit("tagListChange", resultArr)
				}
				console.log(resultArr)
			},
			cancel() {
				this.isShowDialog = false;
				this.isActive = true;
				this.isActive1 = false;
				this.moreCheckList = [];
				this.tagArr = [];
			}
		},
		watch: {
			selected: {
				handler(val, oval) {
					this.tagList = [];
					this.moreCheckList = this.selected.map(item => item.id);
					this.tagArr = this.selected.map(item => item.title||item.name);
					sessionStorage.setItem("moreCheckList", this.moreCheckList); //缓存已选标签ID
					sessionStorage.setItem("tagArr", this.tagArr); //缓存已选标签名称
					this.emitCheck();
					if(!this.moreCheckList.length) { //如果没有选中一个标签。显示不限
						this.isShow = this.isActive = true;
						this.isActive1 = false;
					} else {
						this.isActive1 = this.isShow = false;
						this.tagArr.forEach((item, key) => {
							this.tagList[key] = item;
						});
					}
				},
				deep: true
			}
		}
	};
</script>