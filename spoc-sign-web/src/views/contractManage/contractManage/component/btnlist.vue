<style lang="less">
    .btnlist {
        border: 1px solid #e0e0e0;
        position: relative;
        background: #fafafa;
        height: 40px;
        line-height: 38px;
        border-radius: 2px;
        .ivu-btn{
        	margin: 0 5px;
        }
        .ivu-dropdown-item{
        	text-align: center;
        }
        .btnright{
            position: absolute;
            right: 20px;
            top: -1px;
        }
        button {
            height: 30px;
            border-color: transparent;
        }
        .lineSide {
            position: absolute;
            left: -1px;
            top: -1px;
            height: 40px;
            width: 5px;
            background: #43bbb6;
            border-radius: 2px 0 0 2px;
        }
        .bt1 {
            color: #e8352c;
            border: 1px solid #e8352c;
        }
        .bt2 {
            border: 1px solid #999999;
        }
        .bt3 {
            background: #44bcb7;
            color: #fff;
        }
        .ivu-modal-body{
        	.ivu-modal-confirm-head-title{
	        	font-size: 18px;
	        }
        }
        
		  .ivu-select {
		    z-index: 999;
		  }
    }
</style>
<template>
    <div class="btnlist">
        <div class="lineSide"></div>
        <slot name="url">院校-列表</slot><!--v-model="importOpt"-->
        <slot name="search"></slot>
        <div class="btnright">
            <Dropdown style="" trigger="click" @on-click="derive" v-if="btnItem[0].cont">
		        <Button type="ghost" class="bt2">
		            {{btnItem[0].cont}}
		            <Icon type="arrow-down-b"></Icon>
		        </Button>
		        <DropdownMenu slot="list">
		            <DropdownItem v-for="item in btnItem[0].importOptList" :name="item.value" :key="item.id">{{ item.label }}</DropdownItem>
		        </DropdownMenu>
		    </Dropdown>
			<Button type="ghost" class="bt1" @click="del" v-show="isShow">{{btnItem[1].cont}}</Button>
            <!-- <Button type="ghost" class="bt2" @click="importTo">{{btnItem[2].cont}}</Button>
            <Button type="ghost" class="bt3" @click="add">{{btnItem[3].cont}}</Button> -->
        </div>
    </div>
</template>

<script>
	export default {
		props:{
			'tableSelectedItem':{
				type:Array,
				default:function (){
					return [];
				}
			},
			'btn':{
				type:Array,
				default:function(){
					return[
						{cont:'删除学校'},
						{cont:'导出学校',
						  importOptList: [
					        { id: 1, label: "导出当前", value: "current" },
					        { id: 2, label: "导出所有", value: "all" }
					      ]
						},
					    {cont:'导入学校'},
					    {cont:'添加学校'}
					]
				}
			}
		},
		data(){
			return {
				
			}
		},
		computed: {
		  btnItem:function(){
		  	return this.btn
		  },
		  isShow:function(){
		  	return !!this.tableSelectedItem.length
		  }
		},
		created () {
		},
		methods:{
			btnAction:function(){
				return false;
			},
			del:function(){
				this.$emit('del');
			},
			importTo:function(){
				this.$emit('importTo');
			},
			add:function(){
				this.$emit('add');
			},
			derive:function(data){
				this.$emit(data);
			},
		}
	}
</script>
