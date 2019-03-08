// 学院管理
<style lang="less">
.lib_academe_manage_container {
	td.canClick,
	td.academeName,
	td.school {
		color: #44bcb7;
		cursor: pointer;
	}
	.tool{
		.ivu-tooltip-inner{
			white-space:pre-line;
		}
	}
	td.school{
		text-align: center;
		vertical-align: middle;   
	}
	.ivu-tooltip-inner{
		max-width: 500px;
	}
	img {
		vertical-align: middle;
	}
	.btns {
		display: flex;
		button {
			margin-left: 10px;
		}
		.bt1 {
			color: #e8352c;
			border: 1px solid #e8352c;
		}
		.bt2 {
			border: 1px solid #999999;
			margin: 0;  
		}
		.bt3 {
			background: #44bcb7;
			color: #fff;
		}
		.bt4 {
			border-color: #73cdc9;
			color: #73cdc9;
		}
	}
	.ivu-select {
		z-index: 999;
	}
	.search-box{
		margin: 10px 0;
		width: 375px;
	}
	.page{
		text-align: center;
		margin-top: 20px;
	}
	.search{
		margin: 10px 0;
		width: 396px;
	}
	.ivu-dropdown{
		button{
			margin: 0;
			transform: translate(-10px);
		}
		.ivu-btn-primary{
			background-color: #f7f7f7;
			color: #495060;
			border-color: #999;
		}
	}
	.logoName,.ranking{
		.ivu-table-cell {
			padding-left: 0;
			padding-right: 0;
		}
	}
	th.logoName{
		span:nth-of-type(1){
			padding-left: 15px;
			display: none;
		}
	}
	th.ranking{
		.ivu-table-cell{
			 padding-left: 5px;
		}
	}
	td.ranking{
		.ivu-table-cell{
			overflow: visible !important;
		}
	}
	.ivu-table-body{
		overflow: visible;
	}
}
</style>
<template>
	<div class="lib_academe_manage_container">
		<div class="search-box">
			<v-select placeholder="输入关键词搜索" icon="search" v-model="search.text" k='cnname' :datafunc="searchDropList" @on-enter="onSearch" @on-click="onSearch" @selected="onSearch">
			</v-select>
		</div>

		<v-title title="学院-列表">
			<div slot="right" class="btns">
				<Button class="bt1" @click="delComfirm" v-show="selectedItemId.length>0">删除学院</Button>
				<Dropdown @on-click="exportCurr">
					<Button type="ghost" style="border: 1px solid #999999;">
						导出学院<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1" style="text-align: center;display: block;">导出当前</DropdownItem>
						<DropdownItem :name="0" style="text-align: center;display: block;">导出所有</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button class="bt2" @click="importAcademe">导入学院</Button>
				<Button class="bt3" @click="addAcademe">添加学院</Button>
			</div>      
		</v-title>
		<Table :columns="schoolColumn" :data="schoolList.list" @on-selection-change="onTableItemSelect" @on-sort-change="onSortChange"></Table>
		<div class="page">
			<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="schoolList.pageNo" :total="schoolList.count" @on-change="onPageChange" v-if="schoolList.count>10"></Page>
		</div>
	<form class="formexport" :action="exportUrl" method="post" target="_blank">
		<input type="hidden" name="ids" v-model="exportData" />
	</form>
	</div>
</template>
<script>
import vTitle from "@public/modules/vTitle";
import valid, { errors, academeManage } from "../../libs/request";
import { mapMutations } from "vuex";
import usImg from "../../assets/images/schoolManage/addSchool/us.svg";
import ivygateImg from "../../assets/images/schoolManage/addSchool/ivygate.svg";
import vSelect  from "../../modules/vSelect";
import  logo from "../../assets/svg/logo.svg";

export default {
	name: "schoolManage",
	data() {
		return {
			exportUrl:academeManage.exportSelected(),
			exportData:'',
			us:usImg,
			ivygate:ivygateImg,
			logo:logo,
			loading:false,
			nameList:[],
			search: {
				text: ""
			},
			searchTipBoxShow: false,
			searchResList: [],
			importOpt: "",
			selectedItemId: "",
			// 获取学院列表请求参数
			listParams:{
				field:'ranking',
				sort:'asc',
				pageNo:'1',
				pageSize:'10',
				cnName:''
			},
			schoolColumn: [
				{
					type: "selection",
					width: 60,
					align: "center"
				},
				{
					width: 40,
					align: 'center',
					className:'logoName',
					render:(h , params) => {
						return h('img',{
						attrs:{
							src:params.row.logoUrl?params.row.logoUrl:this.logo
						},
						style:{
							float:'left',
							width:'40px',
							height:'40px'
						}
						})
					}
				},
				{
					sortable: 'custom',
					width: 60,
					align: 'center',
					title:'排名',
					key: 'ranking',
					className:'ranking',
					render: (h, params) => {
						return h('Tooltip', {
							'class':{
								tool:true
							},
							style: {
								'float': 'left',
								width: '60px',
								textAlign: 'left',
								padding: '0 12px',
								lineHeight: '40px',
							},
							props:{
								content:params.row.ranking=='11111'?'':params.row.ranking=='22222'?'':(!!params.row.ranking && params.row.type)?'#'+params.row.schoolRanking+' in '+(params.row.type):'',
								placement:'top',
								disabled:params.row.ranking=='11111'?true:params.row.ranking=='22222'?true:(!!params.row.ranking && params.row.type)?false:true,
							},
						},
						params.row.schoolRanking == '11111' ? 'RNP' : params.row.schoolRanking == '22222' ? 'UN' : (!!params.row.schoolRanking) ? '#' + params.row.schoolRanking : 'null')
					}
//					render:(h , params) => {
//						return h('p',
//							{
//								style:{
//									float:'left',
//									width:'60px',
//									textAlign:'left',
//									padding:'0 12px',
//									lineHeight:'40px',
//									position:'relative'
//								},
//							},
//							[h('span',{
//								style:{
//									width:'50px',
//									cursor:'pointer',
//									fontWeight:'bold',
//								},
//								attrs:{
//									'data-num':params.row.ranking,
//									'data-type':params.row.type
//								},
//								'class': {
//										rank1: params.row.ranking=='11111'?false:params.row.ranking=='22222'?false:(!!params.row.ranking && params.row.type)?true:false,
//										// rank2: params.row.ranking=='11111',
//										// rank3: params.row.ranking=='22222',
//								},
//								on:{
//									mouseover:()=>{
//										
//									}
//								}
//							},params.row.ranking=='11111'?'RNP':params.row.ranking=='22222'?'UN':(!!params.row.ranking)?'#'+params.row.ranking:'null')
//							]
//						)
//					}
				},
				{
					title: '学院',
					key: 'enName',
					align: 'left',
					sortable: 'custom',
					width:240,
					ellipsis:true,
					render:(h , params) => {
						return h('div',{
							style:{
								width:'100%',
								height:'60px',
								margin:'0 auto',
								padding:'10px 0'
							}
							},[
							,h('p',{
								style:{
									float:'left',
									width:'100%',
									boxSizing:'border-box',
									display:'inline-block',
									color:"#44bcb7",
									fontSize:'12px',
									cursor:'pointer'
								},
								on:{
									click:()=>{
										this.jumpEdit(params)
									}
								}
							},[
								h('Tooltip',{
									props:{
										placement:'top',
										content:params.row.enName
									}
								},[
									h('span',{
										style:{
											display:'block',
											lineHeight:'22px',
											textAlign:'left',
											overflow: 'hidden',
											textOverflow:'ellipsis',
											whiteSpace: 'nowrap',
										},
									},params.row.cnName)
								]),
								h('Tooltip',{
									props:{
										placement:'bottom',
										content:params.row.enName
									}
								},[
									h('span',{
										style:{
											display:'block',
											lineHeight:'22px',
											textAlign:'left',
											overflow: 'hidden',
											textOverflow:'ellipsis',
											whiteSpace: 'nowrap',
										},
									},params.row.enName)
								]),
							]),
						])
					}
				},
				{
					title:'学院类型',
					key:'type',
					align:'center',
				},
				{
					title: "隶属学校",
					key: "schoolEnname",
					align: "center",
					render: (h,params)=>{
						return h('div',{
							on:{
								click:()=>{
								// this.jumpSchoolInfo(params)
								}
							},
							style:{
								overflow:'hidden',
								margin:'0 auto',
								padding:'10px 0'
							}
						},[
								h('p',{
									style:{
										boxSizing:'border-box',
										display:'inline-block',
										color:"#44bcb7",
										fontSize:'12px',
										cursor:'pointer'        
									}
								},[
								h('span',{
										style:{
											display:'block',
											lineHeight:'20px',
											overflow: 'hidden',
											// textOverflow:'ellipsis',
											// whiteSpace: 'nowrap',
										}
								},params.row.schoolEnname),
										// h('span',{
										//     style:{
										//         display:'block',
										//         overflow: 'hidden',
										//         textOverflow:'ellipsis',
										//         whiteSpace: 'nowrap',
										//     }
										// },params.row.schoolCnname), 
								]), 
						])
					}  
				},
				{
					 title:'专业数量',
					key:'majorCount',
					align:'center',
				},
				{
					title: '学院信息来源',
					key: 'source',
					align: 'center',
					sortable: 'custom',
					render:(h , params) => {
						return h('div',{
							style:{
								textAlign:'center'
								}
						},[
							h('img', {
								attrs: {
									src:params.row.source=='ivygate'?this.ivygate:this.us
								},
								style:{
									width:'20px',
									height:'20px',
									// display:params.row.source.search(/snews/) == -1 ? 'none':''
								}
							})
							// ,h('img',{             			
							// attrs: {
							//   // src:this.ivygate
							// },
							// style:{
							//   width:'18px',
							//   height:'23px',
							//   // display:params.row.source.search(/ivygate/) == -1 ? 'none':''
							//           }
							// }
							// )
						])
					}
				},
				{
					title: "学位类型",
					key: "degree",
					align: "center"
				},
				{
					title: "信息完善度",
					key: "completeDegree",
					sortable: 'custom',
					align: "center",
					className: "canClick",
					render: (h,params)=>{
						return h('div',{
							on:{
								click:()=>{
									this.jumpEdit(params)
								}
							}
						},params.row.completeDegree)
					}
				}
			],
			schoolList: {
				pageNo: 0,
				pageSize: 10,
				count: 1,
				pageCount: 1,
				list: []
			}
		};
	},
	components: {
		vSelect,
		vTitle
	},
	created() {
		this.fetchTableList(this.listParams);
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		exportCurr(val){
			if(val==1){
				if(!this.selectedItemId.length){
					this.$Message.error('请选择学院信息');
				}else{
					let arr= this.selectedItemId.map(item=>item.id);
					let form = this.$el.querySelector('.formexport');
					this.exportData = arr.join(',');
					this.$nextTick(()=>{
						form.submit();
					});
				}
			}else{
				let params={
					searchType:0,
					keyword:this.schoolName
				}
				window.open(academeManage.exportEXCEL(params))
			}
		},
		// 获取学院列表
		fetchTableList(listParams){
			this.updateLoadingStatus({ isLoading: true });
			academeManage
			.fetchGradeschoolList(listParams)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					res.data.data.list.forEach(v => {
					v.completeDegree += '%'; 
					});
					this.schoolList = res.data.data;
					console.log(this.schoolList);
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},

		onTableItemSelect(selItem) {
			this.selectedItemId = selItem;
		},
		delComfirm(){
			if(this.selectedItemId.length>0){
				this.$Modal.confirm({
					title: '删除学院',
					content: '您确定要删除所选内容吗？删除后将无法恢复',
					onOk: () => {
						this.updateLoadingStatus({ isLoading: true });
						academeManage
						.delete(this.selectedItemId.map(item=>item.id))
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.fetchTableList(this.listParams);
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({ isLoading: false });
						});
					}
				});	
			}
		},
		importAcademe() {
			this.$router.push({name:'library.import',query:{t:'grade_school'}});
		},
		addAcademe() {
			this.$router.push({
				name: "library.academeBasicInfo",
				params: { currentTitle: 0, processStep: 1 }
			});
		},
		onSearch(){
			this.$nextTick(()=>{
				this.listParams.pageNo = 1;
				this.listParams.cnName = this.search.text;
				this.fetchTableList(this.listParams);
			});
		},
		// 学院搜索（按名称联想）
		searchDropList(word){
			return new Promise((resolve,reject)=>{
				academeManage.academySearch(word).then(valid.call(this)).then(res=>{
					if(res.ok){
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err=>{
					errors.call(this);
					reject(err);
				});
			});
		},

		// 表格排序
		onSortChange(val){
			if(val.order ==='normal') return;
			this.listParams.sort=val.order;
			if(val.key =='enName'){
				this.listParams.field= 'en_name';
			}else if(val.key =='completeDegree'){
				this.listParams.field= 'complete_degree';
			}else{
				this.listParams.field= val.key;
			}
			this.fetchTableList(this.listParams)
		},
		// 分页
		onPageChange(val){
			this.listParams.pageNo = val;
			this.fetchTableList(this.listParams);
		},
		//跳转学校详情页
		jumpSchoolInfo(params){
			this.$router.push({name:'library.schoolDetail',query:{id:params.row.id}})
		},
		//跳转学院编辑页
		jumpEdit(params){
			this.$router.push({
				name: "library.academeBasicInfo",
				params: { currentTitle: 1, processStep: 1 },
				query:{schoolId:params.row.id,'edit': 1,}
			})
		},
		//跳转学院详情页
		jumpAcademeInfo(params){
			this.$router.push({
				name: "library.academeDetail",
				query:{gradeSchoolId:params.row.id}
			});
		},
		onPageSizeChange(pageSize){
			this.listParams.pageSize = pageSize;
			this.fetchTableList(this.listParams);
		}
	}
};
</script>




