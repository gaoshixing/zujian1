<style lang="less">
.btnlist-pro {
	border: 1px solid #e0e0e0;
	position: relative;
	background: #fafafa;
	height: 40px;
	line-height: 38px;
	border-radius: 2px;
	text-indent: 20px;
	.ivu-dropdown-menu{
		min-width: 104px;
	}
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
	.btn{
		font-size: 14px;
		line-height: 16px;
	}
	.bt1 {
		color: #e8352c;
		border: 1px solid #e8352c;
	}
	.bt2 {
		width: 94px;
		border: 1px solid #999999;
	}
	.bt3 {
		background: #44bcb7;
		color: #fff;
	}
	.bt4 {
		width: 80px;
		border: 1px solid #999999;
	}
	.no-indent {
		text-indent: 0px !important;
	}
}
</style>
<template>
    <div class="btnlist-pro">
        <div class="lineSide"></div>
        <span>{{title}}</span>
        <slot></slot>
        <div class="btnright">
            <template v-for="(item,i) in btnList">
				<Dropdown :key="'b'+i" v-if="item.visible!==false && item.children && item.children.length" trigger="click" class="no-indent">
					<Button :type="item.type?item.type:'primary'" :class="item.cls">
						{{item.text}}
						<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem v-for="(it,ind) in item.children" :key="ind" :name="it.text" @click.native.stop="emit(it.event)">{{ it.text }}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button :key="'b'+i" v-else-if="item.visible!==false" :type="item.type?item.type:'primary'" :class="item.cls" @click="emit(item.event)" >{{item.text}}</Button>
            </template>
        </div>
    </div>
</template>



<script>
import { isFun } from '../libs/util'

export default {
	props:{
		title: {
			type: String,
			default: '',
		},
		btnList:{
			type:Array,
			default:()=>{
				return [];
			},
		},
	},
	methods:{
		emit(ev){
			if(isFun(ev)){
				ev();
			} else {
				console.error('we require a function here')
			}
		}
	}
}
</script>
