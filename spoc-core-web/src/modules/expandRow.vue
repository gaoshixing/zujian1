<style lang="less">
	.res-expand-row {
		.row-item {
			overflow: hidden;
			line-height: 40px;
			.item-foldable{
				cursor: initial;
			}
		}
	}
</style>
<template>
	<div class="res-expand-row">
		<div class="row-item" v-for="(item,index) in subMenuList" :key="index">
			<div class="item-foldable"></div>
			<div class="item-name">{{item.name}}</div>
			<div class="item-href">{{item.href}}</div>
			<div class="item-sort"></div>
			<div class="item-visible">{{item.isShow==1?"可见":"隐藏"}}</div>
			<div class="item-permission">{{item.permission}}</div>
			<div class="item-ctrls" v-if="edit">
				<a href="javascript:void(0)" class="linkbtn" @click="showModify(item)">修改</a>
				<a href="javascript:void(0)" class="linkbtn" @click="showDelMenu(item)">删除</a>
			</div>
		</div>
		<!--修改弹窗-->
		<Modal v-if="edit" v-model="updateMenuForm.visible" title="修改下级菜单">
            <div>
                <i-form ref="updatemenu" :model="updateMenuForm" :rules="updateMenuForm.ruleValidate" :label-width="80">
                    <form-item label="名称" prop="name">
                        <i-input v-model="updateMenuForm.name" placeholder="请输入菜单名称"></i-input>
                    </form-item>
                    <form-item label="上级菜单">
                        <span v-text="row.name"></span>
                    </form-item>
                    <form-item label="链接" prop="href">
                        <i-input v-model="updateMenuForm.href" placeholder="请输入菜单链接"></i-input>
                    </form-item>

                    <form-item label="排序" prop="sort">
                        <InputNumber v-model="updateMenuForm.sort" @on-change='sortChange(updateMenuForm.sort)'></InputNumber>
                    </form-item>
                    <form-item label="状态" prop="isShow">
                        <i-switch size="large" v-model="updateMenuForm.isShow">
                            <span slot="open">显示</span>
                            <span slot="close">隐藏</span>
                        </i-switch>
                    </form-item>
                    <form-item label="权限" prop="permission">
                        <i-input v-model="updateMenuForm.permission" placeholder="控制器中定义的权限标识，如：@RequiresPermissions“权限标识”"></i-input>
                    </form-item>
                    <form-item label="描述" prop="remarks" class="last-child">
                        <i-input v-model="updateMenuForm.remarks" type="textarea" placeholder="描述内容" :rows="2"></i-input>
                    </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="updateMenuClose">取消</Button>
                <Button type="primary" @click="updateMenuOk">确定</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
	import valid, { errors, getSubMenu, deleteMenu, addMenu,getMenuById } from '../libs/request';
    import {mapMutations} from 'vuex';
	export default {
		props: {
			row: {
				type: Object,
				default: function() {
					return {};
				}
			},
			edit:{
				type:Boolean,
				default:true,
			}
		},
		data() {
			return {
				subMenuList:[],
				updateMenuForm: {
					visible: false,
					name: '',
					href: '',
					isShow: false,
					permission: '',
					remarks:'',
					ruleValidate: {
						name: [
							{ required: true, message: '模块名称不能为空', trigger: 'blur' }
						],
						href: [
						],
						sort: [
							{ required: true }
						],
						isShow: [
							{ required: true }
						],
						permission: [
							{ required: true, message: '请填写链接', trigger: 'blur' }
						],
						remarks: [
                            { required: false , type:'string', max:100, message:'描述最大100个字符', trigger: 'blur' }
                        ]
					}

				}
			};

		},
		created() {
			this.getList()
		},
		methods: {
            ...mapMutations(['updateLoadingStatus']),
			getList() {
				// this.updateLoadingStatus({isLoading: true});
				let param = {
					'parent.id':this.row.id
				};
				getSubMenu(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.subMenuList = res.data.data.list;
					}
				}).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading: false});
				});
			},
			showDelMenu(item){
				this.$Modal.confirm({
                    title: '删除下级菜单',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
						this.updateLoadingStatus({isLoading: true});
                        deleteMenu(item.id).then(valid.call(this)).then( res => {
                            if(res.ok){
                                this.getList();
                            }
                        }).catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({isLoading: false});
						});
                    }
				});
			},
			showModify(item){
				this.updateMenuForm.name = item.name;
				this.updateMenuForm.href = item.href;
				this.updateMenuForm.permission = item.permission;
				this.updateMenuForm.sort = item.sort;
				this.updateMenuForm.isShow = item.isShow == '1'?true:false;
				this.updateMenuForm.remarks = item.remarks;
				
				this.updateMenuForm.update = item;
                this.updateMenuForm.visible = true;
               
			},
			updateMenuClose(){
				this.updateMenuForm.visible = false;
			},
			updateMenuOk(){
				this.$refs.updatemenu.validate((vad) => {
					if(vad) {
						let info = {
							name: this.updateMenuForm.name,
							remarks: this.updateMenuForm.remarks,
							sort: this.updateMenuForm.sort,
							href: this.updateMenuForm.href,
							permission: this.updateMenuForm.permission,
							isShow: this.updateMenuForm.isShow ? 1 : 0,
							id: this.updateMenuForm.update.id
						};
						this.updateLoadingStatus({isLoading: true});
						addMenu(info).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.updateMenuClose();
								this.getList();
                            }
                        }).catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({isLoading: false});
						});
                    }
				});
			},
		},
		
	};
</script>