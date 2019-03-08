<style lang="less">
</style>

<template>
	<Table ref="wait" :columns="columns" :data="data" @on-sort-change="sort" @on-selection-change="selection"></Table>
</template>

<script>
	export default{
		props:{
			'tableSelectedItem':{
				type:Array,
				default:function (){
					return [];
				}
			},
		},
		data(){
			return{
				pitchItem:'',
				columns:[
                    {
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
                        title: '应收金额',
                        key: 'signPrice',
                        align: 'center',
                        sortable: 'custom',
                    },
                    {
                        title: '已收金额',
                        key: 'factRecipotSum',
                        align: 'center',
                    },
                    {
                        title: '最终收款时间',
                        key: 'finalCollectionTime',
                        align: 'center',
                        sortable: 'custom',
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'center',
                        render:(h,params)=>{
                        	return h('div',{
                    		},[
                    			h("a",
                    				{	
										style: {
										    color: '#41b3ae',
										    fontSize: '12px',
										margin:"0 6px"
										},
										attrs: {
											type:'text'
										},
										on:{
											click:()=>{
												this.$emit('record',params.row);
											}
										}
                    				},'收款记录'
                    			),
                    			h("a",
                    				{
										style: {
										    color: '#41b3ae',
										    fontSize: '12px',
										margin:"0 6px"
										},
										attrs: {
											type:'text'
										},
										on:{
											click:()=>{
												this.$emit('refund',params.row);
											}
										}
                    				},'退款'
                    			),
                    		])
                        }
                    }
				]
			}
		},
		computed:{
			data:function(){
				return this.tableSelectedItem;
			}
		},
		methods:{
			sort(data){
				let sortType='';
				if(data.order!='normal'){ 
					sortType=data.order;
					this.$emit('sort',data.key,sortType)
				}
			},
			selection(data){
				this.$emit('select',data)
			},
			jumpView(data) {
				this.$emit('jumpView', data)
			}
		}
	}
</script>
