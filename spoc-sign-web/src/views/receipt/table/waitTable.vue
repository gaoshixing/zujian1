<style lang="less">
	
</style>

<template>
	<div>
		<Table ref="wait" :columns="columns" :data="data" @on-sort-change="sort" @on-selection-change="selection"></Table>
		
	    <Modal v-model="rejectModel" title="驳回报账申请" width="750" class="rejectModel">
			<div>
			    <Form :model="formInline" :label-width="80">
		        	<p style="color: red;padding: 0 0 24px 16px;">* 请您仔细检查报账信息</p>
			        <FormItem label="驳回原因">
			            <Input type="textarea" :rows="4" v-model="formInline.rejectReasons" placeholder="请输入原因">
			            </Input>
			        </FormItem>
			    </Form>
			</div>
	        <div slot="footer">
	            <Button type="primary" @click="reject">驳回</Button>
	            <Button type="ghost" @click="rejectModel=false">取消</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	export default {
		props: {
			'tableSelectedItem': {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {
				pitchItem: '',
				formInline:{
					ctId:'',
					rejectReasons:''
				},
				rejectModel:false,
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '合同编号',
						key: 'ctNo',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, [
								h('span', {
									style: {
										color: '#41b3ae',
										cursor:'pointer',
									},
									on:{
										click:()=>{this.jumpView(params.row)}
									}
								}, params.row.ctNo),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#41b3ae',
										fontSize: '14px',
										display:params.row.isProtocol==1?'':'none'
									}
								}, '')
							])
						},
					},
                    {
                        title: '签约客户',
                        key: 'studentName',
                        align: 'center'
                    },
					{
						title: '签约人',
						key: 'applyerName',
						align: 'center'
					},
					{
						title: '报账时间',
						key: 'applyTime',
						align: 'center'
					},
					{
						title: '应收金额',
						key: 'curReceipt',
						align: 'center',
						sortable: 'custom',

					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, [
								h("a", {
									style: {
										color: '#41b3ae',
										fontSize: '12px',
										margin:"0 6px"
									},
									attrs: {
										type: 'text'
									},
									on: {
										click: () => {
											this.$emit('check', params.row)
										}
									}
								}, '查看'),
								//                  			h("Button",
								//                  				{	
								//										style: {
								//										    color: '#e83323',
								//										    fontSize: '12px'
								//										},
								//										attrs: {
								//											type:'text'
								//										},
								//										on:{
								//											click:()=>{
								//												let arr=[]
								//												arr.push(params.row)
								//									            this.delMajor('删除专业',arr)
								//											}
								//										}
								//                  				},'删除'
								//                  			),
								h("a", {
									style: {
										color: '#41b3ae',
										fontSize: '12px',
										margin:"0 6px"
									},
									attrs: {
										type: 'text'
									},
									on: {
										click: () => {
											this.$emit('receipt', params.row)
										}
									}
								}, '收款'),
								h("a", {
									style: {
										color: '#41b3ae',
										fontSize: '12px',
										margin:"0 6px"
									},
									attrs: {
										type: 'text'
									},
									on: {
										click: () => {
											this.formInline.ctId=params.row.ctId;
											this.rejectModel=true;
										}
									}
								}, '驳回'),
							])
						}
					}
				],
			}
		},
		computed: {
			data: function() {
				return this.tableSelectedItem;
			}
		},
		methods: {
			sort(data) {
				let sortType = '';
				if(data.order != 'normal') {
					sortType = data.order;
					this.$emit('sort', data.key, sortType)
				}
			},
			selection(data) {
				this.$emit('select', data)
			},
			jumpView(data) {
				this.$emit('jumpView', data)
			},
			reject(){
				this.$emit('reject', this.formInline);
				this.rejectModel=false;
			}
		}
	}
</script>