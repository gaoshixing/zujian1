<style lang="less">
	
</style>

<template>
	    <Dropdown placement="bottom-end" @on-click="doFilter">
	        <a href="javascript:void(0)">
				<i class="iconfont icon-shaixuanguolv"></i>
	        </a>
	        <DropdownMenu slot="list">
	            <DropdownItem name=",全部应用">全部应用</DropdownItem>
	            <DropdownItem v-for="item in list" :name="item.id+','+item.name" :key="item.id">{{item.name}}</DropdownItem>
	        </DropdownMenu>
	    </Dropdown>
</template>

<script>
	import valid, {
		errors,
		news,
		sys
	} from "../libs/request.js";
	export default{
		props:{
		},
		data(){
			return{
				list:[]
			}
		},
		created(){
			let params={};
			sys.listMenu(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.list = res.data.data;
					this.$emit('createFilter',this.list[0]);
				}
			}).catch(errors.call(this));
		},
		methods:{
			doFilter(val){
				let arr=val.split(',');
				this.$emit('doFilter',arr[0],arr[1]);
			}
		}
	}
</script>
